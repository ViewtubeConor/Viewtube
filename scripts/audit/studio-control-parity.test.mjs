import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/studio-control-system.css", "utf8");
const toggleCss = readFileSync("src/styles/studio-control-value-toggles.css", "utf8");
const sideRailCss = readFileSync("src/styles/studio-side-rail-unify.css", "utf8");
const toggles = readFileSync("src/studio-ui/primitives/StudioValueToggles.tsx", "utf8");
const area = readFileSync("src/studio-ui/primitives/StudioTextArea.tsx", "utf8");
const fields = readFileSync("src/styles/studio-control-fields.css", "utf8");
const overrides = readFileSync("src/styles/studio-control-distill-overrides.css", "utf8");
const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
const catalog = readFileSync("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx", "utf8");
const tokens = readFileSync("src/studio-ui/tokens.ts", "utf8");
const generated = readFileSync("src/styles/studio-control-vars.generated.css", "utf8");
const core = readFileSync("src/styles/studio-control-core.css", "utf8");


test("canonical size tokens preserve the five-tier geometry contract", () => {
  const tiers = {
    supreme: { height: 60, stroke: 3, radius: 6, fontSize: 52, iconSize: 52, focusOutlineWidth: 1.95 },
    standard: { height: 44, stroke: 3, radius: 6, fontSize: 38, iconSize: 38, focusOutlineWidth: 1.95 },
    compact: { height: 28, stroke: 2, radius: 4, fontSize: 24, iconSize: 24, focusOutlineWidth: 1.3 },
    mini: { height: 20, stroke: 1.5, radius: 3, fontSize: 17.5, iconSize: 17.5, focusOutlineWidth: 0.975 },
    micro: { height: 12, stroke: 1, radius: 2, fontSize: 10, iconSize: 10, focusOutlineWidth: 0.65 },
  };
  for (const [tier, values] of Object.entries(tiers)) {
    const match = tokens.match(new RegExp(tier + ":\\s*\\{([^}]+)\\}"));
    assert.ok(match, "missing canonical " + tier + " token");
    for (const [key, value] of Object.entries(values)) {
      assert.match(match[1], new RegExp(key + ":\\s*" + String(value).replace(".", "[.]") + "(?:,|\\s)"), tier + "." + key);
      assert.match(generated, new RegExp("--vt-studio-" + tier + "-" + key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()) + ":\\s*" + value + "(?:px)?;"), tier + "." + key + " generated variable");
    }
  }
  assert.match(tokens, /letterSpacing:\s*-0\.02/);
});

test("side-toggle stack uses a centered overlay divider, not a half-cell border", () => {
  assert.match(sideRailCss, /\.vt-studio-value-toggle__arrow-stack::after[\s\S]*?top:\s*50%[\s\S]*?translateY\(-50%\)/);
  assert.match(toggleCss, /\.vt-studio-split-shell\.vt-studio-value-toggle > \[data-vt-studio-split-rail\] \.vt-studio-value-toggle__arrow[\s\S]*?border:\s*0/);
  assert.match(toggles, /export function StudioSideToggle/);
});

test("toggle chevrons use control-height proportional icon sizing", () => {
  assert.match(toggleCss, /--vt-studio-stepper-icon-size:\s*calc\(var\(--vt-studio-control-height, 44px\) \* \.82\)/);
  assert.match(sideRailCss, /width:\s*min\(calc\(var\(--vt-studio-control-height, 44px\) \* 0\.62\), 100%\)/);
  assert.match(sideRailCss, /stroke-width:\s*var\(--vt-studio-control-icon-stroke, 2\.5\)/);
});

test("textarea focus uses primary 15-percent fill and secondary proportional outline", () => {
  assert.match(css, /data-vt-studio-field-kind="textarea"\]:is\(:focus, :focus-visible\)[\s\S]*?15%[\s\S]*?color:\s*#000[\s\S]*?calc\(var\(--vt-studio-control-stroke, 3px\) \* \.65\)[\s\S]*?var\(--vt-studio-control-secondary/);
  assert.match(area, /data-vt-studio-field-kind="textarea"/);
});

test("single-line panels clip overflow without ellipses and exclude textareas", () => {
  assert.match(css, /\[data-vt-studio-control\]:not\(input\):not\(textarea\):not\(select\)/);
  assert.match(css, /text-overflow:\s*clip/);
  assert.doesNotMatch(css, /textarea\s*\{[^}]*text-overflow:\s*clip/s);
});

test("value-toggle family keeps focus transitions without adding click-growth motion", () => {
  assert.match(toggleCss, /\.vt-studio-value-toggle:focus-within/);
  assert.doesNotMatch(toggleCss, /\.vt-studio-value-toggle__arrow:active svg/);
});


test("input and textarea focus use black text/glyph stroke and retain the primary caret", () => {
  assert.match(css, /--vt-field-text-stroke-focus:\s*#000/);
  assert.match(css, /--vt-field-caret-focus:\s*var\(--vt-field-primary\)/);
  assert.match(fields, /input\[data-vt-studio-control="true"\][\s\S]*?:focus[\s\S]*?-webkit-text-stroke-color:\s*var\(--vt-field-text-stroke-focus/);
  assert.match(fields, /textarea\[data-vt-studio-control="true"\][\s\S]*?:focus[\s\S]*?-webkit-text-stroke-color:\s*var\(--vt-field-text-stroke-focus/);
  // A read-only StudioTextBox has its own display-copy focus rule; do not
  // confuse that rule with the editable input/textarea focus contract.
  const editableFocusRules = fields
    .split("}")
    .filter((rule) => /(?:input|textarea)\[data-vt-studio-control="true"\]/.test(rule) && /:focus/.test(rule))
    .join("}");
  assert.ok(editableFocusRules.length > 0, "editable field focus rules must be present");
  assert.match(editableFocusRules, /-webkit-text-stroke-color:\s*var\(--vt-field-text-stroke-focus\)/);
});

test("floating-label risen typography uses one shared token pair while rest labels retain field-size tokens", () => {
  assert.match(css, /--vt-studio-floating-label-risen-font-size:\s*12px/);
  assert.match(css, /--vt-studio-floating-label-risen-text-stroke:\s*0\.5px/);
  assert.match(css, /font-size:\s*var\(--vt-studio-floating-label-risen-font-size, 12px\) !important/);
  assert.match(css, /-webkit-text-stroke-width:\s*var\(--vt-studio-floating-label-risen-text-stroke, 0\.5px\) !important/);
  assert.match(fields, /textarea\[data-size="compact"\] \+ \.vt-studio-floating-field-label[\s\S]*?vt-studio-textarea-compact-font-size/);
  assert.match(fields, /input\[data-size="compact"\] \+ \.vt-studio-floating-field-label[\s\S]*?vt-studio-28-font-size/);
  assert.doesNotMatch(css, /\.vt-studio-floating-field[^{}]*:focus[^{}]*\{[^}]*font-size:\s*18px/);
});

test("double-side divider is centered and the confirmed catalog mixes compact and standard variants", () => {
  assert.match(toggleCss, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle__divider\s*\{[^}]*left:\s*50%;[^}]*translateX\(-50%\)/s);
  assert.match(catalog, /sizeVariant=\{tier\}/);
});

test("bar toggle uses adaptive width counts, proportional fill, and size-specific borderless bars", () => {
  assert.match(toggles, /function barCountFromWidth\(widthPx: number, size: string\)/);
  assert.match(toggles, /barCountFromWidth\(width, size\)/);
  assert.match(toggles, /Math\.floor\(\(inner \+ metrics\.gap\) \/ \(metrics\.bar \+ metrics\.gap\)\)/);
  assert.match(toggles, /Math\.max\(4, Math\.min\(40, count \|\| 4\)\)/);
  assert.match(toggles, /Math\.round\(\(Math\.max\(0, Math\.min\(100, value\)\) \/ 100\) \* barCount\)/);
  assert.match(toggles, /setPointerCapture\?\.\(event\.pointerId\)/);
  assert.match(toggles, /onPointerUp=\{stopRepeat\}[\s\S]*?onPointerCancel=\{stopRepeat\}[\s\S]*?onLostPointerCapture=\{stopRepeat\}/);
  assert.match(overrides, /--vt-bar-width:\s*calc\(var\(--vt-bar-height\) \* 0\.4\)/);
  assert.match(overrides, /--vt-bar-gap:\s*3px/);
  assert.match(overrides, /border:\s*0\s*!important/);
  assert.match(overrides, /background:\s*color-mix\(in srgb, #fff 50%, var\(--vt-studio-control-accent[^)]*\)\) 50%\)\s*!important/);
  assert.match(overrides, /\.vt-studio-value-toggle__bar\[data-active="true"\][\s\S]*?background:\s*#000/);
});

test("multi-select closed trigger renders a separate black count badge inside trigger text", () => {
  assert.match(controls, /const extra = selectedLabels.length - 1/);
  assert.match(controls, /className="vt-studio-legend-trigger-text"[\s\S]*?vt-studio-legend-count-badge/);
  assert.doesNotMatch(controls, /\$\{selectedLabels\[0\]\} \+\$\{selectedLabels\.length - 1\}/);
});

test("the five-tier size contract is complete and generated CSS stays in parity", () => {
  for (const [tier, height, font, icon] of [
    ["supreme", 60, 52, 52],
    ["standard", 44, 38, 38],
    ["compact", 28, 24, 24],
    ["mini", 20, 17.5, 17.5],
    ["micro", 12, 10, 10],
  ]) {
    assert.match(tokens, new RegExp(`${tier}:\\s*\\{[\\s\\S]*?height:\\s*${height}\\b[\\s\\S]*?fontSize:\\s*${font}\\b[\\s\\S]*?iconSize:\\s*${icon}\\b`), `${tier} tokens must remain canonical`);
    assert.match(generated, new RegExp(`--vt-studio-${tier}-height:\\s*${height}px`), `${tier} height must be emitted`);
    assert.match(generated, new RegExp(`--vt-studio-${tier}-font-size:\\s*${font}px`), `${tier} font size must be emitted`);
    assert.match(generated, new RegExp(`--vt-studio-${tier}-icon-size:\\s*${icon}px`), `${tier} icon size must be emitted`);
    assert.match(css, new RegExp(`data-size="${tier}"[\\s\\S]*?--vt-studio-control-height:[^;]*`), `${tier} must resolve to canonical system control geometry`);
  }
});

test("bar toggle bars follow their size's text height and a 2.5:1 height-to-width ratio", () => {
  assert.match(overrides, /--vt-bar-height:\s*var\(--vt-studio-control-font-size/);
  assert.match(overrides, /aspect-ratio:\s*2\s*\/\s*5/);
  assert.match(overrides, /border-radius:\s*var\(--vt-bar-radius/);
  assert.match(overrides, /background:\s*color-mix\(in srgb, #fff 50%, var\(--vt-studio-control-accent[^)]*\)\) 50%\)\s*!important/);
  assert.match(overrides, /data-active="true"[\s\S]*?background:\s*#000/);
});

test("top direct-representative module covers the full explicitly exported control inventory", () => {
  const start = catalog.indexOf("const ConfirmedDirectPrimitiveRows");
  const end = catalog.indexOf("const ConfirmedStudioCounterFamily");
  assert.ok(start >= 0 && end > start, "representative module boundaries must remain explicit");
  const representative = catalog.slice(start, end);
  for (const primitive of [
    "StudioButton", "StudioTwoLineButton", "StudioSplitTwoLineButton", "StudioActionButton",
    "StudioIconButton", "StudioSquareIconButton", "StudioSquareIconButtonGroup", "StudioCircleIconButton",
    "StudioSplitLeftButton", "StudioSplitRightButton", "StudioDoubleSplitButton",
    "StudioPlayPauseButton", "StudioSwitch", "StudioChoice", "StudioRadio", "StudioCheckbox", "StudioXCheckbox",
    "StudioNumberInput", "StudioTextInput", "StudioTextArea", "StudioTextBox", "StudioSplitTextInput",
    "StudioDropdown", "StudioLegendMultiDropdown", "StudioSplitLeftDropdown",
    "StudioArrowToggle", "StudioBarToggle", "StudioWordToggle", "StudioVerticalWordToggle",
    "StudioSideToggle", "StudioDoubleSideToggle", "StudioCounter", "StudioSideCounter", "StudioLeftCounter",
    "StudioDoubleSplitSlider", "StudioSplitLeftBadge", "StudioSplitRightBadge", "StudioDoubleSplitBadge",
    "StudioSpectrumTag", "StudioCloseableBadge", "StudioBrainStatusBadge", "StudioTagEditor", "StudioUploadFrame",
  ]) {
    assert.match(representative, new RegExp(`data-vt-library-component="${primitive}"`), `${primitive} needs a direct top-module specimen`);
  }
});


test("size-tier ownership is centralized and Micro follows its own canonical token contract", () => {
  const recovery = readFileSync("src/styles/studio-control-recovery-overrides.css", "utf8");
  assert.match(tokens, /micro: \{[^}]*letterSpacing: -0\.02/);
  assert.match(css, /data-size="supreme"[\s\S]*?supreme-stroke, 3px[\s\S]*?supreme-radius, 6px/);
  assert.match(css, /data-size="micro"[\s\S]*?micro-stroke, 1px[\s\S]*?micro-radius, 2px[\s\S]*?micro-text-stroke, 0\.4px/);
  assert.match(css, /data-size="micro"[\s\S]*?vt-studio-mini-focus-outline-width, 0\.975px/);
  assert.doesNotMatch(css, /\.vt-studio-value-toggle\[data-size="micro"\] \{[^}]*border-width: 1px|\.vt-studio-value-toggle--double\[data-size="micro"\] \{[^}]*control-stroke: 1px/);
  assert.doesNotMatch(core, /data-size="(?:supreme|standard|compact|mini|micro)"\s*\{/);
  assert.doesNotMatch(recovery, /\[data-vt-studio-control\]\[data-size="(?:supreme|standard|compact|mini|micro)"\]\s*\{/);
  assert.doesNotMatch(recovery, /\.vt-studio-split-text-input(?:__field)?\s*\{/);
  assert.match(generated, /--vt-studio-mini-font-size: 17\.5px/);
  assert.match(generated, /--vt-studio-mini-icon-size: 17\.5px/);
  assert.match(generated, /--vt-studio-textarea-mini-font-size: 17\.5px/);
  const focusRatio = Number(tokens.match(/focusOutlineWidthRatio:\s*([\d.]+)/)?.[1]);
  assert.equal(focusRatio, 0.65, "focus outline ratio remains canonical");
  assert.match(generated, new RegExp("--vt-studio-focus-outline-width-ratio: " + focusRatio + ";"));
  assert.match(generated, new RegExp("--vt-studio-secondary-focus-width-ratio: " + focusRatio + ";"));
  for (const [tier, stroke] of Object.entries({ supreme: 3, standard: 3, compact: 2, mini: 1.5, micro: 1 })) {
    const outline = Number(tokens.match(new RegExp(tier + ":\\s*\\{[^}]*focusOutlineWidth:\\s*([\\d.]+)"))?.[1]);
    assert.ok(Math.abs(outline - stroke * focusRatio) < 1e-9, tier + " focus outline must derive from the tier stroke");
    assert.match(generated, new RegExp("--vt-studio-" + tier + "-secondary-outline-width: " + outline + "px;"));
  }
});
