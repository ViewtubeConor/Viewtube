// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StudioArrowToggle, StudioBarToggle, StudioDoubleSideToggle, StudioDoubleSplitWordCounter, StudioSideToggle } from "./StudioValueToggles";

const cleanups: Array<() => void> = [];
function mount(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => root.render(element));
  const cleanup = () => {
    act(() => root.unmount());
    container.remove();
  };
  cleanups.push(cleanup);
  return { container, cleanup };
}
function click(element: Element | null) {
  if (!element) throw new Error("Expected a clickable element");
  act(() => element.dispatchEvent(new MouseEvent("click", { bubbles: true })));
}
afterEach(() => {
  cleanups.splice(0).forEach(cleanup => cleanup());
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Studio value toggle primitives", () => {
  it("renders the controlled double-split word counter in the canonical value-toggle shell", () => {
    const onValueChange = vi.fn();
    const { container } = mount(<StudioDoubleSplitWordCounter size="standard" value={1} onValueChange={onValueChange} />);
    const shell = container.querySelector(".vt-studio-split-shell.vt-studio-value-toggle.vt-studio-word-counter");
    expect(shell).toBeTruthy();
    expect(shell?.getAttribute("data-vt-studio-control-kind")).toBe("studio-double-split-word-counter");
    expect(shell?.querySelectorAll(":scope > [data-vt-studio-split-rail]")).toHaveLength(2);
    click(container.querySelector('button[aria-label="Previous Word"]'));
    expect(onValueChange).toHaveBeenLastCalledWith(4);
    click(container.querySelector('button[aria-label="Next Word"]'));
    expect(onValueChange).toHaveBeenLastCalledWith(2);
  });

  it("cycles Arrow Toggle options endlessly in both directions without disabling boundary arrows", () => {
    const onValueChange = vi.fn();
    const { container } = mount(<StudioArrowToggle options={["A", "B", "C"]} value="A" onValueChange={onValueChange} />);
    expect((container.querySelector('button[aria-label="Previous option"]') as HTMLButtonElement).disabled).toBe(false);
    click(container.querySelector('button[aria-label="Previous option"]'));
    expect(onValueChange).toHaveBeenLastCalledWith("C");
    click(container.querySelector('button[aria-label="Next option"]'));
    expect(onValueChange).toHaveBeenLastCalledWith("B");
    expect((container.querySelector('button[aria-label="Next option"]') as HTMLButtonElement).disabled).toBe(false);
  });

  it("renders Side Toggle text face with a left arrow stack and keeps both directions enabled at boundaries", () => {
    const onValueChange = vi.fn();
    const { container } = mount(<StudioSideToggle options={["LOW", "MID", "HIGH"]} value="LOW" onValueChange={onValueChange} arrowSide="left" />);
    expect(container.querySelector(".vt-studio-value-toggle__face")?.textContent).toContain("LOW");
    expect(container.querySelector(".vt-studio-side-counter")).not.toBeNull();
    expect(container.querySelector(".vt-studio-left-counter__rail[data-rail=\"start\"]")).not.toBeNull();
    const arrows = container.querySelectorAll(".vt-studio-side-counter__actions button");
    expect(arrows).toHaveLength(2);
    expect((arrows[0] as HTMLButtonElement).disabled).toBe(false);
    expect((arrows[1] as HTMLButtonElement).disabled).toBe(false);
    click(arrows[0]);
    expect(onValueChange).toHaveBeenLastCalledWith("HIGH");
  });

  it("renders independently configured Double Side Toggle values without the V2 divider", () => {
    const { container } = mount(<StudioDoubleSideToggle variant="v2"
      left={{ options: ["A", "B"], value: "A", onValueChange: () => {} }}
      right={{ options: ["X", "Y"], value: "X", onValueChange: () => {} }} />);
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("X");
    expect(container.querySelector(".vt-studio-value-toggle__divider")).toBeNull();
  });

  it("renders ten default bars and exposes the selected level as a meter", () => {
    const { container } = mount(<StudioBarToggle value={50} onValueChange={() => {}} />);
    expect(container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(10);
    expect(container.querySelector('[role="meter"][aria-label="Level"]')?.getAttribute("aria-valuenow")).toBe("50");
    expect(container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(5);
  });

  it("keeps proportional fill when an explicit bar count changes", () => {
    const ten = mount(<StudioBarToggle value={50} barCount={10} onValueChange={() => {}} />);
    const twenty = mount(<StudioBarToggle value={50} barCount={20} onValueChange={() => {}} />);
    expect(ten.container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(10);
    expect(ten.container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(5);
    expect(twenty.container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(20);
    expect(twenty.container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(10);
    expect(twenty.container.querySelector('[role="meter"]')?.getAttribute("aria-valuenow")).toBe("50");
  });

  it("measures the available track width and increases the bar count for a wider layout", () => {
    let notify: ResizeObserverCallback | undefined;
    class MockResizeObserver {
      constructor(callback: ResizeObserverCallback) { notify = callback; }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    const { container } = mount(<StudioBarToggle value={50} onValueChange={() => {}} />);
    const track = container.querySelector(".vt-studio-value-toggle__bars") as HTMLElement;
    vi.spyOn(track, "getBoundingClientRect").mockReturnValue({ width: 272 } as DOMRect);
    act(() => {
      notify?.([{ target: track, contentRect: { width: 260 } as DOMRectReadOnly } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    });
    expect(container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(20);
    expect(container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(10);
  });

  it("uses size-specific bar and gap metrics when measuring compact and micro tracks", () => {
    let notify: ResizeObserverCallback | undefined;
    class MockResizeObserver {
      constructor(callback: ResizeObserverCallback) { notify = callback; }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver);

    const compact = mount(<StudioBarToggle value={50} size="compact" onValueChange={() => {}} />);
    const compactTrack = compact.container.querySelector(".vt-studio-value-toggle__bars") as HTMLElement;
    vi.spyOn(compactTrack, "getBoundingClientRect").mockReturnValue({ width: 264 } as DOMRect);
    act(() => notify?.([{ target: compactTrack, contentRect: { width: 256 } as DOMRectReadOnly } as unknown as ResizeObserverEntry], {} as ResizeObserver));
    expect(compact.container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(32);
    expect(compact.container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(16);

    const micro = mount(<StudioBarToggle value={50} size="micro" onValueChange={() => {}} />);
    const microTrack = micro.container.querySelector(".vt-studio-value-toggle__bars") as HTMLElement;
    vi.spyOn(microTrack, "getBoundingClientRect").mockReturnValue({ width: 164 } as DOMRect);
    act(() => notify?.([{ target: microTrack, contentRect: { width: 160 } as DOMRectReadOnly } as unknown as ResizeObserverEntry], {} as ResizeObserver));
    expect(micro.container.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(40);
    expect(micro.container.querySelectorAll('.vt-studio-value-toggle__bar[data-active="true"]')).toHaveLength(20);
  });

  it("builds Arrow Toggle from the canonical split shell with square icon rails", () => {
    const { container } = mount(<StudioArrowToggle options={["A", "B"]} value="A" onValueChange={() => {}} />);
    const shell = container.querySelector('[data-vt-studio-split="double"]');
    expect(shell).toBeTruthy();
    expect(shell?.querySelectorAll(":scope > [data-vt-studio-split-rail]")).toHaveLength(2);
    expect(shell?.querySelector(":scope > [data-vt-studio-split-label]")).toBeTruthy();
  });

  it("uses the canonical one-rail split shell for Side Toggle", () => {
    const { container } = mount(<StudioSideToggle options={["LOW", "HIGH"]} value="LOW" onValueChange={() => {}} />);
    const shell = container.querySelector('[data-vt-studio-split="right"]');
    expect(shell).toBeTruthy();
    expect(shell?.querySelectorAll(":scope > [data-vt-studio-split-rail]")).toHaveLength(1);
    expect(shell?.querySelector(":scope > [data-vt-studio-split-label]")).toBeTruthy();
  });

  it("keeps both Double Side Toggle values inside one shared perimeter with a single center divider", () => {
    const { container } = mount(<StudioDoubleSideToggle
      left={{ options: ["A", "B"], value: "A", onValueChange: () => {} }}
      right={{ options: ["X", "Y"], value: "X", onValueChange: () => {} }} />);
    const shell = container.querySelector('[data-vt-studio-value-toggle="double"]');
    expect(shell?.querySelectorAll(":scope > .vt-studio-value-toggle__double-side")).toHaveLength(2);
    expect(shell?.querySelectorAll(":scope > .vt-studio-value-toggle__divider")).toHaveLength(1);
    expect(shell?.querySelectorAll(".vt-studio-split-shell")).toHaveLength(2);
  });

  it("places Bar Toggle controls in split icon rails around the ten-bar face", () => {
    const { container } = mount(<StudioBarToggle value={50} onValueChange={() => {}} />);
    const shell = container.querySelector('[data-vt-studio-split="double"]');
    expect(shell).toBeTruthy();
    expect(shell?.querySelectorAll(":scope > [data-vt-studio-split-rail]")).toHaveLength(2);
    expect(shell?.querySelectorAll(".vt-studio-value-toggle__bar")).toHaveLength(10);
  });

  it("reserves each side's longest word in Double Side Toggle content-width variants", () => {
    const { container } = mount(<StudioDoubleSideToggle variant="v2"
      left={{ options: ["A", "SOURCE NAME"], value: "A", onValueChange: () => {} }}
      right={{ options: ["X", "DESTINATION"], value: "X", onValueChange: () => {} }} />);
    expect(container.querySelectorAll('.vt-studio-value-toggle__face[data-content-width="true"]')).toHaveLength(2);
    expect(container.querySelector(".vt-studio-value-toggle__measure")?.textContent).toBe("SOURCE");
    expect(container.querySelectorAll(".vt-studio-value-toggle__measure")).toHaveLength(2);
  });
});
