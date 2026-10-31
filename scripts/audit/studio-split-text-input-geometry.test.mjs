import test from "node:test";
import postcss from "postcss";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const splitCss = readFileSync("src/studio-ui/primitives/studio-split-text-input.css", "utf8");
const splitComponent = readFileSync("src/studio-ui/primitives/StudioSplitTextInput.tsx", "utf8");
const interCss = readFileSync("src/styles/studio-inter-module.css", "utf8");

test("split text input styles target the actual rendered shell, rails, and editable field", () => {
  assert.match(splitCss, /html body \.vt-studio-split-text-input\s*\{/);
  assert.match(splitCss, /\.vt-studio-split-text-input \[data-vt-studio-split-rail\]/);
  assert.match(splitCss, /\.vt-studio-split-text-input input\.vt-studio-text-input\[data-vt-studio-control="true"\]/);
  assert.match(splitComponent, /<StudioTextInput[\s\S]*?className=\{inputClassName\}/);
  assert.match(splitComponent, /data-split=\{split\}/);
  assert.match(splitCss, /\[data-vt-studio-split-label\]/);
});

test("split input matches the Codex native-editing and single-shell focus contract", () => {
  assert.equal((splitCss.match(/html body \.vt-studio-split-text-input input\.vt-studio-text-input\[data-vt-studio-control="true"\]\[data-size\]\s*\{/g) || []).length, 1);
  assert.match(splitCss, /border:\s*var\(--vt-studio-control-stroke, 3px\) solid var\(--vt-split-field-primary\) !important/);
  assert.match(splitCss, /background:\s*color-mix\(in srgb, var\(--vt-split-field-primary\) 50%, transparent\) !important/);
  assert.match(splitCss, /:is\(:focus, :focus-visible\)[\s\S]*?15%, transparent\)[\s\S]*?-webkit-text-stroke-color:\s*#000/);
  assert.match(splitCss, /\.vt-studio-split-text-input:focus-within[\s\S]*?outline:\s*calc\(var\(--vt-studio-control-stroke, 3px\) \* \.65\) solid var\(--vt-studio-control-secondary/);
  assert.match(splitCss, /\[data-vt-studio-split-rail\]\s*\{[^}]*width:\s*calc\(var\(--vt-studio-control-height\) - var\(--vt-studio-control-stroke\)\)/s);
  assert.match(splitCss, /caret-color:\s*var\(--vt-split-field-primary\)/);
  assert.doesNotMatch(splitComponent, /geometryVariant|data-geometry-variant/);
});

test("split input descendants remain pointer-interactive and retain the primary inset stroke", () => {
  assert.ok(splitCss.includes("pointer-events: none"));
  assert.ok(splitCss.includes("pointer-events: auto"));
  assert.match(splitCss, /border:\\s*var\\(--vt-studio-control-stroke, 3px\\) solid var\\(--vt-split-field-primary\\)/);
  assert.ok(splitCss.includes("box-shadow: none;"));
});

test("all editable fields receive a primary inset stroke and textarea focus outline", () => {
  const textCss = readFileSync("src/styles/studio-text-input.css", "utf8");
  const fieldCss = readFileSync("src/styles/studio-control-fields.css", "utf8");
  const entryCss = readFileSync("src/styles/studio-control-entry.css", "utf8");
  const distillCss = readFileSync("src/styles/studio-control-distill-overrides.css", "utf8");
  assert.match(textCss, /textarea\[data-vt-studio-control="true"\]/);
  assert.match(textCss, /box-shadow:\s*inset 0 0 0 var\(--vt-field-inline-width\) var\(--vt-field-inline-primary\)/);
  assert.match(fieldCss, /textarea\[data-vt-studio-control="true"\]:is\(:focus, :focus-visible\)/);
  assert.match(fieldCss, /outline:\s*var\(--vt-studio-focus-outline-width[\s\S]*?var\(--vt-studio-focus-outline-color/);
  assert.ok(entryCss.indexOf('@import "./studio-control-fields.css";') < entryCss.indexOf('@import "./studio-text-input.css";'));
  assert.doesNotMatch(distillCss, /html body (?:input|textarea)\[data-vt-studio-control="true"\]/);
  assert.doesNotMatch(distillCss, /html body \[data-vt-studio-control="true"\] textarea/);
});

test("intermodule sizing uses canonical supreme tokens and focus outline follows stroke ratio", () => {
  assert.match(interCss, /--vt-im-stroke:\s*var\(--vt-studio-supreme-stroke, 3px\)/);
  assert.match(interCss, /--vt-im-face:\s*var\(--vt-studio-supreme-height, 60px\)/);
  assert.match(interCss, /outline:\s*calc\(var\(--vt-im-stroke\) \* \.65\) solid/);
  assert.match(interCss, /\.vt-studio-inter-module__line-1/);
  assert.match(interCss, /\.vt-studio-inter-module__line-2/);
});

test("right and double split text inputs use the same square rail tracks as left split inputs", () => {
  assert.doesNotMatch(splitCss, /grid-template-columns:[^;]*calc\(var\(--vt-studio-control-height, 44px\) \+ var\(--vt-studio-control-stroke, 3px\)\)/s);
  assert.match(splitCss, /data-split="left"[^}]*grid-template-columns:\s*var\(--vt-studio-control-height, 44px\) minmax\(0, 1fr\)/s);
  assert.match(splitCss, /data-split="right"[^}]*grid-template-columns:\s*minmax\(0, 1fr\) var\(--vt-studio-control-height, 44px\)/s);
  assert.match(splitCss, /data-split="double"[^}]*grid-template-columns:[\s\S]*?var\(--vt-studio-control-height, 44px\)[\s\S]*?var\(--vt-studio-control-height, 44px\)/s);
});

test("arrow, side, double-side and double-split word toggles share black focus character coloring", () => {
  const toggleCss = readFileSync("src/styles/studio-control-value-toggles.css", "utf8");
  assert.match(toggleCss, /\.vt-studio-value-toggle:focus-within \.vt-studio-value-toggle__face,[\s\S]*?\.vt-studio-value-toggle:focus-within \.vt-studio-word-counter__value/);
  assert.match(toggleCss, /-webkit-text-fill-color:\s*#000/);
  assert.match(toggleCss, /-webkit-text-stroke-color:\s*#000/);
});

test("split text input stylesheet is complete and uses the Codex native inner border", () => {
  assert.doesNotMatch(splitCss, /\.\.\.\s*$/, "stylesheet must not be truncated");
  assert.doesNotThrow(() => postcss.parse(splitCss), "split text input stylesheet must parse as valid CSS");
  assert.match(splitCss, /border:\s*var\(--vt-studio-control-stroke, 3px\) solid var\(--vt-split-field-primary\) !important/);
  assert.ok(splitCss.includes("box-shadow: inset 0 0 0 var(--vt-split-field-inline-width) var(--vt-split-field-primary)"));
  assert.match(splitCss, /caret-color:\s*var\(--vt-split-field-primary\)/);
});

test("split badge rails retain the Codex square inner geometry", () => {
  assert.match(splitCss, /grid-template-rows:\s*minmax\(0, 1fr\)/);
  assert.match(splitCss, /\[data-vt-studio-split-rail\]\s*\{[^}]*width:\s*calc\(var\(--vt-studio-control-height\) - var\(--vt-studio-control-stroke\)\)[^}]*height:\s*100%/s);
  assert.match(splitCss, /\.vt-studio-split-text-input\[data-split="left"\]/);
  assert.match(splitCss, /\.vt-studio-split-text-input\[data-split="right"\]/);
  assert.match(splitCss, /\.vt-studio-split-text-input\[data-split="double"\]/);
});


test("split text inputs and split dropdown icon rails use the global split-rail icon token, not chevron sizing", () => {
  const controlCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  const globalIconToken = /var\(--vt-studio-control-icon-size,\s*var\(--vt-studio-standard-icon-size,\s*38px\)\)/;
  const inputIconRule = splitCss.match(/html body \.vt-studio-split-text-input \[data-vt-studio-split-rail\] > svg\s*\{([^}]*)\}/);
  const dropdownIconRule = controlCss.match(/\.vt-studio-dropdown \.vt-studio-dropdown-split-rail > svg\s*\{([^}]*)\}/);
  assert.ok(inputIconRule, "split text input rail SVG rule exists");
  assert.ok(dropdownIconRule, "split dropdown icon rail SVG rule exists");
  assert.match(inputIconRule[1], globalIconToken);
  assert.match(dropdownIconRule[1], globalIconToken);
  assert.doesNotMatch(inputIconRule[1], /86%/);
  assert.doesNotMatch(dropdownIconRule[1], /vt-side-chevron-size|dropdown-chevron-size/);
  assert.match(controlCss, /\.vt-studio-dropdown-chevron svg\s*\{[^}]*width:\s*var\(--vt-studio-dropdown-chevron-size\)/s,
    "the chevron keeps its independent chevron-size contract");
  assert.match(interCss, /width:\s*calc\(var\(--vt-im-face\) \* \.58\)/,
    "the accordion icon sizing is intentionally unchanged");
});
