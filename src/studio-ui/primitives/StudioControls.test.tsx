import React from "react"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { StudioActionButton, StudioButton, StudioTwoLineButton, StudioSplitTwoLineButton, StudioSquareIconButtonGroup, StudioTopSplitModule, StudioSplitLeftBadge, StudioDoubleSplitBadge, StudioSplitLeftButton, StudioSplitLeftDropdown, StudioDropdown, StudioSquareIconButton, StudioCircleIconButton, StudioPlayPauseButton, StudioLegendMultiDropdown, StudioSimpleDropdown, StudioTextArea, StudioTextBox, StudioTextInput, StudioWordToggle, StudioSwitch, StudioRadio, StudioSpectrumTag, StudioChoice, StudioUploadFrame, StudioSideCounter, StudioDoubleSplitSlider, StudioLeftWordCounter, StudioLeftWordSlider, normalizeStudioLeftWordIndex, STUDIO_LEFT_WORD_OPTIONS, StudioVerticalWordToggle, StudioCloseableBadge, StudioBrainStatusBadge, StudioBrainStatusIndicator, STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS, getStudioCounterRepeatDelay } from "./StudioControls"
import { StudioHubCompletePrimitiveCatalog } from "../../components/studio-hub/StudioHubCompletePrimitiveCatalog"
import { StudioHubConfirmedPrimitiveCatalog } from "../../components/studio-hub/StudioHubConfirmedPrimitiveCatalog"
import { STUDIO_CONTROL_SIZE_BASE, type StudioControlSize, studioSizeTierToCssVars } from "../tokens"
import { StudioSplitTextInput } from "./StudioSplitTextInput"

const readStudioControlCss = () => [
  "studio-control-system.css",
  "studio-control-core.css",
  "studio-control-split.css",
  "studio-control-fields.css",
  "studio-control-distill-overrides.css",
  "studio-control-recovery-overrides.css",
  "studio-control-word-counter.css",
  "studio-control-value-toggles.css",
].map((file) => readFileSync(resolve(process.cwd(), "src/styles", file), "utf8")).join("\n");

const canonicalTail = (css: string) => {
  const start = css.lastIndexOf("/* Canonical Studio Controls contract");
  return start >= 0 ? css.slice(start) : css;
};


describe("StudioTextBox size-aware primary inline stroke defaults", () => {
  it("shares full field geometry while keeping black text and matching black glyph stroke", () => {
    const css = readStudioControlCss();
    const start = css.indexOf('.vt-studio-text-box[data-vt-studio-control="true"]');
    const end = css.indexOf("/* Textarea and read-only text display share", start);
    const textBox = css.slice(start, end);
    expect(textBox).toContain("border: var(--vt-studio-control-stroke, 3px) solid #000");
    expect(textBox).toContain("outline: calc(var(--vt-studio-control-stroke, 3px) * var(--vt-studio-focus-outline-width-ratio, .65)) solid var(--vt-field-secondary");
    expect(textBox).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) #000;");
    expect(textBox).toContain("var(--vt-studio-control-default-fill-opacity, 50%)");
    expect(textBox).toContain("color: #000");
    expect(textBox).toContain("line-height: var(--vt-studio-textarea-line-height, .85)");
    expect(textBox).toContain('[data-size="compact"]');
    expect(textBox).toContain('[data-size="micro"]');
    expect(textBox).toContain('[data-size="mini"]');
  });
});

describe("Studio badge single-size contract", () => {
  it("renders closeable and Brain status badges at the single standard size", () => {
    const closeable = renderToStaticMarkup(<StudioCloseableBadge label="Featured" sizeVariant="micro" />);
    const brain = renderToStaticMarkup(<StudioBrainStatusBadge label="Learning" sizeVariant="micro" />);
    const indicator = renderToStaticMarkup(<StudioBrainStatusIndicator status="running" label="Ready" size="micro" />);
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(closeable).toContain('data-size="standard"');
    expect(brain).toContain('data-size="standard"');
    expect(indicator).toContain('data-size="standard"');
    expect(css).toContain("font: 1000 18px/20px Inter");
    expect(css).toContain("border-radius: 4px;");
    expect(css).toContain("transform: translateY(.5px);");
    const brainLed = css.slice(css.indexOf(".vt-studio-brain-status-badge__core {"), css.indexOf("@keyframes vt-studio-brain-led-ripple"));
    expect(brainLed).toContain("background-color: var(--vt-brain-led-color);");
    expect(brainLed).toContain("radial-gradient(circle at 38% 32%, #fff 0 22%, var(--vt-brain-led-color) 23% 76%, color-mix(in srgb, var(--vt-brain-led-color) 78%, #000) 100%)");
    expect(brainLed).toContain("opacity: 1;");
    expect(brainLed).toContain("border: 2px solid var(--vt-brain-led-color);");
    expect(brainLed).toContain("vt-studio-brain-led-ripple 8s cubic-bezier(.16,1,.3,1) infinite");
    expect(brainLed).toContain("transform: scale(1);");
    expect(brainLed).toContain("37.5% { transform: scale(5); opacity: 0; }");
    expect(css).toContain("background: #fff;");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain(".vt-studio-upload-frame:has(.vt-studio-upload-frame__input:focus-visible)");
    expect(css).toContain("@media (max-width: 460px)");
  });
});

describe("canonical Studio upload frame", () => {
  it("renders the standard upload frame with accessible file input and layered pair-color anatomy", () => {
    const html = renderToStaticMarkup(<StudioUploadFrame aria-label="Upload media" />);
    expect(html).toContain('data-vt-studio-upload-frame="true"');
    expect(html).toContain('data-vt-library-component="StudioUploadFrame"');
    expect(html).toContain('data-size="standard"');
    expect(html).toContain('type="file"');
    expect(html).toContain('aria-label="Upload media"');
    expect(html).toContain('class="vt-studio-upload-frame__layers"');
    expect(html).toContain('class="vt-studio-upload-frame__layer vt-studio-upload-frame__layer--core"');
    expect(html).toContain('class="vt-studio-upload-frame__inset"');
    expect(html).toContain('class="vt-studio-upload-frame__layers"');
    expect(html).toContain('class="vt-studio-upload-frame__center"');
    expect(html).toContain('class="vt-studio-upload-frame__icon"');
    expect(html).toContain('class="vt-studio-upload-frame__label"');
    expect((html.match(/vt-studio-upload-frame__layer/g) || []).length).toBeGreaterThanOrEqual(10);
    expect(html).not.toContain('vt-studio-upload-frame__badge-rail');
    expect(html).not.toContain('data-vt-studio-split="double"');
    const css = readStudioControlCss();
    expect(css).toContain('.vt-studio-upload-frame__inset::before');
    expect(css).toContain('.vt-studio-upload-frame__inset::after');
    expect(css).toContain('border: 4px solid var(--vt-studio-upload-primary)');
    expect(css).toContain('border: 2px solid var(--vt-studio-upload-secondary)');
    expect(css).toContain('aspect-ratio: 16 / 9');
    expect(html).toContain("Drop or choose file");
    expect(html).not.toContain("FA618A");
    expect(html).not.toContain("4EE4BE");
    expect(STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.uploadFrame.owner).toBe("StudioUploadFrame");
    expect(STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.uploadFrame.colorPair).toContain("--pair-a");
  });

  it("supports multiple file selection through the canonical upload frame", () => {
    const html = renderToStaticMarkup(<StudioUploadFrame multiple accept="image/*,video/*" aria-label="Vault asset import" />);
    expect(html).toContain('multiple=""');
    expect(html).toContain('accept="image/*,video/*"');
    expect(html).toContain('aria-label="Vault asset import"');
  });

  it("supports explicit single-select semantics in the shared legend dropdown", () => {
    const html = renderToStaticMarkup(<StudioLegendMultiDropdown label="Sort" accessibleLabel="Sort assets" selectionMode="single" value={["name-asc"]} options={[{ value: "name-asc", label: "NAME ASC" }, { value: "name-desc", label: "NAME DESC" }]} />);
    expect(html).toContain('data-vt-studio-dropdown-variant="single-select"');
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    expect(controls).toContain('aria-multiselectable={selectionMode === "multiple"}');
    expect(controls).toContain("setSelected([option.value])");
    expect(controls).toContain("setOpen(false)");
  });

  it("exposes compact sizing and uses the shared primary/secondary pair rather than fixed colors", () => {
    const html = renderToStaticMarkup(<StudioUploadFrame sizeVariant="compact" accept="image/*" aria-label="Compact upload" />);
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(html).toContain('data-size="compact"');
    expect(html).toContain('accept="image/*"');
    expect(html).not.toContain('data-vt-studio-split="double"');
    expect(html).not.toContain('vt-studio-upload-frame__badge-rail');
    expect(css).toContain(".vt-studio-upload-frame");
    expect(css).toContain("var(--pair-a");
    expect(css).toContain("var(--pair-b");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain(".vt-studio-upload-frame.is-drag");
    expect(css).toContain(".vt-studio-upload-frame.has-img");
    expect(css).toContain(".vt-studio-upload-frame__icon::before");
    expect(css).toContain(".vt-studio-upload-frame[data-size=\"compact\"]");
    expect(css).toContain("--vt-studio-upload-step: clamp(3px, 1cqw, 4px)");
    expect(css).toContain("border: 4px solid var(--vt-studio-upload-primary)");
    expect(css).toContain("border: 2px solid var(--vt-studio-upload-secondary)");
    const uploadFrameBlock = css.slice(css.indexOf(".vt-studio-upload-frame {"), css.indexOf(".vt-studio-upload-frame[data-size=\"compact\"]"));
    expect(uploadFrameBlock).toContain("aspect-ratio: 16 / 9;");
    expect(css).not.toMatch(/\.vt-studio-upload-frame\s*\{\s*aspect-ratio:\s*(?!16 \/ 9)/);
    expect(css).toContain("font-size: var(--vt-studio-28-font-size, 24px)");
    expect(css).toContain("font-weight: 1000");
    expect(css).toContain("letter-spacing: -.02em");
    expect(css).toContain("border-radius: 8px;");
    expect(css).toContain(".vt-studio-upload-frame__icon {");
    expect(css).toContain("overflow: visible");
    expect(css).toContain(".vt-studio-upload-frame__icon::before");
    expect(css).toContain(".vt-studio-upload-frame__icon::after");
    expect(css).toContain(".vt-studio-upload-frame.has-img .vt-studio-upload-frame__icon {");
    const legacyCatalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubCompletePrimitiveCatalog.tsx"), "utf8");
    const migrationCatalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubPrimitiveMigrationCatalog.tsx"), "utf8");
    expect(legacyCatalog).toContain('if (name === "Upload Frame") return');
    expect(legacyCatalog).toContain("<StudioUploadFrame");
    expect(legacyCatalog).not.toContain("SubToolboxFileTarget");
    expect(legacyCatalog).not.toContain("StudioSplitLeftInput");
    expect(migrationCatalog).toContain("<StudioUploadFrame");
    expect(migrationCatalog).not.toContain("StudioSplitLeftInput");
    expect(migrationCatalog).not.toContain("SubToolboxFileTarget");
  });
});

describe("Studio radio build, orbit, and spiral motion contract", () => {
  it("renders the animated indicator inside the stationary 44px radio shell", () => {
    const html = renderToStaticMarkup(<StudioChoice kind="radio" checked={false} aria-label="Animated radio" />)
    expect(html).toContain('data-radio-motion="build"')
    expect(html).toContain('data-radio-direction="on"')
    expect(html).toContain('class="vt-studio-radio-motion"')
    expect(html).toContain('class="vt-studio-radio-ring vt-studio-radio-ring-outer"')
    expect(html).toContain('class="vt-studio-radio-spiral vt-studio-radio-spiral-a"')
    expect(html).toContain('viewBox="0 0 44 44"')
    expect(html).toContain('class="vt-studio-radio-solid"')
    expect(html).not.toContain('data-radio-motion="inward"')
  })

  it("uses centered SVG attribute animation, clips motion to the control, and honors reduced motion", () => {
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-motion.css"), "utf8")
    expect(source).toContain("requestAnimationFrame")
    expect(source).toContain("prefers-reduced-motion: reduce")
    expect(source).toContain('translate(22 22) scale(')
    expect(source).toContain('cx="22" cy="22"')
    expect(css).toContain("overflow: hidden")
    expect(css).not.toContain(".vt-studio-radio-solid { opacity: 0; }")
    expect(css).not.toContain(".vt-studio-radio-rings { opacity: 0; }")
    expect(css).not.toContain(".vt-studio-radio-spirals { opacity: 0; }")
    expect(css).not.toContain("@keyframes vt-studio-radio-build")
    expect(css).not.toContain("@keyframes vt-studio-radio-orbit")
    expect(css).not.toContain("@keyframes vt-studio-radio-spiral")
    expect(source).toContain('opacity(rings, 0)');
    expect(source).toContain('opacity(solid, 1)');
    expect(source).toContain('r="16.5"');
    expect(css).toContain('color: var(--vt-studio-choice-indicator, var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b)))');
    expect(css).toContain('transition: color 270ms ease-out');
    expect(css).not.toContain('stroke: #000');
  })
})



describe("Studio choice color variants", () => {
  it("uses the shared four-variant background and indicator color contract for radios and checkboxes", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8")
    const motion = readFileSync(resolve(process.cwd(), "src/styles/studio-control-motion.css"), "utf8")
    expect(css).toContain("background: color-mix(in srgb, var(--vt-studio-control-accent, var(--pair-a, #36e0f6)) 50%, white)")
    expect(css).toContain("button[data-vt-studio-control=\"true\"].vt-studio-44-choice.is-color-swap.is-on")
    expect(css).toContain("background: var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b))")
    expect(css).toContain("--vt-studio-choice-indicator: var(--vt-studio-control-accent, var(--pair-a, #36e0f6))")
    expect(css).toContain("button[data-vt-studio-control=\"true\"].vt-studio-44-choice.is-black-indicator")
    expect(css).toContain("button[data-vt-studio-control=\"true\"].vt-studio-44-choice.is-white-indicator")
    expect(motion).toContain("transition: color 270ms ease-out")
  })
})

describe("Studio checkbox mark animation timing", () => {
  it("slows checkmark and x strokes by 50 percent and draws x strokes sequentially", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-motion.css"), "utf8")
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    expect(css).toContain("stroke-dashoffset 330ms")
    expect(css).toContain("stroke 270ms")
    expect(css).toContain("opacity 240ms")
    expect(css).toContain(".vt-studio-44-choice.is-checkbox.is-xwide svg path:nth-child(2)")
    expect(css).toContain("transition-delay: 330ms")
    expect(controls).toContain('d="M 10 10 L 40 40"')
    expect(controls).toContain('d="M 40 10 L 10 40"')
  })
})

describe("Studio dropdown chevron and split-left contract", () => {
  it("renders the split-left dropdown with a secondary icon rail and a trailing chevron", () => {
    const html = renderToStaticMarkup(<StudioSplitLeftDropdown aria-label="Mode" defaultValue="balanced" sizeVariant="compact" options={[{ value: "balanced", label: "Balanced" }, { value: "fast", label: "Fast" }]} />)
    expect(html).toContain('data-vt-studio-dropdown-variant="split-left"')
    expect(html).toContain('class="vt-studio-dropdown-split-rail"')
    expect(html).toContain('class="vt-studio-dropdown-split-rail vt-studio-dropdown-chevron is-trailing"')
    expect(html).toContain('data-vt-studio-dropdown-chevron="true"')
    expect(html).not.toContain('class="vt-studio-dropdown-chevron is-leading"')
    expect(html).toContain('aria-haspopup="listbox"')
    expect(html).toContain('data-size="compact"')
  })

  it("keeps simple dropdowns free of a split rail and places the chevron at the trailing edge", () => {
    const html = renderToStaticMarkup(<StudioSimpleDropdown aria-label="Simple mode" defaultValue="balanced" options={[{ value: "balanced", label: "Balanced" }]} />)
    expect(html).not.toContain('data-vt-studio-split-rail')
    expect(html).toContain('class="vt-studio-dropdown-chevron is-trailing"')
  })

  it("uses a fixed trailing chevron rail and canonical token ratio for regular dropdown menus", () => {
    const html = renderToStaticMarkup(<StudioDropdown aria-label="Mode" defaultValue="balanced" options={[{ value: "balanced", label: "Balanced" }]} />)
    expect(html).toContain('class="vt-studio-dropdown-chevron is-trailing"')
    const css = readStudioControlCss()
    expect(css).toContain('--vt-studio-dropdown-rail-size: var(--vt-studio-dropdown-compact-rail-size, 28px)')
    expect(css).toContain('--vt-studio-dropdown-chevron-size: var(--vt-studio-dropdown-compact-chevron-size, 18px)')
    expect(css).toContain('--vt-studio-dropdown-rail-size: var(--vt-studio-dropdown-standard-rail-size, 44px)')
    expect(css).toContain('--vt-studio-dropdown-chevron-size: var(--vt-studio-dropdown-standard-chevron-size, 28px)')
    expect(css).toContain('min-height: var(--vt-studio-control-height, 44px)')
  })
})

describe("standalone Studio text fields", () => {
  it("renders the standard text input with only canonical Studio field markers", () => {
    const html = renderToStaticMarkup(<StudioTextInput aria-label="Title" placeholder="Enter title" />)
    expect(html).toContain('data-vt-studio-control="true"')
    expect(html).toContain('data-vt-studio-field-kind="text-input"')
    expect(html).toContain('data-size="standard"')
    expect(html).toContain('type="text"')
    expect(html).not.toContain("subtoolbox")
  })

  it("renders compact text input with canonical compact size", () => {
    const html = renderToStaticMarkup(<StudioTextInput sizeVariant="compact" aria-label="Compact title" />)
    expect(html).toContain('data-size="compact"')
    expect(html).toContain('data-vt-studio-field-kind="text-input"')
  })

  it("renders standard and compact text areas without SubToolbox wrappers", () => {
    const standard = renderToStaticMarkup(<StudioTextArea aria-label="Description" />)
    const compact = renderToStaticMarkup(<StudioTextArea sizeVariant="compact" aria-label="Short description" />)
    expect(standard).toContain('data-vt-studio-field-kind="textarea"')
    expect(standard).toContain('data-size="standard"')
    expect(standard).toContain('rows="4"')
    expect(standard).not.toContain("subtoolbox")
    expect(compact).toContain('data-vt-studio-field-kind="textarea"')
    expect(compact).toContain('data-size="compact"')
  })

  it("renders StudioTextBox as readonly display surfaces across the supported size tiers", () => {
    const standard = renderToStaticMarkup(<StudioTextBox aria-label="Standard summary">First row{"\n"}Second row</StudioTextBox>)
    const supreme = renderToStaticMarkup(<StudioTextBox size="supreme" aria-label="Supreme summary">Supreme content</StudioTextBox>)
    const compact = renderToStaticMarkup(<StudioTextBox size="compact" aria-label="Compact summary">Compact content</StudioTextBox>)
    const mini = renderToStaticMarkup(<StudioTextBox size="mini" aria-label="Mini summary">Mini content</StudioTextBox>)
    const micro = renderToStaticMarkup(<StudioTextBox size="micro" aria-label="Micro summary">Micro content</StudioTextBox>)
    expect(standard).toContain('data-vt-studio-field-kind="textarea-display"')
    expect(standard).toContain('data-size="standard"')
    expect(standard).toContain('First row')
    expect(standard).toContain('Second row')
    expect(standard).not.toContain('contenteditable="true"')
    expect(standard).toContain('aria-readonly="true"')
    expect(standard).toContain('data-vt-studio-text-box="true"')
    expect(supreme).toContain('data-size="supreme"')
    expect(compact).toContain('data-size="compact"')
    expect(mini).toContain('data-size="mini"')
    expect(micro).toContain('data-size="micro"')
  })

  it("uses shared border geometry, black glyph stroke, and a proportional secondary outline for StudioTextBox", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    const block = css.match(/\.vt-studio-text-box\[data-vt-studio-control="true"\] \{([\s\S]*?)\n\}/)?.[1] ?? "";
    expect(css).toContain("--studio-text-box-stroke-width: var(--vt-studio-control-stroke, 3px);");
    expect(block).toContain("border: var(--vt-studio-control-stroke, 3px) solid #000;");
    expect(block).toContain("outline: calc(var(--vt-studio-control-stroke, 3px) * var(--vt-studio-focus-outline-width-ratio, .65)) solid var(--vt-field-secondary");
    expect(block).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) #000;");
    expect(block).toContain("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-field-primary");
    expect(block).toContain("outline-offset: 0;");
    expect(block).toContain("color: #000;");
    expect(block).toContain("-webkit-text-fill-color: #000;");
    expect(block).toContain("var(--vt-studio-control-default-fill-opacity, 50%)");
    expect(block).not.toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) var(--vt-field-primary");
    expect(css).not.toContain("--studio-text-box-stroke-width: calc(var(--field-border-width) * 0.5);");
    expect(css).not.toContain("-webkit-text-stroke-color: var(--vt-field-text-focus, #000);");
  });

  it("uses the shared 0.85 line-height token for textarea and text-box sizes", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8")
    const generated = readFileSync(resolve(process.cwd(), "src/styles/studio-control-vars.generated.css"), "utf8")
    expect(css).toContain("--vt-studio-textarea-line-height: .85;")
    expect(generated).toContain("--vt-studio-textarea-line-height: 0.85;")
    expect(css).not.toMatch(/line-height:\s*(?:0)?\.75\b/)
    expect(css.match(/line-height: var\(--vt-studio-textarea-line-height, \.85\)/g)).toHaveLength(6)
  })

  it("maps choice controls and horizontal word toggles through all five size tiers", () => {
    const miniSwitch = renderToStaticMarkup(<StudioSwitch checked={false} sizeVariant="mini" aria-label="Mini switch" />)
    const supremeRadio = renderToStaticMarkup(<StudioRadio checked={false} sizeVariant="supreme" aria-label="Supreme radio" />)
    const miniWordToggle = renderToStaticMarkup(<StudioWordToggle size="20" value={false} words={["OFF", "ON"]} onValueChange={() => {}} aria-label="Mini word toggle" />)
    expect(miniSwitch).toContain('data-size="mini"')
    expect(supremeRadio).toContain('data-size="supreme"')
    expect(miniWordToggle).toContain('data-size="mini"')
    expect(miniWordToggle).toContain('data-vt-word-toggle-size="20"')
    const overrides = readFileSync(resolve(process.cwd(), "src/styles/studio-control-distill-overrides.css"), "utf8")
    expect(overrides).toContain('.vt-studio-44-switch[data-vt-studio-control="true"]')
    expect(overrides).toContain('.vt-studio-44-choice[data-vt-studio-control="true"]')
    expect(overrides).toContain('.vt-studio-44-word-toggle[data-vt-word-toggle-size]')
  })

  it("keeps the plain input free of label wrappers while textarea labels remain separate", () => {
    const standardInput = renderToStaticMarkup(<StudioTextInput aria-label="Title" />)
    const compactInput = renderToStaticMarkup(<StudioTextInput sizeVariant="compact" aria-label="Compact title" />)
    const compactArea = renderToStaticMarkup(<StudioTextArea variant="fixed-label" label="DESCRIPTION" sizeVariant="compact" aria-label="Compact description" />)
    expect(standardInput).toContain('class="vt-studio-text-input vt-studio-text-input--simple"')
    expect(standardInput).not.toContain("vt-studio-floating-field")
    expect(standardInput).not.toContain("vt-studio-fixed-field-label")
    expect(standardInput).toContain('data-size="standard"')
    expect(compactInput).toContain('data-size="compact"')
    expect(compactArea).toContain('data-vt-studio-field-kind="textarea"')
    expect(compactArea).toContain('class="vt-studio-fixed-field-label"')
    expect(compactArea).toContain('rows="4"')
  })
})

describe("global defaults govern the effective primitive CSS", () => {
  it("uses secondary color for both double-split rails and keeps rail faces square", () => {
    const css = readStudioControlCss();
    const split = css.slice(css.indexOf("/* Unified split shell."));
    expect(split).toContain('.vt-studio-split-shell[data-vt-studio-split="double"] > [data-vt-studio-split-rail]');
    expect(split).toContain("Both double-split rails use secondary by contract.");
    const doubleRails = split.match(/\.vt-studio-split-shell\[data-vt-studio-split="double"\] > \[data-vt-studio-split-rail\],\s*\.vt-studio-double-split-badge__rail\s*\{[^}]*\}/)?.[0] || "";
    expect(doubleRails).toContain("background: var(--vt-studio-control-secondary);");
    expect(doubleRails).not.toMatch(/#ff7f6b|#36e0f6/);
    expect(split).toContain("border-radius: 0;");
    expect(split).toContain("place-items: center;");
  });

  it("does not use important declarations to force canonical field type or width", () => {
    const css = readStudioControlCss();
    const fieldStart = css.indexOf('input[data-vt-studio-control="true"],');
    const fieldEnd = fieldStart >= 0 ? css.indexOf("\n}", fieldStart) : -1;
    const fields = fieldStart >= 0 && fieldEnd > fieldStart ? css.slice(fieldStart, fieldEnd) : "";
    expect(fields).not.toMatch(/font-size:[^;]*!important/);
    expect(fields).not.toMatch(/line-height:[^;]*!important/);
    expect(fields).toContain("border: 0;");
    expect(fields).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) var(--vt-field-primary");
  });

  it("lets compact text buttons fill their row by default while keeping icon-only faces square", () => {
    const css = readStudioControlCss();
    expect(css).toContain('[data-vt-studio-control="true"] {');
    expect(css).toContain('width: 100%;');
    expect(css).toContain('[data-vt-studio-control="true"][data-vt-studio-width="content"] {');
    expect(css).toContain('width: fit-content;');
  });
});

describe("Studio text field library entries", () => {
  it("renders the standalone Studio text input and textarea in the complete catalog and the text box in the confirmed catalog", () => {
    const html = renderToStaticMarkup(<StudioHubCompletePrimitiveCatalog />);
    const confirmedHtml = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    expect(html).toContain('data-vt-library-component="StudioTextInput"');
    expect(html).toContain('data-vt-library-component="StudioTextArea"');
    expect(confirmedHtml).toContain('data-vt-library-component="StudioTextBox"');
    expect(confirmedHtml).toContain('aria-label="Studio text box standard"');
    expect(confirmedHtml).toContain('aria-label="Studio text box compact"');
    expect(confirmedHtml).toContain('aria-label="Studio text box micro"');
    expect(html).toContain('aria-label="Canonical Studio text input"');
    expect(html).toContain('aria-label="Canonical Studio text area"');
    expect(html).toContain('data-vt-studio-icon-button="true"');
    expect(html).toContain('data-icon-variant="v4"');
  });
});

describe("compact Studio button row-fill sizing", () => {
  it("fills the available row for compact text buttons while preserving square icon-only geometry", () => {
    const css = readStudioControlCss()
    expect(css).toContain('[data-vt-studio-control="true"] {')
    expect(css).toContain('width: 100%;')
    expect(css).toContain('[data-vt-studio-control="true"][data-vt-studio-width="content"] {')
    expect(css).toContain('width: fit-content;')
    expect(css).toContain('[data-vt-studio-control="true"][data-size="compact"]')
    expect(css).toContain("padding-inline: 8px;")
  })

  it("preserves explicit full-width split-left and fixed-square icon button geometry", () => {
    const css = readStudioControlCss()
    expect(css).toContain('.vt-studio-split-face[data-vt-studio-split="left"] { grid-template-columns: auto minmax(0, 1fr); }')
    expect(css).toContain('[data-vt-studio-control="true"] [data-vt-studio-split-rail]')
    expect(css).toContain('aspect-ratio: 1 / 1;')
    expect(css).toContain('width: fit-content;')
  })
})

describe("confirmed square icon button library entry", () => {
  it("registers the actual production square icon primitive with standard, compact, color, selected, and disabled specimens", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain("Square Icon Button")
    expect(html).toContain('data-vt-library-component="StudioSquareIconButton"')
    expect(html).toContain('data-icon-variant="v1"')
    expect(html).toContain('data-icon-variant="v2"')
    expect(html).toContain('data-icon-variant="v3"')
    expect(html).toContain('data-icon-variant="v4"')
    expect(html).toContain('data-size="standard"')
    expect(html).toContain('data-size="compact"')
    expect(html).toContain('aria-label="Disabled square icon button"')
    expect(html).toContain('disabled=""')
  })
})
describe("canonical Studio field, selection, and action contracts", () => {
  it("keeps default and placeholder field typography primary and identical", () => {
    const css = readStudioControlCss()
    expect(css).toContain("color: var(--vt-field-primary);")
    expect(css).toContain("-webkit-text-fill-color: var(--vt-field-primary);")
    expect(css).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) var(--vt-field-primary);")
    expect(css).not.toContain("-webkit-text-stroke: 0 !important")
    expect(css).toContain("font-size: var(--vt-studio-textarea-standard-font-size, 18px);")
    expect(css).toContain("font-size: var(--vt-studio-textarea-compact-font-size, 14px);")
  })

  it("uses the supplied 44px control geometry and explicit indicator colors", () => {
    const css = readStudioControlCss()
    const contract = canonicalTail(css)
    expect(contract).toContain("width: 75.68px")
    expect(contract).toContain("width: 36.667px")
    expect(contract).toContain("transform: translateX(31.68px)")
    expect(contract).toContain(".vt-studio-44-choice.is-checkbox.is-black-indicator svg")
    expect(contract).toContain(".vt-studio-44-choice.is-checkbox.is-white-indicator svg")
    expect(contract).toContain(".vt-studio-44-choice.is-checkbox.is-color-swap.is-on svg")
    expect(contract).toContain(".vt-studio-44-switch.is-black-indicator.is-on")
    expect(contract).toContain(".vt-studio-44-choice.is-white-indicator.is-on")
  })

  it("keeps the split-left primitive catalog aligned with the button face layer", () => {
    const catalogCss = readFileSync(resolve(process.cwd(), "src/components/studio-hub/studio-hub-primitive-catalogs.css"), "utf8")
    expect(catalogCss).toContain('.vt-complete-catalog .vt-catalog-split-primitive[data-vt-studio-button="true"] > [data-vt-studio-button-face]')
    expect(catalogCss).toContain("grid-template-columns: var(--h) minmax(0, 1fr) !important")
    expect(catalogCss).toContain("width: 100% !important")
  })

  it("keeps fixed label boxes on the secondary pair and canonical controls flat", () => {
    const css = readStudioControlCss()
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    expect(css).toContain("background: var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b))")
    expect(css).not.toContain('.vt-studio-fixed-label-field:focus-within > .vt-studio-fixed-field-label')
    expect(css).toContain('.vt-studio-floating-field[data-vt-floating-variant="b"] > :is(input, textarea)[data-size="compact"]:is(:focus, :focus-visible) + .vt-studio-floating-field-label')
    expect(css).toContain('--vt-studio-fixed-label-height: 20px;')
    expect(css).toContain('--vt-studio-fixed-label-font-size: 14px;')
    expect(css).toContain('--vt-studio-fixed-label-height: 14px;')
    expect(css).toContain('--vt-studio-fixed-label-font-size: 9px;')
    expect(css).toContain('letter-spacing: .055em;')
    expect(css).not.toContain('--vt-studio-control-shadow-x:1.5px;')
    expect(css).not.toContain('--vt-studio-control-shadow-y:1.5px;')
    expect(css).not.toContain('button[data-vt-studio-button="true"][data-selected="true"], button[data-vt-studio-button="true"][aria-pressed="true"] { --vt-studio-control-shadow-color:')
    expect(css).toContain("box-shadow: none !important;")
    expect(css).toContain("width: 100%;")
    expect(css).toContain("height: 100%;")
    expect(css).toContain("letter-spacing: -.02em;")
    expect(controls).toContain('letterSpacing: "-0.02em"')
  })


  it("keeps canonical Studio button shells stationary without shadow or press-motion tokens", () => {
    const css = readStudioControlCss()
    const contract = canonicalTail(css)
    expect(contract).not.toContain("--vt-studio-motion-button")
    expect(contract).not.toContain("--vt-studio-motion-press")
    expect(contract).not.toContain('button[data-vt-studio-button="true"]::before {')
    expect(contract).not.toContain("transform:translate(var(--vt-studio-control-shadow-x")
    expect(contract).not.toContain("transition-duration:var(--vt-studio-motion-press")
    expect(contract).toContain('button[data-vt-studio-button="true"][data-split-left="true"] [data-vt-studio-split-rail]')
    expect(contract).not.toContain("transition-duration:300ms")
  })


  it("keeps SubToolbox button state feedback stationary and excludes menu triggers", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/subtoolbox-system.css"), "utf8")
    expect(css).toContain("--vt-subtoolbox-motion-button:180ms")
    expect(css).toContain("--vt-subtoolbox-motion-press:80ms")
    expect(css).toContain(".vt-subtoolbox-button:active:not(:disabled)")
    expect(css).toContain("box-shadow:none")
    expect(css).not.toContain("translate(var(--vt-subtoolbox-inner-shadow")
    expect(css).toContain(".vt-subtoolbox-split-action:active:not(:disabled)")
    expect(css).toContain(".vt-subtoolbox-icon-button:active:not(:disabled)")
    expect(css).toContain(".vt-subtoolbox-media-control:active:not(:disabled)")
    expect(css).toContain("transition-duration:var(--vt-subtoolbox-motion-press,80ms)")
    expect(css).not.toContain("translate(var(--vt-subtoolbox-shadow-offset")
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
    expect(readStudioControlCss()).toContain(".vt-studio-legend-trigger:active")
  })
})

describe("Studio primitive catalog control layout", () => {
  it("puts standard word toggles one per row and centers three compact word-toggle skins", () => {
    const html = renderToStaticMarkup(<StudioHubCompletePrimitiveCatalog />)
    expect(html).toContain('class="vt-catalog-control-variants is-word-toggle-44"')
    expect(html).toContain('class="vt-catalog-control-variants is-word-toggle-28"')
    expect(html).toContain('class="vt-catalog-control-row vt-catalog-word-toggle-row is-word-toggle-44"')
    expect(html).toContain('class="vt-catalog-control-row vt-catalog-word-toggle-row is-word-toggle-28"')
  })
})


describe("Studio text-field module ownership and typography", () => {
  it("exports the plain input and keeps label treatment out of its primitive module", async () => {
    const inputModule = await import("./StudioTextInput")
    const areaModule = await import("./StudioTextArea")
    const html = renderToStaticMarkup(<StudioTextInput aria-label="Title" />)
    const inputSource = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioTextInput.tsx"), "utf8")
    expect(inputModule.StudioTextInput).toBeDefined()
    expect(areaModule.StudioTextArea).toBeDefined()
    expect(html).toContain('class="vt-studio-text-input"')
    expect(html).not.toContain("vt-studio-floating-field")
    expect(inputSource).not.toContain("studio-control-entry.css")
    expect(inputSource).not.toContain("floating-label")
    expect(renderToStaticMarkup(<StudioTextArea variant="floating-label" label="Description" />)).toContain("vt-studio-floating-field")
  })

  it("uses literal 38px/24px/10px input sizes and separate 18px/14px textarea typography", () => {
    const inputCss = readFileSync(resolve(process.cwd(), "src/styles/studio-text-input.css"), "utf8")
    const css = readStudioControlCss()
    expect(inputCss).toContain("font-size: 38px;")
    expect(inputCss).toContain("font-size: 24px;")
    expect(inputCss).toContain("font-size: 10px;")
    expect(inputCss).toContain("--vt-studio-input-height: var(--vt-studio-standard-height, 44px)")
    expect(inputCss).toContain("--vt-studio-input-height: var(--vt-studio-compact-height, 28px)")
    expect(inputCss).toContain("--vt-studio-input-height: var(--vt-studio-micro-height, 12px)")
    expect(css).toContain("--vt-studio-textarea-standard-font-size: 18px")
    expect(css).toContain("--vt-studio-textarea-compact-font-size: 14px")
    expect(css).toContain("font-size: var(--vt-studio-textarea-standard-font-size, 18px);")
    expect(css).toContain("font-size: var(--vt-studio-textarea-compact-font-size, 14px);")
  })
})


describe("canonical square icon button family", () => {
  it("renders all four icon color variants at standard and compact square sizes", () => {
    const standard = renderToStaticMarkup(
      <>
        <StudioSquareIconButton icon={<span>ICON</span>} label="Default" />
        <StudioSquareIconButton icon={<span>ICON</span>} label="Secondary" variant="v2" />
        <StudioSquareIconButton icon={<span>ICON</span>} label="Selectable" variant="v3" />
        <StudioSquareIconButton icon={<span>ICON</span>} label="Black" variant="v4" />
      </>,
    )
    const compact = renderToStaticMarkup(
      <StudioSquareIconButton icon={<span>ICON</span>} label="Compact" sizeVariant="compact" />,
    )
    expect(standard.match(/data-vt-studio-icon-button="true"/g)).toHaveLength(4)
    expect(standard).toContain('data-icon-variant="v1"')
    expect(standard).toContain('data-icon-variant="v2"')
    expect(standard).toContain('data-icon-variant="v3"')
    expect(standard).toContain('data-icon-variant="v4"')
    expect(standard).toContain('aria-pressed="false"')
    expect(renderToStaticMarkup(<StudioSquareIconButton icon={<span>ICON</span>} label="Selected" variant="v3" selected />)).toContain('aria-pressed="true"')
    expect(standard).toContain('data-size="standard"')
    expect(standard).toContain('data-height-variant="44"')
    expect(compact).toContain('data-size="compact"')
    expect(compact).toContain('data-height-variant="28"')
    expect(compact).toContain('data-icon-variant="v1"')
  })

  it("defines opposite fill/shadow pairs, selectable inversion, and the black/primary-icon variant", () => {
    const css = readStudioControlCss()
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v2"]')
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v3"][aria-pressed="true"]')
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v4"]')
    expect(css).toContain('background: #000;')
    expect(css).toContain('color: var(--vt-studio-control-accent, var(--pair-a, #36e0f6));')
  })
})


describe("shared Studio icon-size comparison contract", () => {
  it("supports all three icon sizes on both production primitives without changing button dimensions", () => {
    const html = renderToStaticMarkup(
      <>
        <StudioSquareIconButton icon={<span>ICON</span>} label="Current" iconSizeVariant="current" />
        <StudioSquareIconButton icon={<span>ICON</span>} label="Moderate" iconSizeVariant="moderate" />
        <StudioSquareIconButton icon={<span>ICON</span>} label="Large" iconSizeVariant="large" sizeVariant="compact" />
        <StudioSplitLeftButton icon={<span>ICON</span>} iconSizeVariant="moderate">Moderate split</StudioSplitLeftButton>
        <StudioSplitLeftButton icon={<span>ICON</span>} iconSizeVariant="large" heightVariant="28">Large compact split</StudioSplitLeftButton>
      </>,
    )
    expect(html.match(/data-icon-size-variant="current"/g)).toHaveLength(1)
    expect(html.match(/data-icon-size-variant="moderate"/g)).toHaveLength(2)
    expect(html.match(/data-icon-size-variant="large"/g)).toHaveLength(2)
  })

  it("defaults square and split-left controls to the large 38px/24px preset", () => {
    const html = renderToStaticMarkup(
      <>
        <StudioSquareIconButton icon={<span>ICON</span>} label="Default square" />
        <StudioSplitLeftButton icon={<span>ICON</span>}>Default split</StudioSplitLeftButton>
      </>,
    )
    expect(html.match(/data-icon-size-variant="large"/g)).toHaveLength(2)
  })

  it("defines the requested icon dimensions while preserving standard and compact border geometry", () => {
    const css = readStudioControlCss()
    expect(css).toContain('data-icon-size-variant="moderate"][data-size="standard"] { --vt-studio-control-icon-size:34px')
    expect(css).toContain('data-icon-size-variant="moderate"][data-size="compact"] { --vt-studio-control-icon-size:22px')
    expect(css).toContain('data-icon-size-variant="large"][data-size="standard"] { --vt-studio-control-icon-size:38px; --vt-studio-control-icon-stroke:1.9;')
    expect(css).toContain('data-icon-size-variant="large"][data-size="compact"] { --vt-studio-control-icon-size:24px; --vt-studio-control-icon-stroke:2.0;')
    expect(css).toContain('--vt-studio-control-stroke:3px')
    expect(css).toContain('--vt-studio-control-stroke:2px')
  })

  it("shows production specimens without icon-size testing components and labels real states", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    for (const label of [
      "Square icon button V1 primary fill",
      "Compact square icon button V1",
      "44px standard · default",
      "28px compact · neutral tone",
      "44px standard · selected",
      "28px compact · selected + disabled",
      "28px compact · disabled",
      "NOTIFICATION BADGE · STATIC PREVIEW",
      "SUCCESS STATE · STATIC PREVIEW",
      "44px standard · selected values · multiselect trigger",
    ]) {
      expect(html).toContain(label)
    }
    for (const label of ["Current · 28px", "Moderate · 34px", "Large · 38px", "Current · 18px", "Moderate · 22px", "Large · 24px"]) {
      expect(html).not.toContain(label)
    }
    expect(html).toContain('data-vt-library-component="StudioSquareIconButton"')
    expect(html).toContain('data-vt-library-component="StudioSplitLeftButton"')
    expect(html).toContain("default large icon preset")
  })
})

describe("tactile button press accessibility and exclusion contract", () => {
  it("keeps keyboard focus visible and prevents disabled controls from depressing", () => {
    const css = readStudioControlCss()
    expect(css).toContain('button[data-vt-studio-button="true"]:focus-visible { outline:3px solid')
    expect(css).toContain('button[data-vt-studio-button="true"]:disabled { cursor:not-allowed; opacity:.5; transform:none; }')
    expect(css).toContain('button[data-vt-studio-control="true"][data-vt-studio-action-button="true"]:disabled { cursor: not-allowed; opacity: .5; transform: none; }')
    expect(css).toContain('button[data-vt-studio-button="true"]:active:not(:disabled)')
    expect(css).toContain('transform: none !important;')
    expect(css).toContain('@media (prefers-reduced-motion:reduce)')
    expect(css).toContain('transition: none !important;')
  })

  it("keeps dropdown triggers and options outside the extruded-button press selectors", () => {
    const css = readStudioControlCss()
    expect(css).toContain('.vt-studio-dropdown button[data-dropdown-trigger="true"]')
    expect(css).toContain('.vt-studio-dropdown-option:focus-visible')
    expect(css).toContain('.vt-studio-dropdown-menu')
    expect(css).not.toContain('.vt-studio-dropdown-option:active')
    expect(css).not.toContain('button[data-dropdown-trigger="true"]:active')
    // Menu panels may own a stationary shadow; trigger and option buttons do not
    // receive the data-vt-studio-button marker used by the tactile press model.
    expect(css).toContain('button[data-vt-studio-button="true"]:active:not(:disabled)')
    expect(css).toContain('transform: none !important;')
  })

  it("keeps standard/compact icon metrics tokenized without displacement or shadow offsets", () => {
    const css = readStudioControlCss()
    expect(css).not.toContain("--vt-studio-control-shadow-x")
    expect(css).not.toContain("--vt-studio-control-shadow-y")
    expect(css).toContain('--vt-studio-control-icon-size:38px; --vt-studio-control-icon-stroke:1.9;')
    expect(css).toContain('--vt-studio-control-icon-size:24px; --vt-studio-control-icon-stroke:2.0;')
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v2"]')
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v3"][aria-pressed="true"]')
    expect(css).toContain('button[data-vt-studio-icon-button="true"][data-icon-variant="v4"]')
  })

  it("preserves SubToolbox disabled, menu, and reduced-motion boundaries", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/subtoolbox-system.css"), "utf8")
    expect(css).toContain('.vt-subtoolbox-button:active:not(:disabled)')
    expect(css).toContain('.vt-subtoolbox-split-action:active:not(:disabled)')
    expect(css).toContain('.vt-subtoolbox-icon-button:active:not(:disabled)')
    expect(css).toContain('.vt-subtoolbox-media-control:active:not(:disabled)')
    expect(css).toMatch(/dropdown\/menu\s+triggers intentionally remain stationary and shadow-free/)
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(css).toContain('.vt-subtoolbox-button,')
    expect(css).toContain('transition:none !important')
  })
})


describe("SubToolbox grid button width ownership", () => {
  it("lets grid cells control component-level button width instead of global intrinsic sizing", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/subtoolbox-system.css"), "utf8")
    expect(css).toContain('.vt-subtoolbox-button.has-component-level{')
    expect(css).toContain('.vt-subtoolbox-grid > .vt-subtoolbox-button.has-component-level {')
    expect(css).toContain('width: 100% !important;')
    expect(css).toContain('justify-self: stretch;')
    expect(css).toContain('.vt-subtoolbox-grid.is-compact{grid-template-columns:repeat(auto-fit,minmax(min(100%,112px),1fr))}')
    expect(css).toContain('.vt-subtoolbox-grid.is-wide{grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}')
  })
})


describe("documented global-rule exception: Vault Spectrum Tags", () => {
  it("renders the donor-exact monochromatic tag as a named Studio exception", () => {
    const html = renderToStaticMarkup(<StudioSpectrumTag label="camera" selected />)
    expect(html).toContain('class="vt-studio-spectrum-tag is-selected"')
    expect(html).toContain('data-vt-studio-exception="vault-spectrum-tag"')
    expect(html).toContain('data-tag="CAMERA"')
    expect(html).toContain('aria-pressed="true"')
    expect(html).toContain("CAMERA")
  })

  it("keeps the exact Vault chip geometry and palette rules in the exception registry", () => {
    const exception = STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag
    expect(exception.globalRuleException).toBe(true)
    expect(exception.height).toBe(15)
    expect(exception.borderWidth).toBe(2)
    expect(exception.radius).toBe(4)
    expect(exception.fontSize).toBe(8)
    expect(exception.fontWeight).toBe(900)
    expect(exception.letterSpacing).toBe("0.3px")
    expect(exception.colorResolver).toBe("getAlphabeticalSpectrumColor")
    const css = readStudioControlCss()
    expect(css).toContain(".vt-studio-spectrum-tag {")
    expect(css).toContain("height: 15px;")
    expect(css).toContain("border: 2px solid var(--vt-spectrum-tag-color);")
    expect(css).toContain("font-size: 8px;")
    expect(css).toContain("color-mix(in srgb, var(--vt-spectrum-tag-color) 35%, white)")
  })

  it("uses the canonical Studio Spectrum Tag in Vault assets instead of duplicating its color and chip geometry", () => {
    const vault = readFileSync(resolve(process.cwd(), "src/components/subtoolbox/VaultAssetModule.tsx"), "utf8")
    expect(vault).toContain('import { StudioSpectrumTag } from "../../studio-ui/primitives/StudioControls"')
    expect(vault).toContain("<StudioSpectrumTag")
    expect(vault).not.toContain("getAlphabeticalSpectrumColor(normalized)")
    const vaultCss = readFileSync(resolve(process.cwd(), "src/styles/vault-asset-module.css"), "utf8")
    expect(vaultCss).not.toContain(".vt-vault-tag-badge{")
  })
})


describe("Studio Play/Pause Split-Left Button", () => {
  it("reserves both labels so toggling does not change the label region width", () => {
    const html = renderToStaticMarkup(<StudioPlayPauseButton playLabel="Play" pauseLabel="Pause" />)
    expect(html).toContain('data-vt-studio-play-pause="true"')
    expect(html).toContain('aria-pressed="false"')
    expect(html).toContain('data-vt-studio-play-pause-measure="play"')
    expect(html).toContain('data-vt-studio-play-pause-measure="pause"')
    expect(html).toContain('data-vt-studio-play-pause-label="true">Play</span>')
    const selected = renderToStaticMarkup(<StudioPlayPauseButton playing playLabel="Play" pauseLabel="Pause" />)
    expect(selected).toContain('aria-pressed="true"')
    expect(selected).toContain('data-vt-studio-play-pause-label="true">Pause</span>')
    expect(selected).toContain('data-size="standard"')
    expect(renderToStaticMarkup(<StudioPlayPauseButton sizeVariant="compact" />)).toContain('data-size="compact"')
  })
})

describe("floating label geometry and circular icon scale", () => {
  it("uses global resting text sizes and a shared 18px raised label with the border crossing the 48% height line", () => {
    const css = readStudioControlCss()
    expect(css).toContain("transform: translateY(calc(-40% * var(--vt-studio-control-floating-label-offset-ratio, 1.2)))")
    expect(css).not.toContain("transform 180ms ease-out, font-size 180ms ease-out")
    expect(css).toContain("font-size: 18px")
    expect(css).toContain("font-size: var(--vt-studio-floating-label-size)")
    expect(css).toContain("--vt-studio-control-floating-label-height: var(--vt-studio-standard-font-size, 38px)")
    expect(css).toContain("--vt-studio-control-floating-label-height: var(--vt-studio-compact-font-size, 24px)")
    expect(css).toContain("--vt-studio-control-floating-label-height: var(--vt-studio-micro-font-size, 10px)")
    expect(css).toContain("font-size: 18px")
    expect(css).toContain(".vt-studio-floating-field[data-size=\"compact\"] {\n  --vt-studio-control-floating-label-height: var(--vt-studio-compact-font-size, 24px);\n  --vt-studio-control-focus-outline-width: 1.3px;")
    expect(css).not.toContain("font-size: calc(var(--vt-studio-floating-label-size) * .8)")
    expect(css).toContain("padding: 2.25px 4.5px;")
  })

  it("matches the floating-label secondary focus stroke width and color to the compact focus outline", () => {
    const css = readStudioControlCss()
    expect(css).toContain('outline: var(--vt-studio-control-focus-outline-width, 2px) solid var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b))')
    expect(css).toContain('outline-width: var(--vt-studio-control-focus-outline-width, 2px)')
  })

  it("scales circle-button SVG icons to 80% without changing the canonical button size", () => {
    const css = readStudioControlCss()
    expect(css).toContain('button[data-vt-studio-circle-icon-button="true"] [data-vt-square-icon-current] svg')
    expect(css).toContain("width: calc(var(--vt-studio-control-icon-size, 28px) * .8)")
    expect(css).toContain("height: calc(var(--vt-studio-control-icon-size, 28px) * .8)")
    expect(css).toContain("--vt-studio-control-icon-size: 38px")
    expect(css).toContain("--vt-studio-control-icon-size: 24px")
  })
})

describe("Studio Circle Icon Button", () => {
  it("reuses the canonical icon button contract and marks the circular shape explicitly", () => {
    const html = renderToStaticMarkup(<StudioCircleIconButton icon={<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>} label="Profile" variant="v3" />)
    expect(html).toContain('data-vt-studio-circle-icon-button="true"')
    expect(html).toContain('data-vt-studio-icon-button="true"')
    expect(html).toContain('data-icon-variant="v3"')
    expect(html).toContain('aria-label="Profile"')
    expect(renderToStaticMarkup(<StudioCircleIconButton icon={<span>U</span>} label="Compact profile" sizeVariant="compact" />)).toContain('data-size="compact"')
  })
})

describe("confirmed Studio primitive catalog ownership", () => {
  it("registers the simple dropdown and split stepper from the canonical Studio Controls module", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const publicApi = readFileSync(resolve(process.cwd(), "src/studio-ui/index.ts"), "utf8")
    expect(catalog).toContain('import {')
    expect(catalog).toContain('StudioSplitStepper')
    expect(catalog).not.toContain('SubToolboxSplitStepper')
    expect(catalog).toContain('primitive="StudioSplitStepper"')
    expect(catalog).toContain('tsx="src/studio-ui/primitives/StudioControls.tsx"')
    expect(catalog).toContain('primitive="StudioSimpleDropdown" tsx="src/studio-ui/primitives/StudioControls.tsx"')
    expect(catalog).toContain('data-vt-library-component="StudioSplitStepper"')
    expect(controls).toContain("export const StudioSplitStepper")
    expect(controls).toContain("export const StudioSimpleDropdown")
    expect(publicApi).toContain("StudioSplitStepper")
    expect(publicApi).toContain("StudioSimpleDropdown")
  })
})


describe("canonical Studio dropdown menu visual contract", () => {
  it("keeps the multi-select panel primary-filled with white rows and secondary selected rows", () => {
    const css = readStudioControlCss()
    const optionStart = css.indexOf(".vt-studio-legend-option {")
    const optionEnd = css.indexOf("}", optionStart)
    const optionBlock = css.slice(optionStart, optionEnd)
    expect(css).toContain(".vt-studio-legend-menu")
    expect(optionBlock).toContain("background: #fff; color: #000;")
    expect(css).toContain('.vt-studio-legend-option[data-selected="true"] {')
    expect(css).toContain("background: var(--vt-legend-b);")
    expect(css).toContain("color-mix(in srgb, var(--vt-legend-b) 22%, #fff)")
    expect(css).toContain('.vt-studio-dropdown-option[data-selected="true"]')
    expect(css).toContain("background: var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b));")
  })
})

describe("Studio Controls owns dropdown and stepper implementations", () => {
  it("keeps the simple dropdown and both stepper variants inside the canonical StudioControls module", async () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const css = readStudioControlCss()
    expect(controls).toContain("export const StudioSimpleDropdown")
    expect(controls).toContain("export const StudioSplitStepper")
    expect(controls).toContain("export const StudioInlineStepper")
    expect(controls).toContain("export const StudioDropdown")
    expect(controls).toContain("export const StudioLegendMultiDropdown")
    expect(controls).not.toContain('from "./StudioSimpleDropdown"')
    expect(controls).not.toContain('from "./StudioSplitStepper"')
    expect(controls).not.toContain('from "./StudioInlineStepper"')
    expect(css).toContain(".vt-studio-split-stepper")
    expect(css).toContain(".vt-studio-inline-stepper")
  })

  it("uses the canonical compact square-button size for tag editor actions", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const css = readStudioControlCss()
    expect(controls).toContain('data-size="compact" data-vt-studio-tag-editor-action="true"')
    expect(css).toContain(".vt-studio-tag-editor__square-action[data-size=\"compact\"]")
    expect(css).toContain("width: 28px")
    const actionBlock = css.slice(css.indexOf(".vt-studio-tag-editor__square-action {"), css.indexOf("\n}", css.indexOf(".vt-studio-tag-editor__square-action {")) + 2)
    expect(actionBlock).not.toContain("32px")
    expect(actionBlock).not.toContain("box-shadow: 1.5px 1.5px 0 0")
    expect(actionBlock).not.toContain("4px 4px 0 0")
  })
})


describe("Studio text input and split-left badge typography parity", () => {
  it("uses the isolated plain input typography and excludes catalog demo overrides", () => {
    const css = readStudioControlCss()
    const inputCss = readFileSync(resolve(process.cwd(), "src/styles/studio-text-input.css"), "utf8")
    const catalogCss = readFileSync(resolve(process.cwd(), "src/components/studio-hub/studio-hub-primitive-catalogs.css"), "utf8")
    const input = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioTextInput.tsx"), "utf8")
    expect(input).toContain('className={["vt-studio-text-input", className]')
    expect(input).toContain('import "../../styles/studio-control-entry.css"')
    expect(input).toContain('variant: "floating-label"')
    expect(input).toContain('variant: "fixed-label"')
    expect(inputCss).toContain("font-size: var(--vt-studio-standard-font-size, 38px);")
    expect(inputCss).toContain("font-size: var(--vt-studio-compact-font-size, 24px);")
    expect(inputCss).toContain("font-size: var(--vt-studio-micro-font-size, 10px);")
    expect(inputCss).toContain('input.vt-studio-text-input[data-size="compact"]')
    expect(css).toContain("font-size: 18px")
    expect(catalogCss).toContain('.vt-complete-catalog .vt-catalog-field:not([data-vt-studio-control="true"])')
    expect(catalogCss).not.toMatch(/\.vt-complete-catalog \.vt-catalog-field\s*\{\s*--field-accent:var\(--pair-a\)/)
    expect(catalogCss).not.toMatch(/\.vt-complete-catalog \.vt-catalog-field:focus\s*\{\s*background:#fff/)
    expect(catalogCss).toContain(".vt-confirmed-split-left-badge-family > span:not(.vt-studio-split-left-badge)")
    expect(catalogCss).not.toContain(".vt-confirmed-split-left-badge-family > span {")
    expect(catalogCss).toContain('.vt-confirmed-variant > span:not([data-vt-studio-control="true"])')
    expect(catalogCss).not.toContain(".vt-confirmed-variant > span {")
  })

  it("uses one shared split-label primitive and typography inherited from its size owner", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const css = readStudioControlCss()
    expect(controls).toContain("const StudioSplitShell: React.FC<StudioSplitShellProps>")
    expect(controls).toContain("<StudioSplitShell layout=\"left\" sizeVariant={sizeVariant} iconLeft={icon} faceOnly>")
    expect(controls).toContain("<StudioSplitShell layout={layout} sizeVariant={sizeVariant}")
    expect(css).toContain("[data-vt-studio-split-label]")
    expect(css).toContain("font-size: var(--vt-studio-control-font-size, 38px)")
    const badgeRule = css.slice(css.indexOf(".vt-studio-split-left-badge,"))
    expect(badgeRule).toContain("font-size: var(--vt-studio-control-font-size, 38px)")
    expect(badgeRule).toContain("font-weight: var(--vt-studio-control-font-weight, 1000)")
    expect(badgeRule).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke, 1px) currentColor")
  })
})


describe("Studio counter divider alignment and slider counter hold", () => {
  it("renders side-counter action buttons with accessible controls", () => {
    const html = renderToStaticMarkup(<StudioSideCounter value={5} onValueChange={() => {}} ariaLabel="Quantity" />);
    expect(html).toContain('aria-label="Increase Quantity"');
    expect(html).toContain('aria-label="Decrease Quantity"');
    expect(html).toContain('class="vt-studio-side-counter__actions"');
  });

  it("wires the double-split slider counter variant to the shared counter hold hook", () => {
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    const start = source.indexOf("export const StudioDoubleSplitSlider:");
    const end = source.indexOf("StudioDoubleSplitSlider.displayName", start);
    const slider = source.slice(start, end);
    expect(slider).toContain('leftControls === "counter"');
    expect(slider).toContain('useStudioCounterHold(-1, current, min, max, safeStep, adjustCounter');
    expect(slider).toContain('useStudioCounterHold(1, current, min, max, safeStep, adjustCounter');
    expect(slider).toContain('data-press-holding={increment.isHolding ? "true" : undefined}');
    expect(slider).toContain('data-press-holding={decrement.isHolding ? "true" : undefined}');
    const html = renderToStaticMarkup(<StudioDoubleSplitSlider value={5} onValueChange={() => {}} leftControls="counter" ariaLabel="Level" />);
    expect(html).toContain('data-vt-studio-slider-left-controls="counter"');
    expect(html).toContain('aria-label="Increase Level"');
    expect(html).toContain('aria-label="Decrease Level"');
    expect(css).not.toContain('.vt-studio-double-split-slider.is-counter-controls .vt-studio-double-split-slider__counter::after');
    expect(css).toContain('.vt-studio-double-split-slider.is-counter-controls .vt-studio-double-split-slider__counter > button');
    expect(css).toContain('background: var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b));');
    expect(css).toContain('.vt-studio-double-split-slider.is-counter-controls .vt-studio-double-split-slider__counter > button.is-holding svg');
  });
});

describe("legacy Studioinput removal", () => {
  it("keeps the canonical StudioTextInput while removing the legacy component, stylesheet, exports, and selectors", () => {
    expect(existsSync(resolve(process.cwd(), "src/studio-ui/primitives/Studioinput.tsx"))).toBe(false);
    expect(existsSync(resolve(process.cwd(), "src/styles/studio-input.css"))).toBe(false);
    const controlsSource = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const publicIndex = readFileSync(resolve(process.cwd(), "src/studio-ui/index.ts"), "utf8");
    expect(controlsSource).not.toMatch(/\bStudioinput(?:Props|Size)?\b/);
    expect(publicIndex).not.toMatch(/\bStudioinput(?:Props|Size)?\b/);
    expect(controlsSource).not.toMatch(/studio-input\.css|data-vt-studioinput|vt-studioinput/);
    expect(StudioTextInput).toBeDefined();
    const html = renderToStaticMarkup(<StudioTextInput aria-label="Canonical text input remains available" placeholder="TYPE HERE" />);
    expect(html).toContain('aria-label="Canonical text input remains available"');
    expect(html).toContain('placeholder="TYPE HERE"');
  });
});



describe("StudioVerticalWordToggle", () => {
  it("renders the four palette variants at standard, compact, and micro typography tiers", () => {
    const variants = ["primary-secondary", "black-fill", "primary-white-handle", "white-fill"] as const;
    const html = variants.map(variant => renderToStaticMarkup(
      <StudioVerticalWordToggle value={false} onValueChange={() => {}} sizeVariant="standard" variant={variant} aria-label={variant} />
    )).join("");
    expect(html).toContain('role="switch"');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain('data-vt-studio-vertical-word-toggle="true"');
    expect(html).toContain('data-vertical-word-toggle-variant="black-fill"');
    expect(html).toContain('data-vertical-word-toggle-variant="primary-white-handle"');
    expect(html).toContain('data-vertical-word-toggle-variant="white-fill"');
    expect(renderToStaticMarkup(<StudioVerticalWordToggle value={true} sizeVariant="compact" />)).toContain('data-size="compact"');
    expect(renderToStaticMarkup(<StudioVerticalWordToggle value={false} sizeVariant="micro" />)).toContain('data-size="micro"');
    const controlsSource = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    expect(controlsSource).toContain('handle.style.bottom = "auto";');
    expect(controlsSource).toContain('handle.style.insetBlockEnd = "auto";');
    expect(controlsSource).toContain('const destination = getBounds(to ? 1 : 0);');
    expect(STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.verticalWordToggle.globalRuleException).toBe(true);
    expect(STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.verticalWordToggle.height).toBe("content-driven two-word stack; intentionally not 44px / 28px / 12px");
  });
});

describe("Studio counter hold-repeat acceleration", () => {
  it("smoothly accelerates from a slower 150ms interval to 23ms in 520ms", () => {
    expect(getStudioCounterRepeatDelay(0, 30)).toBe(150);
    expect(getStudioCounterRepeatDelay(260, 30)).toBe(51);
    expect(getStudioCounterRepeatDelay(520, 30)).toBe(23);
    expect(getStudioCounterRepeatDelay(2000, 30)).toBe(23);
  });

  it("starts a smooth boundary slowdown 16 steps from the bound while preserving full speed farther away", () => {
    expect(getStudioCounterRepeatDelay(900, 17)).toBe(23);
    expect(getStudioCounterRepeatDelay(900, 16)).toBe(23);
    expect(getStudioCounterRepeatDelay(900, 10)).toBeGreaterThan(23);
    expect(getStudioCounterRepeatDelay(900, 3)).toBe(75);
    expect(getStudioCounterRepeatDelay(900, 0)).toBe(75);
    expect(getStudioCounterRepeatDelay(900, Number.POSITIVE_INFINITY)).toBe(23);
  });
});



describe("Supreme and Micro production size contract", () => {
  it("defines the four canonical tiers with exact 60/44/28/12px heights", () => {
    const expected: Record<StudioControlSize, number> = {
      supreme: 60,
      standard: 44,
      compact: 28,
      micro: 12,
    }
    for (const [size, height] of Object.entries(expected) as [StudioControlSize, number][]) {
      expect(STUDIO_CONTROL_SIZE_BASE[size].height).toBe(height)
      expect(studioSizeTierToCssVars(size)["--vt-studio-control-height"]).toBe(`${height}px`)
    }
  })

  it("renders Supreme buttons and Micro split badges using production size APIs", () => {
    const supreme = renderToStaticMarkup(<StudioButton sizeVariant="supreme">SUPREME</StudioButton>)
    const action = renderToStaticMarkup(<StudioActionButton>CONTINUE</StudioActionButton>)
    const textBox = renderToStaticMarkup(<StudioTextBox size="supreme" aria-label="Supreme display">SUPREME</StudioTextBox>)
    const dropdown = renderToStaticMarkup(<StudioDropdown sizeVariant="supreme" options={[{ value: "a", label: "Alpha" }]} />)
    const micro = renderToStaticMarkup(<StudioSplitLeftBadge sizeVariant="micro" icon={<span>+</span>}>MICRO</StudioSplitLeftBadge>)
    const microInput = renderToStaticMarkup(<StudioTextInput sizeVariant="micro" aria-label="Micro title" placeholder="TITLE" />)
    expect(supreme).toContain('data-size="supreme"')
    expect(supreme).toContain('data-height-variant="60"')
    expect(action).toContain('data-size="supreme"')
    expect(textBox).toContain('data-size="supreme"')
    expect(dropdown).toContain('data-size="supreme"')
    expect(micro).toContain('data-size="micro"')
    expect(microInput).toContain('data-vt-studio-control="true"')
    expect(microInput).toContain('data-size="micro"')
  })

  it("keeps Confirmed Primitive Library size specimens aligned to production APIs", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    expect(catalog).toContain('Family title="Prominent Action · 60px Supreme"')
    expect(catalog).toContain('sizeVariant="standard"')
    expect(catalog).toContain('sizeVariant="compact"')
    expect(catalog).toContain('sizeVariant="supreme"')
    expect(catalog).toContain('aria-label="Studio plain text input micro"')
    expect(catalog).toContain('sizeVariant="micro"')
    expect(catalog).not.toContain('Family title="Prominent Action · 56px"')
    expect(catalog).not.toContain('56px prominent workflow action')
  })

  it("keeps generated CSS and global styles aligned to the canonical 60px and 12px tiers", () => {
    const generated = readFileSync(resolve(process.cwd(), "src/styles/studio-control-vars.generated.css"), "utf8")
    const system = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8")
    expect(generated).toContain("--vt-studio-supreme-height: 60px;")
    expect(generated).toContain("--vt-studio-micro-height: 12px;")
    expect(system).toContain('--vt-studio-control-height: var(--vt-studio-supreme-height, 60px)')
    expect(system).toContain('--vt-studio-control-height: var(--vt-studio-micro-height, 12px)')
    expect(system).toContain('button[data-vt-studio-button="true"][data-size="supreme"] > [data-vt-studio-button-face]')
    expect(system).toContain('.vt-studio-double-split-badge[data-size="supreme"]')
    expect(system).not.toContain("--vt-studio-14-height")
  })
})


describe("Studio counter single-click regression", () => {
  it("preserves each counter button's increment/decrement click handler while pulsing focus", () => {
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    for (const [startMarker, endMarker] of [
      ["export const StudioCounter:", "StudioCounter.displayName"],
      ["export const StudioSideCounter:", "StudioSideCounter.displayName"],
      ["export const StudioLeftCounter:", "StudioLeftCounter.displayName"],
    ]) {
      const start = source.indexOf(startMarker);
      const end = source.indexOf(endMarker, start);
      expect(start, startMarker).toBeGreaterThanOrEqual(0);
      expect(end, endMarker).toBeGreaterThan(start);
      const component = source.slice(start, end);
      expect(component).toContain("onClick={(event) => { increment.events.onClick(event); interactionFocus.pulse(); }}");
      expect(component).toContain("onClick={(event) => { decrement.events.onClick(event); interactionFocus.pulse(); }}");
    }
  });
});


describe("global StudioButton variants and containment contract", () => {
  it("exposes V1–V7 as production StudioButton variants rather than catalog-only skin attributes", () => {
    const variants = (["v1", "v2", "v3", "v4", "v5", "v6", "v7"] as const).map(variant =>
      renderToStaticMarkup(<StudioButton variant={variant} aria-label={`Variant ${variant}`}>BUTTON</StudioButton>),
    );
    variants.forEach((html, index) => {
      expect(html).toContain(`data-vt-studio-button-variant="v${index + 1}"`);
    });
  });

  it("keeps long labels inside the face and split-label sections using the global ellipsis contract", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const css = readStudioControlCss();
    expect(controls).toContain("variant?: StudioButtonVariant");
    expect(controls).toContain('const isToggleVariant = variant === "v3" || variant === "v5" || variant === "v6"');
    expect(controls).toContain("setLocalOn(next)");
    expect(controls).toContain("onVariantChange?.(next)");
    expect(controls).toContain("activeChildren");
    expect(controls).toContain("activeIcon");
    expect(css).toContain("[data-vt-studio-button-face]");
    expect(css).toContain("[data-vt-studio-split-label]");
    expect(css).toContain("text-overflow: clip");
    expect(css).toContain("min-width: 0");
    expect(css).toContain("overflow: hidden");
    expect(css).toContain("white-space: nowrap");
    expect(css).toContain('button[data-vt-studio-button="true"] [data-vt-studio-split-rail]');
    expect(css).toContain('data-vt-studio-button-variant="v7"');
  });

  it("defines compact button specimens for full, half, and quarter rows in the original button grid", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(catalog).toContain('...buildStudioButtonRows("compact")');
    expect(catalog).toContain('row("half-v1-v2"');
    expect(catalog).toContain('row("quarter-v1-v4"');
    expect(catalog).toContain('sizeVariant={tier}');
    expect(catalog).not.toContain('heightVariant={tier === "standard" ? "44" : "28"}');
    expect(catalog).toContain('variant={`v${variant}`');
  });
});


describe("Confirmed Primitive Library button tier grid regression", () => {
  it("renders all seven original StudioButton variants at Supreme, Standard, Compact, and Micro tiers", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    for (const tier of ["supreme", "standard", "compact", "micro"]) {
      expect(catalog).toContain(`buildStudioButtonRows("${tier}")`);
    }
    expect(catalog).toContain('variant={`v${variant}`');
    expect(catalog).toContain('sizeVariant={tier}');
    expect(catalog).toContain('row("half-v1-v2"');
    expect(catalog).toContain('row("quarter-v1-v4"');
    expect(catalog).not.toContain('heightVariant={tier === "standard" ? "44" : "28"}');
  });

  it("gives each button variant an explicit face fill so pressed-state defaults cannot recolor primary variants", () => {
    const css = readStudioControlCss();
    expect(css).toMatch(/data-vt-studio-button-variant="v1"[^{}]*>\s*\[data-vt-studio-button-face\][^{}]*background:\s*var\(--pair-a/);
    expect(css).toMatch(/data-vt-studio-button-variant="v2"[^{}]*>\s*\[data-vt-studio-button-face\][^{}]*background:\s*var\(--pair-b/);
    expect(css).toMatch(/data-vt-studio-button-variant="v3"\]\[data-vt-studio-button-on="false"\][^{}]*>\s*\[data-vt-studio-button-face\][^{}]*background:\s*var\(--pair-a/);
    expect(css).toMatch(/data-vt-studio-button-variant="v3"\]\[data-vt-studio-button-on="true"\][^{}]*>\s*\[data-vt-studio-button-face\][^{}]*background:\s*var\(--pair-b/);
  });
});


describe("Studio field focus, floating labels, and toggle regressions", () => {
  it("keeps field glyph stroke primary at rest and focus, and shares risen-label typography tokens", () => {
    const fields = readFileSync(resolve(process.cwd(), "src/styles/studio-control-distill-overrides.css"), "utf8");
    const css = readStudioControlCss();
    const finalFieldContract = fields.slice(fields.lastIndexOf("/* Final regression-recovery contract"));
    expect(finalFieldContract).toContain("-webkit-text-stroke-color: var(--vt-field-primary, var(--vt-studio-control-accent, var(--pair-a, #36e0f6))) !important;");
    expect(finalFieldContract).toContain("text-stroke: var(--vt-studio-control-text-stroke, 1px) var(--vt-field-primary, var(--vt-studio-control-accent, var(--pair-a, #36e0f6))) !important;");
    expect(css).toContain("--vt-studio-floating-label-risen-font-size: 12px;");
    expect(css).toContain("--vt-studio-floating-label-risen-text-stroke: 0.5px;");
    expect(css).toContain("font-size: var(--vt-studio-floating-label-risen-font-size, 12px) !important;");
    expect(css).toContain("-webkit-text-stroke-width: var(--vt-studio-floating-label-risen-text-stroke, 0.5px) !important;");
    expect(css).toContain("vt-studio-textarea-compact-font-size, 14px");
    expect(css).toContain("vt-studio-28-font-size, 24px");
  });

  it("centers the double-side divider and gives V2/V4 compact catalog specimens", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(css).toContain(".vt-studio-value-toggle--double .vt-studio-value-toggle__divider");
    expect(css).toContain("left: 50%;");
    expect(css).toContain("transform: translateX(-50%);");
    expect(catalog).toContain('size={index === 1 || index === 3 ? "compact" : "standard"}');
  });

  it("keeps bar-toggle arrows interactive and inactive bars visible", () => {
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioValueToggles.tsx"), "utf8");
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(source).toContain("event.currentTarget.setPointerCapture?.(event.pointerId)");
    expect(source).toContain("onPointerCancel={stopRepeat}");
    expect(source).toContain("onLostPointerCapture={stopRepeat}");
    expect(css).toContain("color-mix(in srgb, #fff 50%, var(--vt-studio-control-accent, var(--pair-a, #36e0f6)) 50%)");
    expect(css).toMatch(/\.vt-studio-value-toggle__bars\s*\{[^}]*display:\s*flex/s);
    expect(css).toContain('data-active="true"');
    expect(css).toContain("pointer-events: auto;");
  });

  it("renders a single multi-select summary without a second numeric badge", () => {
    const html = renderToStaticMarkup(
      <StudioLegendMultiDropdown
        label="Videos"
        value={["videos", "shorts"]}
        options={[{ value: "videos", label: "VIDEOS" }, { value: "shorts", label: "SHORTS" }]}
      />
    );
    expect(html).toContain("VIDEOS +1");
    expect(html).not.toContain("vt-studio-legend-count");
    expect(html).not.toContain('aria-label="2 selected"');
  });
});


describe("StudioSquareIconButtonGroup joined rail", () => {
  it("renders one accessible toolbar shell around two or more square icon buttons", () => {
    const html = renderToStaticMarkup(
      <StudioSquareIconButtonGroup sizeVariant="compact" aria-label="Rate answer">
        <StudioSquareIconButton icon={<span>+</span>} label="Helpful" sizeVariant="compact" />
        <StudioSquareIconButton icon={<span>-</span>} label="Not useful" sizeVariant="compact" />
      </StudioSquareIconButtonGroup>,
    );
    expect(html).toContain('role="toolbar"');
    expect(html).toContain('aria-label="Rate answer"');
    expect(html).toContain('data-vt-studio-icon-button-group="true"');
    expect(html).toContain('data-size="compact"');
    expect(html).toContain('data-vt-studio-icon-button="true"');
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(css).toContain(".vt-studio-square-icon-button-group");
    expect(css).toContain("border-right: var(--vt-icon-group-stroke) solid #000 !important;");
    expect(css).toContain("border-radius: 0 !important;");
    expect(css).toContain("overflow: visible;");
  });
});


describe("Confirmed Primitive Library composite specimens", () => {
  it("registers joined square icon groups, two-line buttons, and top split modules as canonical specimens", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(catalog).toContain('title="Square Icon Button Groups · Standard + Compact"');
    expect(catalog).toContain("<StudioSquareIconButtonGroup");
    expect(catalog).toContain('title="Two-Line Button · Standard + Compact"');
    expect(catalog).toContain("<StudioTwoLineButton");
    expect(catalog).toContain('title="Top Split Module · Left / Right / Double / None"');
    expect(catalog).toContain("<StudioTopSplitModule");
    expect(catalog).toContain('split="double"');
    expect(catalog).toContain('tone="accent"');
  });
});

describe("StudioTopSplitModule", () => {
  it("renders an accessible compact split header and white content body", () => {
    const html = renderToStaticMarkup(
      <StudioTopSplitModule
        title="Prompt Library"
        split="left"
        sizeVariant="compact"
        startIcon={<span aria-hidden="true">P</span>}
        aria-label="Prompt library"
      >
        <p>Search prompts</p>
      </StudioTopSplitModule>,
    );
    expect(html).toContain('data-vt-studio-top-split-module="true"');
    expect(html).toContain('data-size="compact"');
    expect(html).toContain('data-split="left"');
    expect(html).toContain('aria-label="Prompt library"');
    expect(html).toContain('class="vt-studio-top-split-module__body"');
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(css).toContain(".vt-studio-top-split-module__head[data-split=\"left\"]");
    expect(css).toContain(".vt-studio-top-split-module__body");
  });
});


describe("StudioSplitTwoLineButton", () => {
  it("renders a canonical split-left rail with two-line label at standard and compact sizes", () => {
    const standard = renderToStaticMarkup(
      <StudioSplitTwoLineButton icon={<span aria-hidden="true">✎</span>} firstLine="EDIT" secondLine="PROMPT" sizeVariant="standard" aria-label="Edit prompt" />,
    );
    const compact = renderToStaticMarkup(
      <StudioSplitTwoLineButton icon={<span aria-hidden="true">✎</span>} firstLine="SEND" secondLine="TO CHAT" sizeVariant="compact" aria-label="Send to chat" />,
    );
    expect(standard).toContain('data-vt-library-component="StudioSplitTwoLineButton"');
    expect(standard).toContain('data-vt-studio-split="left"');
    expect(standard).toContain('data-vt-studio-button-lines="two"');
    expect(standard).toContain('data-size="standard"');
    expect(standard).toContain('data-vt-studio-button-line="first">EDIT</span>');
    expect(standard).toContain('data-vt-studio-button-line="second">PROMPT</span>');
    expect(standard).toContain('aria-label="Edit prompt"');
    expect(compact).toContain('data-size="compact"');
    expect(compact).toContain('data-vt-studio-button-line="first">SEND</span>');
    expect(compact).toContain('data-vt-studio-button-line="second">TO CHAT</span>');

    const catalog = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    expect(catalog).toContain("Split Two-Line Button");
    expect(catalog).toContain('data-vt-library-component="StudioSplitTwoLineButton"');
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8");
    expect(css).toContain('[data-vt-studio-button-lines="two"][data-vt-studio-split="left"] [data-vt-studio-split-label]');
  });
});


describe("Studio Controls regression recovery contracts", () => {
  it("keeps every Studio text field primary-stroked at rest and focus", () => {
    const inputSource = readFileSync("src/studio-ui/primitives/StudioTextInput.tsx", "utf8");
    const fields = readFileSync("src/styles/studio-control-fields.css", "utf8");
    expect(inputSource).toContain('"vt-studio-text-input--simple"');
    expect(fields).toContain('input.vt-studio-text-input--simple[data-vt-studio-control="true"]:is(:focus, :focus-visible)');
    expect(fields).toContain('-webkit-text-stroke-color: var(--vt-field-primary, var(--vt-studio-control-accent, var(--pair-a, #36e0f6))) !important;');
    expect(fields).toContain('[data-vt-studio-field-kind="text-box"]');
  });

  it("pins split rails to square inner dimensions and restores full-width intermodules", () => {
    const split = readFileSync("src/styles/studio-control-split.css", "utf8");
    expect(split).toContain('grid-template-columns: auto minmax(0, 1fr);');
    expect(split).toContain('width: var(--vt-studio-control-height, 44px);');
    expect(split).toContain('height: 100%;');
    expect(split).not.toContain('--vt-studio-split-rail-size');
    expect(split).toContain('width: var(--vt-top-split-size, 44px);');
    expect(split).toContain('.vt-studio-inter-module');
    expect(split).toContain('grid-column: 1 / -1;');
  });
});


describe("collapsing module header geometry", () => {
  it("reserves the bottom divider space when collapsed so header content does not shift", () => {
    const css = readStudioControlCss()
    expect(css).toMatch(/\.vt-studio-collapsing-split-module:not\(\[open\]\)[^,{]*,?[\s\S]*?border-bottom:\s*var\(--vt-top-split-stroke,\s*3px\)\s+solid\s+transparent\s*!important/s)
    expect(css).toContain("Keep collapsed module header geometry identical to the expanded header.")
  })
})


describe("toggle and switch visible backgrounds", () => {
  it("keeps the switch tracks, word-toggle handles, and value-toggle faces visibly painted in the final CSS layer", () => {
    const css = readStudioControlCss()
    expect(css).toContain("Restore visible toggle/switch silhouettes after the final recovery layer.")
    expect(css).toContain('button[data-vt-studio-control="true"].vt-studio-44-switch')
    expect(css).toContain(".vt-studio-44-word-toggle .vt-studio-44-word-handle")
    expect(css).toContain(".vt-studio-value-toggle__face")
    expect(css).toContain(".vt-studio-value-toggle__bar[data-active=\"true\"]")
  })
})


describe("Studio left word counter and word slider", () => {
  it("cycles forward and backward through exactly four word states", () => {
    expect(STUDIO_LEFT_WORD_OPTIONS).toEqual(["ONE", "TWO", "THREE", "FOUR"]);
    expect(normalizeStudioLeftWordIndex(5)).toBe(1);
    expect(normalizeStudioLeftWordIndex(0)).toBe(4);
    expect(normalizeStudioLeftWordIndex(3)).toBe(3);
  });

  it("renders the corresponding label and semantic state for every word", () => {
    const specimens = [1, 2, 3, 4].map(value => renderToStaticMarkup(
      <StudioLeftWordCounter value={value} onValueChange={() => undefined} ariaLabel="Word state specimen" />,
    ));
    ["ONE", "TWO", "THREE", "FOUR"].forEach((word, index) => {
      expect(specimens[index]).toContain(`data-vt-studio-word-index="${index + 1}"`);
      expect(specimens[index]).toContain(`>${word}</span>`);
    });
  });

  it("renders the four-state left counter using the existing counter shell", () => {
    const html = renderToStaticMarkup(
      <StudioLeftWordCounter value={3} onValueChange={() => undefined} ariaLabel="Word counter test" />,
    );
    expect(html).toContain('data-vt-library-component="StudioLeftWordCounter"');
    expect(html).toContain('data-vt-studio-word-index="3"');
    expect(html).toContain(">THREE</span>");
    expect(html).toContain('aria-label="Increase Word counter test"');
    expect(html).toContain('aria-label="Decrease Word counter test"');
  });

  it("renders a four-position slider with a synchronized numeric right section", () => {
    const html = renderToStaticMarkup(
      <StudioLeftWordSlider value={3} onValueChange={() => undefined} ariaLabel="Word slider test" />,
    );
    expect(html).toContain('data-vt-library-component="StudioLeftWordSlider"');
    expect(html).toContain('data-vt-studio-slider="left-word"');
    expect(html).toContain('type="range"');
    expect(html).toContain('min="1"');
    expect(html).toContain('max="4"');
    expect(html).toContain('value="3"');
    expect(html).toContain('aria-label="Word slider test"');
    expect(html).toContain('>3</output>');
  });

  it("registers both production primitives in the confirmed representative library", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    expect(html).toContain('data-vt-library-component="StudioLeftWordCounter"');
    expect(html).toContain('data-vt-library-component="StudioLeftWordSlider"');
  });

  it("defines palette-state and slider geometry rules in the dedicated stylesheet", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-word-counter.css"), "utf8");
    expect(css).toContain('[data-vt-studio-word-index="2"]');
    expect(css).toContain('[data-vt-studio-word-index="3"]');
    expect(css).toContain('[data-vt-studio-word-index="4"]');
    expect(css).toContain(".vt-studio-left-word-slider");
    expect(css).toContain("prefers-reduced-motion");
  });
});


describe("StudioSplitTextInput badge-owned composition", () => {
  it("composes one split badge shell with the native StudioTextInput for left, right, and double layouts", () => {
    const left = renderToStaticMarkup(<StudioSplitTextInput split="left" sizeVariant="standard" leftIcon={<span>SEARCH</span>} aria-label="Search" />);
    const right = renderToStaticMarkup(<StudioSplitTextInput split="right" sizeVariant="standard" rightIcon={<span>FILTER</span>} aria-label="Filter" />);
    const double = renderToStaticMarkup(<StudioSplitTextInput split="double" sizeVariant="standard" leftIcon={<span>SEARCH</span>} rightIcon={<span>FILTER</span>} aria-label="Search and filter" />);
    expect(left).toContain('class="vt-studio-split-text-input"');
    expect(left).toContain('data-vt-studio-split="left"');
    expect(left).toContain('data-vt-library-component="StudioSplitLeftBadge"');
    expect(right).toContain('data-vt-studio-split="right"');
    expect(right).toContain('data-vt-library-component="StudioSplitRightBadge"');
    expect(double).toContain('data-vt-studio-split="double"');
    expect(double).toContain('data-vt-library-component="StudioDoubleSplitBadge"');
    expect(double).toContain('class="vt-studio-text-input');
    expect(double).toContain('aria-label="Search and filter"');
  });

  it("uses one shell perimeter and divider, secondary square rails, and a primary inset input stroke", () => {
    const css = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/studio-split-text-input.css"), "utf8");
    expect(css).toContain('grid-template-columns: var(--vt-studio-control-height, 44px) minmax(0, 1fr)');
    expect(css).toContain('background: var(--vt-studio-control-secondary');
    expect(css).toContain('box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-split-field-primary)');
    expect(css).toContain('border: 0;');
    expect(css).not.toContain('!important');
    expect(css).not.toContain('border: var(--vt-studio-control-stroke, 3px) solid var(--vt-split-field-primary)');
  });

  it("supports the complete five-tier size contract", () => {
    for (const size of ["supreme", "standard", "compact", "mini", "micro"] as const) {
      const html = renderToStaticMarkup(<StudioSplitTextInput split="double" sizeVariant={size} aria-label={size + " split input"} />);
      expect(html).toContain('data-size="' + size + '"');
    }
  });
});

describe("confirmed split badge rails and double-side toggle shell", () => {
  it("renders both icon rails for split-left and double-split badges", () => {
    const left = renderToStaticMarkup(<StudioSplitLeftBadge icon={<span>LEFT_ICON</span>}>READY</StudioSplitLeftBadge>);
    const double = renderToStaticMarkup(<StudioDoubleSplitBadge leftIcon={<span>LEFT_ICON</span>} rightIcon={<span>RIGHT_ICON</span>}>READY</StudioDoubleSplitBadge>);
    expect(left).toContain("LEFT_ICON");
    expect(double).toContain("LEFT_ICON");
    expect(double).toContain("RIGHT_ICON");
    expect((double.match(/data-vt-studio-split-rail/g) ?? []).length).toBe(2);
  });

  it("keeps nested double-side shells borderless and leaves one outer perimeter", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-value-toggles.css"), "utf8");
    expect(css).toContain(".vt-studio-value-toggle--double > .vt-studio-value-toggle__double-side > .vt-studio-split-shell");
    expect(css).toContain("border: 0;");
    expect(css).toContain("box-shadow: none;");
  });

  it("keeps confirmed counter and slider family specimens in a single column", () => {
    const css = readFileSync(resolve(process.cwd(), "src/components/studio-hub/studio-hub-primitive-catalogs.css"), "utf8");
    expect(css).toContain(".vt-confirmed-counter-pair,");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr);");
    expect(css).not.toContain("@media (min-width: 720px) {\n  .vt-confirmed-slider-pair { grid-template-columns: repeat(2, minmax(0, 1fr)); }");
  });
});
