import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
const styles = readFileSync("src/styles/studio-control-system.css", "utf8");

test("split-left open-menu rows render one leading icon rail and a centered label", () => {
  const menuStart = controls.indexOf('className="vt-studio-dropdown-menu"');
  const menu = controls.slice(menuStart);
  assert.notEqual(menuStart, -1);
  assert.match(menu, /variant === "split-left" \? \(/);
  assert.match(menu, /vt-studio-dropdown-option-rail--start/);
  assert.match(menu, /vt-studio-dropdown-option-label/);
  assert.doesNotMatch(menu.slice(0, menu.indexOf(") : option.label")), /rail--end|ChevronDown/);
});

test("split-left open-menu options do not render a trailing rail or chevron", () => {
  const menu = controls.slice(controls.indexOf('className="vt-studio-dropdown-menu"'));
  const splitMarkup = menu.match(/variant === "split-left" \? \(([\s\S]*?)\) : option\.label/)?.[1] ?? "";
  assert.match(splitMarkup, /rail--start/);
  assert.doesNotMatch(splitMarkup, /rail--end|ChevronDown/);
});

test("regular dropdown option rows use the active size bracket height and radius", () => {
  const option = styles.match(/\.vt-studio-dropdown-option \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(option, /height: var\(--vt-studio-control-height, 44px\)/);
  assert.match(option, /min-height: var\(--vt-studio-control-height, 44px\)/);
  assert.match(option, /border-radius: var\(--vt-studio-control-radius, 6px\)/);
  assert.match(option, /box-sizing: border-box/);
});

test("subsequent dropdown rows retain their size-bracket corner radius", () => {
  const adjacent = styles.match(/\.vt-studio-dropdown-option \+ \.vt-studio-dropdown-option \{([^}]*)\}/)?.[1] ?? "";
  assert.match(adjacent, /border-top/);
  assert.doesNotMatch(adjacent, /border-radius/);
});

test("split dropdown option rows have only the leading rail and centered label", () => {
  const split = styles.match(/\.vt-studio-dropdown-option\[data-vt-studio-dropdown-split-option="true"\] \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(split, /grid-template-columns:[^;]+minmax\(0, 1fr\)/);
  assert.match(split, /padding: 0/);
  assert.match(styles, /\.vt-studio-dropdown-option-rail--start/);
  assert.match(styles, /\.vt-studio-dropdown-option-label/);
  assert.doesNotMatch(styles, /\.vt-studio-dropdown-option-rail--end/);
});

test("multi-select option and clear buttons use the size-bracket height and radius", () => {
  for (const selector of [".vt-studio-legend-option {", ".vt-studio-legend-clear {"]) {
    const start = styles.indexOf(selector);
    const block = styles.slice(start, styles.indexOf("}", start) + 1);
    assert.match(block, /height: var\(--vt-legend-height\)/);
    assert.match(block, /min-height: var\(--vt-legend-height\)/);
    assert.match(block, /border-radius: var\(--vt-legend-radius\)/);
  }
});
