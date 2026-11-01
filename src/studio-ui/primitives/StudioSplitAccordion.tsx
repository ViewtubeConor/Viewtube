import React from "react";
import "../../styles/studio-control-entry.css";

import "../../styles/studio-split-accordion.css";

export type StudioSplitAccordionLayout = "left" | "right" | "double";

export type StudioSplitAccordionSize = "supreme" | "standard" | "compact" | "mini" | "micro";

/** Visual treatments ported from the navigation library (see studio-split-accordion.css). */
export type StudioSplitAccordionVariant =
  | "saturated"
  | "inset"
  | "black"
  | "reversed"
  | "glow"
  | "soft"
  | "blackInset"
  | "tinted";

/** Colour of the borders, dividers, gaps and the rail itself. */
export type StudioSplitAccordionBorderTone = "black" | "white" | "transparent";

export interface StudioSplitAccordionItem {
  id?: string;
  accessibleLabel: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface StudioSplitAccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: readonly StudioSplitAccordionItem[];
  sizeVariant?: StudioSplitAccordionSize;
  /** Retained for API compatibility; the train is horizontal for every value. */
  layout?: StudioSplitAccordionLayout;
  /** Fill, inset-line, outline and glow treatment. Defaults to "saturated". */
  variant?: StudioSplitAccordionVariant;
  /** Border / divider / gap colour. Defaults to "black". */
  borderTone?: StudioSplitAccordionBorderTone;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  disabled?: boolean;
  accessibleLabel?: string;
  /** Duration of each icon's trip in milliseconds. Defaults to 1000ms. */
  motionDurationMs?: number;
}

const itemKey = (item: StudioSplitAccordionItem, index: number) => item.id ?? `${item.accessibleLabel}::${index}`;

function initialIndex(items: readonly StudioSplitAccordionItem[], requested?: number) {
  if (requested !== undefined && items[requested] && !items[requested].disabled) return requested;
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (!items[index].disabled) return index;
  }
  return -1;
}

/** Train easing: 1 - (1 - t^1.8)^4. Slow start, fast middle, long drift. */
export function easeTrain(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - Math.pow(x, 1.8), 4);
}

export function easeTrainInverse(y: number): number {
  const target = Math.max(0, Math.min(1, y));
  let low = 0;
  let high = 1;
  for (let i = 0; i < 24; i += 1) {
    const mid = (low + high) / 2;
    if (easeTrain(mid) < target) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

export function openPanelWidth(innerWidth: number, itemCount: number, face: number, stroke = 0): number {
  if (itemCount <= 0) return 0;
  // Inter-section dividers live in the track gap, outside each square cell width.
  const dividerWidth = Math.max(0, itemCount - 1) * Math.max(0, stroke);
  return Math.max(face, innerWidth - itemCount * face - dividerWidth);
}

/** Left edge of every icon for a given set of item widths (items are separated by `stroke`). */
export function iconPositions(widths: readonly number[], stroke: number): number[] {
  let cursor = 0;
  return widths.map((width) => {
    const x = cursor;
    cursor += width + stroke;
    return x;
  });
}

export interface TrainPlan {
  fromX: number[];
  toX: number[];
  /** Per-icon departure delay in ms. */
  delays: number[];
  /** Delay of the last follower plus one trip. */
  totalDuration: number;
}

/**
 * Compounding departure. Every icon that has to travel gets its own trip. The leader (the icon at the front of
 * the direction of travel) leaves first; the next one leaves once the leader has gone about 2 icons, the next
 * once the second has gone about 1 icon, then 1/2, 1/4 ... so the rest end up nearly connected.
 * Icons moving left are led by the left-most mover; icons moving right by the right-most mover.
 */
export function planTrain(
  fromWidths: readonly number[],
  toWidths: readonly number[],
  face: number,
  stroke: number,
  durationMs: number,
): TrainPlan {
  const fromX = iconPositions(fromWidths, stroke);
  const toX = iconPositions(toWidths, stroke);
  const delays = fromX.map(() => 0);
  const moving = fromX.map((_, i) => i).filter((i) => Math.abs(toX[i] - fromX[i]) > 0.5);
  const leftward = moving.filter((i) => toX[i] < fromX[i]).sort((a, b) => a - b);
  const rightward = moving.filter((i) => toX[i] > fromX[i]).sort((a, b) => b - a);
  [leftward, rightward].forEach((group) => {
    if (!group.length) return;
    const leadDistance = Math.abs(toX[group[0]] - fromX[group[0]]);
    let cumulative = 0;
    group.forEach((index, order) => {
      if (order > 0) {
        const relativeStep = Math.min(0.95, (2 * face * Math.pow(0.5, order - 1)) / Math.max(1, leadDistance));
        cumulative += easeTrainInverse(relativeStep) * durationMs;
      }
      delays[index] = cumulative;
    });
  });
  return { fromX, toX, delays, totalDuration: Math.max(...delays, 0) + Math.max(1, durationMs) };
}

/** Item widths at `elapsed` ms. Each width is the distance from its icon to the next icon, so gaps open as icons leave. */
export function trainWidthsAt(
  plan: TrainPlan,
  elapsed: number,
  durationMs: number,
  face: number,
  stroke: number,
  trackWidth: number,
): number[] {
  const duration = Math.max(1, durationMs);
  const x = plan.fromX.map((from, i) => {
    const t = Math.max(0, Math.min(1, (elapsed - plan.delays[i]) / duration));
    return from + (plan.toX[i] - from) * easeTrain(t);
  });
  return x.map((position, i) => {
    const edge = i < x.length - 1 ? x[i + 1] - stroke : trackWidth;
    return Math.max(face, edge - position);
  });
}

type FrameState = { widths: number[]; scrollLeft: number; labelVisible: boolean[] };

export const StudioSplitAccordion = React.forwardRef<HTMLDivElement, StudioSplitAccordionProps>(
  (
    {
      items, sizeVariant = "standard", layout = "left", variant = "saturated", borderTone = "black",
      activeIndex, defaultActiveIndex, onActiveIndexChange, disabled = false,
      accessibleLabel = "Split accordion", motionDurationMs = 1000, className, onKeyDown, ...props
    },
    forwardedRef,
  ) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const viewportRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
    const idPrefix = React.useId().replace(/:/g, "");
    const rafRef = React.useRef<number | null>(null);
    const openRef = React.useRef(0);
    // Keep the last rendered frame so interrupted transitions continue from the visible geometry.
    const currentWidthsRef = React.useRef<number[]>([]);
    // Only the selected/opening panel shows its label; all other expanded transit bands keep their panel fill.
    const labelSetRef = React.useRef<Set<number>>(new Set());
    const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() => initialIndex(items, defaultActiveIndex));
    const [reducedMotion, setReducedMotion] = React.useState(false);

    const controlled = activeIndex !== undefined;
    const openIndex = controlled
      ? (items[activeIndex as number] && !items[activeIndex as number].disabled ? activeIndex as number : initialIndex(items))
      : (items[uncontrolledIndex] && !items[uncontrolledIndex].disabled ? uncontrolledIndex : initialIndex(items));

    const setRootRef = React.useCallback((node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }, [forwardedRef]);

    React.useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReducedMotion(query.matches);
      update();
      query.addEventListener?.("change", update);
      return () => query.removeEventListener?.("change", update);
    }, []);

    const measure = React.useCallback(() => {
      const root = rootRef.current;
      if (!root) return { face: 44, inner: 0, stroke: 0 };
      const styles = window.getComputedStyle(root);
      const face = parseFloat(styles.getPropertyValue("--vt-sa-face")) || 44;
      const stroke = parseFloat(styles.getPropertyValue("--vt-sa-stroke")) || 0;
      // clientWidth excludes the shell border; do not subtract the border a second time.
      return { face, inner: Math.max(0, root.clientWidth), stroke };
    }, []);

    const applyFrame = React.useCallback((frame: FrameState) => {
      currentWidthsRef.current = [...frame.widths];
      items.forEach((_, index) => {
        const item = itemRefs.current[index];
        if (item) item.style.width = `${Math.max(0, frame.widths[index] ?? 0)}px`;
        const content = item?.querySelector<HTMLElement>("[data-vt-studio-split-accordion-content]");
        if (content) content.dataset.labelVisible = frame.labelVisible[index] ? "true" : "false";
      });
      const track = trackRef.current;
      if (track) {
        const { stroke } = measure();
        track.style.width = `${frame.widths.reduce((sum, width) => sum + width, 0) + Math.max(0, frame.widths.length - 1) * stroke}px`;
      }
      const viewport = viewportRef.current;
      if (viewport) viewport.scrollLeft = frame.scrollLeft;
    }, [items, measure]);

    const layoutForOpen = React.useCallback((index: number): FrameState => {
      const { face, inner, stroke } = measure();
      const count = items.length;
      if (count === 0) return { widths: [], scrollLeft: 0, labelVisible: [] };
      const panel = openPanelWidth(inner, count, face, stroke);
      const widths = items.map((_, i) => face + (i === index ? panel : 0));
      const total = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, count - 1) * stroke;
      const center = widths.slice(0, index).reduce((sum, width) => sum + width, 0) + index * stroke + (widths[index] ?? face) / 2;
      const scrollLeft = total <= inner ? 0 : Math.max(0, Math.min(total - inner, center - inner / 2));
      return { widths, scrollLeft, labelVisible: items.map((_, i) => i === index) };
    }, [items, measure]);

    const snap = React.useCallback((index: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      const frame = layoutForOpen(index);
      labelSetRef.current = new Set(frame.labelVisible.flatMap((visible, i) => (visible ? [i] : [])));
      applyFrame(frame);
    }, [applyFrame, layoutForOpen]);

    const animateTo = React.useCallback((next: number) => {
      const previous = openRef.current;
      if (next < 0 || next >= items.length) { snap(next); return; }
      if (next === previous) { if (rafRef.current === null) snap(next); return; }
      if (reducedMotion || motionDurationMs <= 0) { snap(next); return; }
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      const { face, inner, stroke } = measure();
      const count = items.length;
      const panel = openPanelWidth(inner, count, face, stroke);
      const canonicalFromWidths = items.map((_, i) => face + (i === previous ? panel : 0));
      const savedWidths = currentWidthsRef.current;
      const fromWidths = savedWidths.length === count
        ? savedWidths.map((width) => Math.max(face, width))
        : canonicalFromWidths;
      const toWidths = items.map((_, i) => face + (i === next ? panel : 0));
      const trackWidth = toWidths.reduce((sum, width) => sum + width, 0) + Math.max(0, count - 1) * stroke;
      const plan = planTrain(fromWidths, toWidths, face, stroke, motionDurationMs);
      const fromScrollLeft = viewportRef.current?.scrollLeft ?? 0;
      const targetScrollLeft = layoutForOpen(next).scrollLeft;
      const shown = new Set<number>(labelSetRef.current);
      shown.add(previous);
      shown.add(next);
      labelSetRef.current = shown;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const widths = trainWidthsAt(plan, elapsed, motionDurationMs, face, stroke, trackWidth);
        const progress = easeTrain(Math.min(1, elapsed / plan.totalDuration));
        // Interpolate the viewport independently; switching the anchor at 50% caused a visible scroll snap.
        const scrollLeft = fromScrollLeft + (targetScrollLeft - fromScrollLeft) * progress;
        applyFrame({ widths, scrollLeft, labelVisible: items.map((_, i) => shown.has(i)) });
        if (elapsed < plan.totalDuration) rafRef.current = requestAnimationFrame(tick);
        else {
          rafRef.current = null;
          snap(next);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, [applyFrame, items, layoutForOpen, measure, motionDurationMs, reducedMotion, snap]);

    const setOpen = React.useCallback((index: number) => {
      if (disabled || index < 0 || index >= items.length || items[index]?.disabled) return;
      if (!controlled) setUncontrolledIndex(index);
      onActiveIndexChange?.(index);
      animateTo(index);
      openRef.current = index;
    }, [animateTo, controlled, disabled, items, onActiveIndexChange]);

    React.useLayoutEffect(() => {
      const target = openIndex < 0 ? 0 : openIndex;
      openRef.current = target;
      snap(target);
      // Only reset on structural changes; selection changes are animated below.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length, sizeVariant, variant]);

    React.useEffect(() => {
      const root = rootRef.current;
      if (!root || typeof ResizeObserver === "undefined") return;
      const observer = new ResizeObserver(() => {
        if (rafRef.current === null) snap(openRef.current < 0 ? 0 : openRef.current);
      });
      observer.observe(root);
      return () => observer.disconnect();
    }, [snap]);

    React.useEffect(() => {
      if (controlled && activeIndex !== undefined && activeIndex !== openRef.current) {
        const validIndex = items[activeIndex] && !items[activeIndex].disabled ? activeIndex : initialIndex(items);
        animateTo(validIndex);
        openRef.current = validIndex;
      }
    }, [activeIndex, animateTo, controlled, items]);

    React.useEffect(() => {
      if (reducedMotion && rafRef.current !== null) snap(openRef.current);
    }, [reducedMotion, snap]);

    React.useEffect(() => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled || !items.length) return;
      const enabled = items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled);
      if (!enabled.length) return;
      const position = enabled.findIndex(({ index }) => index === openIndex);
      let target = position;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") target = (position + 1 + enabled.length) % enabled.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = (position - 1 + enabled.length) % enabled.length;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = enabled.length - 1;
      else return;
      event.preventDefault();
      setOpen(enabled[target].index);
      itemRefs.current[enabled[target].index]?.querySelector<HTMLButtonElement>("[data-vt-studio-split-accordion-trigger]")?.focus();
    };

    return (
      <div
        {...props}
        ref={setRootRef}
        role="tablist"
        aria-label={accessibleLabel}
        className={["vt-studio-split-accordion", className].filter(Boolean).join(" ")}
        data-vt-studio-control="true"
        data-vt-studio-split-accordion="true"
        data-vt-library-component="StudioSplitAccordion"
        data-size={sizeVariant}
        data-layout={layout}
        data-variant={variant}
        data-border={borderTone}
        data-active-index={openIndex}
        data-section-count={items.length}
        onKeyDown={handleKeyDown}
      >
        <div className="vt-studio-split-accordion__viewport" ref={viewportRef}>
          <div className="vt-studio-split-accordion__track" ref={trackRef}>
            {items.map((item, index) => {
              const selected = index === openIndex;
              const panelId = `vt-studio-split-accordion-${idPrefix}-panel-${index}`;
              return (
                <div
                  key={itemKey(item, index)}
                  ref={(node) => { itemRefs.current[index] = node; }}
                  className="vt-studio-split-accordion__item"
                  data-active={selected ? "true" : "false"}
                  data-disabled={item.disabled || disabled ? "true" : "false"}
                  style={item.style}
                  role="presentation"
                >
                  <button
                    type="button"
                    role="tab"
                    className="vt-studio-split-accordion__trigger"
                    data-vt-studio-split-accordion-trigger="true"
                    aria-selected={selected}
                    aria-expanded={selected}
                    aria-controls={panelId}
                    aria-label={item.accessibleLabel}
                    disabled={disabled || item.disabled}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setOpen(index)}
                  >
                    <span className="vt-studio-split-accordion__face" aria-hidden="true">{item.icon}</span>
                  </button>
                  {/* data-label-visible is written by applyFrame, not by React, so a click never flashes it. */}
                  <div
                    id={panelId}
                    className="vt-studio-split-accordion__content"
                    data-vt-studio-split-accordion-content="true"
                    data-active={selected ? "true" : "false"}
                    role="tabpanel"
                    aria-hidden={!selected}
                  >
                    <div className="vt-studio-split-accordion__panel">
                      <div className="vt-studio-split-accordion__content-inner">{item.content}</div>
                      {item.trailing ? <div className="vt-studio-split-accordion__trailing">{item.trailing}</div> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

StudioSplitAccordion.displayName = "StudioSplitAccordion";

export default StudioSplitAccordion;
