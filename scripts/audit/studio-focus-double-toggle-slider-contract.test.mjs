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
  assert.ok(toggles.includes("outline-color " + duration));
  assert.ok(toggles.includes("outline-width " + duration));
  assert.ok(toggles.includes("color " + duration));
  assert.ok(toggles.includes("-webkit-text-fill-color " + duration));
  assert.ok(toggles.includes("-webkit-text-stroke-color " + duration));
  assert.match(toggles, /outline:\s*0 solid transparent/);
});

test("double-side focus keeps one outer perimeter and activates only the focused side", () => {
  assert.match(toggles, /\.vt-studio-value-toggle--double:focus-within\s*\{[^}]*outline:/);
  assert.match(toggles, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle__double-side:focus-within \.vt-studio-value-toggle__face/);
  assert.doesNotMatch(toggles, /\.vt-studio-value-toggle--double:focus-within \.vt-studio-split-shell \.vt-studio-value-toggle__face/);
  assert.match(toggles, /\.vt-studio-value-toggle:not\(\.vt-studio-value-toggle--double\):not\(\.vt-studio-value-toggle--nested\):focus-within \.vt-studio-value-toggle__face/);
  assert.match(toggles, /\.vt-studio-value-toggle--double \.vt-studio-value-toggle--nested:focus-within\s*\{\s*outline:\s*none/);
});

test("split text input uses one continuous primary inset stroke at every size", () => {
  assert.match(splitInput, /box-shadow:\s*inset 0 0 0 var\(--vt-studio-control-stroke, 3px\) var\(--vt-split-field-primary/);
  assert.match(splitInput, /:is\(:focus, :focus-visible\)[\s\S]*?box-shadow:\s*inset 0 0 0 var\(--vt-studio-control-stroke, 3px\) var\(--vt-split-field-primary/);
  assert.match(splitInput, /data-size/);
  assert.doesNotMatch(splitInput, /border-(?:top|bottom):\s*var\(--vt-studio-control-stroke/);
});

test("slider track retains tier-aware clearance from both vertical dividers", () => {
  assert.match(splitStyles, /padding-inline:\s*max\([\s\S]*?calc\(var\(--vt-studio-control-stroke, 3px\) \* 2\)[\s\S]*?calc\(var\(--vt-studio-control-height, 44px\) \* \.12\)/);
});

test("slider rails stay secondary, center stays primary, and progress uses a white-secondary blend", () => {
  assert.match(controls, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__rail\s*\{[^}]*background:\s*var\(--vt-studio-control-secondary/s);
  assert.match(controls, /\.vt-studio-double-split-slider > \[data-vt-studio-split-field\]\s*\{[^}]*background:\s*var\(--vt-studio-control-primary/s);
  assert.doesNotMatch(splitStyles, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__rail\s*\{[^}]*background:/s);
  assert.match(controls, /--vt-studio-slider-left-fill:\s*var\(--vt-studio-control-secondary/);
  assert.match(controls, /color-mix\(in srgb, white 50%, var\(--vt-studio-slider-left-fill\) 50%\)/i);
});

test("primary percentage field fills blend against white instead of transparency", () => {
  assert.match(controls, /--vt-field-fill-rest:\s*color-mix\(in srgb, white 50%, var\(--vt-field-primary\) 50%\)/i);
  assert.match(controls, /--vt-field-fill-focus:\s*color-mix\(in srgb, white 85%, var\(--vt-field-primary\) 15%\)/i);
  assert.doesNotMatch(controls, /--vt-field-fill-(?:rest|focus):[^;]*transparent/);
  assert.match(splitInput, /background:\s*color-mix\(in srgb, white 50%, var\(--vt-split-field-primary\) 50%\)/i);
  assert.match(splitInput, /background:\s*color-mix\(in srgb, white 85%, var\(--vt-split-field-primary\) 15%\)/i);
  assert.match(toggles, /background:\s*color-mix\(in srgb, white 85%, var\(--vt-toggle-fill[^;]*15%\)/i);
  assert.doesNotMatch([controls, splitInput, fields, toggles].join("\n"), /color-mix\([^;]*(?:vt-field-primary|vt-split-field-primary|vt-studio-control-accent|vt-studio-control-secondary|vt-studio-slider-left-fill|vt-toggle-fill)[^;]*,\s*transparent\)/);
});

test("slider right-rail numerals blend secondary with white by default", () => {
  assert.match(controls, /\.vt-studio-double-split-slider\s*\{[^}]*--vt-studio-number-background:\s*var\(--vt-studio-control-secondary/s);
  assert.match(controls, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__value\s*\{[^}]*color:\s*color-mix\(in srgb, #fff[^;]*var\(--vt-studio-number-background\)/s);
});

test("slider track, progress surface, and browser tracks use the shared corner radius", () => {
  assert.match(controls, /\.vt-studio-double-split-slider input\[type="range"\]\s*\{[^}]*border-radius:\s*var\(--vt-studio-slider-radius/s);
  assert.match(controls, /\.vt-studio-double-split-slider input\[type="range"\]::-webkit-slider-runnable-track\s*\{[^}]*border-radius:\s*var\(--vt-studio-slider-radius/s);
  assert.match(controls, /\.vt-studio-double-split-slider input\[type="range"\]::-moz-range-track\s*\{[^}]*border-radius:\s*var\(--vt-studio-slider-radius/s);
});

test("textareas expose the primary 15% focus fill with the shared 500ms transition", () => {
  assert.ok(fields.includes("background-color: var(--vt-field-fill-focus"));
  assert.ok(fields.includes("background-color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out"));
  assert.ok(fields.includes("-webkit-text-stroke-color var(--vt-studio-focus-outline-fade-ms, 500ms) ease-out"));
});

test("text boxes retain a primary inline inset stroke without a clearing rule", () => {
  assert.ok(fields.includes('.vt-studio-text-box[data-vt-studio-control="true"]'));
  assert.ok(fields.includes("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-field-primary"));
  assert.doesNotMatch(fields, /\.vt-studio-text-box\[data-vt-studio-control="true"\]\s*\{\s*box-shadow:\s*none/);
});
