import React from "react"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { classifyConfirmedCatalogItem, StudioHubConfirmedPrimitiveCatalog } from "./StudioHubConfirmedPrimitiveCatalog"

const readStudioControlCss = () => [
  "studio-control-system.css",
  "studio-control-core.css",
  "studio-control-split.css",
  "studio-control-fields.css",
  "studio-inter-module.css",
].map((file) => readFileSync(resolve(process.cwd(), "src/styles", file), "utf8")).join("\n")

describe("confirmed composite primitive catalog", () => {
  it("constrains every confirmed-library module to the toolbox width on mobile", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-confirmed-catalog-modules.css"), "utf8")
    const containment = css.slice(css.lastIndexOf("/* Confirmed library mobile containment: module cards must fit the toolbox column."))
    expect(containment).toContain(".vt-confirmed-catalog")
    expect(containment).toContain(".vt-confirmed-family-module")
    expect(containment).toContain(".vt-confirmed-primitive-module")
    expect(containment).toMatch(/width:\s*100%/)
    expect(containment).toMatch(/max-width:\s*100%/)
    expect(containment).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/)
    expect(containment).toMatch(/@media\s*\(max-width:\s*720px\)/)
  })

  it("retains solid/rainbow status badges, flush navigation tabs, and LED motion specimens", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    expect(source).toContain("LED BADGE · SOLID + RAINBOW")
    expect(source).toContain("FLUSH NAVIGATION · FOUR TABS / ONE ACTIVE")
    expect(source).toContain("MOTION STATES · STEADY / PRISM / RADAR / FLARE2 / BLINK")
    expect(source).toContain('label:"THINKING"')
  })

  it("shows the InterModule specimen using the production 4px side-gutter bleed override", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const css = readStudioControlCss()
    expect(source).toContain('className="vt-studio-inter-host--bleed"')
    expect(css).toMatch(/\.vt-studio-inter-module\.vt-studio-inter-host--bleed\s*\{[^}]*width:\s*calc\(100%\s*\+\s*8px\)[^}]*margin-inline:\s*-4px/s)
  })

  it("keeps a black horizontal header/body divider while collapsing modules are expanded", () => {
    const css = readStudioControlCss()
    expect(css).toMatch(/\.vt-studio-collapsing-split-module\[open\]\s*>\s*\.vt-studio-collapsing-split-module__head\s*\{[^}]*border-bottom:\s*var\(--vt-top-split-stroke,\s*3px\)\s+solid\s+#000/s)
    expect(css).toMatch(/\.vt-studio-collapsing-split-module:not\(\[open\]\)\s*>\s*\.vt-studio-collapsing-split-module__head[^{]*\{[^}]*border-bottom:\s*0\s*!important/s)
  })


  it("keeps the top imported-primitive ledger lean and gives module specimens dedicated sections", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const representativeStart = source.indexOf("const ConfirmedDirectPrimitiveRows")
    const representativeEnd = source.indexOf("const ConfirmedStudioCounterFamily")
    expect(representativeStart).toBeGreaterThanOrEqual(0)
    expect(representativeEnd).toBeGreaterThan(representativeStart)
    const representative = source.slice(representativeStart, representativeEnd)

    expect(representative).toContain('title="Direct Imported Primitive Representatives · Standard"')
    for (const primitive of [
      "StudioButton", "StudioActionButton", "StudioTwoLineButton", "StudioSplitTwoLineButton",
      "StudioSplitLeftButton", "StudioSplitRightButton", "StudioDoubleSplitButton",
      "StudioIconButton", "StudioSquareIconButton", "StudioCircleIconButton", "StudioSquareIconButtonGroup",
      "StudioPlayPauseButton", "StudioSwitch", "StudioChoice", "StudioRadio", "StudioCheckbox", "StudioXCheckbox",
      "StudioTextInput",
      "StudioTextArea", "StudioTextBox", "StudioSplitTextInput",
      "StudioDropdown", "StudioLegendMultiDropdown", "StudioSplitLeftDropdown",
      "StudioArrowToggle", "StudioBarToggle", "StudioWordToggle", "StudioVerticalWordToggle",
      "StudioSideToggle", "StudioDoubleSideToggle", "StudioCounter", "StudioSideCounter", "StudioLeftCounter",
      "StudioDoubleSplitSlider", "StudioSplitLeftBadge", "StudioSplitRightBadge", "StudioDoubleSplitBadge",
      "StudioSpectrumTag", "StudioCloseableBadge", "StudioBrainStatusBadge", "StudioBrainStatusIndicator", "StudioTagEditor", "StudioUploadFrame",
      "StudioTopSplitModule", "StudioCollapsingSplitModule", "StudioCollapsingTwoLineModule", "StudioInterModule", "StudioTwoLineInterModule", "StudioSplitAccordion", "StudioResponseMetaRow", "StudioChatResponseShell", "StudioChatActionGroup",
    ]) {
      expect(representative).toContain(`data-vt-library-component="${primitive}"`)
    }
    expect(source).toContain('title="Collapsing Split Module · Standard + Compact"')
    expect(source).toContain('title="Collapsing Two-Line Module · Standard"')
    expect(source).toContain('data-vt-library-component="StudioCollapsingTwoLineModule"')
    expect(source).toContain('title="InterModule · Standard"')
    expect(source).toContain('title="Split Accordion · Train Motion"')
    const directPrimitiveNames = [...representative.matchAll(/data-vt-library-component="([^"]+)"/g)].map((match) => match[1])
    expect(new Set(directPrimitiveNames).size).toBe(directPrimitiveNames.length)
    for (const primitive of [
      "StudioBrainStatusIndicator", "StudioInterModule", "StudioTwoLineInterModule",
      "StudioTopSplitModule", "StudioCollapsingSplitModule", "StudioCollapsingTwoLineModule",
      "StudioSplitAccordion", "StudioResponseMetaRow", "StudioChatResponseShell", "StudioChatActionGroup",
    ]) {
      expect(directPrimitiveNames).toContain(primitive)
    }
    for (const primitive of directPrimitiveNames) {
      expect(representative).toContain(`<${primitive}`)
    }

    for (const title of [
      "Double Split Button · Standard + Compact",
      "Legend Multi Dropdown · Standard + Compact",
      "Arrow Toggle · Standard + Compact",
      "Bar Toggle · Standard + Compact",
      "Word Toggle · Standard + Compact",
      "Side Toggle · Standard + Compact",
      "Double Side Toggle · Standard + Compact",
    ]) {
      expect(source).toContain(`title="${title}"`)
    }
  })

  it("renders the representative ledger as a single full-width row and groups all module primitives together", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const styles = readFileSync(resolve(process.cwd(), "src/styles/studio-confirmed-catalog-modules.css"), "utf8")
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)

    expect(source).toContain('className="vt-confirmed-catalog vt-confirmed-direct-representatives"')
    expect(styles).toMatch(/\.vt-confirmed-direct-representatives\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s)
    expect(styles).toMatch(/\.vt-confirmed-direct-primitive-rows\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s)
    expect(styles).toMatch(/\.vt-confirmed-direct-primitive-rows\s*>\s*\.vt-confirmed-variant\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/s)

    const classifierStart = source.indexOf("const classifyConfirmedCatalogItem")
    const classifierEnd = source.indexOf("const ConfirmedCatalogFamilyGroups", classifierStart)
    const classifier = source.slice(classifierStart, classifierEnd)
    expect(classifier).toContain('"Text Fields"')
    expect(classifier).toContain('"Buttons & Badges"')
    expect(classifier).toContain('"Dropdowns"')
    expect(classifier).toContain('"Controls"')
    expect(classifier).not.toContain('"Counters & Sliders"')
    expect(classifier).toMatch(/StudioCounter[\s\S]*return "Controls"/)
    expect(classifier).toContain('"Modules & Frames"')
    expect(classifier).toContain('"Compositions"')
    expect(classifier).toMatch(/StudioCounter\|StudioSideCounter\|StudioLeftCounter\|StudioLeftWordCounter/)
    expect(classifier).toMatch(/Dropdown\|Multi Selection\|Single Selection/)
    expect(classifier).toMatch(/WordToggle\|ArrowToggle\|SideToggle\|BarToggle/)
    expect(source).not.toContain('"Text Controls"')
    expect(html).toContain("Collapsing Split Module · Standard + Compact")
    expect(html).toContain("Collapsing Two-Line Module · Standard")
    expect(html).toContain("InterModule · Standard")
    expect(html).toContain("Top Split Module · Left / Right / Double / None")
    expect(html).toContain("Split Accordion · Train Motion")
  })

  it("renders one canonical parent module per catalog category and classifies all value controls as Controls", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const categoryCount = (title: string) => [...html.matchAll(new RegExp(`<summary[^>]*>${title}</summary>`, "g"))].length

    for (const category of ["Text Fields", "Buttons & Badges", "Dropdowns", "Controls", "Modules & Frames", "Compositions"]) {
      expect(categoryCount(category), `${category} parent module count`).toBe(1)
    }
    expect(html).not.toContain("Counters & Sliders")
    expect(source).not.toContain("<ConfirmedCatalogFamilyGroups>\n       <Family title=\"StudioChatComposerDock")
    expect(source).toContain("useConfirmedAdditionalPrimitiveSections")
    expect(source).toContain('title="Compatibility Field Exports · Standard"')
    expect(source).toContain('title="Compatibility Control Exports · Standard"')
    expect(source).toContain('title="Composition Helpers · Standard"')
  })

  it("registers the independent Split Accordion at standard, compact, and micro sizes", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    expect(html).toContain("Split Accordion · Train Motion");
    expect(html).toContain('data-vt-studio-split-accordion="true"');
    expect(html).toContain('data-vt-library-component="StudioSplitAccordion"');
    expect(html).toContain('data-size="standard"');
    expect(html).toContain('data-size="compact"');
    expect(html).toContain('data-size="micro"');
    expect(html).toContain('data-section-count="10"');
    expect(html).toContain("44px Standard · 3 sections");
    expect(html).toContain("44px Standard · 10 sections");
    expect(html).toContain("28px Compact · 10 sections");
    expect(html).toContain("12px Micro · 10 sections");
    expect(html).toContain("60px Supreme · 5 sections");
    expect(html).toContain("20px Mini · 5 sections");
    expect(html).toContain('data-size="supreme"');
    expect(html).toContain('data-size="mini"');
    const specimenSource = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioSplitAccordionCatalogSpecimens.tsx"), "utf8");
    const catalogSource = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(specimenSource).toContain('gridTemplateColumns: "minmax(0, 1fr)"');
    expect(specimenSource).toContain('width: "100%"');
    expect(catalogSource).toContain('<div className="w-full min-w-0 max-w-none"');
    const catalogCss = readFileSync(resolve(process.cwd(), "src/components/studio-hub/studio-hub-primitive-catalogs.css"), "utf8");
    expect(catalogCss).toContain('.vt-confirmed-family:has([data-vt-confirmed-primitive="StudioSplitAccordion"]) > .vt-confirmed-primitive-body > .vt-confirmed-variants');
    expect(catalogCss).toContain('display: block;\n  grid-template-columns: minmax(0, 1fr);\n  width: 100%;');
  });

  it("registers StudioTextBox against shared field geometry and the 0.85 line-height token", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('title="Studio Text Box · Supreme + Standard + Compact + Mini + Micro"')
    expect(html).toContain('data-vt-studio-text-box="true"')
    expect(html).toContain('data-size="standard"')
    expect(html).toContain('data-size="compact"')
    expect(html).toContain('data-size="micro"')
    expect(html).toContain('data-size="mini"')
    expect(html).toContain('data-size="supreme"')
    expect(html).toContain('aria-readonly="true"')
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-control-system.css"), "utf8")
    expect(source).toContain("export const StudioTextBox")
    expect(css).toContain("line-height: var(--vt-studio-textarea-line-height, .85);")
    expect(css).not.toMatch(/line-height:\s*(?:0)?\.75\b/)
    expect(css).toContain("var(--vt-studio-control-stroke")
    expect(css).toContain("var(--vt-studio-control-radius")
    expect(css).toContain('data-size="compact"')
    expect(css).toContain('data-size="micro"')
  })

  it("registers the production Play/Pause split-left control at standard and compact sizes", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('Play/Pause Split-left Button · 44px + 28px')
    expect(html).toContain('data-vt-studio-play-pause="true"')
    expect(html).toContain('data-vt-library-component="StudioPlayPauseButton"')
    expect(html).toContain('data-size="standard"')
    expect(html).toContain('data-size="compact"')
    expect(html).toContain('aria-pressed="false"')
    expect(html).toContain('data-vt-studio-play-pause-measure="play"')
    expect(html).toContain('data-vt-studio-play-pause-measure="pause"')
  })

  it("registers the circular icon shape by reusing the canonical square icon button contract", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('Circle Icon Button · 44px + 28px')
    expect(html).toContain('data-vt-studio-circle-icon-button="true"')
    expect(html).toContain('data-vt-studio-icon-button="true"')
    expect(html).toContain('data-vt-library-component="StudioCircleIconButton"')
    expect(html).toContain('aria-label="Circle icon button V1"')
    expect(html).toContain('aria-label="Compact circle icon button V4"')
  })

  it("registers the unified split text input across left, right, double, and all five sizes", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    expect(html).toContain('data-vt-library-component="StudioSplitTextInput"');
    expect(html).toContain('aria-label="Standard split-left text input"');
    expect(html).toContain('aria-label="Standard split-right text input"');
    expect(html).toContain('aria-label="Standard double-split text input"');
    expect(html).toContain('aria-label="Supreme split-left text input"');
    expect(html).toContain('aria-label="Mini split-left text input"');
    expect(html).toContain('aria-label="Micro split-left text input"');
  })
  it("registers the production closeable badge and animated tag editor under global rule exceptions", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain("StudioCloseableBadge · Fixed 20px Exception")
    expect(html).toContain("StudioTagEditor · Tokenized Actions")
    expect(html).toContain('data-vt-studio-badge="true"')
    expect(html).toContain('data-vt-studio-tag-editor="true"')
    expect(html).toContain("StudioCloseableBadge")
    expect(html).toContain("StudioTagEditor")
    expect(html).toContain("20px pill")
    expect(html).toContain("action H 28px")
    expect(html).toContain("vt-studio-tag-editor__square-action")
  })

  it("registers StudioTextInput floating-label and fixed-label variants", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('data-vt-studio-field="floating-input"')
    expect(html).toContain('data-vt-studio-field="fixed-label-input"')
    expect(html).toContain('class="vt-studio-floating-field-label"')
    expect(html).toContain('class="vt-studio-fixed-field-label"')
    expect(html).toContain('aria-label="Studio floating-label input standard A"')
    expect(html).toContain('aria-label="Studio fixed-label input standard A"')
    expect(html).toContain('data-vt-floating-variant="b"')
  })

  it("uses the canonical compact Studio text input and staged flight transition", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('data-vt-studio-control="true"')
    expect(html).toContain('data-size="compact"')
    const css = readStudioControlCss()
    expect(css).toContain('.vt-studio-tag-editor__fly[data-targeted="true"] { opacity: 1; }')
    expect(css).toContain('.vt-studio-tag-editor__fly[data-arrived="true"] { opacity: 0; }')
  })

  it("preserves the requested comparison rows and 50-color spectrum sample", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    for (const label of [
      "Square icon button V1 primary fill",
      "Square icon button V2 secondary fill",
      "Toggle square icon button selection",
      "Square icon button V4 black fill",
      "Compact square icon button V1",
      "Compact square icon button V2",
      "Toggle compact square icon button selection",
      "Compact square icon button V4",
      "ROTATED TOGGLE",
      "3D FLIP",
      "TOOLTIP",
      "MORPH",
      "SUCCESS STATE",
    ]) {
      expect(html).toContain(label)
    }
    expect(html).toContain('class="vt-confirmed-square-variant-grid"')
    expect(html).toContain('class="vt-confirmed-square-effect-grid"')
    expect(html).toContain('class="vt-confirmed-stepper-row-grid"')
    expect(html).toContain('class="vt-confirmed-spectrum-tag-grid"')
    for (const label of [
      "AARDVARK", "AZURE", "BANANA", "BLUEBELL", "CANDY", "CITRUS",
      "DAFFODIL", "DENIM", "EBONY", "EMERALD", "FERN", "FROST",
      "GOLD", "GREEN", "HAZEL", "HONEY", "INDIGO", "IVORY",
      "JADE", "JASMINE", "KIWI", "KUMQUAT", "LAVENDER", "LEMON",
      "MAGENTA", "MINT", "NAVY", "NEON", "OPAL", "ORANGE",
      "PEACH", "PERIWINKLE", "QUARTZ", "QUINCE", "ROSE", "RUBY",
      "SAPPHIRE", "SCARLET", "TEAL", "TURQUOISE", "ULTRAMARINE", "UMBER",
      "VIOLET", "VIRIDIAN", "WALNUT", "WHITE", "XANTHAN", "XENON",
      "YELLOW", "ZUCCHINI",
    ]) {
      expect(html).toContain(`>${label}</button>`)
    }
    expect(html).toContain("44px standard")
    expect(html).toContain("28px compact")
  })


  it("registers shared split-right and double-split badges and the global spacing/micro contracts", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('data-vt-studio-split-badge="right"')
    expect(html).toContain('data-vt-studio-split-badge="double"')
    expect(html).toContain("SPLIT-RIGHT BADGE · SHARED FOUNDATION")
    expect(html).toContain("DOUBLE-SPLIT BADGE · SHARED FOUNDATION")
    expect(html).toContain('data-size="micro"')
    const css = readStudioControlCss()
    expect(css).toContain("--vt-studio-space-unit: 4px")
    expect(css).toContain('[data-size="micro"]')
    expect(css).toContain("box-shadow: none !important")
    expect(css).toContain("transition: none !important")
  })


  it("declares the canonical flat and stationary primitive contract", () => {
    const css = readStudioControlCss()
    expect(css).toContain("Confirmed Primitive flat-control contract (2026-10-16)")
    expect(css).toContain("box-shadow: none !important")
    expect(css).toContain("transition: none !important")
    expect(css).toContain("translate: none !important")
    expect(css).toContain("prefers-reduced-motion: reduce")
    const catalog = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(catalog).toContain("flat and stationary")
    expect(catalog).not.toContain("Current CSS translates outer action 1.5px on hover")
  })


  it("keeps split badges to one perimeter border and square micro rails", () => {
    const css = readStudioControlCss()
    expect(css).toContain('.vt-studio-split-shell[data-vt-studio-split="double"]')
    expect(css).toContain("border-radius: 0;")
    expect(css).toContain("aspect-ratio: 1 / 1;")
    expect(css).toContain("border-right: var(--vt-studio-control-stroke")
    expect(css).toContain("border-left: var(--vt-studio-control-stroke")
    expect(css).toContain('[data-vt-studio-control="true"][data-size="micro"]')
  })

  it("uses primary/secondary rail colors and contains split-right/double-split labels", () => {
    const css = readStudioControlCss()
    expect(css).toContain("--vt-studio-control-accent: var(--pair-a")
    expect(css).toContain("--vt-studio-control-secondary: var(--pair-b")
    expect(css).toContain(".vt-studio-split-right-badge__label")
    expect(css).toContain("grid-template-columns: minmax(0, 1fr) var(--vt-studio-control-height")
    expect(css).toContain("[data-vt-studio-split-label]")
    expect(css).toContain("text-overflow: ellipsis")
    expect(css).toContain("white-space: nowrap")
    const labelBlock = css.slice(css.indexOf(".vt-studio-split-left-badge__label,"), css.indexOf(".vt-studio-split-shell > [data-vt-studio-split-field]"))
    expect(labelBlock).not.toContain("flex: 1 1 0%")
    expect(labelBlock).not.toMatch(/(?:^|\n)\s*width:\s*0(?:;|\s|$)/)
  })

  it("enforces global primary/secondary palette, centered labels, 1000 weight, and full-row defaults", () => {
    const css = readStudioControlCss()
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    expect(css).toContain("--vt-studio-control-accent: var(--pair-a")
    expect(css).toContain("--vt-studio-control-secondary: var(--pair-b")
    expect(css).toContain("font-weight: 1000 !important")
    expect(css).toContain("text-align: center")
    expect(css).toContain('width: 100%')
    expect(css).toContain('[data-vt-studio-width="content"]')
    expect(controls).toContain('width: "full-row by default; data-width=content is an explicit opt-in exception"')
    expect(controls).toContain('labelAlignment: "centered by default for all primitive labels"')
  })

  it("enforces square-ratio split segments, outer-edge label centering, and shared orb dividers", () => {
    const css = readStudioControlCss()
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8")
    expect(css).toContain('.vt-studio-split-shell[data-vt-studio-split="double"]')
    expect(css).toContain("grid-template-columns: var(--vt-studio-control-height")
    expect(css).toContain("aspect-ratio: 1 / 1;")
    expect(css).toContain("align-items: center")
    expect(css).toContain("justify-content: center")
    expect(css).toContain(".vt-studio-split-shell > [data-vt-studio-split-rail]")
    expect(css).toContain("justify-content: center")
    expect(css).toContain("text-align: center")
    expect(css).toContain("border-right: var(--vt-studio-control-stroke")
    expect(css).toContain("border-left: var(--vt-studio-control-stroke")
    expect(controls).toContain('splitSegmentRatio: "icon rails are square (1:1) to the selected size tier; labels center in the remaining text region against the outer perimeter bounds"')
    expect(controls).toContain('splitDividers: "single split has exactly one shared internal divider; double split has exactly two; dividers use the global border width and are never duplicated on label edges"')
  })

  it("documents and enforces row-fill defaults, three size tiers, and distinct field typography", () => {
    const css = readStudioControlCss()
    const tokens = readFileSync(resolve(process.cwd(), "src/studio-ui/tokens.ts"), "utf8")
    const catalog = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(css).toContain('data-vt-studio-width="content"')
    expect(css).toContain("width: 100%")
    expect(css).toContain("--vt-studio-control-text-stroke: var(--vt-studio-44-text-stroke, 1px)")
    expect(css).toContain("--vt-studio-control-text-stroke: var(--vt-studio-28-text-stroke, .5px)")
    expect(css).toContain("--vt-studio-14-text-stroke, .25px")
    expect(css).toContain("--vt-studio-textarea-standard-font-size: 18px")
    expect(css).toContain("--vt-studio-textarea-compact-font-size: 14px")
    expect(css).toContain(".vt-studio-floating-field > .vt-studio-floating-field-label")
    expect(css).toContain(".vt-studio-fixed-label-field > .vt-studio-fixed-field-label")
    expect(tokens).toContain('width: "row"')
    expect(tokens).toContain('inlineStrokeWidth: "same as border width"')
    expect(tokens).toContain("compactTextStroke: 0.35")
    expect(tokens).toContain("fontWeight: 1000")
    expect(catalog).toContain("row-fill by default")
    expect(catalog).toContain("data-width=&quot;content&quot;")
    expect(catalog).toContain('data-vt-library-component="StudioTextBox"')
    expect(catalog).toContain('aria-label="Studio text box standard"')
    expect(catalog).toContain('aria-label="Studio text box compact"')
    expect(catalog).toContain('aria-label="Studio text box micro"')
    const catalogSource = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    expect(catalogSource.match(/<Family title="Studio Text Box · Supreme \\+ Standard \\+ Compact \\+ Mini \\+ Micro"/g)).toHaveLength(1)
    expect(catalogSource).not.toContain('src/studio-ui/primitives/StudioTextBox.tsx')
  })

})


it("keeps one square-icon family and exposes all four canonical toggle/choice skins", () => {
  const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
  expect(html).not.toContain("Button + Split-left · Complete Variant Matrix")
  expect(html.match(/Square Icon Button · 44px \+ 28px/g)).toHaveLength(1)
  expect(html).not.toContain("Square Icon Button · All Presets + Animations")
  expect(html).toContain("Square icon button V1 primary fill")
  expect(html).toContain("HEART + STATE FEEDBACK")
  expect(html).toContain("V1 · PRIMARY / SECONDARY")
  expect(html).toContain("V2 · PRIMARY ↔ SECONDARY")
  expect(html).toContain("V3 · WHITE INDICATOR")
  expect(html).toContain("V4 · BLACK INDICATOR")
  expect(html).toContain("COUNTER-CONTROLLED · UP / DOWN")
  const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
  const css = readStudioControlCss()
  expect(source).not.toContain("StudioIconButton")
  expect(source).not.toContain('title="Icon Button · 44px + 28px"')
  expect(source).toContain("const CHOICE_SKINS = CANONICAL_SKINS")
  expect(source).toContain("const WORD_TOGGLE_SKINS = CANONICAL_SKINS")
  const choiceFamily = source.slice(source.indexOf('<Family title="44px Radio + Checkbox"'), source.indexOf('<Family title="Word Toggles'))
  expect(choiceFamily).toContain("CHOICE_SKINS.map")
  expect(choiceFamily).toContain("StudioCheckbox")
  expect(choiceFamily).toContain("StudioXCheckbox")
  expect(css).toContain("Four canonical state-fill / indicator-shape variants shared by switches")
  expect(css).toContain('background: color-mix(in srgb, var(--vt-studio-control-accent, var(--pair-a, #36e0f6)) 50%, transparent) !important')
  expect(css).toContain(".vt-studio-44-choice.is-color-swap.is-on")
  expect(css).toContain(".vt-studio-44-word-toggle.is-white-indicator .vt-studio-44-word-handle")
  expect(css).toContain(".vt-studio-44-word-toggle.is-black-indicator .vt-studio-44-word-handle")
});


describe("confirmed primitive edge and open-state regression coverage", () => {
  it("bleeds the InterModule past the catalog's 4px side gutters without adding internal padding", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-inter-module.css"), "utf8")
    expect(source).toContain("vt-studio-inter-host--bleed")
    expect(css).toMatch(/\.vt-studio-inter-host--bleed\s*\{[^}]*width:\s*calc\(100%\s*\+\s*8px\)[^}]*margin-inline:\s*-4px/s)
    expect(css).not.toMatch(/\.vt-studio-inter-host--bleed\s*\{[^}]*width:\s*calc\(100%\s*\+\s*16px\)/s)
    expect(css).not.toMatch(/\.vt-studio-top-split-module\[data-size="compact"\][^{]*\.vt-studio-inter-host--bleed/)
  })

  it("restores the horizontal header/body divider while collapsible modules are open", () => {
    const css = readStudioControlCss()
    expect(css).toMatch(/\.vt-studio-collapsing-split-module\[open\][^{]*\.vt-studio-collapsing-split-module__head\s*\{[^}]*border-bottom:\s*var\(--vt-top-split-stroke[^;]*solid\s+#000/s)
  })
})

describe("confirmed double-split slider specimen isolation", () => {
  it("gives each standard, compact, and micro slider specimen an independent value state", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const family = source.slice(source.indexOf("const ConfirmedStudioDoubleSplitSliderFamily"), source.indexOf("const ConfirmedStudioSideCounterFamily"))

    expect(family).toContain("const [standardA, setStandardA] = React.useState(62)")
    expect(family).toContain("const [standardB, setStandardB] = React.useState(62)")
    expect(family).toContain("const [standardC, setStandardC] = React.useState(62)")
    expect(family).toContain("value={standardA} onValueChange={setStandardA} size=\"standard\" ariaLabel=\"Standard slider\"")
    expect(family).toContain("value={standardB} onValueChange={setStandardB} size=\"standard\" ariaLabel=\"Standard slider secondary palette\"")
    expect(family).toContain("value={standardC} onValueChange={setStandardC} size=\"standard\" leftControls=\"counter\" ariaLabel=\"Counter-controlled slider\"")

    expect(family).toContain("const [compactA, setCompactA] = React.useState(38)")
    expect(family).toContain("const [compactB, setCompactB] = React.useState(38)")
    expect(family).toContain("const [microA, setMicroA] = React.useState(7)")
    expect(family).toContain("const [microB, setMicroB] = React.useState(7)")
    expect(family).not.toContain("value={standardValue} onValueChange={setStandardValue}")
    expect(family).not.toContain("value={compactValue} onValueChange={setCompactValue}")
    expect(family).not.toContain("value={microValue} onValueChange={setMicroValue}")
  })
})


describe("confirmed counter specimen isolation", () => {
  it("gives every counter palette specimen independent state", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const counters = source.slice(source.indexOf("const ConfirmedStudioCounterFamily"), source.indexOf("const ConfirmedStudioDoubleSplitSliderFamily"))
    const sideCounters = source.slice(source.indexOf("const ConfirmedStudioSideCounterFamily"), source.indexOf("export default StudioHubConfirmedPrimitiveCatalog"))

    for (const state of ["standardPrimary", "standardReversed", "compactPrimary", "compactReversed", "microPrimary", "microReversed"]) {
      expect(counters).toContain(`const [${state}, set${state[0].toUpperCase() + state.slice(1)}] = React.useState(`)
      expect(counters).toContain(`value={${state}} onValueChange={set${state[0].toUpperCase() + state.slice(1)}}`)
    }
    expect(counters).not.toContain("value={standardValue} onValueChange={setStandardValue}")
    expect(counters).not.toContain("value={compactValue} onValueChange={setCompactValue}")
    expect(counters).not.toContain("value={microValue} onValueChange={setMicroValue}")

    for (const state of ["sideStandard", "leftStandard", "sideCompact", "leftCompact", "sideMicro", "leftMicro"]) {
      expect(sideCounters).toContain(`const [${state}, set${state[0].toUpperCase() + state.slice(1)}] = React.useState(`)
      expect(sideCounters).toContain(`value={${state}} onValueChange={set${state[0].toUpperCase() + state.slice(1)}}`)
    }
    expect(sideCounters).not.toContain("value={standardValue} onValueChange={setStandardValue}")
    expect(sideCounters).not.toContain("value={compactValue} onValueChange={setCompactValue}")
    expect(sideCounters).not.toContain("value={microValue} onValueChange={setMicroValue}")
  })
})


describe("confirmed vertical word-toggle primitive", () => {
  it("registers the four palette variants across standard, compact, and micro size exceptions", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const css = readStudioControlCss();

    expect(html).toContain("Vertical Word Toggle");
    expect(html).toContain('data-vt-studio-vertical-word-toggle="true"');
    expect(html).toContain('data-vertical-word-toggle-variant="black-fill"');
    expect(html).toContain('data-vertical-word-toggle-variant="primary-white-handle"');
    expect(html).toContain('data-vertical-word-toggle-variant="white-fill"');
    expect(source).toContain("StudioVerticalWordToggle");
    expect(source).toContain("vt-confirmed-vertical-word-toggle-standard");
    expect(source).toContain("vt-confirmed-vertical-word-toggle-compact");
    expect(source).toContain("vt-confirmed-vertical-word-toggle-micro");
    expect(controls).toContain("export const StudioVerticalWordToggle");
    expect(controls).toContain('verticalWordToggle:');
    expect(css).toContain(".vt-studio-vertical-word-toggle");
    expect(css).toContain("width: max-content;");
    expect(css).toContain("min-width: max-content;");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(source).toContain('title="Switches, Radios & Checkboxes"');
    expect(source).toContain('title="Word Toggles · Standard + Compact + Vertical"');
    expect(source).toContain('primitive="StudioWordToggle / StudioVerticalWordToggle"');
    expect(source).not.toContain("Switches, radios, checkboxes, horizontal word toggles, and vertical word toggles are grouped in one family module.");
    expect(readFileSync(resolve(process.cwd(), "src/components/studio-hub/studio-hub-primitive-catalogs.css"), "utf8")).toContain("flex-direction: column;\n  align-items: flex-start;");
  });

  it("documents the vertical word-toggle height as a named exception while retaining global typography tokens", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const tokens = readFileSync(resolve(process.cwd(), "src/studio-ui/tokens.ts"), "utf8");
    const css = readStudioControlCss();

    expect(controls).toContain('height: "content-driven two-word stack; intentionally not 44px / 28px / 14px"');
    expect(tokens).toContain("verticalWordToggle");
    expect(css).toContain("--vt-studio-vertical-word-font-size");
    expect(css).toContain(".vt-studio-vertical-word-toggle.is-micro");
  });
});

describe("responsive Studio upload frame", () => {
  it("keeps the ratio-based composition, split icon rails, and two-line upload prompt", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    const css = readStudioControlCss();
    expect(controls).toContain('data-vt-studio-upload-split="left"');
    expect(controls).toContain('data-vt-studio-upload-split="right"');
    expect(controls).toContain('<Upload />');
    expect(controls).toContain('<ImageIcon />');
    expect(controls).toContain("Image / video here · or click to upload");
    expect(css).toContain("aspect-ratio: 16 / 9;");
    expect(css).toContain("--vt-studio-upload-frame-stroke:");
    expect(css).toContain("--vt-studio-upload-layer-step:");
    expect(css).toContain("48cqw");
    expect(css).toContain(".vt-studio-upload-frame:hover");
    expect(css).toContain("vt-studio-upload-click");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("delays the native file picker for the one-second click animation", () => {
    const controls = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioControls.tsx"), "utf8");
    expect(controls).toContain("pickerDelayRef");
    expect(controls).toContain("window.setTimeout");
    expect(controls).toContain("1000");
    expect(controls).toContain("inputRef.current?.click()");
  });


  it("registers the Arrow, Side, Double Side, and Bar Toggle production specimens", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('data-vt-library-component="StudioArrowToggle"')
    expect(html).toContain('data-vt-studio-value-toggle="arrow"')
    expect(html).toContain('data-vt-studio-value-toggle="side"')
    expect(html).toContain('data-vt-studio-value-toggle="double"')
    expect(html).toContain('data-vt-studio-value-toggle="bar"')
    expect(html).toContain('data-right-appearance="primary"')
    expect(html).toContain('data-right-appearance="secondary"')
    expect(html).toContain('data-right-appearance="black-primary-text"')
    expect(html).toContain("V1 · PRIMARY RIGHT")
    expect(html).toContain("V1 · SECONDARY RIGHT")
    expect(html).toContain("V1 · BLACK / PRIMARY TEXT RIGHT")
    expect(html).toContain("V2 · PRIMARY RIGHT")
    expect(html).toContain("V2 · SECONDARY RIGHT")
    expect(html).toContain("V2 · BLACK / PRIMARY TEXT RIGHT")
    expect(html).toContain('aria-valuenow="50"')
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioValueToggles.tsx"), "utf8")
    const css = readStudioControlCss()
    expect(source).toContain('variant?: "v1" | "v2"')
    expect(source).not.toContain('variant?: "default" | "v2" | "v3" | "v4"')
    expect(source).toContain('rightAppearance?: "primary" | "secondary" | "black-primary-text"')
    expect(source).toContain('STUDIO_VALUE_TOGGLE_VARIANTS = ["v1", "v2"] as const')
    expect(css).toContain(".vt-studio-value-toggle__bar")
    expect(css).toContain("flex: 0 0 18px")
    expect(css).toContain(".vt-studio-value-toggle--double:focus-within")
    expect(css).toContain(".vt-studio-value-toggle--double .vt-studio-value-toggle__arrow:focus-visible")
  })

  it("registers StudioInterModule as a production primitive at compact, standard, and micro sizes", () => {
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    expect(html).toContain('data-vt-library-component="StudioInterModule"')
    expect(html).toContain('data-vt-library-component="StudioInterModule-standard"')
    expect(html).toContain('data-vt-library-component="StudioInterModule-micro"')
    expect(html).toContain("InterModule · COMPACT · NESTED + EDGE-FLUSH")
    expect(html).toContain("InterModule · STANDARD · EDGE-FLUSH NESTING")
    expect(html).toContain("InterModule · MICRO · DENSE NESTED LIST")
    const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives/StudioInterModule.tsx"), "utf8")
    const css = readFileSync(resolve(process.cwd(), "src/styles/studio-inter-module.css"), "utf8")
    const publicIndex = readFileSync(resolve(process.cwd(), "src/studio-ui/index.ts"), "utf8")
    expect(source).toContain('export type StudioInterModuleSize = "standard" | "compact" | "micro"')
    expect(source).toContain("onOpenChange")
    expect(source).toContain("defaultOpen")
    expect(source).toContain('aria-expanded={isOpen}')
    expect(css).toContain(".vt-studio-inter-module__head")
    expect(css).toContain("border-left: 0")
    expect(css).toContain("border-right: 0")
    expect(css).toContain(".vt-confirmed-intermodule-host > .vt-studio-top-split-module__body")
    expect(css).toContain("padding: 0 !important;")
    expect(css).toContain("width: 100%;\n  max-width: none;\n  min-width: 0;")
    expect(css).toContain('.vt-studio-top-split-module[data-size="compact"] > .vt-studio-top-split-module__body > .vt-studio-inter-host--bleed')
    expect(css).toContain("width: calc(100% + 12px);")
    expect(css).toContain("margin-inline: -6px;")
    expect(publicIndex).toContain('export { StudioInterModule } from "./primitives/StudioInterModule"')
    expect(publicIndex).toContain("StudioInterModuleProps, StudioInterModuleSize")
  })
});


describe("confirmed primitive family taxonomy", () => {
  it("requires explicit classification and keeps dropdown menus and value controls in their canonical groups", () => {
    const specimen = (title: string) => React.createElement("div", { title })

    expect(classifyConfirmedCatalogItem(specimen("Dropdown Menu Rows · Standard"))).toBe("Dropdowns")
    expect(classifyConfirmedCatalogItem(specimen("Dropdown Family · Standard / Split-Left / Multi-Select"))).toBe("Dropdowns")
    expect(classifyConfirmedCatalogItem(specimen("StudioCounter · Standard"))).toBe("Controls")
    expect(classifyConfirmedCatalogItem(specimen("StudioDoubleSplitSlider · Standard"))).toBe("Controls")
    expect(classifyConfirmedCatalogItem(specimen("Arrow / Side / Double Side / Bar Toggles"))).toBe("Controls")
    expect(classifyConfirmedCatalogItem(specimen("Studio Text Input · Standard"))).toBe("Text Fields")
    expect(classifyConfirmedCatalogItem(specimen("Split-left Button · Standard"))).toBe("Buttons & Badges")
    expect(classifyConfirmedCatalogItem(specimen("StudioInterModule · Standard"))).toBe("Modules & Frames")
    expect(classifyConfirmedCatalogItem(specimen("Publishing Card · Standard"))).toBe("Compositions")
    expect(() => classifyConfirmedCatalogItem(specimen("Unregistered New Primitive"))).toThrow(/Unclassified family/)
  })

  it("renders one canonical parent group per category and nests every specimen in the shared grouping pass", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const html = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />)
    const categoryCount = (title: string) => [...html.matchAll(new RegExp(`<summary[^>]*>${title}</summary>`, "g"))].length

    for (const category of ["Text Fields", "Buttons & Badges", "Dropdowns", "Controls", "Modules & Frames", "Compositions"]) {
      expect(categoryCount(category), `${category} parent module count`).toBe(1)
    }
    expect(html).not.toContain("Counters & Sliders")
    expect(source).toContain('return "Controls"')
    expect(source).toContain('return "Dropdowns"')
    expect(source).toContain('return "Text Fields"')
    expect(source).toContain("useConfirmedAdditionalPrimitiveSections")
    expect(source).not.toContain("const ConfirmedAdditionalPrimitiveSections")
    expect(source).not.toContain("<ConfirmedAdditionalPrimitiveSections />")
    expect(source).toContain("{additionalPrimitiveSections}")
    expect(source).toContain('title="Compatibility Field Exports · Standard"')
    expect(source).toContain('title="Compatibility Control Exports · Standard"')
    expect(source).toContain('title="Composition Helpers · Standard"')
    expect(source).toContain('title="Dropdown Family · Standard / Split-Left / Multi-Select"')
    expect(source).toContain('title="StudioDropdown · Single Selection"')
    expect(source).toContain('title="Studio Text Input · Standalone + Simple + Floating + Fixed Label"')
    expect(source).toContain('title="Studio Text Area · Standalone + Simple + Floating + Fixed Label"')
    expect(source).toContain('title="Studio Text Box · Supreme + Standard + Compact + Mini + Micro"')
    expect(source).toContain('title="StudioLeftCounter · Standard"')
    expect(source).toContain('title="Arrow / Side / Double Side / Bar Toggles"')
  })
})

describe("confirmed live primitive grid inventory", () => {
  it("keeps the live grid at the top and exposes all core and advanced production designs", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const start = source.indexOf("const ConfirmedPrimitiveGridOverview");
    const end = source.indexOf("const ConfirmedDirectPrimitiveRows", start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const grid = source.slice(start, end);
    expect(grid).toContain('data-vt-confirmed-primitive-grid="true"');
    expect(grid).toContain("<StudioComponentGrid cols={3} rows={6}");
    for (const primitive of [
      "StudioButton", "StudioSplitLeftButton", "StudioDropdown", "StudioTextInput", "StudioTextArea",
      "StudioCounter", "StudioSideCounter", "StudioDoubleSplitSlider", "StudioArrowToggle",
      "StudioDoubleSplitButton", "StudioSplitLeftDropdown", "StudioLegendMultiDropdown",
      "StudioDoubleSplitBadge", "StudioWordToggle", "StudioSwitch", "StudioUploadFrame",
      "StudioSplitAccordion", "StudioInterModule",
    ]) {
      expect(grid).toContain(`data-vt-library-component="${primitive}"`);
    }
  });
});

describe("confirmed primitive representative coverage", () => {
  it("renders named production representatives for the complete control and composition families", () => {
    const markup = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    for (const primitive of [
      "StudioButton", "StudioSplitLeftButton", "StudioDoubleSplitButton", "StudioTwoLineButton",
      "StudioSplitTwoLineButton", "StudioDropdown", "StudioLegendMultiDropdown", "StudioSplitLeftDropdown",
      "StudioTextInput", "StudioTextArea", "StudioTextBox", "StudioNumberInput",
      "StudioSplitTextInput", "StudioCounter", "StudioSideCounter", "StudioLeftCounter",
      "StudioLeftWordCounter", "StudioDoubleSplitSlider", "StudioLeftWordSlider", "StudioSplitLeftBadge",
      "StudioSplitRightBadge", "StudioDoubleSplitBadge", "StudioRadio", "StudioCheckbox", "StudioXCheckbox",
      "StudioWordToggle", "StudioVerticalWordToggle", "StudioArrowToggle", "StudioSideToggle",
      "StudioDoubleSideToggle", "StudioBarToggle", "StudioSpectrumTag", "StudioCloseableBadge",
      "StudioTagEditor", "StudioUploadFrame", "StudioSwitch", "StudioPlayPauseButton",
      "StudioSquareIconButton", "StudioCircleIconButton", "StudioSquareIconButtonGroup",
      "StudioTopSplitModule", "StudioCollapsingSplitModule", "StudioCollapsingTwoLineModule",
      "StudioInterModule", "StudioTwoLineInterModule", "StudioSplitAccordion", "StudioBrainStatusBadge",
      "StudioBrainStatusIndicator", "StudioResponseMetaRow", "StudioChatResponseShell", "StudioChatActionGroup",
    ]) {
      expect(markup, primitive).toContain(`data-vt-library-component="${primitive}"`);
    }
  });
});


describe("public export representative runtime coverage", () => {
  it("server-renders every formerly excepted public export as an explicitly named catalog specimen", () => {
    const markup = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    for (const representative of [
      "StudioInput",
      "Studioarea",
      "Studiotoggle",
      "Studioswitch",
      "Studioradio",
      "Studiocheck",
      "Studioxbox",
      "StudioComponentGridRow",
      "StudioComponentGridSpecimen",
      "StudioComponentGridSpecimenPair",
      "StudioHubCertification",
    ]) {
      expect(markup, representative).toContain(`data-vt-library-component="${representative}"`);
    }
  });
});


describe("Studio Calendar confirmed primitive representatives", () => {
  it("renders each calendar primitive as a real named specimen with every supported rail and ratio", () => {
    const markup = renderToStaticMarkup(<StudioHubConfirmedPrimitiveCatalog />);
    for (const primitive of ["StudioCalendarEventChip", "StudioCalendarMediaRail"]) {
      expect(markup).toContain(`data-vt-library-component="${primitive}"`);
    }
    for (const kind of ["publish", "task", "milestone", "reminder", "deadline"]) {
      expect(markup).toContain(`data-event-kind="${kind}"`);
    }
    for (const split of ["left", "right", "double"]) {
      expect(markup).toContain(`data-split="${split}"`);
    }
    expect(markup).toContain('data-aspect-ratio="16:9"');
    expect(markup).toContain('data-aspect-ratio="9:16"');
    expect(markup).toContain('data-event-status="scheduled"');
    expect(markup).toContain('data-event-status="in progress"');
    expect(markup).toContain("REMOVABLE EVENT");
  });
  it("lists the grid primitives and calendar components in their composition families, and keeps split text input variants inside Text Fields", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8")
    const toolbox = readFileSync(resolve(process.cwd(), "src/components/ToolboxUIReferenceLibrary.tsx"), "utf8")
    const publicApi = readFileSync(resolve(process.cwd(), "src/studio-ui/index.ts"), "utf8")
    const publicStudioValues = [...publicApi.matchAll(/export\s*\{([\s\S]*?)\}\s*from/g)]
      .flatMap((match) => match[1].split(","))
      .map((name) => name.trim().split(/\s+as\s+/)[0].trim())
      .filter((name) => /^Studio[A-Z]\w*$/.test(name))
    for (const name of publicStudioValues) {
      expect(source, `public component ${name} has a confirmed catalog specimen`).toContain(`data-vt-library-component="${name}"`)
    }
    expect(source).toContain('data-vt-library-component="StudioComponentGrid"')
    expect(source).toContain('data-vt-library-component="StudioComponentGridCell"')
    expect(source).toContain('data-vt-library-component="StudioCalendarEventChip"')
    expect(source).toContain('data-vt-library-component="StudioCalendarMediaRail"')
    expect(source).toContain('SPLIT TEXT INPUT · LEFT / RIGHT / DOUBLE')
    expect(toolbox).not.toContain('<StudioHubConfirmedSplitTextInputCatalog />')
    expect(source).not.toContain('StudioInlineStepper')
    expect(source).not.toContain('StudioSplitStepper')
  })

});


describe("confirmed representatives counter and slider design coverage", () => {
  it("shows each distinct numeric, directional, word, and slider design in the direct representatives section", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const start = source.indexOf('data-vt-confirmed-representatives="true"');
    const end = source.indexOf("</Family>", start);
    const representatives = source.slice(start, end);

    for (const primitive of [
      "StudioCounter",
      "StudioSideCounter",
      "StudioLeftCounter",
      "StudioLeftWordCounter",
      "StudioDoubleSplitWordCounter",
      "StudioDoubleSplitSlider",
      "StudioLeftWordSlider",
    ]) {
      expect(representatives, `${primitive} has a direct representative`).toContain(`data-vt-library-component="${primitive}"`);
    }
    expect(representatives).toContain("DOUBLE-SPLIT WORD COUNTER");
    expect(representatives).toContain("LEFT WORD SLIDER");
  });

  it("keeps the full five-tier size matrix visible for both slider designs and word counters", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const slider = source.slice(source.indexOf("const ConfirmedStudioDoubleSplitSliderFamily"), source.indexOf("const ConfirmedStudioSideCounterFamily"));
    const wordSlider = source.slice(source.indexOf("const ConfirmedStudioLeftWordSliderFamily"), source.indexOf("const ConfirmedStudioButtonFamily"));
    const wordCounter = source.slice(source.indexOf("const ConfirmedStudioLeftWordCounterFamily"), source.indexOf("const ConfirmedStudioDoubleSplitWordCounterFamily"));
    for (const tier of ['"supreme"', '"standard"', '"compact"', '"mini"', '"micro"']) {
      expect(slider, `double-split slider includes ${tier}`).toContain(tier);
      expect(wordSlider, `left word slider includes ${tier}`).toContain(tier);
      expect(wordCounter, `left word counter includes ${tier}`).toContain(tier);
    }
  });
});


describe("confirmed counter and slider palette contract", () => {
  it("uses the dedicated value-toggle stylesheet and excludes inverse-palette counter specimens", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(source).toContain('css="src/styles/studio-control-value-toggles.css"');
    expect(source).not.toContain('StudioCounter className="is-reversed"');
    expect(source).not.toContain('StudioSideCounter className="is-reversed"');
    expect(source).not.toContain('StudioLeftCounter className="is-reversed"');
    expect(source).not.toContain('StudioDoubleSplitSlider className="is-reversed"');
    expect(source).not.toContain('StudioDoubleSplitWordCounter className="is-reversed"');
    expect(source).not.toContain('StudioLeftWordSlider className="is-reversed"');
  });
});

describe("confirmed individual module variant completeness", () => {
  it("renders every supported size tier in the dropdown and split-button family modules", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const dropdown = source.slice(source.indexOf('const ConfirmedStudioDropdownFamily'), source.indexOf('type ConfirmedCatalogFamilyName'));
    const splitButtons = source.slice(source.indexOf('const ConfirmedStudioSplitButtonFamily'), source.indexOf('const ConfirmedStudioDropdownFamily'));
    const button = source.slice(source.indexOf('const ConfirmedStudioButtonFamily'), source.indexOf('const ConfirmedStudioSplitButtonFamily'));
    const tiers = ['"supreme"', '"standard"', '"compact"', '"mini"', '"micro"'];
    for (const tier of tiers) {
      expect(dropdown, `dropdown family includes ${tier}`).toContain(tier);
      expect(splitButtons, `split button family includes ${tier}`).toContain(tier);
    }
    expect(button).toContain('tier: "mini" as const');
    expect(button).toContain('buttonCell("mini", "row-6-mini-v7", 7, 20)');
    expect(splitButtons).toContain('size === "standard" || size === "compact"');
  });

  it("keeps the full palette and behavior variants represented in their owning module galleries", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const choiceFamily = source.slice(source.indexOf('const CanonicalControlFamilies'), source.indexOf('const CanonicalSplitBadgeFamily'));
    const wordFamily = source.slice(source.indexOf('const CanonicalWordToggleFamily'), source.indexOf('const Provenance'));
    const dropdownFamily = source.slice(source.indexOf('const ConfirmedStudioDropdownFamily'), source.indexOf('type ConfirmedCatalogFamilyName'));
    expect(choiceFamily).toContain("CANONICAL_SKINS.map");
    expect(choiceFamily).toContain("CHOICE_SKINS.map");
    expect(choiceFamily).toContain('["supreme", "standard", "compact", "mini", "micro"]');
    expect(wordFamily).toContain("WORD_TOGGLE_SKINS.map");
    expect(wordFamily).toContain('["60", "44", "28", "20", "12"]');
    expect(dropdownFamily).toContain("StudioLegendMultiDropdown");
    expect(source).toContain("StudioIconButton · All Five Sizes");
    expect(source).toContain('data-vt-library-component="StudioSplitTextInput"');
    expect(source).toContain('MINI · LEFT / RIGHT / DOUBLE');
    expect(source).toContain('MICRO · LEFT / RIGHT / DOUBLE');
    expect(source).toContain('["supreme", "mini", "micro"] as const');
    expect(dropdownFamily).toContain("StudioSplitLeftDropdown");
  });
});


describe("confirmed library cleanup and counter module visibility", () => {
  it("keeps side counter in its own Controls module and expands counter galleries by default", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const counter = source.slice(source.indexOf("const ConfirmedStudioCounterFamily"), source.indexOf("const ConfirmedStudioDoubleSplitSliderFamily"));
    expect(counter).not.toContain("<ConfirmedStudioSideCounterFamily />");
    expect(source).toContain("<ConfirmedStudioCounterFamily />");
    expect(source).toContain("<ConfirmedStudioSideCounterFamily />");
    expect(source).toContain('defaultOpen={family === "Controls"}');
    expect(source).toContain('title="Switches / Toggles / Radio / Checkbox" className="vt-confirmed-family-group vt-confirmed-switch-toggle-family" defaultOpen');
    for (const title of [
      "StudioCounter · Supreme + Standard + Compact + Mini + Micro",
      "StudioSideCounter · Supreme + Standard + Compact + Mini + Micro",
      "StudioLeftCounter · Standard",
      "StudioDoubleSplitSlider · Supreme + Standard + Compact + Mini + Micro",
      "StudioLeftWordCounter · Four-State Cycle + Five Sizes",
      "StudioDoubleSplitWordCounter · Two Chevron Rails + Four-State Word Cycle",
      "StudioLeftWordSlider · Slider + Numeric Right Rail",
    ]) {
      const familyStart = source.indexOf(`title="${title}"`);
      const familyEnd = source.indexOf("</Family>", familyStart);
      expect(familyStart, `${title} exists`).toBeGreaterThanOrEqual(0);
      expect(source.slice(familyStart, familyEnd)).toContain("defaultOpen");
    }
  });

  it("groups representative rows by primitive family and excludes retired library-only demos", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    const start = source.indexOf('data-vt-confirmed-representatives="true"');
    const end = source.indexOf("</Family>", start);
    const representatives = source.slice(start, end);
    const headings = ["BUTTONS", "DROPDOWNS", "TEXT FIELDS", "CONTROLS", "BADGES", "MODULES & COMPOSITIONS"];
    let last = -1;
    for (const heading of headings) {
      const next = representatives.indexOf(heading);
      expect(next, `representative group ${heading}`).toBeGreaterThan(last);
      last = next;
    }
    for (const retired of ["StudioChatActionGroup", "StudioSelect", "StudioSearchInput", "StudioHubCertification", "StudioComponentGridSpecimen"]) {
      expect(source).not.toContain(retired);
    }
    expect(source).toContain('data-vt-library-component="StudioComponentGrid"');
    expect(source).toContain('data-vt-library-component="StudioComponentGridCell"');
  });
});


describe("primitive module global width and stylesheet ownership", () => {
  it("shows canonical full-row auto width and shared styles in each primitive module settings panel", () => {
    const catalog = readFileSync(resolve(process.cwd(), "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"), "utf8");
    expect(catalog).toContain('className="vt-confirmed-global-settings"');
    expect(catalog).toContain("Width: full-row auto width by default");
    expect(catalog).toContain("canonical Studio control entry");
  });

  it("loads the canonical control entry from independently imported primitive modules", () => {
    const modules = [
      "StudioControls.tsx",
      "StudioValueToggles.tsx",
      "StudioLedBadgeTab.tsx",
      "StudioComponentGrid.tsx",
      "StudioSplitTextInput.tsx",
      "StudioSplitAccordion.tsx",
    ];
    for (const module of modules) {
      const source = readFileSync(resolve(process.cwd(), "src/studio-ui/primitives", module), "utf8");
      expect(source, module).toContain("studio-control-entry.css");
    }
  });
});
