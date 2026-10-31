import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
const styles = readFileSync("src/styles/studio-control-system.css", "utf8");
const catalog = readFileSync("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx", "utf8");

test("StudioDoubleSplitSlider is built on the canonical double-split shell", () => {
  assert.match(controls, /export const StudioDoubleSplitSlider[\s\S]*?layout="double"/);
  assert.match(controls, /"data-vt-studio-slider": "double-split"/);
  assert.match(controls, /leftRailContent=\{[\s\S]*?rightRailContent=\{/);
});

test("StudioDoubleSplitSlider exposes an accessible range with live value and reset action", () => {
  assert.match(controls, /type="range"/);
  assert.match(controls, /aria-label=\{ariaLabel\}/);
  assert.match(controls, /onValueChange\(Math.min\(max, Math.max\(min, nextValue\)\)\)/);
  assert.match(controls, /aria-label=\{\x60Reset \$\{ariaLabel\}\x60\}/);
});

test("slider styling keeps the L1 track and rectangular v2 handle at all Studio sizes", () => {
  assert.match(styles, /\.vt-studio-double-split-slider input\[type="range"\]::-webkit-slider-thumb/);
  assert.match(styles, /--vt-studio-slider-radius:\s*var\(--vt-studio-control-radius,\s*6px\)/);
  assert.match(styles, /\.vt-studio-double-split-slider\[data-size="compact"\]/);
  assert.match(styles, /\.vt-studio-double-split-slider\[data-size="micro"\]/);
  assert.match(styles, /--vt-studio-slider-track-height:\s*max\(6px,\s*calc\(var\(--vt-studio-control-height,\s*44px\)\s*\*\s*\.428571\)\)/);
  assert.match(styles, /--vt-studio-slider-thumb-width:\s*max\(7px,\s*calc\(var\(--vt-studio-control-height,\s*44px\)\s*\*\s*\.44\)\)/);
  assert.match(styles, /--vt-studio-slider-thumb-height:\s*max\(12px,\s*calc\(var\(--vt-studio-control-height,\s*44px\)\s*\*\s*\.78\)\)/);
  assert.match(styles, /\.vt-studio-double-split-slider__reset,\s*\n\.vt-studio-double-split-slider \.vt-studio-double-split-slider__value[\s\S]*?background:\s*var\(--vt-studio-control-primary/);
  assert.match(styles, /input\[type="range"\][\s\S]*?background:\s*linear-gradient\(to right,[\s\S]*?var\(--vt-studio-slider-progress, 0%\)/);
  assert.match(styles, /::-webkit-slider-runnable-track\s*\{[^}]*border:\s*var\(--vt-studio-slider-stroke\) solid #000/s);
  assert.match(styles, /::-webkit-slider-thumb[\s\S]*?border:\s*var\(--vt-studio-slider-stroke\) solid #000;[\s\S]*?border-radius:\s*var\(--vt-studio-slider-radius\);[\s\S]*?background:\s*#fff/);
  assert.match(styles, /\.vt-studio-double-split-slider input\[type="range"\]::-moz-range-thumb\s*\{[^}]*border:\s*var\(--vt-studio-slider-stroke\) solid #000;[^}]*border-radius:\s*calc\(var\(--vt-studio-slider-radius\) \* \.5\);[^}]*background:\s*#fff/s);
});

test("confirmed primitive catalog includes standard, compact, and micro slider specimens", () => {
  assert.match(catalog, /StudioDoubleSplitSlider/);
  assert.match(catalog, /StudioDoubleSplitSlider · Supreme \+ Standard \+ Compact \+ Mini \+ Micro/);
});


test("double-split slider keeps secondary rails, a primary center, and inset progress", () => {
  assert.match(styles, /\.vt-studio-double-split-slider \.vt-studio-double-split-slider__rail\s*\{[^}]*background:\s*var\(--vt-studio-control-primary/s);
  assert.match(styles, /\.vt-studio-double-split-slider > \[data-vt-studio-split-field\]\s*\{[^}]*background:\s*var\(--vt-studio-control-secondary/s);
  assert.match(styles, /\.vt-studio-double-split-slider > \[data-vt-studio-split-field\]\s*\{[^}]*padding-inline:\s*max\(/s);
  assert.match(styles, /--vt-studio-slider-left-fill:\s*var\(--vt-studio-control-secondary/);
  assert.match(styles, /color-mix\(in srgb, var\(--vt-studio-slider-left-fill\) 50%, transparent\)/);
  assert.match(styles, /\.vt-studio-double-split-slider input\[type="range"\]::-webkit-slider-thumb\s*\{[^}]*transform:\s*translateY\(/s);
  assert.match(styles, /\.vt-studio-double-split-slider input\[type="range"\]\s*\{[^}]*box-sizing:\s*border-box/s);
});

test("arrow, side, double-side, and double-split word controls use counter character and focus tokens without local color overrides", () => {
  const toggles = readFileSync("src/styles/studio-control-value-toggles.css", "utf8");
  const distill = readFileSync("src/styles/studio-control-distill-overrides.css", "utf8");
  assert.match(toggles, /\.vt-studio-value-toggle__face,[\s\S]*?\.vt-studio-word-counter__value[\s\S]*?var\(--vt-studio-number-rest-color/);
  assert.match(toggles, /\.vt-studio-value-toggle:focus-within[\s\S]*?\.vt-studio-value-toggle__face[\s\S]*?color:\s*var\(--vt-studio-number-active-color,\s*#000\)/);
  assert.match(toggles, /\.vt-studio-value-toggle:focus-within[\s\S]*?\.vt-studio-word-counter__value[\s\S]*?-webkit-text-stroke-color:\s*var\(--vt-studio-number-active-stroke,\s*#000\)/);
  assert.doesNotMatch(distill, /html body \.vt-studio-value-toggle--side:not\(\.vt-studio-value-toggle--nested\)[\s\S]*?!important/);
  assert.doesNotMatch(distill, /html body \.vt-studio-value-toggle--double\[data-right-appearance/);
});
