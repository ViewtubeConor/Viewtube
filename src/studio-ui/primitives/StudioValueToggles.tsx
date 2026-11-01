import React, { useCallback, useEffect, useRef } from "react";
import "../../styles/studio-control-entry.css";
import "../../styles/studio-control-value-toggles.css";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { StudioSplitShell, STUDIO_LEFT_WORD_OPTIONS } from "./StudioControls";
import type { StudioControlSize } from "../tokens";

export type StudioToggleAppearance = {
  textColor?: string;
  fillColor?: string;
  iconColor?: string;
  iconFillColor?: string;
};

type CommonProps = {
  options: readonly string[];
  value: string;
  onValueChange: (value: string) => void;
  appearance?: StudioToggleAppearance;
  disabled?: boolean;
  size?: StudioControlSize;
  ariaLabel?: string;
  className?: string;
};

export type StudioArrowToggleProps = CommonProps & {
  iconSide?: "left" | "right" | "double";
};

export type StudioSideToggleProps = CommonProps & {
  arrowSide?: "left" | "right";
  /** Reserved label width for Double Side Toggle content-width variants. */
  reserveLabel?: string;
};

export type StudioDoubleSideToggleProps = {
  left: CommonProps;
  right: CommonProps;
  variant?: "v1" | "v2";
  rightAppearance?: "primary" | "secondary" | "black-primary-text";
  size?: StudioControlSize;
  className?: string;
};

const appearanceStyle = (appearance?: StudioToggleAppearance): React.CSSProperties => ({
  ...(appearance?.textColor ? { "--vt-toggle-text": appearance.textColor } : {}),
  ...(appearance?.fillColor ? { "--vt-toggle-fill": appearance.fillColor } : {}),
  ...(appearance?.iconColor ? { "--vt-toggle-icon": appearance.iconColor } : {}),
  ...(appearance?.iconFillColor ? { "--vt-toggle-icon-fill": appearance.iconFillColor } : {}),
} as React.CSSProperties);

function changeOption(props: CommonProps, direction: -1 | 1) {
  if (!props.options.length || props.disabled) return;
  const current = props.options.indexOf(props.value);
  const base = current < 0 ? 0 : current;
  const next = (base + direction + props.options.length) % props.options.length;
  if (props.options[next] !== undefined && props.options[next] !== props.value) props.onValueChange(props.options[next]);
}

function ArrowButton({ direction, disabled, onClick, label, className = "vt-studio-value-toggle__arrow" }: {
  direction: "left" | "right" | "up" | "down";
  disabled?: boolean;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  const Icon = direction === "left" ? ChevronLeft : direction === "right" ? ChevronRight : direction === "up" ? ChevronUp : ChevronDown;
  return <button type="button" className={className} aria-label={label} disabled={disabled} onClick={onClick}>
    <Icon aria-hidden="true" />
  </button>;
}

function arrowRail(props: CommonProps, direction: -1 | 1, iconDirection: "left" | "right") {
  return <ArrowButton direction={iconDirection} label={direction < 0 ? "Previous option" : "Next option"}
    disabled={props.disabled || !props.options.length}
    onClick={() => changeOption(props, direction)} />;
}

export function StudioArrowToggle(props: StudioArrowToggleProps) {
  const { options, value, iconSide = "double", size = "standard", appearance, ariaLabel = "Choose value", className } = props;
  const index = options.indexOf(value);
  const current = options[index < 0 ? 0 : index] ?? value;
  const left = iconSide === "left" || iconSide === "double";
  const right = iconSide === "right" || iconSide === "double";
  const layout = iconSide === "double" ? "double" : iconSide;
  return <StudioSplitShell layout={layout} sizeVariant={size}
    className={["vt-studio-value-toggle", "vt-studio-value-toggle--arrow", className].filter(Boolean).join(" ")}
    shellProps={{ "data-vt-studio-value-toggle": "arrow", style: appearanceStyle(appearance) }}
    leftRailContent={left ? arrowRail(props, -1, "left") : undefined}
    rightRailContent={right ? arrowRail(props, 1, "right") : undefined}>
    <span className="vt-studio-value-toggle__face" aria-live="polite" aria-label={ariaLabel} title={current}>{current}</span>
  </StudioSplitShell>;
}

export function StudioSideToggle(props: StudioSideToggleProps) {
  const { options, value, arrowSide = "right", size = "standard", ariaLabel = "Choose value", className, reserveLabel } = props;
  const index = options.indexOf(value);
  const current = options[index < 0 ? 0 : index] ?? value;
  const arrows = <div className="vt-studio-side-counter__actions">
    <ArrowButton className="vt-studio-side-counter__action-button" direction="up" label="Previous option" disabled={props.disabled || !options.length} onClick={() => changeOption(props, -1)} />
    <ArrowButton className="vt-studio-side-counter__action-button" direction="down" label="Next option" disabled={props.disabled || !options.length} onClick={() => changeOption(props, 1)} />
  </div>;
  return <StudioSplitShell layout={arrowSide} sizeVariant={size}
    className={["vt-studio-value-toggle", "vt-studio-value-toggle--side", "vt-studio-side-counter", className].filter(Boolean).join(" ")}
    shellProps={{ "data-vt-studio-value-toggle": "side", "data-arrow-side": arrowSide, "data-size": size, style: appearanceStyle(props.appearance) }}
    leftRailClassName={arrowSide === "left" ? "vt-studio-left-counter__rail" : undefined}
    rightRailClassName={arrowSide === "right" ? "vt-studio-side-counter__rail" : undefined}
    leftRailContent={arrowSide === "left" ? arrows : undefined}
    rightRailContent={arrowSide === "right" ? arrows : undefined}>
    <span className="vt-studio-value-toggle__face" data-content-width={reserveLabel ? "true" : undefined} aria-live="polite" aria-label={ariaLabel} title={current}><span>{current}</span>{reserveLabel && <span className="vt-studio-value-toggle__measure" aria-hidden="true">{reserveLabel}</span>}</span>
  </StudioSplitShell>;
}

export function StudioDoubleSideToggle({ left, right, variant = "v1", rightAppearance = "primary", size = "standard", className }: StudioDoubleSideToggleProps) {
  const noDivider = variant === "v2";
  const rightAppearanceStyle: StudioToggleAppearance = rightAppearance === "secondary"
    ? { fillColor: "var(--pair-b, #ff7f6b)", textColor: "#000" }
    : rightAppearance === "black-primary-text"
      ? { fillColor: "#000", textColor: "var(--pair-a, #36e0f6)" }
      : { fillColor: "var(--pair-a, #36e0f6)", textColor: "#000" };
  return <div className={["vt-studio-value-toggle", "vt-studio-value-toggle--double", className].filter(Boolean).join(" ")}
    data-vt-studio-control="true" data-vt-studio-value-toggle="double" data-variant={variant} data-right-appearance={rightAppearance} data-size={size}>
    <div className="vt-studio-value-toggle__double-side">
      <StudioSideToggle {...left} size={size} arrowSide="left" className="vt-studio-value-toggle--nested" />
    </div>
    {!noDivider && <span className="vt-studio-value-toggle__divider" aria-hidden="true" />}
    <div className="vt-studio-value-toggle__double-side">
      <StudioSideToggle {...right} appearance={{ ...right.appearance, ...rightAppearanceStyle }} size={size} arrowSide="right" className="vt-studio-value-toggle--nested" />
    </div>
  </div>;
}

export type StudioBarToggleProps = {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  size?: StudioControlSize;
  appearance?: StudioToggleAppearance;
  ariaLabel?: string;
  holdDelayMs?: number;
  repeatIntervalMs?: number;
  className?: string;
  /** Optional fixed bar count; default measures the available track width. */
  barCount?: number;
};

/** Bar geometry must remain aligned with --vt-bar-* in studio-control-distill-overrides.css. */
const BAR_METRICS: Record<string, { bar: number; gap: number; pad: number }> = {
  supreme: { bar: 20.728, gap: 4, pad: 16 },
  standard: { bar: 15.2, gap: 3, pad: 12 },
  compact: { bar: 9.6, gap: 2, pad: 8 },
  mini: { bar: 7, gap: 1.5, pad: 6 },
  micro: { bar: 4, gap: 1, pad: 4 },
};

function barCountFromWidth(widthPx: number, size: string): number {
  const metrics = BAR_METRICS[size] ?? BAR_METRICS.standard;
  const inner = Math.max(0, widthPx - metrics.pad);
  const count = Math.floor((inner + metrics.gap) / (metrics.bar + metrics.gap));
  return Math.max(4, Math.min(40, count || 4));
}

export function StudioBarToggle({
  value, onValueChange, disabled = false, size = "standard", appearance, ariaLabel = "Level",
  holdDelayMs = 350, repeatIntervalMs = 100, className, barCount: barCountProp,
}: StudioBarToggleProps) {
  const barsRef = useRef<HTMLDivElement | null>(null);
  const [measuredCount, setMeasuredCount] = React.useState(10);
  useEffect(() => {
    if (barCountProp != null) return;
    const element = barsRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(entries => {
      // Measure the border box so CSS padding is included exactly once.
      const width = element.getBoundingClientRect().width || entries[0]?.contentRect.width || element.clientWidth;
      setMeasuredCount(barCountFromWidth(width, size));
    });
    observer.observe(element);
    setMeasuredCount(barCountFromWidth(element.getBoundingClientRect().width || element.clientWidth, size));
    return () => observer.disconnect();
  }, [size, barCountProp]);

  const barCount = barCountProp ?? measuredCount;
  const stepSize = 100 / barCount;
  const filled = Math.max(0, Math.min(barCount, Math.round((Math.max(0, Math.min(100, value)) / 100) * barCount)));
  const repeatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatActive = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;
  const stopRepeat = useCallback(() => {
    repeatActive.current = false;
    if (repeatTimer.current !== null) clearTimeout(repeatTimer.current);
    repeatTimer.current = null;
  }, []);
  useEffect(() => stopRepeat, [stopRepeat]);
  const step = useCallback((direction: -1 | 1) => {
    if (disabled) return;
    const current = Math.max(0, Math.min(100, valueRef.current));
    const at = Math.round(current / stepSize) * stepSize;
    const next = Math.max(0, Math.min(100, at + direction * stepSize));
    valueRef.current = next;
    onValueChange(next);
  }, [disabled, onValueChange, stepSize]);
  const startRepeat = (direction: -1 | 1) => {
    stopRepeat();
    step(direction);
    repeatActive.current = true;
    repeatTimer.current = setTimeout(function repeat() {
      if (!repeatActive.current) return;
      step(direction);
      repeatTimer.current = setTimeout(repeat, repeatIntervalMs);
    }, holdDelayMs);
  };
  const onPointerDown = (direction: -1 | 1) => (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    startRepeat(direction);
  };
  const decrease = <button type="button" className="vt-studio-stepper-button vt-studio-value-toggle__arrow" aria-label="Decrease level" disabled={disabled || value <= 0}
    onPointerDown={onPointerDown(-1)} onPointerUp={stopRepeat} onPointerLeave={stopRepeat} onPointerCancel={stopRepeat} onLostPointerCapture={stopRepeat}
    onClick={() => {}} onKeyDown={event => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); step(-1); } }}>
    <ChevronLeft aria-hidden="true" />
  </button>;
  const increase = <button type="button" className="vt-studio-stepper-button vt-studio-value-toggle__arrow" aria-label="Increase level" disabled={disabled || value >= 100}
    onPointerDown={onPointerDown(1)} onPointerUp={stopRepeat} onPointerLeave={stopRepeat} onPointerCancel={stopRepeat} onLostPointerCapture={stopRepeat}
    onClick={() => {}} onKeyDown={event => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); step(1); } }}>
    <ChevronRight aria-hidden="true" />
  </button>;
  return <StudioSplitShell layout="double" sizeVariant={size}
    className={["vt-studio-value-toggle", "vt-studio-value-toggle--bar", className].filter(Boolean).join(" ")}
    shellProps={{ "data-vt-studio-value-toggle": "bar", "data-size": size, style: appearanceStyle(appearance) }}
    leftRailContent={decrease} rightRailContent={increase}>
    <div ref={barsRef} className="vt-studio-value-toggle__bars" role="meter" aria-label={ariaLabel}
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.max(0, Math.min(100, value)))} data-bar-count={barCount}>
      {Array.from({ length: barCount }, (_, index) => (
        <span key={index} className="vt-studio-value-toggle__bar" data-active={index < filled ? "true" : "false"}>
          {index === Math.max(0, filled - 1) && filled > 0 ? (
            <span className="vt-studio-value-toggle__bar-tooltip" aria-hidden="true">{Math.round(Math.max(0, Math.min(100, value)))}%</span>
          ) : null}
        </span>
      ))}
    </div>
  </StudioSplitShell>;
}


export type StudioDoubleSplitWordCounterProps = {
  value: number;
  onValueChange: (value: number) => void;
  options?: readonly string[];
  size?: StudioControlSize;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

/** Three-cell word counter with matching square chevron rails and cyclic word steps. */
export function StudioDoubleSplitWordCounter({
  value, onValueChange, options = STUDIO_LEFT_WORD_OPTIONS, size = "standard",
  disabled = false, ariaLabel = "Word", className,
}: StudioDoubleSplitWordCounterProps) {
  const safeOptions = options.length ? options : STUDIO_LEFT_WORD_OPTIONS;
  const currentIndex = Math.max(0, Math.min(safeOptions.length - 1, Math.round(value) - 1));
  const current = safeOptions[currentIndex] ?? safeOptions[0] ?? "ONE";
  const step = (direction: -1 | 1) => {
    if (disabled) return;
    onValueChange((currentIndex + direction + safeOptions.length) % safeOptions.length + 1);
  };
  const leftButton = <button type="button" className="vt-studio-stepper-button vt-studio-word-counter__button"
    aria-label={`Previous ${ariaLabel}`} disabled={disabled} onClick={() => step(-1)}>
    <ChevronLeft aria-hidden="true" focusable="false" />
  </button>;
  const rightButton = <button type="button" className="vt-studio-stepper-button vt-studio-word-counter__button"
    aria-label={`Next ${ariaLabel}`} disabled={disabled} onClick={() => step(1)}>
    <ChevronRight aria-hidden="true" focusable="false" />
  </button>;
  return <StudioSplitShell layout="double" sizeVariant={size}
    className={["vt-studio-value-toggle", "vt-studio-word-counter", className].filter(Boolean).join(" ")}
    shellProps={{
      role: "group", "aria-label": ariaLabel, "aria-disabled": disabled || undefined,
      "data-vt-studio-control-family": "counter",
      "data-vt-studio-control-kind": "studio-double-split-word-counter",
      "data-vt-library-component": "StudioDoubleSplitWordCounter",
      "data-word-count": safeOptions.length, "data-size": size,
    }}
    leftRailContent={leftButton} rightRailContent={rightButton}>
    <span className="vt-studio-word-counter__value" aria-live="polite" aria-atomic="true">{current}</span>
  </StudioSplitShell>;
}

export const STUDIO_VALUE_TOGGLE_VARIANTS = ["v1", "v2"] as const;
