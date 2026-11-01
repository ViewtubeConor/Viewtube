import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const toggles = readFileSync("src/styles/studio-control-value-toggles.css", "utf8");
const splitInput = readFileSync("src/studio-ui/primitives/studio-split-text-input.css", "utf8");
const controls = readFileSync("src/styles/studio-control-system.css", "utf8");
const fields = readFileSync("src/styles/studio-control-fields.css", "utf8");
const splitStyles = readFileSync("src/styles/studio-control-split.css", "utf8");

test("focus outline and character fades share one duration and easing in both directions", () => {
  const duration = "var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out";
  assert.ok(toggles.includes("outline-color "+duration));
  assert.ok(toggles.includes("outline-width "+duration));
  assert.ok(toggles.includes("color "+duration));
  assert.ok(toggles.includes("-webkit-text-fill-color "+duration));
  assert.ok(toggles.includes("-webkit-text-stroke-color "+duration));
  assert.match(toggles, /outline:\s*0 solid transparent/);
});

test("double-side focus keeps the outer perimeter and activates only the focused side characters", () => {
  assert.match(toggles, /\.vt-studio-value-toggle--double:focus-within\s*\{[^}]*outline:/);
  assert.match(toggles, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle__double-side:focus-within \.vt-studio-value-toggle__face/);
  assert.doesNotMatch(toggles, /\.vt-studio-value-toggle--double:focus-within \.vt-studio-split-shell \.vt-studio-value-toggle__face/);
  assert.match(toggles, /\.vt-studio-value-toggle:not\(\.vt-studio-value-toggle--double\):not\(\.vt-studio-value-toggle--nested\):focus-within \.vt-studio-value-toggle__face/);
  assert.match(toggles, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle--nested:focus-within\s*\{\s*outline:\s*none/);
});

test("split text input uses a full primary inner border at every supported size, including top and bottom", () => {
  assert.match(splitInput, /box-shadow:\s*inset 0 0 0 var\(--vt-studio-control-stroke, 3px\) var\(--vt-split-field-primary/);
  assert.match(splitInput, /:is\(:focus, :focus-visible\)[\s\S]*?box-shadow:\s*inset 0 0 0 var\(--vt-studio-control-stroke, 3px\) var\(--vt-split-field-primary/);
  assert.match(splitInput, /data-size/);
});

test("slider track has tier-aware clearance from both vertical dividers", () => {
  assert.match(splitStyles, /padding-inline:\s*max\([\s\S]*?calc\(var\(--vt-studio-control-stroke, 3px\) \* 2\)[\s\S]*?calc\(var\(--vt-studio-control-height, 44px\) \* \.12\)/);
});

test("slider split rails are secondary, center is primary, and progress uses full/half secondary fills", () => {
  assert.match(controls, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__rail\s*\{[^}]*background:\s*var\(--vt-studio-control-secondary/s);
  assert.match(controls, /\.vt-studio-double-split-slider > \[data-vt-studio-split-field\]\s*\{[^}]*background:\s*var\(--vt-studio-control-primary/s);
  assert.doesNotMatch(splitStyles, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__rail\s*\{[^}]*background:/s);
  assert.match(splitStyles, /padding-inline:\s*max\([\s\S]*?calc\(var\(--vt-studio-control-height, 44px\) \* \.12\)/);
  assert.match(controls, /--vt-studio-slider-left-fill:\s*var\(--vt-studio-control-secondary/);
  assert.match(controls, /color-mix\(in srgb, var\(--vt-studio-slider-left-fill\) 50%, transparent\)/);
  assert.match(controls, /padding-inline:\s*max\(/);
});


test("textareas expose the primary 15% focus fill with the shared 500ms transition", () => {
  assert.ok(fields.includes('background-color: var(--vt-field-fill-focus'));
  assert.ok(fields.includes('background-color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out'));
  assert.ok(fields.includes('-webkit-text-stroke-color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out'));
});

test("text boxes retain a primary inline inset stroke without a clearing rule", () => {
  assert.ok(fields.includes('.vt-studio-text-box[data-vt-studio-control="true"]'));
  assert.ok(fields.includes('box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-field-primary'));
  assert.doesNotMatch(fields, /\.vt-studio-text-box\[data-vt-studio-control="true"\]\s*\{\s*box-shadow:\s*none/);
});

test("split text input keeps a continuous primary inset stroke on all four edges", () => {
  assert.match(splitInput, /box-shadow:\s*inset 0 0 0 var\(--vt-studio-control-stroke, 3px\) var\(--vt-split-field-primary/);
});

