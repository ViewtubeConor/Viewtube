import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const component = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8")
const valueToggles = readFileSync("src/studio-ui/primitives/StudioValueToggles.tsx", "utf8")
const styles = readFileSync("src/styles/studio-control-system.css", "utf8")
const valueToggleStyles = readFileSync("src/styles/studio-control-value-toggles.css", "utf8")
const distill = readFileSync("src/styles/studio-control-distill-overrides.css", "utf8")
const recovery = readFileSync("src/styles/studio-control-recovery-overrides.css", "utf8")
const wordCounter = readFileSync("src/styles/studio-control-word-counter.css", "utf8")
const tokens = readFileSync("src/studio-ui/tokens.ts", "utf8")
const tokenEmitter = readFileSync("scripts/emit-studio-control-vars.mjs", "utf8")
const catalog = readFileSync("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx", "utf8")
const catalogStyles = readFileSync("src/components/studio-hub/studio-hub-primitive-catalogs.css", "utf8")

test("StudioCounter is a new button-only double-split primitive across all three sizes", () => {
  const start = component.indexOf("export const StudioCounter:")
  const end = component.indexOf("StudioCounter.displayName", start)
  const source = component.slice(start, end)
  assert.ok(start >= 0 && end > start)
  assert.match(source, /layout="double"/)
  assert.match(source, /data-vt-library-component": "StudioCounter"/)
  assert.match(source, /<span className="vt-studio-counter__value"/)
  assert.doesNotMatch(source, /<input|StudioInlineStepper|StudioSplitStepper|normalizeStudioInlineStepperValue/)
  assert.match(styles, /\.vt-studio-counter,[\s\S]*?width:\s*100%/)
  assert.doesNotMatch(styles, /vt-studio-counter-width/)
  assert.match(styles, /\.vt-studio-counter__button svg\s*\{[^}]*width:\s*24px;[^}]*height:\s*24px;/s)
  assert.doesNotMatch(styles, /\.vt-studio-counter\[data-vt-studio-split="double"\][^}]*2fr/)
  for (const size of ["supreme", "standard", "compact", "mini", "micro"]) assert.match(catalog, new RegExp('StudioCounter value={[^}]+} onValueChange={[^}]+} size="' + size + '"'))
})

test("StudioSideCounter is a new button-only split-right primitive with a divided action rail", () => {
  const start = component.indexOf("export const StudioSideCounter:")
  const end = component.indexOf("StudioSideCounter.displayName", start)
  const source = component.slice(start, end)
  assert.ok(start >= 0 && end > start)
  assert.match(source, /layout="right"/)
  assert.match(source, /data-vt-library-component": "StudioSideCounter"/)
  assert.match(source, /<span className="vt-studio-side-counter__value"/)
  assert.match(source, /<ChevronUp/)
  assert.match(source, /<ChevronDown/)
  assert.doesNotMatch(source, /<input|StudioInlineStepper|StudioSplitStepper|normalizeStudioInlineStepperValue/)
  assert.match(styles, /\.vt-studio-side-counter,[\s\S]*?width:\s*100%/)
  assert.doesNotMatch(styles, /vt-studio-counter-width/)
  assert.match(styles, /\.vt-studio-side-counter__actions button svg\s*\{[^}]*width:\s*14px;[^}]*height:\s*14px;/s)
  assert.doesNotMatch(styles, /\.vt-studio-side-counter\[data-vt-studio-split="right"\][^}]*2fr/)
  assert.match(styles, /\.vt-studio-side-counter__actions::after\s*\{[^}]*top:\s*50%[^}]*transform:\s*translateY\(-50%\)/s);
  for (const size of ["supreme", "standard", "compact", "mini", "micro"]) assert.match(catalog, new RegExp('StudioSideCounter value={[^}]+} onValueChange={[^}]+} size="' + size + '"'))
})

test("counter affordances have hold-repeat, enlarged icons, activation motion, and aligned right divider", () => {
  assert.match(component, /useStudioCounterHold/);
  assert.match(component, /onPointerDown/);
  assert.match(component, /data-press-holding/);
  assert.match(styles, /width:\s*36px;\s*height:\s*36px;\s*stroke-width:\s*3\.75;/);
  assert.match(styles, /vt-studio-counter-pop/);
  assert.match(styles, /vt-studio-counter-hold-pulse/);
  assert.match(styles, /\.vt-studio-side-counter__actions::after\s*\{[^}]*top:\s*50%[^}]*transform:\s*translateY\(-50%\)/s);
  assert.match(styles, /\.vt-studio-double-split-slider\.is-counter-controls \.vt-studio-double-split-slider__counter > button\.is-holding svg/);
});

test("counter palette variants use centered per-size pairs, tokenized numeral tint, and 0–100", () => {
  assert.match(catalog, /vt-confirmed-counter-size-rows/);
  assert.match(catalog, /vt-confirmed-counter-size-row/);
  assert.match(catalog, /vt-confirmed-counter-pair/);
  assert.doesNotMatch(catalog, /vt-confirmed-counter-row-grid--paired/);
  assert.equal((catalog.match(/max={100}/g) || []).length >= 12, true);
  assert.match(styles, /--vt-studio-number-rest-color:\s*color-mix\(in srgb,[^;]*var\(--vt-studio-number-rest-mix\)/);
  assert.match(styles, /\.vt-studio-counter__value,[\s\S]*?color:\s*color-mix\(in srgb, #fff var\(--vt-studio-number-default-white-mix, 50%\), var\(--vt-studio-number-background, var\(--pair-a\)\)\)/);
  assert.doesNotMatch(styles, /\.vt-studio-(?:counter|side-counter|left-counter|double-split-slider)\.is-reversed/);
  assert.match(styles, /background:\s*color-mix\(in srgb, var\(--pair-a\) 50%, transparent\)/);
  assert.match(catalogStyles, /\.vt-confirmed-counter-size-rows\s*\{[^}]*display:\s*grid/s);
  assert.match(catalogStyles, /\.vt-confirmed-counter-pair,[\s\S]*?\.vt-confirmed-slider-pair\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
});

test("Studio counter hold behavior is wired to pointer events for touch and mouse", () => {
  assert.equal((component.match(/useStudioCounterHold\(/g) || []).length, 8);
  assert.match(component, /setPointerCapture\(event\.pointerId\)/);
  assert.match(component, /onPointerCancel: stop/);
  assert.match(component, /const base = currentRef\.current/);
  assert.match(component, /max = 100/);
  assert.match(component, /accelerationEase/);
  assert.match(component, /accelerationProgress = Math\.min\(1, elapsed \/ 720\)/);
  assert.match(component, /boundaryEase/);
  assert.match(component, /remainingSteps/);
  assert.match(styles, /touch-action:\s*none/);
  assert.match(styles, /--vt-studio-number-rest-color:\s*color-mix\(in srgb,[^;]*var\(--vt-studio-number-rest-mix\)/);
  assert.match(styles, /-webkit-text-stroke:\s*var\(--vt-studio-control-text-stroke, 1px\) var\(--vt-studio-number-active-stroke, #000\)/);
});

test("controlled counter and slider use the shared interaction-focus-aware hold hook", () => {
  const counterStart = component.indexOf("export const StudioCounter:");
  const counterEnd = component.indexOf("StudioCounter.displayName", counterStart);
  const counter = component.slice(counterStart, counterEnd);
  const sliderStart = component.indexOf("export const StudioDoubleSplitSlider:");
  const sliderEnd = component.indexOf("StudioDoubleSplitSlider.displayName", sliderStart);
  const slider = component.slice(sliderStart, sliderEnd);
  assert.match(counter, /useStudioCounterHold\(-1,[\s\S]*?interactionFocus/);
  assert.match(counter, /useStudioCounterHold\(1,[\s\S]*?interactionFocus/);
  assert.match(slider, /useStudioCounterHold\(-1,[\s\S]*?interactionFocus/);
  assert.match(slider, /useStudioCounterHold\(1,[\s\S]*?interactionFocus/);
  assert.match(component, /interactionFocus\?\.pulse\(\); adjust\(direction\)/);
  assert.match(component, /interactionFocus\?\.start\(\)/);
  assert.match(component, /interactionFocus\?\.end\(\)/);
});

test("Studio counter and counter-slider press-and-hold are wired for touch and mouse", () => {
  assert.equal((component.match(/useStudioCounterHold\(/g) || []).length, 8);
  const sliderStart = component.indexOf("export const StudioDoubleSplitSlider:");
  const sliderEnd = component.indexOf("StudioDoubleSplitSlider.displayName", sliderStart);
  const slider = component.slice(sliderStart, sliderEnd);
  assert.match(slider, /useStudioCounterHold\(-1,[\s\S]*?adjustCounter/);
  assert.match(slider, /useStudioCounterHold\(1,[\s\S]*?adjustCounter/);
  assert.match(slider, /data-press-holding/);
  assert.match(component, /setPointerCapture\(event\.pointerId\)/);
  assert.match(component, /onPointerCancel: stop/);
  assert.match(component, /const base = currentRef\.current/);
  assert.match(component, /max = 100/);
  assert.match(styles, /touch-action:\s*none/);
  assert.match(styles, /--vt-studio-number-rest-color:\s*color-mix\(in srgb,[^;]*var\(--vt-studio-number-rest-mix\)/);
  assert.match(styles, /-webkit-text-stroke:\s*var\(--vt-studio-control-text-stroke, 1px\) var\(--vt-studio-number-active-stroke, #000\)/);
});
test("both counter styles tint resting numeral fill and stroke against each palette, then use black text while pressed or held", () => {
  assert.match(styles, /\.vt-studio-counter__value,[\s\S]*?color:\s*color-mix\(in srgb, #fff var\(--vt-studio-number-default-white-mix, 50%\), var\(--vt-studio-number-background, var\(--pair-a\)\)\)/);
  assert.doesNotMatch(styles, /\.vt-studio-(?:counter|side-counter|left-counter|double-split-slider)\.is-reversed/);
  assert.match(styles, /\.vt-studio-counter:has\([\s\S]*?color:\s*var\(--vt-studio-number-active-color, #000\);\s*-webkit-text-fill-color:\s*var\(--vt-studio-number-active-color, #000\);\s*-webkit-text-stroke:\s*var\(--vt-studio-control-text-stroke, 1px\) var\(--vt-studio-number-active-stroke, #000\)/);
  assert.match(styles, /\.vt-studio-counter:has\([\s\S]*?background:\s*color-mix\(in srgb, var\(--pair-a\) 50%, transparent\)/);
  assert.match(styles, /\.vt-studio-side-counter__value/);
  assert.match(styles, /\.vt-studio-side-counter:has\([\s\S]*?color:\s*var\(--vt-studio-number-active-color, #000\)/);
});

test("confirmed counter and slider specimens do not include inverse-palette variants", () => {
  assert.doesNotMatch(catalog, /StudioCounter className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioSideCounter className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioLeftCounter className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioDoubleSplitSlider className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioDoubleSplitWordCounter className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioLeftWordSlider className="is-reversed"/);
});

test("StudioLeftCounter places the two-button action rail on the left without an inverse-palette variant", () => {
  const start = component.indexOf("export const StudioLeftCounter:");
  const end = component.indexOf("StudioLeftCounter.displayName", start);
  const source = component.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(source, /layout="left"/);
  assert.match(source, /leftRailContent=/);
  assert.match(source, /data-vt-library-component": "StudioLeftCounter"/);
  assert.match(source, /"data-vt-studio-control-kind": "studio-left-counter"/);
  assert.match(source, /<span className="vt-studio-side-counter__value"/);
  assert.match(styles, /\.vt-studio-left-counter,[\s\S]*?width:\s*100%/)
  assert.doesNotMatch(styles, /vt-studio-counter-width/)
  assert.match(styles, /\.vt-studio-left-counter__rail\[data-rail="start"\]\s*\{[^}]*border-right:/s);
  assert.doesNotMatch(catalog, /StudioLeftCounter className="is-reversed"/);
  assert.doesNotMatch(catalog, /StudioSideCounter className="is-reversed"/);
});


test("StudioCounter uses the same directional chevrons as StudioBarToggle instead of plus/minus glyphs", () => {
  const start = component.indexOf("export const StudioCounter:");
  const end = component.indexOf("StudioCounter.displayName", start);
  const source = component.slice(start, end);
  assert.match(source, /<ChevronLeft/);
  assert.match(source, /<ChevronRight/);
  assert.doesNotMatch(source, /<Minus|<Plus/);
});

test("StudioLeftWordCounter inherits the shared 50-percent primary numeral and black interaction-focus treatment", () => {
  assert.match(wordCounter, /\.vt-studio-left-word-counter \.vt-studio-side-counter__value\s*\{[^}]*background:\s*var\(--pair-a\)[^}]*color:\s*var\(--vt-studio-number-rest-color\)[^}]*-webkit-text-stroke-color:\s*var\(--vt-studio-number-rest-color\)/s);
  assert.match(wordCounter, /data-vt-interaction-focus="true"[\s\S]*?color:\s*#000/);
  assert.match(wordCounter, /:focus-within[\s\S]*?color:\s*#000/);
  assert.match(styles, /--vt-studio-number-rest-color:\s*color-mix\(in srgb,[^;]*var\(--vt-studio-number-rest-mix\)/);
});

test("selected split buttons swap both the label face and rail between primary and secondary", () => {
  assert.match(styles, /data-vt-studio-split="left"\] \[data-vt-studio-split-label\] \{ background:var\(--vt-studio-control-accent/);
  assert.match(styles, /data-vt-studio-split="left"\]\[data-selected="true"\] \[data-vt-studio-split-label\][\s\S]*?background:var\(--vt-studio-control-secondary/);
  assert.match(styles, /data-vt-studio-split="left"\]\[data-selected="true"\] \[data-vt-studio-split-rail\][\s\S]*?background:var\(--vt-studio-control-accent/);
  assert.match(styles, /data-vt-studio-split="right"\]\[data-selected="true"\] \[data-vt-studio-split-label\][\s\S]*?background: var\(--vt-studio-control-secondary/);
  assert.match(styles, /data-vt-studio-split="double"\]\[data-selected="true"\] \[data-vt-studio-split-label\][\s\S]*?background: var\(--vt-studio-control-secondary/);
});

test("bar toggle exposes a rounded percentage tooltip and preserves visible bars between square rails", () => {
  assert.match(valueToggles, /vt-studio-value-toggle__bar-tooltip/);
  assert.match(valueToggles, /Math\.round\(Math\.max\(0, Math\.min\(100, value\)\)\)\}%/);
  assert.match(distill, /\.vt-studio-value-toggle__bar-tooltip\s*\{[^}]*background:\s*var\(--vt-studio-control-secondary[^}]*color:\s*#000/s);
  assert.match(distill, /\.vt-studio-value-toggle:focus-within/);
  assert.match(recovery, /\.vt-studio-split-shell\.vt-studio-value-toggle--bar > \[data-vt-studio-split-label\]\s*\{[^}]*flex:\s*1 1 0[^}]*width:\s*auto/s);
  assert.match(recovery, /\.vt-studio-split-shell\.vt-studio-value-toggle--bar\s*\{\s*overflow:\s*visible/s);
});


test("bar percentage tooltip escapes the component border and has a downward secondary-color pointer", () => {
  assert.match(distill, /\.vt-studio-value-toggle--bar\s*\{[^}]*overflow:\s*visible/s);
  assert.match(distill, /\.vt-studio-split-shell\.vt-studio-value-toggle--bar\s*\{[^}]*overflow:\s*visible/s);
  assert.match(distill, /\.vt-studio-value-toggle__bar-tooltip::after\s*\{[^}]*border-top:\s*6px solid var\(--vt-studio-control-secondary/s);
});

test("all counter chevrons use one token-backed button class and shared click/hold animation", () => {
  assert.match(tokens, /export const STUDIO_STEPPER_BUTTON_TOKENS\s*=\s*\{/);
  assert.match(tokenEmitter, /STUDIO_STEPPER_BUTTON_TOKENS/);
  assert.match(component, /className=\{\`vt-studio-stepper-button vt-studio-counter__button/);
  assert.match(valueToggles, /className="vt-studio-stepper-button vt-studio-value-toggle__arrow"/);
  assert.match(valueToggles, /className="vt-studio-stepper-button vt-studio-word-counter__button"/);
  assert.match(styles, /\.vt-studio-stepper-button:active:not\(:disabled\) svg[\s\S]*?vt-studio-counter-pop/);
  assert.match(styles, /\.vt-studio-stepper-button\.is-holding svg[\s\S]*?vt-studio-counter-hold-pulse/);
  assert.match(styles, /\.vt-studio-stepper-button:focus-visible[\s\S]*?--vt-studio-focus-outline-width-ratio[\s\S]*?--vt-studio-control-secondary/);
});

test("StudioDoubleSplitWordCounter is exported as a double-rail word primitive with the shared chevron buttons", () => {
  assert.match(valueToggles, /export type StudioDoubleSplitWordCounterProps/);
  assert.match(valueToggles, /export function StudioDoubleSplitWordCounter/);
  assert.match(valueToggles, /layout="double"/);
  assert.match(valueToggles, /data-vt-studio-control-kind": "studio-double-split-word-counter"/);
  assert.match(valueToggles, /STUDIO_LEFT_WORD_OPTIONS/);
  assert.match(valueToggles, /vt-studio-word-counter__value/);
  assert.match(valueToggleStyles, /\.vt-studio-word-counter__button\s*\{[^}]*display:\s*grid/);
  assert.match(valueToggleStyles, /\.vt-studio-value-toggle:focus-within\s*\{[^}]*outline:/s);
});


test("dropdown menus share separated primary-filled menu defaults across standard, simple, and split-left variants", () => {
  assert.match(tokens, /export const STUDIO_DROPDOWN_MENU_TOKENS\s*=\s*\{/);
  assert.match(tokens, /menuGap:\s*8/);
  assert.match(tokens, /menuPadding:\s*4/);
  assert.match(tokens, /rowGap:\s*3/);
  assert.match(tokens, /menuFill:\s*"primary"/);
  assert.match(tokens, /unselectedRowFill:\s*"white"/);
  assert.match(tokens, /selectedRowFill:\s*"secondary"/);
  assert.match(tokenEmitter, /STUDIO_DROPDOWN_MENU_TOKENS/);
  assert.match(styles, /\.vt-studio-dropdown-menu\s*\{[^}]*top:\s*calc\(100% \+ var\(--vt-studio-dropdown-menu-gap/s);
  assert.match(styles, /\.vt-studio-dropdown-menu\s*\{[^}]*border-radius:\s*var\(--vt-studio-dropdown-menu-radius/s);
  assert.match(styles, /\.vt-studio-dropdown-menu\s*\{[^}]*background:\s*var\(--vt-studio-dropdown-menu-fill/s);
  assert.match(styles, /\.vt-studio-dropdown-option\s*\{[^}]*background:\s*var\(--vt-studio-dropdown-row-fill/s);
  assert.match(styles, /\.vt-studio-dropdown-option\[data-selected="true"\]\s*\{[^}]*background:\s*var\(--vt-studio-dropdown-selected-fill/s);
  assert.match(styles, /\.vt-studio-dropdown\.is-simple \.vt-studio-dropdown-menu/);
  assert.match(styles, /\.vt-studio-dropdown\.is-split-left \.vt-studio-dropdown-menu/);
  const menuContract = styles.slice(styles.lastIndexOf("/* Global dropdown menu contract"));
  assert.match(menuContract, /border:\s*var\(--vt-studio-dropdown-row-stroke[^;]*solid #000/);
  assert.match(menuContract, /border-radius:\s*var\(--vt-studio-dropdown-menu-radius[^;]*!important/);
});


test("counter families are independent modules and solid-fill word counter faces stay solid", () => {
  const counterFamilyStart = catalog.indexOf("const ConfirmedStudioCounterFamily");
  const counterFamilyEnd = catalog.indexOf("const ConfirmedStudioDoubleSplitSliderFamily", counterFamilyStart);
  const counterFamily = catalog.slice(counterFamilyStart, counterFamilyEnd);
  assert.ok(counterFamilyStart >= 0 && counterFamilyEnd > counterFamilyStart);
  assert.doesNotMatch(counterFamily, /<ConfirmedStudioSideCounterFamily\s*\/>/);
  assert.match(catalog, /<ConfirmedStudioSideCounterFamily\s*\/>/);
  assert.match(catalog, /title="StudioDoubleSplitWordCounter[\s\S]*?defaultOpen/);
  assert.match(valueToggleStyles, /\.vt-studio-word-counter\s*>\s*\[data-vt-studio-split-label\]\s*\{[^}]*background:\s*var\(--vt-studio-control-accent/s);
  assert.doesNotMatch(valueToggleStyles, /\.vt-studio-word-counter\s*>\s*\[data-vt-studio-split-label\][^{]*\{[^}]*50%/s);
  assert.match(valueToggleStyles, /\.vt-studio-word-counter__value\s*\{[^}]*display:\s*flex/);
  assert.match(valueToggleStyles, /\.vt-studio-word-counter__value\s*\{/);
});

test("value-toggle recovery defaults do not repaint arrow-toggle faces with half-primary fill", () => {
  const recoveryFillStart = recovery.indexOf("/* Restore visible toggle/switch silhouettes");
  const recoveryFillEnd = recovery.indexOf("/* Supreme + Mini double-split slider counter rails", recoveryFillStart);
  const recoveryFill = recovery.slice(recoveryFillStart, recoveryFillEnd);
  assert.ok(recoveryFillStart >= 0 && recoveryFillEnd > recoveryFillStart);
  assert.doesNotMatch(recoveryFill, /\.vt-studio-value-toggle\s*,/);
  assert.doesNotMatch(recoveryFill, /\.vt-studio-split-shell\.vt-studio-value-toggle\s*\{/);
});
