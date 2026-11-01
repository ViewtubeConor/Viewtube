import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const splitInputCss = readFileSync(new URL("../../styles/studio-split-text-input.css", import.meta.url), "utf8");
const valueToggles = readFileSync(new URL("./StudioValueToggles.tsx", import.meta.url), "utf8");
const controlSystemCss = readFileSync(new URL("../../styles/studio-control-system.css", import.meta.url), "utf8");
const subtoolboxCss = readFileSync(new URL("../../styles/subtoolbox-system.css", import.meta.url), "utf8");
const catalogCss = readFileSync(new URL("../../components/studio-hub/studio-hub-primitive-catalogs.css", import.meta.url), "utf8");
const toggleOverrides = readFileSync(new URL("../../styles/studio-control-distill-overrides.css", import.meta.url), "utf8");

describe("Studio recovery control styling", () => {
  it("keeps the split input editable and follows the persistent inset/focus field contract", () => {
    expect(splitInputCss).toContain("input.vt-studio-text-input[data-vt-studio-control=\"true\"][data-size]");
    expect(splitInputCss).toContain("50%, transparent");
    expect(splitInputCss).toContain("15%, transparent");
    expect(splitInputCss).toContain("outline-offset: 0;");
  });

  it("preserves the side-toggle direction metadata required by the production CSS", () => {
    expect(valueToggles).toContain('"data-arrow-side": arrowSide');
    expect(valueToggles).toContain('"data-size": size');
    expect(valueToggles).toContain("StudioArrowToggle");
    expect(valueToggles).toContain("StudioSideToggle");
    expect(valueToggles).toContain("StudioDoubleSideToggle");
  });

  it("delegates slider center fill and handle radius to shared defaults", () => {
    expect(controlSystemCss).toContain("background: var(--vt-field-fill-rest);");
    expect(controlSystemCss).toContain("background: var(--vt-field-fill-focus);");
    expect(controlSystemCss).not.toContain("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-studio-control-accent");
    expect(controlSystemCss).toContain("border-radius: inherit;");
    expect(subtoolboxCss).toContain(".vt-subtoolbox-slider-center,.vt-subtoolbox-range-center");
    expect(subtoolboxCss).toContain("background:var(--vt-field-fill-rest)");
    expect(subtoolboxCss).toContain("background:var(--vt-field-fill-focus)");
    expect(subtoolboxCss).toContain("var(--slider-opposite,var(--pair-b))");
    expect(catalogCss).toContain(".vt-complete-catalog .slider-center,.vt-complete-catalog .range-center");
    expect(catalogCss).toContain("background:var(--vt-field-fill-rest)");
    expect(catalogCss).toContain("background:var(--vt-field-fill-focus)");
    expect(catalogCss).not.toContain("border-radius:25%!important;");
    expect(catalogCss).not.toContain("--slider-track-stroke:2px;");
    expect(catalogCss).toContain("background:var(--slider-opposite,var(--pair-b))!important;");
    expect(subtoolboxCss).toContain("border-radius:var(--vt-component-radius)");
    expect(catalogCss).toContain("border-radius:var(--radius)");
  });

  it("styles the counter-controlled slider rails and center track with the split primary-fill contract", () => {
    expect(controlSystemCss).toContain(".vt-studio-double-split-slider.is-counter-controls .vt-studio-double-split-slider__counter > button");
    expect(controlSystemCss).toContain("background: var(--vt-studio-control-primary, var(--pair-a, #36e0f6));");
    expect(controlSystemCss).toContain("border: var(--vt-studio-slider-stroke) solid #000;");
    expect(controlSystemCss).toContain("padding-inline: calc(var(--vt-studio-control-height, 44px) * .12);");
    expect(controlSystemCss).toContain("--vt-studio-slider-left-fill: var(--vt-studio-control-primary, var(--pair-a, #36e0f6));");
    expect(controlSystemCss).toContain("var(--vt-studio-slider-left-fill) 0 var(--vt-studio-slider-progress, 0%)");
    expect(controlSystemCss).toContain("color-mix(in srgb, var(--vt-studio-slider-left-fill) 50%, transparent) var(--vt-studio-slider-progress, 0%) 100%");
  });

  it("keeps the bar-toggle recovery coloring while preserving token-owned geometry", () => {
    expect(toggleOverrides).toContain('.vt-studio-value-toggle__bar[data-active="false"]');
    expect(toggleOverrides).toContain("color-mix(in srgb, #fff 50%, var(--vt-studio-control-accent");
    expect(toggleOverrides).toContain('.vt-studio-value-toggle__bar[data-active="true"]');
    expect(toggleOverrides).toContain("background: #000 !important;");
    expect(toggleOverrides).toContain("--vt-bar-height: var(--vt-studio-control-font-size");
  });
});
