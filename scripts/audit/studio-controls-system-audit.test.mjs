import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const tokens = read("src/studio-ui/tokens.ts");
const controls = read("src/studio-ui/primitives/StudioControls.tsx");
const valueToggles = read("src/studio-ui/primitives/StudioValueToggles.tsx");
const generated = read("src/styles/studio-control-vars.generated.css");
const system = read("src/styles/studio-control-system.css");
const valueToggleCss = read("src/styles/studio-control-value-toggles.css");
const split = read("src/styles/studio-control-split.css");
const recovery = read("src/styles/studio-control-recovery-overrides.css");
const distill = read("src/styles/studio-control-distill-overrides.css");
const fields = read("src/styles/studio-control-fields.css");
const standaloneInputCss = read("src/styles/studio-text-input.css");
const splitInput = read("src/studio-ui/primitives/StudioSplitTextInput.tsx");
const splitInputCss = read("src/studio-ui/primitives/studio-split-text-input.css");
const catalog = read("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx");
const publicIndex = read("src/studio-ui/index.ts");
const catalogCss = read("src/components/studio-hub/studio-hub-primitive-catalogs.css");
const componentGridCss = read("src/styles/studio-component-grid.css");
const sideRailCss = read("src/styles/studio-side-rail-unify.css");

const tiers = {
  supreme: { height: 60, stroke: 3, radius: 6, fontSize: 52, iconSize: 52 },
  standard: { height: 44, stroke: 3, radius: 6, fontSize: 38, iconSize: 38 },
  compact: { height: 28, stroke: 2, radius: 4, fontSize: 24, iconSize: 24 },
  mini: { height: 20, stroke: 1.5, radius: 3, fontSize: 17.5, iconSize: 17.5 },
  micro: { height: 12, stroke: 1, radius: 2, fontSize: 10, iconSize: 10 },
};

test("all five size tiers are canonical, generated, and consumed by the system", () => {
  for (const [tier, values] of Object.entries(tiers)) {
    const tokenBlock = tokens.match(new RegExp("\\b" + tier + ":\\s*\\{([^}]*)\\}"))?.[1];
    assert.ok(tokenBlock, "missing " + tier + " token object");
    for (const [key, value] of Object.entries(values)) {
      const numeric = String(value).replace(".", "\\.");
      assert.match(tokenBlock, new RegExp("\\b" + key + ":\\s*" + numeric + "(?:,|\\s)"), tier + "." + key + " token");
      const cssKey = key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
      assert.ok(generated.includes("--vt-studio-" + tier + "-" + cssKey + ": " + value + "px;"), tier + "." + key + " generated variable");
    }
    assert.ok(system.includes('data-size="' + tier + '"'), tier + " is consumed by the system stylesheet");
    assert.ok(system.includes("--vt-studio-control-focus-outline-width: var(--vt-studio-" + tier + "-focus-outline-width"));
    assert.ok(system.includes("--vt-studio-control-secondary-outline-width: var(--vt-studio-" + tier + "-secondary-outline-width"));
    if (tier === "micro") {
      assert.ok(componentGridCss.includes("--vt-studio-micro-stroke, 1px"));
      assert.ok(componentGridCss.includes("--vt-studio-micro-radius, 2px"));
    }
  }
});

test("component-level size documentation agrees with canonical Supreme and Mini typography", () => {
  assert.ok(controls.includes("supreme 60px / 3px border / 6px radius / 52px type and icon"));
  assert.ok(controls.includes("mini 20px / 1.5px border / 3px radius / 17.5px type and icon"));
});

test("outline stroke derives from the current tier and focus outlines use the 65-percent tier tokens", () => {
  assert.ok(system.includes("--vt-studio-control-outline-stroke: calc(var(--vt-studio-control-stroke, 3px) * 0.5)"));
  assert.ok(!system.includes("--vt-studio-control-focus-outline-width: 1.3px"));
  assert.ok(!system.includes("--vt-studio-control-focus-outline-width: 1.95px"));
});

test("fields own the persistent primary inline stroke and text boxes own a permanent secondary outline", () => {
  assert.ok(system.includes("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke"));
  assert.ok(fields.includes("outline: var(--vt-field-focus-outline"));
  assert.ok(system.includes(".vt-studio-text-box[data-vt-studio-control=\"true\"]"));
  assert.ok(system.includes("outline: calc(var(--vt-studio-control-stroke, 3px) * var(--vt-studio-focus-outline-width-ratio, .65))"));
  assert.ok(fields.includes("-webkit-text-stroke-color: #000"));
  assert.ok(!recovery.includes("input[data-vt-studio-control=\"true\"]:not(.vt-studio-split-text-input__field)"));
  assert.ok(!recovery.includes(".vt-studio-text-box, [data-vt-studio-field-kind=\"text-box\"]"));
});

test("editable inputs and textareas switch text fill and glyph stroke together on focus", () => {
  const start = fields.indexOf("Focused entered text is black");
  const end = fields.indexOf("\n}\n", start);
  assert.ok(start >= 0 && end > start, "shared editable-field focus rule must exist");
  const focusRule = fields.slice(start, end);
  assert.ok(focusRule.includes("color: #000;"));
  assert.ok(focusRule.includes("-webkit-text-fill-color: #000;"));
  assert.ok(focusRule.includes("-webkit-text-stroke-color: #000;"));
  assert.ok(fields.includes("-webkit-text-stroke-color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out"));
  assert.ok(fields.includes("color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out"));
  assert.ok(fields.includes('[data-size="mini"]'));
  assert.ok(fields.includes("--vt-studio-textarea-mini-font-size, 17.5px"));
  assert.ok(system.includes("--vt-field-text-stroke-focus: #000;"));
  assert.ok(standaloneInputCss.includes("-webkit-text-stroke-color: #000;"));
  assert.ok(!standaloneInputCss.includes("-webkit-text-stroke-color: var(--vt-studio-control-accent, var(--pair-a, #36e0f6));"));
  assert.ok(!fields.includes("Simple input is the intentional exception"));
  assert.ok(!fields.includes("vt-studio-text-input--simple[data-vt-studio-control"));
  assert.ok(system.includes(".vt-studio-text-box"));
  assert.ok(system.includes("var(--vt-field-primary"));
  assert.ok(fields.includes("data-vt-studio-field-kind"));
  assert.ok(system.includes("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-field-primary"));
  assert.ok(system.includes("-webkit-text-stroke-color: var(--vt-field-primary"));
  assert.ok(fields.includes('textarea[data-vt-studio-control="true"][data-vt-studio-field-kind="textarea"],'));
});

test("counter, slider and value-toggle families inherit the global full-row width", () => {
  assert.match(system, /\.vt-studio-counter,[\s\S]{0,180}width:\s*100%/);
  assert.match(split, /\.vt-studio-double-split-slider\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(split, /--vt-studio-counter-root-width/);
  assert.doesNotMatch(system, /\.vt-studio-counter,[\s\S]{0,240}width:\s*max-content/);
  assert.match(valueToggleCss, /\.vt-studio-value-toggle\s*\{[\s\S]*?width:\s*100%/);
  assert.doesNotMatch(distill, /\.vt-studio-(?:counter|side-counter|left-counter|double-split-slider|value-toggle)[^{]*\{[^}]*width:\s*(?:max-content|fit-content)/s);
  assert.match(system, /\.vt-studio-44-word-toggle[^}]*width:\s*max-content/);
  assert.ok(system.includes(".vt-studio-vertical-word-toggle"));
});

test("bar-toggle bars use the restored standard-height ratio", () => {
  assert.match(distill, /\.vt-studio-value-toggle__bar,[\s\S]*?height:\s*65%/);
  assert.match(valueToggleCss, /\.vt-studio-value-toggle__bar[^}]*height:\s*65%/);
});

test("side-toggle arrow buttons occupy equal grid rows and labels are vertically centered", () => {
  assert.match(sideRailCss, /grid-template-rows:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(sideRailCss, /\.vt-studio-side-counter__actions\s*>\s*button,[\s\S]*?height:\s*auto/s);
  assert.match(valueToggleCss, /\.vt-studio-value-toggle--side \.vt-studio-value-toggle__face\s*\{[^}]*place-items:\s*center/s);
});

test("split-left and double-split badge shells reserve and display every icon rail", () => {
  assert.match(recovery, /\.vt-studio-split-shell\.vt-studio-split-left-badge\[data-vt-studio-split="left"\][\s\S]*?grid-template-columns:[^;]*minmax\(0, 1fr\)/);
  assert.match(recovery, /\.vt-studio-split-shell\.vt-studio-double-split-badge\[data-vt-studio-split="double"\][\s\S]*?grid-template-columns:[^;]*minmax\(0, 1fr\)[^;]*var\(--vt-studio-control-height/);
  assert.match(split, /\.vt-studio-split-left-badge__rail[\s\S]*?display:\s*flex/);
  assert.match(split, /\.vt-studio-double-split-badge__rail[\s\S]*?display:\s*flex/);
});

test("switch, radio and checkbox faces scale from standard-size proportions", () => {
  assert.match(recovery, /button\[data-vt-studio-control="true"\]\.vt-studio-44-switch\s*\{[^}]*width:\s*calc\(var\(--vt-studio-control-height[^;]*1\.72/s);
  assert.match(recovery, /button\[data-vt-studio-control="true"\]\.vt-studio-44-switch\s*\{[^}]*background:\s*color-mix/s);
  assert.match(recovery, /button\[data-vt-studio-control="true"\]\.vt-studio-44-choice\s*\{[^}]*background:\s*color-mix/s);
  assert.match(recovery, /button\[data-vt-studio-control="true"\]\.vt-studio-44-choice\s*\{[^}]*width:\s*var\(--vt-studio-control-height/s);
  assert.match(recovery, /\.vt-studio-44-handle[^}]*width:\s*calc\(var\(--vt-studio-control-height/s);
});

test("side-counter and side-toggle rails share square geometry and generated size/icon tokens", () => {
  assert.ok(!sideRailCss.includes(":root {"));
  assert.ok(sideRailCss.includes("width: var(--vt-studio-control-height, 44px)"));
  assert.ok(sideRailCss.includes("min-width: var(--vt-studio-control-height, 44px)"));
  assert.ok(sideRailCss.includes("stroke-width: var(--vt-studio-control-icon-stroke"));
  assert.ok(!sideRailCss.includes("--vt-studio-micro-stroke: 1.5px"));
  assert.ok(!sideRailCss.includes("stroke-width: 3;"));
  assert.ok(!sideRailCss.includes("height: 1.5px;"));
});

test("vertical word-toggle handles use measured word bounds and match horizontal handle spacing", () => {
  assert.ok(controls.includes("return { top: wordRect.top - rootRect.top - root.clientTop, height: wordRect.height }"));
  assert.match(system, /left: var\(--vt-studio-vertical-word-handle-inset\);\s*right: var\(--vt-studio-vertical-word-handle-inset\);/);
  assert.ok(system.includes("border-radius: calc(var(--vt-studio-vertical-word-radius) * .5);"));
  assert.ok(!recovery.includes("vt-studio-vertical-word-toggle__handle { inset: 3px !important"));
});


test("side and double-side toggle rail buttons reuse the side-counter action system", () => {
  const side = valueToggles.slice(valueToggles.indexOf("export function StudioSideToggle"), valueToggles.indexOf("export function StudioDoubleSideToggle"));
  assert.ok(side.includes("vt-studio-side-counter__actions"));
  assert.ok(side.includes("vt-studio-side-counter__action-button"));
  assert.doesNotMatch(distill, /\.vt-studio-value-toggle__arrow-stack/);
  assert.doesNotMatch(valueToggleCss, /\.vt-studio-value-toggle__arrow-stack/);
  assert.ok(system.includes(".vt-studio-side-counter__actions button"));
});

test("bar toggle bars stay below the control height and double-split word labels are vertically centered", () => {
  assert.match(valueToggleCss, /\.vt-studio-value-toggle__bar\s*\{[^}]*height:\s*50%/s);
  assert.match(distill, /\.vt-studio-value-toggle__bar,[\s\S]*?height:\s*50%/);
  assert.doesNotMatch(distill, /\.vt-studio-value-toggle__bar,[\s\S]*?height:\s*var\(--vt-bar-height\)/);
  assert.match(system, /button\[data-vt-studio-play-pause="true"\]\[aria-pressed="true"\] \[data-vt-studio-split-rail\]\[data-rail="start"\][\s\S]*?background-color:\s*var\(--vt-studio-control-primary/);
  assert.match(valueToggleCss, /\.vt-studio-word-counter__value[^}]*place-items:\s*center/s);
});

test("primary inset field stroke survives the complete stylesheet cascade for inputs and textareas", () => {
  const entry = read("src/styles/studio-control-entry.css");
  const inputStyles = read("src/styles/studio-text-input.css");
  const fieldStyles = read("src/styles/studio-control-fields.css");
  assert.ok(entry.lastIndexOf('@import "./studio-text-input.css";') > entry.lastIndexOf('@import "./studio-control-word-counter.css";'));
  assert.match(inputStyles, /html body :is\(input\.vt-studio-text-input,[\s\S]*?box-shadow:\s*inset 0 0 0 var\(--vt-field-inline-width\) var\(--vt-field-inline-primary\)/);
  assert.doesNotMatch(fieldStyles, /box-shadow:\s*none/);
  assert.match(inputStyles, /textarea\[data-vt-studio-control="true"\]/);
});

test("double-side toggles reuse the same side-arrow controls and only the outer shell owns focus outline", () => {
  const start = valueToggles.indexOf("export function StudioDoubleSideToggle");
  const end = valueToggles.indexOf("export type StudioBarToggleProps", start);
  const doubleSide = valueToggles.slice(start, end);
  assert.ok(doubleSide.includes("<StudioSideToggle"));
  assert.ok(doubleSide.includes("arrowSide=\"left\""));
  assert.ok(doubleSide.includes("arrowSide=\"right\""));
  assert.match(valueToggleCss, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle__divider\s*\{[^}]*outline:\s*none;[^}]*box-shadow:\s*none;/);
  assert.ok(valueToggleCss.includes(".vt-studio-value-toggle--double:focus-within"));
  assert.ok(!recovery.includes(".vt-studio-value-toggle--double:focus-within"));
  assert.ok(!recovery.includes(".vt-studio-value-toggle--double .vt-studio-value-toggle__divider"));
});

test("split badge labels share the full outer-shell center axis without affecting editable split inputs", () => {
  const start = system.indexOf("/* Split badge labels center against the complete outer shell");
  assert.ok(start >= 0, "outer-shell centering contract must be documented in the system stylesheet");
  const block = system.slice(start);
  assert.ok(block.includes("position: absolute;"));
  assert.ok(block.includes("inset: 0;"));
  assert.ok(block.includes("justify-content: center;"));
  assert.ok(block.includes("margin-left: auto;"));
  assert.ok(block.includes(":not(.vt-studio-split-text-input"));
});

test("split input rails use full control-height tracks and recovery CSS cannot shrink split rails", () => {
  assert.ok(splitInputCss.includes("grid-template-columns: var(--vt-studio-control-height, 44px)"));
  assert.ok(splitInputCss.includes("var(--vt-studio-control-secondary"));
  assert.ok(split.includes("grid-template-columns: auto minmax(0, 1fr)"));
  assert.ok(split.includes("grid-template-columns: minmax(0, 1fr) auto"));
  assert.ok(split.includes("width: var(--vt-studio-control-height, 44px)"));
  assert.ok(!split.includes("--vt-studio-split-rail-size"));
  assert.ok(!recovery.includes("--vt-studio-split-rail-size"));
});

test("split text input accepts every canonical size supported by its production badge foundation", () => {
  assert.ok(splitInput.includes('import type { StudioControlSize } from "../tokens"'));
  assert.ok(splitInput.includes("sizeVariant?: StudioControlSize"));
  assert.ok(splitInput.includes("./studio-split-text-input.css"));
  assert.ok(!splitInput.includes('sizeVariant?: "standard" | "compact"'));
  assert.ok(splitInputCss.includes("height: var(--vt-studio-control-height, 44px)"));
  assert.ok(splitInputCss.includes("grid-template-columns: var(--vt-studio-control-height, 44px)"));
  assert.ok(splitInputCss.includes("width: 100%"));
});


test("vertical word-toggle handle retains measured word bounds and shared side insets", () => {
  assert.ok(system.includes("top: var(--vt-studio-vertical-word-padding)"));
  assert.match(system, /left: var\(--vt-studio-vertical-word-handle-inset\);\s*right: var\(--vt-studio-vertical-word-handle-inset\);/);
  assert.ok(!system.includes("inset:3px;border-radius:calc(var(--vt-studio-control-radius) - 1px)"));
  assert.ok(!recovery.includes("inset: 3px !important"));
});

test("counter and bar family geometry comes from canonical family tokens and the system stylesheet", () => {
  assert.ok(tokens.includes("valueAreaAspectRatio: 2"));
  assert.ok(tokens.includes("doubleSplitRailCount: 2"));
  assert.ok(tokens.includes("sideRailCount: 1"));
  assert.ok(tokens.includes("heightToTextRatio: 1"));
  assert.ok(tokens.includes("heightToWidthRatio: 2.5"));
  assert.ok(generated.includes("--vt-studio-counter-value-area-aspect-ratio: 2 / 1;"));
  assert.ok(generated.includes("--vt-studio-counter-double-rail-count: 2;"));
  assert.ok(generated.includes("--vt-studio-counter-side-rail-count: 1;"));
  assert.ok(generated.includes("--vt-studio-bar-height-to-text-ratio: 1;"));
  assert.ok(generated.includes("--vt-studio-bar-height-to-width-ratio: 2.5;"));
  assert.ok(split.includes("var(--vt-studio-counter-value-area-aspect-ratio"));
  assert.ok(split.includes("var(--vt-studio-counter-double-rail-count"));
  assert.ok(split.includes("var(--vt-studio-counter-side-rail-count"));
  assert.ok(split.includes("width: var(--vt-studio-counter-root-width)"));
  assert.ok(catalogCss.includes(":not(.vt-studio-counter):not(.vt-studio-side-counter):not(.vt-studio-left-counter)"));
  assert.ok(catalogCss.includes("justify-self: center;"));
  assert.ok(distill.includes("--vt-bar-height:"));
  assert.ok(distill.includes("--vt-bar-gap:"));
  assert.ok(valueToggleCss.includes('.vt-studio-value-toggle__bar[data-active="true"]'));
  assert.ok(valueToggleCss.includes("background: var(--vt-studio-control-secondary"));
  assert.ok(split.includes("flex: 0 0 var(--vt-studio-control-height, 44px)"));
  assert.ok(split.includes("width: var(--vt-studio-control-height, 44px)"));
  assert.ok(split.includes("height: 100%"));
  assert.ok(system.includes(".vt-studio-side-counter__value"));
  assert.ok(!recovery.includes(".vt-studio-value-toggle__bar {"));
  assert.ok(tokens.includes("micro: { height: 12, stroke: 1, radius: 2"));
  assert.ok(generated.includes("--vt-studio-micro-stroke: 1px;"));
  assert.ok(generated.includes("--vt-studio-micro-radius: 2px;"));
});

test("double-side controls focus only the outside shell, never the center divider", () => {
  assert.ok(valueToggleCss.includes(".vt-studio-value-toggle--double .vt-studio-value-toggle__divider"));
  assert.ok(valueToggleCss.includes("outline: none;"));
  assert.ok(valueToggleCss.includes(".vt-studio-value-toggle--double:focus-within"));
});

test("inter-module rails use the inner square size, not the full outer face", () => {
  assert.ok(system.includes("var(--vt-im-rail, calc(var(--vt-im-face, var(--vt-studio-control-height, 44px)) - 2 * var(--vt-im-stroke, var(--vt-studio-control-stroke, 3px))))"));
  assert.ok(system.includes("aspect-ratio: 1 / 1"));
  assert.ok(!system.includes("width: var(--vt-im-face, var(--vt-studio-control-height, 44px)) !important"));
  assert.ok(!recovery.includes(".vt-studio-inter-module__rail { width: var(--vt-im-face"));
  assert.ok(!distill.includes("flex: 0 0 var(--vt-studio-control-height, 44px) !important"));
  assert.ok(!distill.includes("Top-split head columns: rail column = full control height"));
  assert.ok(!distill.includes("width: var(--vt-im-face, 44px) !important"));
});

test("inter-modules are full-width and the representative section is a single full-width column", () => {
  assert.ok(recovery.includes(".vt-studio-inter-module { width: 100% !important; max-width: 100% !important;"));
  assert.ok(catalogCss.includes('[data-vt-primitive-title*="Representatives"]'));
  assert.ok(catalogCss.includes("grid-template-columns: minmax(0, 1fr)"));
});

test("retired search/select/chat-action/design-compilation items stay out of the Confirmed Library and public barrel", () => {
  for (const retired of ["StudioSearchInput", "StudioSelectStandard", "StudioChatActionGroup", "Chat Action Group", "Select Standard", "Designs Compilations"]) {
    assert.ok(!catalog.includes(retired), retired + " must not return to the Confirmed Library");
    assert.ok(!publicIndex.includes(retired), retired + " must not return to the public Studio barrel");
  }
});

test("every primitive named by the full-width representatives has a real catalog specimen", () => {
  const representativeList = catalog.match(/primitive="(StudioButton · StudioSplitLeftButton[^"]+)"/)?.[1];
  assert.ok(representativeList, "canonical representatives inventory must exist");
  const specimenNames = new Set([...catalog.matchAll(/data-vt-library-component="([^"]+)"/g)].map((match) => match[1]));
  for (const primitive of representativeList.split(" · ")) {
    assert.ok(specimenNames.has(primitive), primitive + " must have a real catalog specimen");
  }
});

test("side counter is a separate family module, not nested in the counter family", () => {
  const counterStart = catalog.indexOf("const ConfirmedStudioCounterFamily");
  const sideCounterStart = catalog.indexOf("const ConfirmedStudioSideCounterFamily");
  assert.ok(counterStart >= 0 && sideCounterStart > counterStart);
  const counterFamilySource = catalog.slice(counterStart, sideCounterStart);
  assert.ok(!counterFamilySource.includes("<ConfirmedStudioSideCounterFamily"));
  assert.ok(catalog.includes("<ConfirmedStudioCounterFamily />"));
  assert.ok(catalog.includes("<ConfirmedStudioSideCounterFamily />"));
});

test("Confirmed Library keeps the split text input in the canonical Text Fields family", () => {
  assert.ok(catalog.includes("StudioSplitTextInput"));
  assert.ok(catalog.includes("Text Fields"));
  assert.ok(catalogCss.includes('[data-vt-primitive-title*="Representatives"]'));
  assert.ok(catalogCss.includes("grid-template-columns: minmax(0, 1fr)"));
  assert.ok(catalog.includes("<ConfirmedStudioCounterFamily />"));
  assert.ok(catalog.includes("<ConfirmedStudioSideCounterFamily />"));
});
