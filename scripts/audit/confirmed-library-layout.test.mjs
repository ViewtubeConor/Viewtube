import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const catalog = readFileSync("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx", "utf8");
const styles = readFileSync("src/components/studio-hub/studio-hub-primitive-catalogs.css", "utf8");
const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
const palette = readFileSync("src/styles/toolboxPalette.ts", "utf8");
const controlStyles = [
  "studio-control-system.css",
  "studio-control-core.css",
  "studio-control-split.css",
  "studio-control-fields.css",
].map((path) => readFileSync(join("src/styles", path), "utf8")).join("\n");
const completeCatalog = readFileSync("src/components/studio-hub/StudioHubCompletePrimitiveCatalog.tsx", "utf8");

test("confirmed library uses the requested four skin names without changing skin values", () => {
  for (const label of ['label: "SOLID"', 'label: "COLOR SWAP"', 'label: "BLACK"', 'label: "WHITE"']) assert.ok(catalog.includes(label), label);
  assert.ok(catalog.includes('skin: "black-indicator"'));
  assert.ok(catalog.includes('skin: "white-indicator"'));
  assert.ok(!catalog.includes('label: "4 · BLACK INDICATOR"'));
  assert.ok(!catalog.includes('label: "5 · WHITE INDICATOR"'));
});

test("confirmed catalog CSS owns layout, not production control faces", () => {
  const rules = [...styles.matchAll(/(^|\n)([^{}\n]+)\s*\{([^{}]*)\}/g)];
  const faceProperties = /(?:^|;)\s*(?:border|border-radius|background(?:-color)?|box-shadow|font-size|font-family|font-weight|height|min-height|max-height|padding|color|text-transform|-webkit-text-stroke)\s*:/;
  const violations = rules
    .map((match) => ({ selector: match[2].trim(), body: match[3] }))
    .map(({ selector, body }) => ({ selector: selector.replace(/:not\([^)]*\)/g, ""), body }))
    .filter(({ selector }) => selector.includes("vt-confirmed") && /(?:\.vt-studio-|data-vt-studio-control|data-vt-studio-button)/.test(selector))
    // The Button family's V1–V7 catalog-only comparison skins are intentionally scoped
    // to the specimen gallery; they do not restyle the production primitive globally.
    .filter(({ selector }) => !/\.vt-confirmed-button-skin\[data-vt-button-skin=/.test(selector))
    .filter(({ body }) => faceProperties.test(body))
    .map(({ selector }) => selector);
  assert.deepEqual(violations, [], "production primitive face styling belongs in studio-control-system.css");
});

test("switch and choice skin families retain four-column rows at every viewport", () => {
  assert.match(styles, /\.vt-confirmed-control-variants\s*\{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles, /\.vt-confirmed-control-family \.vt-confirmed-control-variants\s*\{\s*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\) !important/);
  assert.match(styles, /\.vt-confirmed-control-family \.vt-confirmed-control-variants,[\s\S]*?grid-template-columns: repeat\(4, minmax\(64px, 1fr\)\) !important;[\s\S]*?overflow-x: auto/);
});

test("standard button specimens span a row and compact default/neutral variants share two columns", () => {
  assert.match(styles, /\.vt-confirmed-button-family > \.vt-confirmed-variants\s*\{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\) !important/);
  assert.match(styles, /\.vt-confirmed-button-family > \.vt-confirmed-variants > \.vt-confirmed-variant\.is-full-row\s*\{\s*grid-column: 1 \/ -1 !important/);
  assert.ok(catalog.includes('28px compact · default'));
  assert.ok(catalog.includes('28px compact · neutral tone'));
});

test("StudioTextInput catalog includes simple, floating-label, and fixed-label variants", () => {
  assert.ok(catalog.includes('aria-label="Studio plain text input standard"'));
  assert.ok(catalog.includes('aria-label="Studio plain text input compact"'));
  assert.ok(catalog.includes('aria-label="Studio floating-label input standard A"'));
  assert.ok(catalog.includes('aria-label="Studio floating-label input compact B reverse colors"'));
  assert.ok(catalog.includes('aria-label="Studio floating-label textarea compact A"'));
  assert.ok(catalog.includes('aria-label="Studio floating-label textarea compact B reverse colors"'));
  assert.ok(catalog.includes('aria-label="Studio fixed-label textarea compact A"'));
  assert.ok(catalog.includes('aria-label="Studio fixed-label textarea compact B reverse colors"'));
  assert.ok(catalog.includes('aria-label="Studio fixed-label input standard A"'));
  assert.ok(catalog.includes('aria-label="Studio fixed-label input compact B reverse colors"'));
  assert.match(catalog, /Studio Text Input · Standalone \+ Simple \+ Floating \+ Fixed Label/);
});

test("global defaults distinguish the secondary focus outline from field text stroke", () => {
  assert.match(controls, /focusOutline: "Text inputs and text areas use a zero-offset, 100%-opacity secondary-color outline/);
  assert.match(controlStyles, /outline: var\(--vt-field-outline-stroke\) solid var\(--vt-field-secondary\)/);
  assert.doesNotMatch(controls, /computed CSS outline itself measured 1px/);
});

test("floating labels follow primitive resting typography and share one 18px raised rule", () => {
  const fieldCss = readFileSync("src/styles/studio-control-fields.css", "utf8");
  const systemCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.match(systemCss, /--vt-studio-control-floating-label-height:\s*var\(--vt-studio-standard-font-size,\s*38px\)/);
  assert.match(systemCss, /--vt-studio-control-floating-label-height:\s*var\(--vt-studio-compact-font-size,\s*24px\)/);
  assert.match(fieldCss, /textarea\[data-size="standard"\] \+ \.vt-studio-floating-field-label\s*\{[^}]*font-size: var\(--vt-studio-textarea-standard-font-size, 18px\)/s);
  assert.match(fieldCss, /textarea\[data-size="compact"\] \+ \.vt-studio-floating-field-label\s*\{[^}]*font-size: var\(--vt-studio-textarea-compact-font-size, 14px\)/s);
  assert.match(fieldCss, /input\[data-size="standard"\] \+ \.vt-studio-floating-field-label\s*\{[^}]*font-size: var\(--vt-studio-44-font-size, 38px\)/s);
  assert.match(fieldCss, /input\[data-size="compact"\] \+ \.vt-studio-floating-field-label\s*\{[^}]*font-size: var\(--vt-studio-28-font-size, 24px\)/s);
  assert.match(systemCss, /:is\(input, textarea\):focus \+ \.vt-studio-floating-field-label,[\s\S]*?font-size: 18px;/);
  assert.doesNotMatch(systemCss, /\.vt-studio-floating-field:not\(\.is-textarea\)\s*>\s*:is\(input, textarea\):focus \+ \.vt-studio-floating-field-label/);
  assert.match(fieldCss, /padding:\s*2\.25px 4\.5px/);
  assert.match(fieldCss, /-webkit-text-fill-color: #000;/);
  assert.match(fieldCss, /-webkit-text-stroke-color: #000;/);
  assert.match(fieldCss, /data-vt-floating-variant="b"[\s\S]*?data-size="compact"/);
  assert.match(fieldCss, /\.vt-studio-floating-field\[data-vt-floating-variant="b"\]\s*>\s*:is\(input, textarea\)\[data-size="compact"\]:is\(:focus, :focus-visible\)\s*\{\s*outline:\s*var\(--vt-studio-control-focus-outline-width,\s*2px\)\s+solid\s+var\(--vt-studio-control-secondary/s);
  assert.match(fieldCss, /\.vt-studio-floating-field\[data-vt-floating-variant="b"\]\s*>\s*:is\(input, textarea\)\[data-size="compact"\]:is\(:focus, :focus-visible\)\s*\+\s*\.vt-studio-floating-field-label\s*\{\s*outline:\s*var\(--vt-studio-control-focus-outline-width,\s*2px\)\s+solid\s+var\(--vt-studio-control-secondary/s);
});
test("circle icon buttons scale the rendered SVG to 80% of the canonical icon preset", () => {
  const fieldCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.match(fieldCss, /button\[data-vt-studio-circle-icon-button="true"\]\[data-size="standard"\]\s*\{[^}]*--vt-studio-control-icon-size:\s*38px/s);
  assert.match(fieldCss, /button\[data-vt-studio-circle-icon-button="true"\]\[data-size="compact"\]\s*\{[^}]*--vt-studio-control-icon-size:\s*24px/s);
  assert.match(fieldCss, /button\[data-vt-studio-circle-icon-button="true"\]\s*\[data-vt-square-icon-current\]\s*svg\s*\{[^}]*width:\s*calc\(var\(--vt-studio-control-icon-size,\s*28px\)\s*\*\s*\.8\);[^}]*height:\s*calc\(var\(--vt-studio-control-icon-size,\s*28px\)\s*\*\s*\.8\)/s);
});

test("floating-label Compact B variant is explicit and only adds the scoped secondary focus stroke", () => {
  const inputModule = readFileSync("src/studio-ui/primitives/StudioTextInput.tsx", "utf8");
  assert.match(inputModule, /floatingLabelVariant\?:\s*"a"\s*\|\s*"b"/);
  assert.match(catalog, /variant="floating-label"[^>]*floatingLabelVariant="b"[^>]*label="TITLE"[^>]*sizeVariant="compact"/);
  const fieldCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.match(fieldCss, /\.vt-studio-floating-field\[data-vt-floating-variant="b"\][\s\S]*?data-size="compact"[^\n]*:is\(:focus, :focus-visible\)/);
});

test("non-default settings document exceptions instead of restating the global size lattice", () => {
  assert.ok(catalog.includes('variant="floating-label"'));
  assert.ok(catalog.includes("Raised labels shrink to 80%; compact B reverses the paired colors."));
  assert.ok(catalog.includes("Circular shape uses 80% of the canonical large icon preset: 30.4px / 1.9 stroke standard and 19.2px / 2.0 compact."));
  assert.ok(!catalog.includes("Standard/compact are 44px/28px with 3px/2px strokes and 6px/4px radii"));
  assert.ok(!catalog.includes("Search/number, input mode, autocomplete, max length, disabled/read-only behavior, and native caret are field-specific options."));
  assert.ok(!catalog.includes("overlayLabel accepts custom field context"));
});


test("canonical Studio buttons have no default shell shadow or press movement", () => {
  const fieldCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.doesNotMatch(fieldCss, /button\[data-vt-studio-button="true"\]::before\s*\{[^}]*background:\s*var\(--vt-studio-control-shadow-color/);
  assert.doesNotMatch(fieldCss, /button\[data-vt-studio-button="true"\]:active:not\(:disabled\) > \[data-vt-studio-button-face\][^\n]*transform:\s*translate/);
  assert.doesNotMatch(fieldCss, /--vt-studio-control-shadow-x|--vt-studio-control-shadow-y/);
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\] > \[data-vt-studio-button-face\][^}]*border:\s*var\(--vt-studio-control-stroke\) solid #000/);
  assert.match(fieldCss, /button\[data-vt-studio-control="true"\]\[data-vt-studio-action-button="true"\][\s\S]*?min-height:\s*56px/);
});

test("split-left buttons do not clip the stationary shadow or expose a wrapper border", () => {
  const fieldCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\][^\n]*overflow:\s*visible/);
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\] > \[data-vt-studio-button-face\][^\n]*border:\s*var\(--vt-studio-control-stroke\) solid #000/);
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\] > \[data-vt-studio-button-face\][^\n]*overflow:\s*hidden/);
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\][^\n]*background:\s*transparent/);
  assert.match(fieldCss, /button\[data-vt-studio-button="true"\]\[data-split-left="true"\][^\n]*appearance:\s*none/);
});


test("single-line inputs use global 38px/24px typography while textareas alone use 18px/14px", () => {
  const tokens = readFileSync("src/studio-ui/tokens.ts", "utf8");
  const css = controlStyles;
  const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
  const inputModule = readFileSync("src/studio-ui/primitives/StudioTextInput.tsx", "utf8");
  const areaModule = readFileSync("src/studio-ui/primitives/StudioTextArea.tsx", "utf8");
  const catalog = readFileSync("src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx", "utf8");
  assert.match(tokens, /standard:\s*\{[^}]*fontSize:\s*38/);
  assert.match(tokens, /compact:\s*\{[^}]*fontSize:\s*24/);
  assert.match(tokens, /textInput:\s*\{\s*standardFontSize:\s*STUDIO_CONTROL_SIZE_BASE\.standard\.fontSize,\s*compactFontSize:\s*STUDIO_CONTROL_SIZE_BASE\.compact\.fontSize/);
  assert.match(tokens, /inlineStrokeWidth: "same as border width"/);
  assert.match(css, /font-size:\s*var\(--vt-studio-control-font-size,\s*38px\);/);
  assert.doesNotMatch(css, /--vt-studio-text-input-standard-font-size|--vt-studio-text-input-compact-font-size/);
  assert.match(tokens, /multiline:\s*\{\s*minHeight:\s*92,\s*standardFontSize:\s*18,\s*compactFontSize:\s*14/);
  assert.match(css, /--vt-studio-44-font-size:\s*38px/);
  assert.match(css, /--vt-studio-28-font-size:\s*24px/);
  assert.match(css, /textarea\[data-vt-studio-control="true"\]\[data-vt-studio-field-kind="textarea"\]\s*\{[\s\S]*?font-size:\s*var\(--vt-studio-textarea-standard-font-size,\s*18px\);/);
  assert.match(css, /textarea\[data-vt-studio-control="true"\]\[data-vt-studio-field-kind="textarea"\]\[data-size="compact"\]\s*\{[\s\S]*?font-size:\s*var\(--vt-studio-textarea-compact-font-size,\s*14px\);/);
  assert.ok(controls.includes('standardInputFontSize: "38px"'));
  assert.ok(controls.includes('compactInputFontSize: "24px"'));
  assert.ok(inputModule.includes("StudioTextInput"));
  assert.ok(areaModule.includes("StudioTextArea"));
  assert.ok(catalog.includes("Studio Text Input · Standalone + Simple + Floating + Fixed Label"));
  assert.ok(catalog.includes("SINGLE-LINE INPUT TYPOGRAPHY:</strong> 38px standard / 24px compact"));
  assert.match(catalog, /Studio Text Area · Standalone \+ Simple \+ Floating \+ Fixed Label[\s\S]*?Multiline-only exception: 18px standard \/ 14px compact typography, distinct line-height and padding, and a 92px minimum writing surface/i);
  assert.doesNotMatch(catalog, /Text is 18px standard and 14px compact, matching the labeled-input and textarea families/);
});

test("floating-label presentations are variants inside the canonical input and textarea families", () => {
  const inputModule = readFileSync("src/studio-ui/primitives/StudioTextInput.tsx", "utf8");
  const areaModule = readFileSync("src/studio-ui/primitives/StudioTextArea.tsx", "utf8");
  const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
  assert.ok(inputModule.includes("export const StudioTextInput"));
  assert.ok(inputModule.includes('variant: "floating-label"'));
  assert.ok(!inputModule.includes("export const StudioLabeledInput"));
  assert.ok(areaModule.includes("export const StudioTextArea"));
  assert.ok(areaModule.includes('variant: "floating-label"'));
  assert.ok(!areaModule.includes("export const StudioLabeledTextArea"));
  assert.ok(controls.includes('from "./StudioTextInput"'));
  assert.ok(controls.includes('from "./StudioTextArea"'));
  assert.ok(!controls.includes("StudioLabeledInput"));
  assert.ok(!controls.includes("StudioLabeledTextArea"));
  const publicIndex = readFileSync("src/studio-ui/index.ts", "utf8");
  assert.ok(!publicIndex.includes("StudioLabeledInput"));
  assert.ok(!publicIndex.includes("StudioLabeledTextArea"));
  assert.ok(catalog.includes('<StudioTextInput variant="floating-label"'));
  assert.ok(catalog.includes('<StudioTextArea variant="floating-label"'));
  assert.ok(completeCatalog.includes('<StudioTextInput variant="floating-label"'));
  assert.ok(completeCatalog.includes('<StudioTextArea variant="floating-label"'));
});


test("removed standalone labeled components have no remaining source references", () => {
  const legacyNames = ["StudioLabeledInput", "StudioLabeledTextArea"];
  const sourceFiles = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(tsx?|jsx?)$/.test(path) && !/\.(test|spec)\.[cm]?[jt]sx?$/.test(path)) sourceFiles.push(path);
    }
  };
  walk("src");
  for (const path of sourceFiles) {
    const source = readFileSync(path, "utf8");
    for (const legacyName of legacyNames) {
      assert.ok(!source.includes(legacyName), `${legacyName} remains in ${path}`);
    }
  }
});

test("word toggle library has three skins, one standard toggle per row, and centered compact toggles", () => {
  const fieldCss = readFileSync("src/styles/studio-control-system.css", "utf8");
  assert.match(catalog, /const WORD_TOGGLE_SKINS = CANONICAL_SKINS\.slice\(0, 3\)/);
  assert.match(catalog, /Array\(6\)\.fill\(false\)/);
  assert.match(styles, /\.vt-confirmed-word-toggle-family \.vt-confirmed-control-variants\[data-control-size="44"\][\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) !important/);
  assert.match(styles, /\.vt-confirmed-word-toggle-family \.vt-confirmed-control-variants\[data-control-size="28"\][\s\S]*?justify-items:\s*center/);
  assert.match(styles, /\.vt-confirmed-word-toggle-family \.vt-confirmed-control-variants\[data-control-size="28"\][\s\S]*?justify-self:\s*center !important/);
  assert.match(completeCatalog, /CONTROL_SKINS\.slice\(0, 3\)/);
  assert.match(completeCatalog, /Array\(6\)\.fill\(false\)/);
  assert.match(fieldCss, /\.vt-complete-catalog \.vt-catalog-word-toggle-families \.vt-catalog-control-variants\.is-word-toggle-44\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) !important/);
  assert.match(fieldCss, /\.vt-complete-catalog \.vt-catalog-word-toggle-families \.vt-catalog-control-variants\.is-word-toggle-28\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\) !important/);
  assert.match(fieldCss, /\.vt-complete-catalog \.vt-catalog-word-toggle-families \.vt-catalog-control-variant > small\s*\{[\s\S]*?text-align:\s*center/);
});

test("canonical Studio button tokens and CSS agree on flat stationary defaults", () => {
  const css = controlStyles;
  const tokens = readFileSync("src/studio-ui/tokens.ts", "utf8");
  assert.doesNotMatch(css, /--vt-studio-control-shadow-x|--vt-studio-control-shadow-y|--vt-studio-motion-button|--vt-studio-motion-press/);
  assert.match(css, /button\[data-vt-studio-button="true"\] > \[data-vt-studio-button-face\][^}]*position:\s*relative/);
  assert.match(tokens, /STUDIO_CONTROL_FLAT_INTERACTION_DEFAULTS\s*=\s*\{[^}]*buttonShadowX:\s*0,[^}]*buttonShadowY:\s*0,[^}]*hoverTransitionMs:\s*0,[^}]*hoverOffsetPx:\s*0,[^}]*clickTransitionMs:\s*0,[^}]*clickOffsetPx:\s*0/);
  assert.match(tokens, /standard: \{[^}]*\.\.\.STUDIO_CONTROL_FLAT_INTERACTION_DEFAULTS/);
  assert.match(tokens, /compact:\s*\{[^}]*\.\.\.STUDIO_CONTROL_FLAT_INTERACTION_DEFAULTS/);
  assert.match(tokens, /textInput: \{[^}]*letterSpacing:\s*-0\.02/);
  assert.match(css, /--vt-studio-control-icon-size:38px; --vt-studio-control-icon-stroke:1\.9;/);
  assert.match(css, /--vt-studio-control-icon-size:24px; --vt-studio-control-icon-stroke:2\.0;/);
});

test("confirmed library describes the actual default icon preset and component-specific geometry", () => {
  const controls = readFileSync("src/studio-ui/primitives/StudioControls.tsx", "utf8");
  const tokens = readFileSync("src/studio-ui/tokens.ts", "utf8");
  const css = controlStyles;
  assert.match(controls, /iconSizeVariant = "large"/);
  assert.match(controls, /default large icon preset is 38px \/ 1\.9 stroke standard and 24px \/ 2\.0 stroke compact/);
  assert.match(css, /Icon buttons default to the large production preset: 38px\/1\.9 standard and 24px\/2 compact/);
  assert.match(catalog, /default production preset is 38px \/ 1\.9 stroke standard and 24px \/ 2\.0 compact/);
  assert.match(catalog, /Icon presets:<\/b> the default production preset is 38px \/ 1\.9 stroke standard and 24px \/ 2\.0 compact/);
  assert.match(css, /button\.vt-studio-44-choice\.is-rect\s*\{\s*border-radius:\s*7\.333px/);
  assert.match(tokens, /standard: \{[^}]*letterSpacing:\s*-0\.02/);
  assert.match(tokens, /compact:\s*\{[^}]*letterSpacing:\s*-0\.02/);
});

test("catalog labels dropdown and action specimens according to their actual initial state and CSS", () => {
  assert.ok(catalog.includes("44px standard · selected values · multiselect trigger"));
  assert.ok(catalog.includes("28px compact A · closed trigger and count"));
  assert.ok(catalog.includes("28px compact B · closed trigger and count"));
  assert.ok(!catalog.includes("open menu · multiselect"));
  assert.ok(catalog.includes("Dedicated 56px action family with 20px label typography; it is not a third ordinary-button size."));
});

test("word-toggle settings document alternate skins; behavior stays in the production primitive", () => {
  assert.ok(catalog.includes("Alternate active-handle skins: COLOR SWAP and BLACK."));
  assert.ok(!catalog.includes("False selects the first word and true the second; custom words change labels, not the boolean state contract."));
  assert.match(controls, /aria-pressed=\{value === \(index === 1\)\}/);
  assert.match(controls, /onClick=\{\(\) => onValueChange\?\.\(index === 1\)\}/);
});

test("icon-effect examples are clearly static previews, not live outcome claims", () => {
  const squareStart = catalog.indexOf('<Family title="Square Icon Button · 44px + 28px"');
  const splitStart = catalog.indexOf('<Family title="Split-left"', squareStart);
  const squareFamily = catalog.slice(squareStart, splitStart);
  assert.ok(squareFamily.includes("NOTIFICATION BADGE · STATIC PREVIEW"));
  assert.ok(squareFamily.includes("SUCCESS STATE · STATIC PREVIEW"));
  assert.ok(squareFamily.includes("notification needs a real count/status and success must follow actual operation success."));
  assert.ok(!squareFamily.includes("SUCCESS · CONFIRMED OUTCOME"));
});

test("global defaults use a compact collapsed panel with an explicit expand affordance", () => {
  assert.ok(catalog.includes('className="vt-confirmed-defaults-details"'));
  assert.ok(catalog.includes("Show current defaults, effective CSS behavior, and exceptions"));
  assert.match(styles, /\.vt-confirmed-defaults-details\s*\{/);
});


test("confirmed Square Icon Button family catalogs every interaction effect at standard and compact sizes", () => {
  const squareStart = catalog.indexOf('<Family title="Square Icon Button · 44px + 28px"');
  const splitStart = catalog.indexOf('<Family title="Split-left"', squareStart);
  assert.ok(squareStart >= 0, "confirmed Square Icon Button family exists");
  assert.ok(splitStart > squareStart, "Square Icon Button family has a bounded catalog section");
  const squareFamily = catalog.slice(squareStart, splitStart);
  for (const effect of ['animate sizeVariant="standard"', 'animate sizeVariant="compact"', 'effect="notification"', 'effect="rotated-toggle"', 'effect="flip"', 'effect="tooltip"', 'effect="morph"', 'effect="success"']) {
    assert.ok(squareFamily.includes(effect), `confirmed Square Icon Button family includes ${effect}`);
  }
  assert.match(squareFamily, /44px standard · variants 1–4/);
  assert.match(squareFamily, /28px compact · variants 1–4/);
  assert.match(squareFamily, /StudioSquareIconButton · v1\/v2\/v3\/v4 \+ seven effects/);
  assert.match(styles, /\.vt-confirmed-square-effect-grid\s*\{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.vt-confirmed-square-effect-grid\s*\{\s*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(controls, /squareIconButtonDefaults:[\s\S]*?rotatedToggle:[\s\S]*?flip:[\s\S]*?tooltip:[\s\S]*?morph:[\s\S]*?success:/);
});


test("confirmed square icon button variants 1–4 are grouped into one standard row and one compact row", () => {
  assert.match(catalog, /vt-confirmed-square-variant-row[^]*?44px standard · variants 1–4[^]*?variant="v1" sizeVariant="standard"[^]*?variant="v4" sizeVariant="standard"/);
  assert.match(catalog, /vt-confirmed-square-variant-row[^]*?28px compact · variants 1–4[^]*?variant="v1" sizeVariant="compact"[^]*?variant="v4" sizeVariant="compact"/);
  assert.match(styles, /\.vt-confirmed-square-variant-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4, minmax\(0, max-content\)\)/);
});

test("square icon interaction effect specimens preserve two effect cards per row", () => {
  assert.match(styles, /\.vt-confirmed-square-effect-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media\s*\(max-width:\s*520px\)[\s\S]*?\.vt-confirmed-square-effect-grid\s*\{\s*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
});

test("confirmed stepper standard and compact specimens share one comparison row", () => {
  assert.match(catalog, /vt-confirmed-stepper-row[^]*?44px standard · interactive[^]*?size="standard"[^]*?28px compact · interactive[^]*?size="compact"/);
  assert.match(styles, /\.vt-confirmed-stepper-row-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
});

test("confirmed spectrum tag gallery shows 50 alphabetically sorted production specimens", () => {
  assert.match(catalog, /50 continuous alphabetical spectrum samples/);
  const tagGrid = catalog.match(/className="vt-confirmed-spectrum-tag-grid"[^]*?<\/div>/)?.[0] ?? "";
  const labels = [...tagGrid.matchAll(/<StudioSpectrumTag label="([A-Z]+)"\s*\/>/g)].map(match => match[1]);
  assert.equal(labels.length, 50, "expected 50 canonical StudioSpectrumTag specimens");
  assert.deepEqual(labels, [...labels].sort((a, b) => a.localeCompare(b)), "tag labels stay in alphabetical order");
  assert.equal(new Set(labels).size, 50, "each specimen label is unique");
  for (const initial of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") assert.ok(labels.some(label => label.startsWith(initial)), `spectrum gallery includes ${initial}`);
  assert.match(styles, /\.vt-confirmed-spectrum-tag-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5, minmax\(0, max-content\)\)/);
});

test("alphabetical tag colors interpolate continuously between canonical palette stops", () => {
  assert.match(palette, /export const resolveAlphabeticalSpectrumPosition/);
  assert.match(palette, /Math\.pow\(27, index \+ 1\)/);
  assert.match(palette, /const interpolateSpectrumColor = \(position: number\)/);
  assert.match(palette, /from \+ \(to - from\) \* blend/);
  assert.match(palette, /interpolateSpectrumColor\(resolveAlphabeticalSpectrumPosition\(label\)\)/);
});

test("44px switch/choice controls use the registered rectangular reference radius", () => {
  assert.match(controlStyles, /button\.vt-studio-44-choice\.is-rect\s*\{[^}]*border-radius:\s*7\.333px/s);
  assert.ok(catalog.includes("CHECKMARK CHECKBOX"));
  assert.ok(catalog.includes("WIDE-X CHECKBOX"));
});


test("confirmed composite controls are represented in the production catalog", () => {
  for (const name of ["StudioPlayPauseButton", "StudioCircleIconButton", "StudioUsernameInput"]) {
    assert.ok(catalog.includes(name), `catalog includes ${name}`);
    assert.ok(catalog.includes(`data-vt-library-component="${name}"`), `${name} has a library specimen marker`);
    assert.match(controls, new RegExp(`export const ${name}\b`), `${name} is a production export`);
  }
  assert.match(catalog, /Play\/Pause Split-left Button · 44px \+ 28px/);
  assert.match(catalog, /Circle Icon Button · 44px \+ 28px/);
  assert.match(catalog, /Username Split-left Input · 44px \+ 28px/);
});

test("non-default settings and TSX/CSS/import provenance are collapsed by default", () => {
  assert.match(catalog, /<details className="vt-confirmed-source-details">\s*<summary>Settings \+ source<\/summary>/);
  assert.match(catalog, /NON-DEFAULT SETTINGS/);
  assert.match(catalog, /TSX: <code>/);
  assert.match(catalog, /CSS: <code>/);
  assert.match(catalog, /Imports:/);
  assert.match(styles, /\.vt-confirmed-source-details\s*\{/);
});

test("confirmed captions are one line while Studio primitive roots retain token typography", () => {
  assert.match(styles, /\.vt-confirmed-variant > span:not\(\[data-vt-studio-control="true"\]\)\s*\{[^}]*max-width:\s*40ch[^}]*text-overflow:\s*ellipsis[^}]*white-space:\s*nowrap/s);
  assert.doesNotMatch(styles, /\.vt-confirmed-variant > span\s*\{/);
  assert.match(styles, /\.vt-confirmed-split-left-badge-family > span:not\(\.vt-studio-split-left-badge\)\s*\{/);
  assert.match(styles, /\.vt-complete-catalog \.vt-catalog-field:not\(\[data-vt-studio-control="true"\]\)\s*\{/);
  assert.doesNotMatch(styles, /\.vt-complete-catalog \.vt-catalog-field\s*\{/);
  assert.match(styles, /\.vt-confirmed-family > h3\s*\{[^}]*max-width:\s*40ch[^}]*white-space:\s*nowrap/s);
});

test("confirmed textareas use the full width of their variant row", () => {
  assert.match(styles, /\.vt-confirmed-variant:has\(textarea\)[\s\S]*?grid-column:\s*1 \/ -1/);
  assert.match(styles, /\.vt-confirmed-catalog textarea,[\s\S]*?width:\s*100% !important/);
});

test("composite controls and prop types are exported from the public Studio entry point", () => {
  const publicIndex = readFileSync("src/studio-ui/index.ts", "utf8");
  for (const name of [
    "StudioCircleIconButton", "StudioPlayPauseButton", "StudioUsernameInput",
    "StudioCircleIconButtonProps", "StudioPlayPauseButtonProps", "StudioUsernameInputProps"
  ]) {
    assert.ok(publicIndex.includes(name), `public entry point exports ${name}`);
  }
});

test("50 spectrum samples cover all 26 alphabetic initials", () => {
  const tagGrid = catalog.match(/className="vt-confirmed-spectrum-tag-grid"[^]*?<\/div>/)?.[0] ?? "";
  const labels = [...tagGrid.matchAll(/<StudioSpectrumTag label="([A-Z]+)"/g)].map(match => match[1]);
  assert.equal(labels.length, 50);
  for (const initial of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    assert.ok(labels.some(label => label.startsWith(initial)), `spectrum gallery includes initial ${initial}`);
  }
});

test("component descriptions above specimens stay on one compact line", () => {
  assert.match(styles, /\.vt-confirmed-family > p\s*\{[^}]*max-width:\s*40ch[^}]*text-overflow:\s*ellipsis[^}]*white-space:\s*nowrap/s);
});


test("confirmed primitive library layout uses a shared 4px grid rhythm", () => {
  const marker = "/* Confirmed Primitive Library 4px grid contract */";
  const gridContract = styles.slice(styles.lastIndexOf(marker));
  assert.ok(gridContract.length > marker.length, "the final grid contract override exists");
  assert.match(gridContract, /--vt-confirmed-grid-unit:\s*4px/);
  assert.match(gridContract, /\.vt-confirmed-catalog\s*\{[^}]*gap:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 3\)/s);
  assert.match(gridContract, /\.vt-confirmed-family\s*\{[^}]*gap:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 2\)/s);
  assert.match(gridContract, /\.vt-confirmed-variants\s*\{[^}]*gap:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 2\)/s);
  assert.match(gridContract, /\.vt-confirmed-variant\s*\{[^}]*gap:\s*var\(--vt-confirmed-grid-unit\)/s);
  assert.match(gridContract, /\.vt-confirmed-control-family\s*\{[^}]*gap:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 3\)/s);
  assert.match(gridContract, /\.vt-confirmed-choice-example-row[^{}]*\{[^}]*gap:\s*var\(--vt-confirmed-grid-unit\)/s);
  assert.match(gridContract, /\.vt-confirmed-stepper-row-grid[^{}]*\{[^}]*gap:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 2\)/s);
});

test("confirmed primitive library grids collapse responsively without fractional or negative spacing", () => {
  assert.match(styles, /\.vt-confirmed-variants\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
  const marker = "/* Confirmed Primitive Library 4px grid contract */";
  const gridContract = styles.slice(styles.lastIndexOf(marker));
  assert.match(gridContract, /@media\s*\(max-width:\s*560px\)[\s\S]*?\.vt-confirmed-variants\s*\{[^}]*min-width:\s*0/);
  assert.match(gridContract, /\.vt-confirmed-variant\s*\{[^}]*min-width:\s*0/s);
});


test("confirmed library keeps the shared 4px grid hierarchy without blanket nested spacing overrides", () => {
  assert.match(styles, /--vt-confirmed-grid-unit:\s*4px/);
  assert.match(styles, /--vt-confirmed-space-1:\s*calc\(var\(--vt-confirmed-grid-unit\) \* 1\)/);
  assert.match(styles, /\.vt-confirmed-catalog\s*\{[^}]*gap:\s*var\(--vt-confirmed-space-3\)/s);
  assert.match(styles, /\.vt-confirmed-family\s*\{[^}]*gap:\s*var\(--vt-confirmed-space-2\)/s);
  assert.match(styles, /\.vt-confirmed-variants\s*\{[^}]*gap:\s*var\(--vt-confirmed-space-2\)/s);
  assert.match(styles, /\.vt-confirmed-variant\s*\{[^}]*gap:\s*var\(--vt-confirmed-space-1\)/s);
  assert.match(styles, /\.vt-confirmed-control-family\s*\{[^}]*gap:\s*var\(--vt-confirmed-space-3\)/s);
  assert.doesNotMatch(styles, /:where\(\[class\*="vt-confirmed-"\]:not\(\.vt-confirmed-catalog\)\)\s*\{[^}]*!important/s,
    "nested catalog selectors must not globally force every gap and padding to 4px");
  assert.match(styles, /@media\s*\(max-width:\s*560px\)[\s\S]*?\.vt-confirmed-variants\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
});


test("StudioButton library module applies the canonical 4px grid rhythm without changing button geometry", () => {
  const gridStart = styles.lastIndexOf(".vt-confirmed-button-family {");
  const gridEnd = styles.indexOf("/* Button catalog is arrangement-only", gridStart);
  const moduleGrid = styles.slice(gridStart, gridEnd < 0 ? undefined : gridEnd);
  assert.ok(moduleGrid.length > 80, "the scoped StudioButton grid contract exists");
  assert.match(moduleGrid, /\.vt-confirmed-button-family\s*\{[^}]*gap:\s*var\(--vt-confirmed-grid-unit(?:,\s*4px)?\)/s);
  assert.match(moduleGrid, /\.vt-confirmed-button-family\s*>\s*\.vt-confirmed-variants\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)[^}]*gap:\s*var\(--vt-confirmed-grid-unit(?:,\s*4px)?\)/s);
  assert.match(moduleGrid, /\.vt-confirmed-button-family\s*>\s*\.vt-confirmed-variants\s*>\s*\.vt-confirmed-variant\s*\{[^}]*gap:\s*var\(--vt-confirmed-grid-unit(?:,\s*4px)?\)/s);
  assert.match(moduleGrid, /\.vt-confirmed-button-family\s*>\s*\.vt-confirmed-variants\s*>\s*\.vt-confirmed-variant\.is-full-row\s*\{[^}]*grid-column:\s*1 \/ -1/s);
  assert.doesNotMatch(moduleGrid, /(?:height|min-height|font-size|border-width|border-radius|box-shadow)\s*:/, "catalog layout must not restyle production StudioButton geometry");
});


test("confirmed primitive catalog exposes current representative and family modules", () => {
  assert.match(catalog, /title="Direct Imported Primitive Representatives · Standard"/);
  assert.match(catalog, /const ConfirmedStudioButtonFamily/);
  assert.match(catalog, /id: "1-supreme-full"/);
  assert.match(catalog, /id: "7-compact-and-micro"/);
  assert.match(catalog, /const ConfirmedStudioSplitButtonFamily/);
  assert.match(catalog, /const ConfirmedStudioDropdownFamily/);
  assert.match(catalog, /const CanonicalSplitBadgeFamily/);
});

test("canonical StudioButton family keeps proportional rows while catalog CSS owns arrangement only", () => {
  const buttonFamily = catalog.match(/const ConfirmedStudioButtonFamily:[^]*?\n}\n\ntype ConfirmedCatalogFamilyName/)?.[0] ?? "";
  assert.ok(buttonFamily.includes("layoutRows={layoutRows}"));
  assert.ok(buttonFamily.includes("sizeVariant={tier}"));
  assert.ok(buttonFamily.includes('id: "1-supreme-full"'));
  assert.ok(buttonFamily.includes('id: "5-standard-fractions"'));
  assert.ok(buttonFamily.includes('id: "6-compact-fractions"'));
  assert.ok(buttonFamily.includes('id: "7-compact-and-micro"'));
  const buttonCss = styles.slice(styles.indexOf("/* Button catalog is arrangement-only"), styles.indexOf("/* Dense, collapsed Global Defaults"));
  assert.match(buttonCss, /\.vt-confirmed-button-skin\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(buttonCss, /(?:height|min-height|font-size|border-width|border-radius|box-shadow)\s*:/,
    "catalog layout must not redefine production StudioButton geometry");
});

test("StudioButton catalog styles contain labels without retired V1-V7 skin overrides", () => {
  const buttonCss = styles.slice(styles.indexOf("/* Button catalog is arrangement-only"), styles.indexOf("/* Dense, collapsed Global Defaults"));
  assert.match(buttonCss, /\.vt-confirmed-button-skin\s*>\s*\[data-vt-studio-button-face\]/);
  assert.match(buttonCss, /overflow:\s*hidden/);
  assert.doesNotMatch(buttonCss, /data-vt-button-skin/);
  assert.doesNotMatch(buttonCss, /overflow-wrap:\\s*anywhere/,
    "the catalog must not override StudioButton's own text containment policy");
});

test("PR #756 row hierarchy uses the requested proportional sizes and compact/micro split", () => {
  const buttonFamily = catalog.match(/const ConfirmedStudioButtonFamily:[^]*?\n}\n\ntype ConfirmedCatalogFamilyName/)?.[0] ?? "";
  assert.match(buttonFamily, /row-1.*144/s);
  assert.match(buttonFamily, /row-2a.*72/s);
  assert.match(buttonFamily, /row-5-third.*48/s);
  assert.match(buttonFamily, /row-5-quarter.*36/s);
  assert.match(buttonFamily, /row-5-sixth.*24/s);
  assert.match(buttonFamily, /row-5-eighth-a.*18/s);
  assert.match(buttonFamily, /row-6-two-ninths.*32/s);
  assert.match(buttonFamily, /row-6-ninth.*16/s);
  assert.match(buttonFamily, /row-6-twelfth.*12/s);
  assert.match(buttonFamily, /7 compact · half module/);
  assert.match(buttonFamily, /7A–7B micro · half module/);
});

test("confirmed primitive families have no Compounds bucket and retain Compositions", () => {
  const familyUnion = catalog.slice(catalog.indexOf("type ConfirmedCatalogFamilyName"), catalog.indexOf("const classifyConfirmedCatalogItem"));
  assert.doesNotMatch(familyUnion, /"Compounds"/);
  assert.match(familyUnion, /"Compositions"/);
  assert.ok(catalog.includes('return "Compositions"'));
});

test("StudioDropdown owns the simple variant without a duplicate primitive family", () => {
  assert.doesNotMatch(catalog, /StudioSimpleDropdown|Simple Dropdown · Single Selection/);
  assert.doesNotMatch(catalog, /<StudioDropdown variant="simple"/);
  assert.match(catalog, /<StudioDropdown sizeVariant="standard" ariaLabel="Studio dropdown standard specimen"/);
});

test("StudioSplitTextInput is a real exported primitive with a full-width standard specimen", () => {
  const splitInput = readFileSync("src/studio-ui/primitives/StudioSplitTextInput.tsx", "utf8");
  const publicIndex = readFileSync("src/studio-ui/index.ts", "utf8");
  assert.match(splitInput, /export const StudioSplitTextInput/);
  assert.ok(publicIndex.includes("StudioSplitTextInput"));
  assert.ok(catalog.includes('data-vt-library-component="StudioSplitTextInput"'));
  assert.ok(catalog.includes('aria-label="Split text input standard specimen"'));
});


test("confirmed primitive grid is visible first and covers core and advanced Studio designs", () => {
  const top = catalog.slice(catalog.indexOf("export const StudioHubConfirmedPrimitiveCatalog"));
  assert.match(top, /<ConfirmedPrimitiveGridOverview\s*\/>\s*<ConfirmedDirectPrimitiveRows\s*\/>/);
  const grid = catalog.match(/const ConfirmedPrimitiveGridOverview:[^]*?\n}\n\nconst ConfirmedDirectPrimitiveRows/)?.[0] ?? "";
  assert.match(grid, /<StudioComponentGrid cols=\{3\} rows=\{3\} size="standard"/);
  for (const primitive of [
    "StudioButton",
    "StudioSplitLeftButton",
    "StudioDropdown",
    "StudioTextInput",
    "StudioTextArea",
    "StudioCounter",
    "StudioSideCounter",
    "StudioDoubleSplitSlider",
    "StudioArrowToggle",
  ]) assert.ok(grid.includes(`data-vt-library-component="${primitive}"`), `top grid is missing ${primitive}`);
  for (const primitive of [
    "StudioDoubleSplitButton",
    "StudioSplitLeftDropdown",
    "StudioLegendMultiDropdown",
    "StudioDoubleSplitBadge",
    "StudioWordToggle",
    "StudioSwitch",
    "StudioUploadFrame",
    "StudioSplitAccordion",
    "StudioInterModule",
  ]) assert.ok(catalog.includes(`data-vt-library-component="${primitive}"`), `catalog is missing ${primitive}`);
  assert.ok(grid.includes("const [splitButtonPressed, setSplitButtonPressed] = React.useState(false)"));
  assert.ok(grid.includes("onClick={() => setSplitButtonPressed(value => !value)}"));
  assert.ok(grid.includes('{splitButtonPressed ? "SELECTED" : "SPLIT LEFT"}'));
});


test("canonical grouped families do not render a second duplicate individual-controls section", () => {
  assert.doesNotMatch(catalog, /<ConfirmedIndividualPrimitiveSections\s*\/>/);
  assert.doesNotMatch(catalog, /const ConfirmedIndividualPrimitiveSections\s*:/);
  assert.match(catalog, /<CanonicalControlFamilies\s*\/>/);
  assert.match(catalog, /<CanonicalWordToggleFamily\s*\/>/);
  assert.match(catalog, /<ConfirmedStudioValueToggleFamily\s*\/>/);
});

 
test("split-left, split-right, double-split, and two-line buttons share one family", () => {
  const family = catalog.match(/const ConfirmedStudioSplitButtonFamily:[\s\S]*?const ConfirmedStudioDropdownFamily/)?.[0] ?? "";
  for (const primitive of [
    "StudioSplitLeftButton",
    "StudioSplitRightButton",
    "StudioDoubleSplitButton",
    "StudioTwoLineButton",
    "StudioSplitTwoLineButton",
  ]) assert.ok(family.includes(primitive), `split family is missing ${primitive}`);
  assert.match(family, /const sizes = \["supreme", "standard", "compact", "mini", "micro"\] as const/);
  assert.match(family, /StudioSplitLeftButton sizeVariant=\{size\}/);
  assert.match(family, /size === "standard" \|\| size === "compact"/);
  assert.match(family, /StudioSplitRightButton sizeVariant=\{size\}/);
  assert.match(family, /StudioDoubleSplitButton sizeVariant=\{size\}/);
  assert.doesNotMatch(catalog, /title="StudioSplitRightButton · Standard"|title="Two-Line Button · Standard \+ Compact"|title="Split Two-Line Button · Standard \+ Compact"/);
});

test("counter and slider primitive modules preserve the global full-row auto-width contract", () => {
  const moduleTitles = [
    "StudioCounter",
    "StudioSideCounter",
    "StudioDoubleSplitSlider",
    "StudioLeftWordCounter",
    "StudioDoubleSplitWordCounter",
    "StudioLeftWordSlider",
  ];
  for (const title of moduleTitles) {
    assert.ok(catalog.includes(`title="${title}`), `${title} module remains in the confirmed library`);
    assert.ok(styles.includes(`.vt-confirmed-family[data-vt-primitive-title^="${title}"]`),
      `${title} module has an explicit full-row layout contract`);
  }
  assert.match(styles, /\.vt-confirmed-family\[data-vt-primitive-title\^="StudioCounter"\][\s\S]*?grid-column:\s*1 \/ -1;[\s\S]*?justify-self:\s*stretch;[\s\S]*?width:\s*100%/);
  assert.match(styles, /\.vt-confirmed-counter-size-row,[\s\S]*?justify-items:\s*stretch;[\s\S]*?width:\s*100%/);
  for (const root of [
    ".vt-studio-counter",
    ".vt-studio-side-counter",
    ".vt-studio-double-split-slider",
    ".vt-studio-left-word-counter",
    ".vt-studio-value-toggle.vt-studio-word-counter",
    ".vt-studio-left-word-slider",
  ]) assert.ok(styles.includes(root), `${root} inherits the module width contract`);
  assert.doesNotMatch(styles, /\.vt-confirmed-direct-primitive-rows > \.vt-confirmed-variant > :is\([^}]+\)\s*\{\s*justify-self:\s*center/);
  assert.doesNotMatch(styles, /\.vt-confirmed-counter-size-row > :is\([^}]+\)\s*\{\s*justify-self:\s*center/);
});



test("six confirmed counter and slider families stretch through every catalog wrapper", () => {
  const familyNames = [
    "StudioCounter",
    "StudioSideCounter",
    "StudioDoubleSplitSlider",
    "StudioLeftWordCounter",
    "StudioDoubleSplitWordCounter",
    "StudioLeftWordSlider",
  ];
  for (const name of familyNames) {
    assert.ok(styles.includes(`[data-vt-primitive-title^="${name}"]`), `${name} family is included in the full-row contract`);
  }
  assert.match(styles, /\.vt-confirmed-family:is\([\s\S]*?\)\s*\{[\s\S]*?grid-column:\s*1 \/ -1;[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*none;/);
  assert.match(styles, /\.vt-confirmed-family:is\([\s\S]*?\)\s+:is\(\.vt-studio-counter,[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*none;/);
});
