import React from "react"
import { StudioPublishingCard } from "../../studio-ui/compositions/StudioPublishingCard"
import { Check, Home, Info, Settings2, Sparkles } from "lucide-react"
import { StudioSplitAccordionCatalogSpecimens } from "./StudioSplitAccordionCatalogSpecimens"
import ConfirmedSpecimenGrid from "./ConfirmedSpecimenGrid"
import { StudioSplitTextInput } from "../../studio-ui/primitives/StudioSplitTextInput"
import { StudioComponentGrid, StudioComponentGridCell, StudioComponentGridRow } from "../../studio-ui/primitives/StudioComponentGrid"
import {
  STUDIO_COMPONENT_GLOBAL_DEFAULTS,
  STUDIO_COMPONENT_SIZE_DEFAULTS,
  StudioButton,
  StudioInput,
  Studioarea,
  Studiotoggle,
  Studioswitch,
  Studioradio,
  Studiocheck,
  Studioxbox,
  StudioTwoLineButton,
  StudioSplitTwoLineButton,
  StudioActionButton,
  StudioChoice,
  StudioIconButton,
  StudioSplitRightButton,
  StudioCollapsingTwoLineModule,
  StudioRadio,
  StudioCheckbox,
  StudioXCheckbox,
  StudioLegendMultiDropdown,
  StudioCounter,
  StudioDoubleSplitSlider,
  StudioSideCounter,
  StudioLeftCounter,
  StudioLeftWordCounter,
  StudioLeftWordSlider,
  StudioSplitLeftButton,
  StudioDoubleSplitButton,
  StudioSplitLeftBadge,
  StudioSplitRightBadge,
  StudioDoubleSplitBadge,
  StudioSquareIconButton,
  StudioSquareIconButtonGroup,
  StudioTopSplitModule,
  StudioCollapsingSplitModule,
  StudioPlayPauseButton,
  StudioCircleIconButton,
  StudioSwitch,
  StudioTextArea,
  StudioTextBox,
  StudioTextInput,
  StudioNumberInput,
  StudioWordToggle,
  StudioVerticalWordToggle,
  StudioSpectrumTag,
  StudioCloseableBadge,
  StudioBrainStatusBadge,
  StudioBrainStatusIndicator,
  StudioTagEditor,
  StudioSplitLeftDropdown,
  StudioUploadFrame,
  STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS,
  StudioArrowToggle,
  StudioSideToggle,
  StudioDoubleSideToggle,
  StudioBarToggle,
} from "../../studio-ui/primitives/StudioControls"
import { StudioDoubleSplitWordCounter } from "../../studio-ui/primitives/StudioValueToggles"
import { StudioSplitAccordion } from "../../studio-ui/primitives/StudioSplitAccordion"
import { StudioCalendarEventChip, StudioCalendarMediaRail } from "../../studio-ui/primitives/StudioCalendarPrimitives"
import { StudioDropdown } from "../../studio-ui/primitives/StudioDropdown"
import { StudioInterModule, StudioTwoLineInterModule } from "../../studio-ui/primitives/StudioInterModule"
import { StudioResponseMetaRow } from "../../studio-ui/primitives/StudioResponseMetaRow"
import { StudioLedBadgeTab } from "../../studio-ui/primitives/StudioLedBadgeTab"
import { StudioChatComposerDock } from "../../studio-ui/primitives/StudioChatComposerDock"
import { StudioChatResponseShell } from "../../studio-ui/primitives/StudioChatResponseShell"
import "./studio-hub-primitive-catalogs.css"
import "../../styles/studio-confirmed-catalog-modules.css"
import { ConfirmedFamilyModule } from "./ConfirmedCatalogModules"

type Size = "44px" | "28px"

const sizeClass = (size: Size) => size === "44px" ? "is-large" : "is-compact"

const formatDefaultValue = (value: unknown): string => {
  if (value === null) return "none"
  if (Array.isArray(value)) return value.map(formatDefaultValue).join(", ")
  if (typeof value === "object") return Object.entries(value as Record<string, unknown>).map(([key, nested]) => `${key}: ${formatDefaultValue(nested)}`).join("; ")
  return String(value)
}

const CANONICAL_SKINS = [{ skin: "solid" as const, label: "V1 · PRIMARY / SECONDARY" }, { skin: "color-swap" as const, label: "V2 · PRIMARY ↔ SECONDARY" }, { skin: "white-indicator" as const, label: "V3 · WHITE INDICATOR" }, { skin: "black-indicator" as const, label: "V4 · BLACK INDICATOR" }]
const CHOICE_SKINS = CANONICAL_SKINS
const WORD_TOGGLE_SKINS = CANONICAL_SKINS
const VERTICAL_WORD_TOGGLE_VARIANTS = [
  { variant: "primary-secondary" as const, label: "PRIMARY / SECONDARY" },
  { variant: "black-fill" as const, label: "BLACK FILL" },
  { variant: "primary-white-handle" as const, label: "PRIMARY + WHITE HANDLE" },
  { variant: "white-fill" as const, label: "WHITE FILL" },
]
const CanonicalControlFamilies: React.FC = () => {
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  const [switches, setSwitches] = React.useState<boolean[]>(Array(40).fill(false))
  const [choices, setChoices] = React.useState<boolean[]>(Array(60).fill(false))
  const flip = (setter: React.Dispatch<React.SetStateAction<boolean[]>>, index: number, value?: boolean) => setter(current => current.map((old, i) => i === index ? (value ?? !old) : old))
  return <>
    <Family title="Switches, Radios & Checkboxes" nonDefaultSettings={[
        "Every supported size tier is shown for both switch shapes, radio, checkmark checkbox, and X-checkbox.",
        "Each size is paired with all four canonical skins: solid, color-swap, black-indicator, and white-indicator.",
        "Each example has independent checked state and native accessible-name semantics.",
      ]} provenance={<Provenance primitive="StudioSwitch / StudioRadio / StudioCheckbox / StudioXCheckbox" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Supreme / Standard / Compact / Mini / Micro × four canonical skins." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      <div className="vt-confirmed-choice-module">
        <div className="vt-confirmed-choice-names" aria-label="Component names">
          <span>ROUND SWITCH</span><span>RECTANGULAR SWITCH</span><span>RADIO BUTTON</span><span>CHECKMARK CHECKBOX</span><span>X CHECKBOX</span>
        </div>
        {sizes.map((size, sizeIndex) => <React.Fragment key={size}>
          <div className="vt-confirmed-choice-variant-headings" aria-label={size + " palette variants"}>
            <strong>{size.toUpperCase()}</strong>{CANONICAL_SKINS.map(skin => <span key={skin.skin}>{skin.label}</span>)}
          </div>
          <div className="vt-confirmed-choice-examples">
            {(["round", "rect"] as const).map((shape, row) => <div className="vt-confirmed-choice-example-row" key={size + "-switch-" + shape} aria-label={size + " " + shape + " switch examples"}>{CANONICAL_SKINS.map((skin, col) => { const index = sizeIndex * 8 + row * 4 + col; return <div key={skin.skin}><StudioSwitch shape={shape} skin={skin.skin} sizeVariant={size} checked={switches[index]} aria-label={size + " " + shape + " switch " + skin.label} onClick={() => flip(setSwitches, index)} /></div> })}</div>)}
            {([{Component:StudioRadio,label:"radio button",shape:"round" as const},{Component:StudioCheckbox,label:"checkmark checkbox",shape:"rect" as const},{Component:StudioXCheckbox,label:"X checkbox",shape:"rect" as const}]).map((item,row) => { const ChoiceComponent = item.Component; return <div className="vt-confirmed-choice-example-row" key={size + "-" + item.label} aria-label={size + " " + item.label + " examples"}>{CHOICE_SKINS.map((skin,col) => { const index = sizeIndex * 12 + row * 4 + col; return <div key={skin.skin}><ChoiceComponent shape={item.shape} skin={skin.skin} sizeVariant={size} checked={choices[index]} aria-label={size + " " + item.label + " " + skin.label} onClick={() => flip(setChoices, index)} /></div> })}</div> })}
          </div>
        </React.Fragment>)}
      </div>
    </Family>
  </>
}

const CanonicalSplitBadgeFamily: React.FC = () => (
  <>
    <Family
      title="Split-left Badge · Standard + Compact + Micro"
      nonDefaultSettings={[
        "Informational split-left badge, not an action button.",
        "Informational split-left badge supports the global Micro tier: 12px height, Mini-matched 1.5px stroke / 3px radius, and 10px type/icons.",
      ]}
      provenance={<Provenance
        primitive="StudioSplitLeftBadge"
        tsx="src/studio-ui/primitives/StudioControls.tsx"
        css="src/styles/studio-control-system.css"
        tokens="44px standard / 28px compact / 12px micro · 4px all-side spacing unit · centered labels · no shadows or transitions"
        imports={["src/studio-ui/primitives/StudioControls.tsx"]}
      />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-split-left-badge-family" data-vt-library-component="StudioSplitLeftBadge">
        <span>STANDARD · FULL ROW</span>
        <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="standard">READY</StudioSplitLeftBadge>
        <span>STANDARD · HALF ROW</span>
        <div className="vt-confirmed-badge-layout is-half">
          <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="standard">READY</StudioSplitLeftBadge>
          <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="standard">READY</StudioSplitLeftBadge>
        </div>
        <span>STANDARD · QUARTER ROW · 4×1</span>
        <div className="vt-confirmed-badge-layout is-quarter">
          {["READY", "SAVED", "SYNCED", "LIVE"].map(label => <StudioSplitLeftBadge key={label} icon={<Check aria-hidden="true" />} sizeVariant="standard">{label}</StudioSplitLeftBadge>)}
        </div>
        <span>COMPACT · FULL ROW</span>
        <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="compact">READY</StudioSplitLeftBadge>
        <span>COMPACT · HALF ROW</span>
        <div className="vt-confirmed-badge-layout is-half">
          <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="compact">READY</StudioSplitLeftBadge>
          <StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="compact">READY</StudioSplitLeftBadge>
        </div>
        <span>COMPACT · QUARTER ROW · 4×1</span>
        <div className="vt-confirmed-badge-layout is-quarter">
          {["READY", "SAVED", "SYNCED", "LIVE"].map(label => <StudioSplitLeftBadge key={label} icon={<Check aria-hidden="true" />} sizeVariant="compact">{label}</StudioSplitLeftBadge>)}
        </div>
        <span>MICRO · LEFT HALF ONLY · 1×1 / 2×1 / 4×1</span>
        <div className="vt-confirmed-badge-micro-stack">
          <div className="is-one"><StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="micro">1×1</StudioSplitLeftBadge></div>
          <div className="is-two">{["2×1 A", "2×1 B"].map(label => <StudioSplitLeftBadge key={label} icon={<Check aria-hidden="true" />} sizeVariant="micro">{label}</StudioSplitLeftBadge>)}</div>
          <div className="is-four">{["A", "B", "C", "D"].map(label => <StudioSplitLeftBadge key={label} icon={<Check aria-hidden="true" />} sizeVariant="micro">{label}</StudioSplitLeftBadge>)}</div>
        </div>
        <span>SPLIT-RIGHT BADGE · SHARED FOUNDATION</span>
        <StudioSplitRightBadge icon={<Settings2 aria-hidden="true" />} sizeVariant="standard">RIGHT ALIGNED RAIL</StudioSplitRightBadge>
        <span>DOUBLE-SPLIT BADGE · SHARED FOUNDATION</span>
        <StudioDoubleSplitBadge leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} sizeVariant="standard">CENTERED LABEL</StudioDoubleSplitBadge>
        <span>COMPACT + MICRO VARIANTS</span>
        <StudioSplitRightBadge icon={<Settings2 aria-hidden="true" />} sizeVariant="compact">COMPACT RIGHT</StudioSplitRightBadge>
        <StudioDoubleSplitBadge leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} sizeVariant="micro">MICRO DOUBLE</StudioDoubleSplitBadge>
      </div>
    </Family>
  </>
)

const CanonicalWordToggleFamily: React.FC = () => {
  const [words, setWords] = React.useState<boolean[]>(Array(20).fill(false))
  const [verticalWords, setVerticalWords] = React.useState<boolean[]>(Array(12).fill(false))
  const [verticalSupreme, setVerticalSupreme] = React.useState(false)
  const [verticalMini, setVerticalMini] = React.useState(false)
  const flip = (setter: React.Dispatch<React.SetStateAction<boolean[]>>, index: number, value?: boolean) => setter(current => current.map((old, i) => i === index ? (value ?? !old) : old))
  return (
    <>
    <Family title="Word Toggles · Standard + Compact + Vertical" nonDefaultSettings={[
        "The vertical variant is the layout exception; horizontal toggles retain the standard one-row control face.",
        "Each toggle uses independent state so changing one specimen does not change its neighbors.",
        "Vertical toggle width follows the longest word plus the original horizontal padding; height remains content-driven.",
      ]} provenance={<Provenance primitive="StudioWordToggle / StudioVerticalWordToggle" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px / 28px / 12px typography tiers; vertical toggle total height remains content-driven." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
    <div className="vt-confirmed-toggle-subfamily">
      <strong>WORD TOGGLE · ALL FIVE SIZES × FOUR SKINS</strong>
      <div className="vt-confirmed-control-family vt-confirmed-word-toggle-family">
        {(["60", "44", "28", "20", "12"] as const).map((size, sizeIndex) => <div className="vt-confirmed-control-row" key={size}>
          <strong>{({ "60": "SUPREME", "44": "STANDARD", "28": "COMPACT", "20": "MINI", "12": "MICRO" } as const)[size]} · WORD TOGGLE</strong>
          <div className="vt-confirmed-control-variants" data-control-size={size}>{WORD_TOGGLE_SKINS.map((skin,col) => { const index = sizeIndex * 4 + col; return <div key={skin.skin}><StudioWordToggle size={size} skin={skin.skin} value={words[index]} words={col === 0 ? ["WRITE","CREATE"] : ["OFF","ON"]} onValueChange={value => flip(setWords, index, value)} aria-label={size + " word toggle " + (col + 1)} /></div> })}</div>
        </div>)}
      </div>
    </div>
    <div className="vt-confirmed-toggle-subfamily">
      <strong>VERTICAL WORD TOGGLE · SUPREME + STANDARD + COMPACT + MINI + MICRO</strong>
      <div className="vt-confirmed-vertical-word-toggle-family">
        <div className="vt-confirmed-vertical-word-toggle-size-row">
          <strong>STANDARD · SINGLE COLUMN</strong>
          <div className="vt-confirmed-vertical-word-toggle-standard">
            {VERTICAL_WORD_TOGGLE_VARIANTS.map((item, index) => <div className="vt-confirmed-vertical-word-toggle-specimen" key={item.variant}>
              <small>{item.label}</small>
              <StudioVerticalWordToggle sizeVariant="standard" variant={item.variant} value={verticalWords[index]} onValueChange={value => flip(setVerticalWords, index, value)} words={index === 0 ? ["WRITE", "CREATE"] : ["OFF", "ON"]} aria-label={"Standard vertical word toggle " + item.label} />
            </div>)}
          </div>
        </div>
        <div className="vt-confirmed-vertical-word-toggle-size-row">
          <strong>COMPACT · SINGLE COLUMN + MICRO MATRIX</strong>
          <div className="vt-confirmed-vertical-word-toggle-compact">
            {VERTICAL_WORD_TOGGLE_VARIANTS.map((item, index) => <div className="vt-confirmed-vertical-word-toggle-specimen" key={item.variant}>
              <small>{item.label}</small>
              <StudioVerticalWordToggle sizeVariant="compact" variant={item.variant} value={verticalWords[4 + index]} onValueChange={value => flip(setVerticalWords, 4 + index, value)} words={index === 0 ? ["WRITE", "CREATE"] : ["OFF", "ON"]} aria-label={"Compact vertical word toggle " + item.label} />
            </div>)}
            <div className="vt-confirmed-vertical-word-toggle-micro" aria-label="Micro vertical word toggle variants">
              {VERTICAL_WORD_TOGGLE_VARIANTS.map((item, index) => <div className="vt-confirmed-vertical-word-toggle-specimen" key={item.variant}>
                <small>{item.label}</small>
                <StudioVerticalWordToggle sizeVariant="micro" variant={item.variant} value={verticalWords[8 + index]} onValueChange={value => flip(setVerticalWords, 8 + index, value)} words={["OFF", "ON"]} aria-label={"Micro vertical word toggle " + item.label} />
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="vt-confirmed-vertical-word-toggle-size-row">
      <strong>SUPREME + MINI · SINGLE COLUMN</strong>
      <div className="vt-confirmed-vertical-word-toggle-standard">
        <div className="vt-confirmed-vertical-word-toggle-specimen"><small>SUPREME · 60PX</small><StudioVerticalWordToggle sizeVariant="supreme" variant="primary-secondary" value={verticalSupreme} onValueChange={setVerticalSupreme} words={["WRITE", "CREATE"]} aria-label="Supreme vertical word toggle" /></div>
        <div className="vt-confirmed-vertical-word-toggle-specimen"><small>MINI · 20PX</small><StudioVerticalWordToggle sizeVariant="mini" variant="primary-secondary" value={verticalMini} onValueChange={setVerticalMini} words={["OFF", "ON"]} aria-label="Mini vertical word toggle" /></div>
      </div>
    </div>
    </Family>
    </>
  )
}

const Provenance: React.FC<{ primitive: string; tsx: string; css: string; tokens: string; imports: string[] }> = ({ primitive, tsx, css, tokens, imports }) => (
  <div className="vt-confirmed-provenance">
    <div><strong>{primitive}</strong></div>
    <div>TSX: <code>{tsx}</code></div>
    <div>CSS: <code>{css}</code></div>
    <div>{tokens}</div>
    <div>Imports: {imports.map((path) => <code key={path}>{path}</code>)}</div>
  </div>
)

const Family: React.FC<{ title: string; children: React.ReactNode; provenance: React.ReactNode; nonDefaultSettings?: string[]; defaultOpen?: boolean }> = ({ title, children, provenance, nonDefaultSettings = [], defaultOpen = false }) => (
  <details
    className={`vt-confirmed-family vt-confirmed-primitive-module ${/Button|Split-left/.test(title) ? "vt-confirmed-button-family" : ""}`}
    data-vt-confirmed-primitive="true"
    data-vt-primitive-title={title}
    open={defaultOpen || undefined}
  >
    <summary className="vt-confirmed-primitive-summary">
      <h3 title={title}>{title}</h3>
    </summary>
    <div className="vt-confirmed-primitive-body">
      <div className="vt-confirmed-variants">{children}</div>
      {(nonDefaultSettings.length > 0 || provenance) && (
        <details className="vt-confirmed-source-details">
          <summary>Settings + source</summary>
          <section className="vt-confirmed-global-settings" aria-label={`${title} global defaults`}>
            <strong>GLOBAL DEFAULTS</strong>
            <ul>
              <li>Width: full-row auto width by default; intrinsic/content width is an explicit, source-backed exception only.</li>
              <li>Shared Studio size, color, typography, border, inset-stroke, and focus rules load from the canonical Studio control entry.</li>
            </ul>
          </section>
          {nonDefaultSettings.length > 0 && (
            <section className="vt-confirmed-nondefault-settings" aria-label={`${title} settings`}>
              <strong>NON-DEFAULT SETTINGS</strong>
              <ul>{nonDefaultSettings.map((setting) => <li key={setting}>{setting}</li>)}</ul>
            </section>
          )}
          {provenance}
        </details>
      )}
    </div>
  </details>
)


/**
 * Compact source-of-truth specimen ledger: exactly one live, production-exported
 * primitive per standard-size row. Keep the samples intentionally unadorned so
 * the component under test—not a catalog lookalike—owns its rendering.
 */
/** A visible, top-of-library composition grid using real production primitives. */
const ConfirmedPrimitiveGridOverview: React.FC = () => {
  const [counterValue, setCounterValue] = React.useState(24)
  const [sideCounterValue, setSideCounterValue] = React.useState(36)
  const [sliderValue, setSliderValue] = React.useState(58)
  const [buttonPressed, setButtonPressed] = React.useState(false)
  const [splitButtonPressed, setSplitButtonPressed] = React.useState(false)
  const [arrowValue, setArrowValue] = React.useState("ONE")
  const options = ["ONE", "TWO", "THREE"] as const
  return (
    <section className="vt-confirmed-primitive-grid-overview" data-vt-confirmed-primitive-grid="true" aria-labelledby="vt-confirmed-primitive-grid-title">
      <h2 id="vt-confirmed-primitive-grid-title">Primitive Grid · Live Production Components</h2>
      <p>Top-level quick reference: real production primitives across action, split, field, choice, counter, slider, and toggle designs. The complete standard representative inventory and detailed family variants follow below.</p>
      <StudioComponentGrid cols={1} rows={9} size="standard" aria-label="Confirmed Studio primitive grid">
        <StudioComponentGridCell col={1} row={1}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioButton">
            <span>BUTTON</span>
            <StudioButton sizeVariant="standard" aria-label="Grid specimen button" onClick={() => setButtonPressed(value => !value)}>{buttonPressed ? "SELECTED" : "STUDIO BUTTON"}</StudioButton>
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={4}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioSplitLeftButton">
            <span>SPLIT BUTTON</span>
            <StudioSplitLeftButton sizeVariant="standard" icon={<Sparkles aria-hidden="true" />} aria-label="Grid specimen split button" onClick={() => setSplitButtonPressed(value => !value)}>{splitButtonPressed ? "SELECTED" : "SPLIT LEFT"}</StudioSplitLeftButton>
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={7}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioDropdown">
            <span>DROPDOWN</span>
            <StudioDropdown sizeVariant="standard" ariaLabel="Grid specimen dropdown" defaultValue="balanced" options={[{ value: "balanced", label: "BALANCED" }, { value: "focused", label: "FOCUSED" }, { value: "expanded", label: "EXPANDED" }]} />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={4}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioTextInput">
            <span>TEXT INPUT</span>
            <StudioTextInput sizeVariant="standard" aria-label="Grid specimen text input" placeholder="TYPE HERE" />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={5}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioTextArea">
            <span>TEXT AREA</span>
            <StudioTextArea sizeVariant="standard" rows={2} aria-label="Grid specimen text area" placeholder="TYPE HERE" />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={6}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioCounter">
            <span>COUNTER</span>
            <StudioCounter size="standard" value={counterValue} onValueChange={setCounterValue} min={0} max={100} ariaLabel="Grid specimen counter" />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={7}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioSideCounter">
            <span>SIDE COUNTER</span>
            <StudioSideCounter value={sideCounterValue} onValueChange={setSideCounterValue} size="standard" min={0} max={100} ariaLabel="Grid specimen side counter" />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={8}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioDoubleSplitSlider">
            <span>DOUBLE SPLIT SLIDER</span>
            <StudioDoubleSplitSlider size="standard" value={sliderValue} onValueChange={setSliderValue} min={0} max={100} ariaLabel="Grid specimen double split slider" />
          </div>
        </StudioComponentGridCell>
        <StudioComponentGridCell col={1} row={9}>
          <div className="vt-confirmed-primitive-grid-cell" data-vt-library-component="StudioArrowToggle">
            <span>ARROW TOGGLE</span>
            <StudioArrowToggle size="standard" value={arrowValue} options={options} onValueChange={setArrowValue} ariaLabel="Grid specimen arrow toggle" />
          </div>
        </StudioComponentGridCell>
      </StudioComponentGrid>
    </section>
  )
}

const ConfirmedDirectPrimitiveRows: React.FC = () => {
  const [splitLeftPressed, setSplitLeftPressed] = React.useState(false)
  const [splitRightPressed, setSplitRightPressed] = React.useState(false)
  const [doubleSplitPressed, setDoubleSplitPressed] = React.useState(false)
  const [arrowValue, setArrowValue] = React.useState("ONE")
  const [barValue, setBarValue] = React.useState(40)
  const [wordValue, setWordValue] = React.useState(false)
  const [verticalWordValue, setVerticalWordValue] = React.useState(false)
  const [sideValue, setSideValue] = React.useState("LOW")
  const [doubleLeft, setDoubleLeft] = React.useState("SOURCE")
  const [doubleRight, setDoubleRight] = React.useState("TARGET")
  const [counterValue, setCounterValue] = React.useState(24)
  const [sideCounterValue, setSideCounterValue] = React.useState(36)
  const [leftWordValue, setLeftWordValue] = React.useState(1)
  const [leftWordSliderValue, setLeftWordSliderValue] = React.useState(3)
  const [sliderValue, setSliderValue] = React.useState(58)
  const [leftCounterRepValue, setLeftCounterRepValue] = React.useState(12)
  const [doubleWordCounterValue, setDoubleWordCounterValue] = React.useState(2)
  const options = ["ONE", "TWO", "THREE"] as const
  const dropdownOptions = [
    { value: "balanced", label: "BALANCED" },
    { value: "focused", label: "FOCUSED" },
    { value: "expanded", label: "EXPANDED" },
  ]
  return (
    <Family
      title="Direct Imported Primitive Representatives · Standard"
      nonDefaultSettings={[
        "Standard-size examples are the production components themselves; the catalog only supplies representative content and state.",
        "The double-split face uses two square rails and one divider; module and accordion geometry is documented in the dedicated families.",
      ]}
      provenance={<Provenance
        primitive="StudioButton · StudioSplitLeftButton · StudioDoubleSplitButton · StudioTwoLineButton · StudioSplitTwoLineButton · StudioDropdown · StudioLegendMultiDropdown · StudioSplitLeftDropdown · StudioArrowToggle · StudioBarToggle · StudioWordToggle · StudioTextInput · StudioSplitTextInput · StudioTextArea · StudioTextBox · StudioSideToggle · StudioDoubleSideToggle · StudioCounter · StudioSideCounter · StudioLeftWordCounter · StudioLeftWordSlider · StudioDoubleSplitSlider"
        tsx="src/studio-ui/primitives/StudioControls.tsx + src/studio-ui/primitives/StudioSplitTextInput.tsx + src/studio-ui/primitives/StudioValueToggles.tsx"
        css="src/styles/studio-control-system.css + src/styles/studio-control-value-toggles.css + src/styles/studio-control-word-counter.css + src/studio-ui/primitives/studio-split-text-input.css"
        tokens="44px standard geometry; component-specific native input/textarea exceptions retained; word counter and slider share the five-tier Studio size contract"
        imports={["src/studio-ui/primitives/StudioControls.tsx", "src/studio-ui/primitives/StudioSplitTextInput.tsx", "src/studio-ui/primitives/StudioValueToggles.tsx", "src/styles/studio-control-value-toggles.css", "src/styles/studio-control-word-counter.css", "src/studio-ui/primitives/studio-split-text-input.css"]}
      />}
    >
      <div className="vt-confirmed-direct-primitive-rows" data-vt-confirmed-representatives="true" aria-label="Canonical primitive representatives">
        <h4 className="vt-confirmed-representative-heading">BUTTONS</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioButton"><span>Studio Button · STANDARD</span><StudioButton sizeVariant="standard" aria-label="Studio button standard specimen">STUDIO BUTTON</StudioButton></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitLeftButton"><span>Split Left Button · STANDARD</span><StudioSplitLeftButton sizeVariant="standard" icon={<Sparkles aria-hidden="true" />} aria-label="Split left button standard specimen" onClick={() => setSplitLeftPressed(value => !value)}>{splitLeftPressed ? "SELECTED" : "SPLIT LEFT"}</StudioSplitLeftButton></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitRightButton"><span>Split Right Button · STANDARD</span><StudioSplitRightButton sizeVariant="standard" icon={<Settings2 aria-hidden="true" />} aria-label="Split right button standard specimen" onClick={() => setSplitRightPressed(value => !value)}>{splitRightPressed ? "SELECTED" : "SPLIT RIGHT"}</StudioSplitRightButton></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDoubleSplitButton"><span>Double Split Button · STANDARD</span><StudioDoubleSplitButton sizeVariant="standard" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Double split button standard specimen" onClick={() => setDoubleSplitPressed(value => !value)}>{doubleSplitPressed ? "SELECTED" : "DOUBLE SPLIT"}</StudioDoubleSplitButton></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTwoLineButton"><span>Two Lines Button · STANDARD</span><StudioTwoLineButton sizeVariant="standard" firstLine="TWO LINE" secondLine="BUTTON" aria-label="Two lines button standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitTwoLineButton"><span>Two Lines Split Button · STANDARD</span><StudioSplitTwoLineButton sizeVariant="standard" icon={<Settings2 aria-hidden="true" />} firstLine="TWO LINE" secondLine="SPLIT BUTTON" aria-label="Two lines split button standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioActionButton"><span>Action Button · STANDARD</span><StudioActionButton sizeVariant="standard" aria-label="Action button standard specimen">PRIMARY ACTION</StudioActionButton></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioIconButton"><span>Icon Button · STANDARD</span><StudioIconButton icon={<Settings2 aria-hidden="true" />} label="SETTINGS" sizeVariant="standard" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSquareIconButton"><span>Square Icon Button · STANDARD</span><StudioSquareIconButton icon={<Settings2 aria-hidden="true" />} label="SETTINGS" aria-label="Square icon button standard specimen" sizeVariant="standard" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCircleIconButton"><span>Circle Icon Button · STANDARD</span><StudioCircleIconButton icon={<Check aria-hidden="true" />} label="CONFIRM" aria-label="Circle icon button standard specimen" sizeVariant="standard" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSquareIconButtonGroup"><span>Square Icon Button Group · STANDARD</span><StudioSquareIconButtonGroup sizeVariant="standard" aria-label="Standard icon button group" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioPlayPauseButton"><span>Play / Pause Button · STANDARD</span><StudioPlayPauseButton defaultPlaying={false} sizeVariant="standard" aria-label="Play pause standard specimen" /></div>
        <h4 className="vt-confirmed-representative-heading">DROPDOWNS</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDropdown"><span>Studio Dropdown · STANDARD</span><StudioDropdown sizeVariant="standard" ariaLabel="Studio dropdown standard specimen" defaultValue="balanced" options={dropdownOptions} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLegendMultiDropdown"><span>Legend Multi Dropdown · STANDARD</span><StudioLegendMultiDropdown label="VIDEOS" sizeVariant="standard" ariaLabel="Legend multi dropdown standard specimen" defaultValue={["videos"]} options={[{ value: "videos", label: "VIDEOS" }, { value: "shorts", label: "SHORTS" }]} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitLeftDropdown"><span>Split Left Dropdown · STANDARD</span><StudioSplitLeftDropdown sizeVariant="standard" ariaLabel="Split left dropdown standard specimen" defaultValue="balanced" options={dropdownOptions} /></div>
        <h4 className="vt-confirmed-representative-heading">TEXT FIELDS</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioNumberInput"><span>Number Input · STANDARD</span><StudioNumberInput aria-label="Number input specimen" defaultValue={42} sizeVariant="standard" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTextInput"><span>Text Input · STANDARD</span><StudioTextInput sizeVariant="standard" aria-label="Text input standard specimen" placeholder="TYPE HERE" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitTextInput"><span>Split Text Input · STANDARD</span><StudioSplitTextInput split="left" leftIcon={<Settings2 aria-hidden="true" />} sizeVariant="standard" aria-label="Split text input standard specimen" placeholder="SEARCH ASSETS" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTextArea"><span>Text Area · STANDARD</span><StudioTextArea sizeVariant="standard" rows={3} aria-label="Text area standard specimen" placeholder="TYPE HERE" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTextBox"><span>Text Box · STANDARD</span><StudioTextBox size="standard" aria-label="Text box standard specimen">Read-only text rendered by the production StudioTextBox primitive.</StudioTextBox></div>
        <h4 className="vt-confirmed-representative-heading">CONTROLS</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioArrowToggle"><span>Arrow Toggle · STANDARD</span><StudioArrowToggle size="standard" value={arrowValue} options={options} onValueChange={setArrowValue} ariaLabel="Arrow toggle standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCounter"><span>Studio Counter · STANDARD</span><StudioCounter size="standard" value={counterValue} onValueChange={setCounterValue} min={0} max={100} ariaLabel="Studio counter standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLeftWordCounter"><span>Left Word Counter · STANDARD</span><StudioLeftWordCounter size="standard" value={leftWordValue} onValueChange={setLeftWordValue} ariaLabel="Studio left word counter standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDoubleSplitSlider"><span>Double Split Slider · STANDARD</span><StudioDoubleSplitSlider size="standard" value={sliderValue} onValueChange={setSliderValue} min={0} max={100} ariaLabel="Double split slider standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioChoice"><span>Choice Control · STANDARD</span><StudioChoice kind="radio" skin="solid" checked={false} aria-label="Choice control standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSwitch"><span>Switch · STANDARD</span><StudioSwitch shape="round" skin="solid" checked={false} aria-label="Switch standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioRadio"><span>Radio · STANDARD</span><StudioRadio skin="solid" checked={false} sizeVariant="standard" aria-label="Radio standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCheckbox"><span>Checkbox · STANDARD</span><StudioCheckbox skin="solid" checked={false} sizeVariant="standard" aria-label="Checkbox standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioXCheckbox"><span>X Checkbox · STANDARD</span><StudioXCheckbox skin="solid" checked={false} sizeVariant="standard" aria-label="X checkbox standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioBarToggle"><span>Bar Toggle · STANDARD</span><StudioBarToggle size="standard" value={barValue} onValueChange={setBarValue} ariaLabel="Bar toggle standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioWordToggle"><span>Word Toggle · STANDARD</span><StudioWordToggle value={wordValue} onValueChange={setWordValue} aria-label="Word toggle standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioVerticalWordToggle"><span>Vertical Word Toggle · COMPACT</span><StudioVerticalWordToggle value={verticalWordValue} onValueChange={setVerticalWordValue} aria-label="Vertical word toggle representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSideToggle"><span>Side Toggle · STANDARD</span><StudioSideToggle size="standard" value={sideValue} options={["LOW", "MID", "HIGH"]} onValueChange={setSideValue} ariaLabel="Side toggle standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDoubleSideToggle"><span>Double Side Toggle · STANDARD</span><StudioDoubleSideToggle size="standard" variant="v1" left={{ value: doubleLeft, options: ["SOURCE", "INPUT", "ORIGIN"], onValueChange: setDoubleLeft, ariaLabel: "Double side toggle left representative" }} right={{ value: doubleRight, options: ["TARGET", "OUTPUT", "DESTINATION"], onValueChange: setDoubleRight, ariaLabel: "Double side toggle right representative" }} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSideCounter"><span>Side Counter · STANDARD</span><StudioSideCounter size="standard" value={sideCounterValue} onValueChange={setSideCounterValue} min={0} max={100} ariaLabel="Side counter standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLeftCounter"><span>Left Counter · STANDARD</span><StudioLeftCounter size="standard" value={leftCounterRepValue} onValueChange={setLeftCounterRepValue} min={0} max={100} ariaLabel="Left counter standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDoubleSplitWordCounter"><span>Double-Split Word Counter · STANDARD</span><StudioDoubleSplitWordCounter size="standard" value={doubleWordCounterValue} onValueChange={setDoubleWordCounterValue} ariaLabel="Double-split word counter standard representative" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLeftWordSlider"><span>Left Word Slider · STANDARD</span><StudioLeftWordSlider size="standard" value={leftWordSliderValue} onValueChange={setLeftWordSliderValue} ariaLabel="Left word slider standard representative" /></div>
        <h4 className="vt-confirmed-representative-heading">BADGES</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitLeftBadge"><span>Split Left Badge · STANDARD</span><StudioSplitLeftBadge icon={<Check aria-hidden="true" />} sizeVariant="standard">READY</StudioSplitLeftBadge></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSpectrumTag"><span>Spectrum Tag · STANDARD REPRESENTATIVE</span><StudioSpectrumTag label="CREATOR" spectrumKey="CREATOR" selected={false} ariaLabel="Spectrum tag standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCloseableBadge"><span>Closeable Badge · STANDARD REPRESENTATIVE</span><StudioCloseableBadge label="CREATOR" entering={false} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLedBadgeTab">
          <span>LED Badge / Tab · COMPACT TWO-LINE SYSTEM</span>
          <div className="grid grid-cols-4 gap-0 bg-white">{[{label:"BRAIN STATUS",firstLine:"BRAIN",secondLine:"STATUS",tone:"green" as const},{label:"PROMPT LIBRARY",firstLine:"PROMPT",secondLine:"LIBRARY",tone:"pink" as const},{label:"CHANNEL CONTEXT",firstLine:"CHANNEL",secondLine:"CONTEXT",tone:"green" as const},{label:"CAPABILITIES BROWSER",firstLine:"CAPABILITIES",secondLine:"BROWSER",tone:"cyan" as const}].map((item,index)=><StudioLedBadgeTab key={item.label} mode="tab" sizeVariant="compact" label={item.label} firstLine={item.firstLine} secondLine={item.secondLine} tone={item.tone} active={index===0} led={index===0||index===2?"solid":"rainbow"} animation={(["steady","prism","radar","flare2"] as const)[index]} onClick={() => undefined} />)}</div>
          <span>LED ANIMATION STATES · ALL FIVE REFERENCE STYLES</span>
          <div className="flex flex-wrap items-center gap-2">{([{label:"PRISM",animation:"prism"},{label:"RADAR",animation:"radar"},{label:"FLARE",animation:"flare2"},{label:"STEADY",animation:"steady"},{label:"BLINK",animation:"blink"}] as const).map((item)=><StudioLedBadgeTab key={item.animation} mode="badge" label={item.label} sizeVariant="compact" tone="cyan" led="rainbow" animation={item.animation} />)}</div>
          <span>LED STATES · OFF / SOLID / RAINBOW</span>
          <div className="flex flex-wrap items-center gap-2"><StudioLedBadgeTab label="OFF" led="off" animation="steady" /><StudioLedBadgeTab label="SOLID" tone="green" led="solid" animation="steady" /><StudioLedBadgeTab label="RAINBOW" led="rainbow" animation="prism" /></div>
          <span>LED BADGE · SOLID + RAINBOW</span>
          <div className="vt-catalog-brain-status-badges__group">
            <StudioLedBadgeTab mode="badge" label="READY" tone="green" led="solid" animation="steady" />
            <StudioLedBadgeTab mode="badge" label="THINKING" tone="cyan" led="rainbow" animation="prism" />
          </div>
          <span>FLUSH NAVIGATION · FOUR TABS / ONE ACTIVE</span>
          <div className="vt-studio-led-badge-tab-row">
            {([{label:"CHAT",secondLine:"ASK",tone:"cyan" as const},{label:"MY BRAIN",secondLine:"PROFILE",tone:"purple" as const},{label:"REVIEW",secondLine:"LEARNING",tone:"yellow" as const},{label:"CONTROLS",secondLine:"ACCESS",tone:"green" as const}]).map((tab,index)=><StudioLedBadgeTab key={tab.label} mode="tab" label={tab.label} firstLine={tab.label} secondLine={tab.secondLine} tone={tab.tone} led="solid" animation="steady" active={index===0} onClick={() => undefined} />)}
          </div>
          <span>MOTION STATES · STEADY / PRISM / RADAR / FLARE2 / BLINK</span>
          <div className="vt-catalog-brain-status-badges__group">
            {([{label:"STEADY",animation:"steady" as const},{label:"PRISM",animation:"prism" as const},{label:"RADAR",animation:"radar" as const},{label:"FLARE2",animation:"flare2" as const},{label:"BLINK",animation:"blink" as const}]).map((item)=><StudioLedBadgeTab key={item.animation} mode="badge" label={item.label} tone="cyan" led="rainbow" animation={item.animation} />)}
          </div>
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioBrainStatusIndicator"><span>Brain Status Indicator · STANDARD</span><StudioBrainStatusIndicator status="running" label="BRAIN RUNNING" pulse={false} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioBrainStatusBadge"><span>Brain Status Badge · STANDARD</span><StudioBrainStatusBadge label="READY" tone="green" appearance="tinted" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitRightBadge"><span>Split Right Badge · STANDARD</span><StudioSplitRightBadge icon={<Settings2 aria-hidden="true" />} sizeVariant="standard">READY</StudioSplitRightBadge></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDoubleSplitBadge"><span>Double Split Badge · STANDARD</span><StudioDoubleSplitBadge leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} sizeVariant="standard">READY</StudioDoubleSplitBadge></div>
        <h4 className="vt-confirmed-representative-heading">MODULES & COMPOSITIONS</h4>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTagEditor"><span>Tag Editor · STANDARD REPRESENTATIVE</span><StudioTagEditor defaultValue={["CREATOR", "VIDEO"]} ariaLabel="Tag editor standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioUploadFrame"><span>Upload Frame · STANDARD REPRESENTATIVE</span><StudioUploadFrame prompt="UPLOAD IMAGE OR VIDEO" aria-label="Upload frame standard specimen" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioInterModule"><span>InterModule · STANDARD REPRESENTATIVE</span><StudioInterModule className="vt-studio-inter-host--bleed" title="INTERMODULE" startIcon={<Home aria-hidden="true" />} sizeVariant="standard" defaultOpen><p className="vt-confirmed-intermodule-prompt">Production intermodule with its rails extending to the containing module's inner borders.</p></StudioInterModule></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTwoLineInterModule"><span>Two-Line InterModule · STANDARD</span><StudioTwoLineInterModule title="CHANNEL SETTINGS" description="Identity and publishing preferences" startIcon={<Settings2 aria-hidden="true" />} sizeVariant="standard" defaultOpen><p>Two-line production intermodule specimen.</p></StudioTwoLineInterModule></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTopSplitModule"><span>Top Split Module · STANDARD</span><StudioTopSplitModule title="MODULE HEADER" split="double" startIcon={<Home aria-hidden="true" />} endIcon={<Settings2 aria-hidden="true" />} sizeVariant="standard"><p>Production top-split module body.</p></StudioTopSplitModule></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCollapsingSplitModule"><span>Collapsing Split Module · STANDARD · OPEN</span><StudioCollapsingSplitModule title="COLLAPSING MODULE" split="double" startIcon={<Info aria-hidden="true" />} sizeVariant="standard" defaultOpen><p>Expanded body separated from its header by the required horizontal divider.</p><StudioInterModule title="INNER SECTION" sizeVariant="standard" defaultOpen><p>Inner section content.</p></StudioInterModule></StudioCollapsingSplitModule></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCollapsingTwoLineModule"><span>Collapsing Two-Line Module · STANDARD</span><StudioCollapsingTwoLineModule title="CREATOR SETTINGS" description="Identity and publishing preferences" split="double" sizeVariant="standard" defaultOpen><p>Two-line collapsible module body.</p></StudioCollapsingTwoLineModule></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitAccordion"><span>Split Accordion · STANDARD</span><StudioSplitAccordion sizeVariant="standard" accessibleLabel="Confirmed split accordion" items={[{accessibleLabel:"OVERVIEW",icon:<Home aria-hidden="true" />,content:<p>Overview section content.</p>},{accessibleLabel:"SETTINGS",icon:<Settings2 aria-hidden="true" />,content:<p>Settings section content.</p>},{accessibleLabel:"STATUS",icon:<Info aria-hidden="true" />,content:<p>Status section content.</p>}]} /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioResponseMetaRow"><span>Response Meta Row · COMPACT</span><StudioResponseMetaRow title="ANSWER SUMMARY" status={<StudioBrainStatusBadge label="VERIFIED" tone="green" appearance="tinted" />} metadata={<span>3 SOURCES</span>} trailing={<span>OPEN DETAILS</span>} sizeVariant="compact" /></div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioChatResponseShell"><span>Chat Response Shell · COMPACT</span><StudioChatResponseShell metadata={<StudioResponseMetaRow title="ANSWER SUMMARY" metadata={<span>3 SOURCES</span>} sizeVariant="compact" />} actions={<><StudioButton sizeVariant="compact">COPY</StudioButton><StudioButton sizeVariant="compact">RETRY</StudioButton></>}><p>Answer-first response content using the production shell.</p></StudioChatResponseShell></div>
      
      </div>
    </Family>
  )
}

const ConfirmedStudioCounterFamily: React.FC = () => {
  const [supremePrimary, setSupremePrimary] = React.useState(22)
  const [standardPrimary, setStandardPrimary] = React.useState(22)
  const [miniPrimary, setMiniPrimary] = React.useState(3)
  const [compactPrimary, setCompactPrimary] = React.useState(3)
  const [microPrimary, setMicroPrimary] = React.useState(7)
  return (
    <Family
      title="StudioCounter · Supreme + Standard + Compact + Mini + Micro" defaultOpen
      nonDefaultSettings={[
        "Uses button-only increment/decrement rails; no legacy stepper shell or nested numeric field.",
        "Both action rails use the secondary fill; the numeric value face remains primary across size variants.",
        "All size specimens constrain the numeric value to 0–100.",
      ]}
      provenance={<Provenance primitive="StudioCounter" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="60px / 44px / 28px / 20px / 12px · fixed geometry · 0–100 specimen range." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioCounter">
        <div className="vt-confirmed-counter-size-rows">
          <div className="vt-confirmed-counter-size-row"><small>60px SUPREME</small><div className="vt-confirmed-counter-pair"><StudioCounter value={supremePrimary} onValueChange={setSupremePrimary} size="supreme" min={0} max={100} ariaLabel="Supreme counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>44px STANDARD</small><div className="vt-confirmed-counter-pair"><StudioCounter value={standardPrimary} onValueChange={setStandardPrimary} size="standard" min={0} max={100} ariaLabel="Standard counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>28px COMPACT</small><div className="vt-confirmed-counter-pair"><StudioCounter value={compactPrimary} onValueChange={setCompactPrimary} size="compact" min={0} max={100} ariaLabel="Compact counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>20px MINI</small><div className="vt-confirmed-counter-pair"><StudioCounter value={miniPrimary} onValueChange={setMiniPrimary} size="mini" min={0} max={100} ariaLabel="Mini counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>12px MICRO</small><div className="vt-confirmed-counter-pair"><StudioCounter value={microPrimary} onValueChange={setMicroPrimary} size="micro" min={0} max={100} ariaLabel="Micro counter" /></div></div>
        </div>
      </div>
    </Family>
  )
}


const ConfirmedStudioDoubleSplitSliderFamily: React.FC = () => {
  const [supremeA, setSupremeA] = React.useState(62)
  const [standardA, setStandardA] = React.useState(62)
  const [standardC, setStandardC] = React.useState(62)
  const [miniA, setMiniA] = React.useState(38)
  const [compactA, setCompactA] = React.useState(38)
  const [microA, setMicroA] = React.useState(7)
  return (
    <Family
      title="StudioDoubleSplitSlider · Supreme + Standard + Compact + Mini + Micro" defaultOpen
      nonDefaultSettings={[
        "Uses an L1 range track inside the double-split shell; the numeric readout is bound to the same slider value.",
        "Handle is white with a rounded corner radius and black structural stroke; the track has no black bar or inset stroke.",
        "Both split rails and the active range fill use the primary color; the center track surface uses secondary, and the counter-controlled specimen shares its value with the slider.",
      ]}
      provenance={<Provenance primitive="StudioDoubleSplitSlider" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="60px / 44px / 28px / 20px / 12px · square double-split rails · rectangular v2 handle · 0–100 range." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioDoubleSplitSlider">
        <div className="vt-confirmed-counter-size-rows">
          <div className="vt-confirmed-counter-size-row"><small>60px SUPREME</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={supremeA} onValueChange={setSupremeA} size="supreme" ariaLabel="Supreme slider" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>44px STANDARD</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={standardA} onValueChange={setStandardA} size="standard" ariaLabel="Standard slider" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>28px COMPACT</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={compactA} onValueChange={setCompactA} size="compact" ariaLabel="Compact slider" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>COUNTER-CONTROLLED · UP / DOWN</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={standardC} onValueChange={setStandardC} size="standard" leftControls="counter" ariaLabel="Counter-controlled slider" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>20px MINI</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={miniA} onValueChange={setMiniA} size="mini" ariaLabel="Mini slider" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>12px MICRO</small><div className="vt-confirmed-slider-pair"><StudioDoubleSplitSlider value={microA} onValueChange={setMicroA} size="micro" ariaLabel="Micro slider" /></div></div>
        </div>
      </div>
    </Family>
  )
}

const ConfirmedStudioSideCounterFamily: React.FC = () => {
  const [sideSupreme, setSideSupreme] = React.useState(5)
  const [leftSupreme, setLeftSupreme] = React.useState(5)
  const [sideStandard, setSideStandard] = React.useState(5)
  const [leftStandard, setLeftStandard] = React.useState(5)
  const [sideMini, setSideMini] = React.useState(3)
  const [leftMini, setLeftMini] = React.useState(3)
  const [sideCompact, setSideCompact] = React.useState(3)
  const [leftCompact, setLeftCompact] = React.useState(3)
  const [sideMicro, setSideMicro] = React.useState(8)
  const [leftMicro, setLeftMicro] = React.useState(8)
  return (
    <Family
      title="StudioSideCounter · Supreme + Standard + Compact + Mini + Micro" defaultOpen
      nonDefaultSettings={[
        "Numeric display uses a 2:1 width ratio; the right action rail contains two cells.",
        "Right-rail and left-rail action placements are shown side-by-side using the same palette contract.",
        "All size specimens constrain the numeric value to 0–100.",
      ]}
      provenance={<Provenance primitive="StudioSideCounter" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="60px / 44px / 28px / 20px / 12px · square action rail and 2:1 value region · 0–100 range." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioSideCounter">
        <div className="vt-confirmed-counter-size-rows">
          <div className="vt-confirmed-counter-size-row"><small>60px SUPREME</small><div className="vt-confirmed-counter-pair"><StudioSideCounter value={sideSupreme} onValueChange={setSideSupreme} size="supreme" min={0} max={100} ariaLabel="Supreme side counter" /><StudioLeftCounter value={leftSupreme} onValueChange={setLeftSupreme} size="supreme" min={0} max={100} ariaLabel="Supreme left counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>44px STANDARD</small><div className="vt-confirmed-counter-pair"><StudioSideCounter value={sideStandard} onValueChange={setSideStandard} size="standard" min={0} max={100} ariaLabel="Standard side counter" /><StudioLeftCounter value={leftStandard} onValueChange={setLeftStandard} size="standard" min={0} max={100} ariaLabel="Standard left counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>28px COMPACT</small><div className="vt-confirmed-counter-pair"><StudioSideCounter value={sideCompact} onValueChange={setSideCompact} size="compact" min={0} max={100} ariaLabel="Compact side counter" /><StudioLeftCounter value={leftCompact} onValueChange={setLeftCompact} size="compact" min={0} max={100} ariaLabel="Compact left counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>20px MINI</small><div className="vt-confirmed-counter-pair"><StudioSideCounter value={sideMini} onValueChange={setSideMini} size="mini" min={0} max={100} ariaLabel="Mini side counter" /><StudioLeftCounter value={leftMini} onValueChange={setLeftMini} size="mini" min={0} max={100} ariaLabel="Mini left counter" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>12px MICRO</small><div className="vt-confirmed-counter-pair"><StudioSideCounter value={sideMicro} onValueChange={setSideMicro} size="micro" min={0} max={100} ariaLabel="Micro side counter" /><StudioLeftCounter value={leftMicro} onValueChange={setLeftMicro} size="micro" min={0} max={100} ariaLabel="Micro left counter" /></div></div>
        </div>
      </div>
    </Family>
  )

}

const ConfirmedStudioLeftWordCounterFamily: React.FC = () => {
  const [variantValues, setVariantValues] = React.useState([1, 2, 3, 4])
  const [sizeValues, setSizeValues] = React.useState([1, 2, 3, 4, 1])
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  const updateAt = (setter: React.Dispatch<React.SetStateAction<number[]>>, index: number, value: number) =>
    setter(current => current.map((previous, itemIndex) => itemIndex === index ? value : previous))
  return (
    <Family
      title="StudioLeftWordCounter · Four-State Cycle + Five Sizes" defaultOpen
      nonDefaultSettings={[
        "Hold-repeat increment/decrement actions use the shared left-counter timing; disabled and focus states come from the shared counter primitive.",
        "Values wrap FOUR → ONE and ONE → FOUR; face states are primary, secondary, black/primary-text, and white/primary-text.",
        "Word typography is constrained to the available face width so THREE remains readable without ellipsis.",
      ]}
      provenance={<Provenance primitive="StudioLeftWordCounter" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css + src/styles/studio-control-word-counter.css" tokens="60px / 44px / 28px / 20px / 12px · four-state cyclic domain · shared left-counter hold-repeat" imports={["src/studio-ui/primitives/StudioControls.tsx", "src/styles/studio-control-word-counter.css"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioLeftWordCounter">
        <div className="vt-confirmed-counter-size-rows">
          <div className="vt-confirmed-counter-size-row"><small>ONE · PRIMARY</small><div className="vt-confirmed-counter-pair"><StudioLeftWordCounter size="standard" value={variantValues[0]} onValueChange={value => updateAt(setVariantValues, 0, value)} ariaLabel="Primary word counter specimen" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>TWO · SECONDARY</small><div className="vt-confirmed-counter-pair"><StudioLeftWordCounter size="standard" value={variantValues[1]} onValueChange={value => updateAt(setVariantValues, 1, value)} ariaLabel="Secondary word counter specimen" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>THREE · BLACK / PRIMARY TEXT</small><div className="vt-confirmed-counter-pair"><StudioLeftWordCounter size="standard" value={variantValues[2]} onValueChange={value => updateAt(setVariantValues, 2, value)} ariaLabel="Black word counter specimen" /></div></div>
          <div className="vt-confirmed-counter-size-row"><small>FOUR · WHITE / PRIMARY TEXT</small><div className="vt-confirmed-counter-pair"><StudioLeftWordCounter size="standard" value={variantValues[3]} onValueChange={value => updateAt(setVariantValues, 3, value)} ariaLabel="White word counter specimen" /></div></div>
          {sizes.map((size, index) => <div className="vt-confirmed-counter-size-row" key={size}><small>{({ supreme: "60px SUPREME", standard: "44px STANDARD", compact: "28px COMPACT", mini: "20px MINI", micro: "12px MICRO" } as const)[size]}</small><div className="vt-confirmed-counter-pair"><StudioLeftWordCounter size={size} value={sizeValues[index]} onValueChange={value => updateAt(setSizeValues, index, value)} ariaLabel={`${size} word counter specimen`} /></div></div>)}
        </div>
      </div>
    </Family>
  )
}


const ConfirmedStudioDoubleSplitWordCounterFamily: React.FC = () => {
  const [values, setValues] = React.useState([1, 2, 3, 4, 1])
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  const updateAt = (index: number, value: number) => setValues(current => current.map((previous, itemIndex) => itemIndex === index ? value : previous))
  return (
    <Family
      title="StudioDoubleSplitWordCounter · Two Chevron Rails + Four-State Word Cycle" defaultOpen
      nonDefaultSettings={[
        "Both square rails step the same four-state word sequence; the left rail moves backward and the right rail moves forward.",
        "One primary-palette specimen per size; inverse color variants are not part of the primitive contract.",
        "Both rails use the shared token-backed chevron button styling and focus behavior; no legacy stepper component is used.",
        "Available in Supreme, Standard, Compact, Mini, and Micro sizes.",
      ]}
      provenance={<Provenance primitive="StudioDoubleSplitWordCounter" tsx="src/studio-ui/primitives/StudioValueToggles.tsx" css="src/styles/studio-control-value-toggles.css" tokens="Shared Studio chevron button tokens · double-split 1:2:1 geometry · four-state word cycle · five sizes." imports={["src/studio-ui/primitives/StudioValueToggles.tsx", "src/studio-ui/tokens.ts"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioDoubleSplitWordCounter">
        <div className="vt-confirmed-counter-size-rows">
          {sizes.map((size, index) => <div className="vt-confirmed-counter-size-row" key={size}><small>{({ supreme: "60px SUPREME", standard: "44px STANDARD", compact: "28px COMPACT", mini: "20px MINI", micro: "12px MICRO" } as const)[size]}</small><div className="vt-confirmed-counter-pair">
            <StudioDoubleSplitWordCounter size={size} value={values[index]} onValueChange={value => updateAt(index, value)} ariaLabel={`${size} double-split word counter`} />
          </div></div>)}
        </div>
      </div>
    </Family>
  )
}

const ConfirmedStudioLeftWordSliderFamily: React.FC = () => {
  const [values, setValues] = React.useState([1, 2, 3, 4, 1])
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  const updateAt = (index: number, value: number) => setValues(current => current.map((previous, itemIndex) => itemIndex === index ? value : previous))
  return (
    <Family
      title="StudioLeftWordSlider · Slider + Numeric Right Rail" defaultOpen
      nonDefaultSettings={[
        "Slider and counter share one integer value in the 1–4 range; counter buttons use the shared accelerated hold behavior.",
        "The slider position and right-hand numeric readout always represent the same value.",
        "One primary-palette specimen per size; inverse color variants are not part of the primitive contract.",
        "Available in Supreme, Standard, Compact, Mini, and Micro; shared flat, focus, disabled, and reduced-motion rules remain unchanged.",
      ]}
      provenance={<Provenance primitive="StudioLeftWordSlider" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css + src/styles/studio-control-word-counter.css" tokens="60px / 44px / 28px / 20px / 12px · integer range 1–4 · numeric output on right rail · two palette faces" imports={["src/studio-ui/primitives/StudioControls.tsx", "src/styles/studio-control-word-counter.css"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-counter-row" data-vt-library-component="StudioLeftWordSlider">
        <div className="vt-confirmed-counter-size-rows">
          {sizes.map((size, index) => <div className="vt-confirmed-counter-size-row" key={size}><small>{({ supreme: "60px SUPREME", standard: "44px STANDARD", compact: "28px COMPACT", mini: "20px MINI", micro: "12px MICRO" } as const)[size]}</small><div className="vt-confirmed-slider-pair">
            <StudioLeftWordSlider size={size} value={values[index]} onValueChange={value => updateAt(index, value)} ariaLabel={`${size} word slider specimen`} />
          </div></div>)}
        </div>
      </div>
    </Family>
  )
}

/** Certified production examples only. This catalog uses the real Studio Hub exports. */
/** Certified StudioButton examples arranged by the reusable PR #756 specimen grid. */
const buttonVariantNumbers = [1, 2, 3, 4, 5, 6, 7] as const
type StudioButtonGridTier = "supreme" | "standard" | "compact" | "mini" | "micro"

const buttonCell = (tier: StudioButtonGridTier, id: string, variant: number, span: number) => ({
  id: `${tier}-${id}-v${variant}`,
  label: variant === 4 ? "BLACK" : variant === 5 ? "OFF" : variant === 6 ? "NO" : variant === 7 ? "WHITE" : "BUTTON",
  span,
})

const ConfirmedStudioButtonFamily: React.FC = () => {
  const layoutRows = [
    { id: "1-supreme-full", tier: "supreme" as const, specimens: [buttonCell("supreme", "row-1", 1, 144)] },
    { id: "2-supreme-halves", tier: "supreme" as const, specimens: [buttonCell("supreme", "row-2a", 1, 72), buttonCell("supreme", "row-2b", 2, 72)] },
    { id: "3-standard-full", tier: "standard" as const, specimens: [buttonCell("standard", "row-3", 1, 144)] },
    { id: "4-standard-halves", tier: "standard" as const, specimens: [buttonCell("standard", "row-4a", 1, 72), buttonCell("standard", "row-4b", 2, 72)] },
    { id: "5-standard-fractions", tier: "standard" as const, specimens: [
      buttonCell("standard", "row-5-third", 3, 48),
      buttonCell("standard", "row-5-quarter", 4, 36),
      buttonCell("standard", "row-5-sixth", 5, 24),
      buttonCell("standard", "row-5-eighth-a", 6, 18),
      buttonCell("standard", "row-5-eighth-b", 7, 18),
    ] },
    { id: "6-mini-variants", tier: "mini" as const, specimens: [
      buttonCell("mini", "row-6-mini-v1", 1, 20),
      buttonCell("mini", "row-6-mini-v2", 2, 20),
      buttonCell("mini", "row-6-mini-v3", 3, 20),
      buttonCell("mini", "row-6-mini-v4", 4, 20),
      buttonCell("mini", "row-6-mini-v5", 5, 20),
      buttonCell("mini", "row-6-mini-v6", 6, 20),
      buttonCell("mini", "row-6-mini-v7", 7, 20),
    ] },
    { id: "6-compact-fractions", tier: "compact" as const, specimens: [
      buttonCell("compact", "row-6-third", 1, 48),
      buttonCell("compact", "row-6-quarter", 2, 36),
      buttonCell("compact", "row-6-two-ninths", 3, 32),
      buttonCell("compact", "row-6-ninth", 4, 16),
      buttonCell("compact", "row-6-twelfth", 5, 12),
    ] },
    {
      id: "7-compact-and-micro",
      panels: [
        { id: "7 compact · half module", tier: "compact" as const, span: 72, rows: [{
          id: "7-compact-row",
          tier: "compact" as const,
          specimens: [
            buttonCell("compact", "row-7-eighth-a", 3, 36),
            buttonCell("compact", "row-7-eighth-b", 4, 36),
            buttonCell("compact", "row-7-eighth-c", 5, 36),
            buttonCell("compact", "row-7-sixteenth-a", 6, 18),
            buttonCell("compact", "row-7-sixteenth-b", 7, 18),
          ],
        }] },
        { id: "7A–7B micro · half module", tier: "micro" as const, span: 72, rows: [
          { id: "7A-micro-quarters", tier: "micro" as const, specimens: [
            buttonCell("micro", "row-7a-quarter-a", 1, 72),
            buttonCell("micro", "row-7a-quarter-b", 2, 72),
          ] },
          { id: "7B-micro-eighths-sixteenths", tier: "micro" as const, specimens: [
            buttonCell("micro", "row-7b-eighth-a", 3, 36),
            buttonCell("micro", "row-7b-eighth-b", 4, 36),
            buttonCell("micro", "row-7b-sixteenth-a", 5, 18),
            buttonCell("micro", "row-7b-sixteenth-b", 6, 18),
            buttonCell("micro", "row-7b-sixteenth-c", 7, 18),
            buttonCell("micro", "row-7b-sixteenth-d", 1, 18),
          ] },
        ] },
      ],
    },
  ]

  return (
    <Family title="Button · V1–V7 · Proportional size grid" nonDefaultSettings={[
      "Full-module width layout with the exact seven-row PR #756 composition: Supreme full and half rows; Standard full, half, and 1/3 + 1/4 + 1/6 + 2×1/8 row; Compact 1/3 + 1/4 + 2/9 + 1/9 + 1/12 row; Mini V1–V7 style matrix; then a split half-module Compact/Micro row.",
      "Row 7 keeps five compact specimens in the left half (3×1/8 + 2×1/16 of module width) and the Micro rows in the right half: 7A has 2×1/4; 7B has 2×1/8 + 4×1/16.",
      "V1 primary/black; V2 secondary/black; V3 independently toggles V1 and V2; V4 black/primary; V5 toggles V1/V2 with OFF/ON text; V6 toggles V1/black with NO/YES text; V7 primary/white.",
      "Each specimen is a real StudioButton. The grid controls arrangement only; production primitive owns size geometry, face styling, toggle state, accessibility, and clipped single-line text behavior (never ellipsis).",
    ]} provenance={<Provenance primitive="StudioButton · V1–V7" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css + ConfirmedSpecimenGrid.css" tokens="60px Supreme · 44px Standard · 28px Compact · 20px Mini · 12px Micro · proportional 144-unit grid · 4px gap" imports={["src/studio-ui/primitives/StudioControls.tsx", "src/components/studio-hub/ConfirmedSpecimenGrid.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row vt-confirmed-button-gallery">
        <ConfirmedSpecimenGrid
          familyName="Original StudioButton variants"
          layoutRows={layoutRows}
          renderSpecimen={({ id, tier, label }) => {
            const variant = Number(id.match(/-v(\d+)(?:-repeat)?$/)?.[1] ?? 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7
            const activeChildren = variant === 5 ? "ON" : variant === 6 ? "YES" : undefined
            return (
              <StudioButton
                className="vt-confirmed-button-skin"
                variant={`v${variant}` as "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7"}
                activeChildren={activeChildren}
                sizeVariant={tier}
                data-vt-library-component="StudioButton"
                aria-label={variant === 3 ? "Button primary/secondary color toggle" : variant === 5 ? "Button OFF/ON toggle" : variant === 6 ? "Button NO/YES toggle" : variant === 4 ? "Black button" : variant === 7 ? "White button" : `Button variant ${variant}`}
              >
                {label}
              </StudioButton>
            )
          }}
        />
      </div>
    </Family>
  )
}


const ConfirmedStudioSplitButtonFamily: React.FC = () => {
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  return (
    <Family title="Split Button Family · All Sizes × Left / Right / Double / Two-Line" nonDefaultSettings={[
      "Every supported size is shown for split-left, split-right, double-split, two-line, and split two-line designs.",
      "Split-left and split-right use one square rail; double-split uses two square rails; all keep a single black divider per boundary.",
      "Two-line variants keep both lines inside one face at the selected size; no second control or increased shell height is introduced.",
      "Primary face and secondary rails remain the canonical palette; no catalog-only style overrides are applied.",
    ]} provenance={<Provenance primitive="StudioSplitLeftButton · StudioSplitRightButton · StudioDoubleSplitButton · StudioTwoLineButton · StudioSplitTwoLineButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Supreme / Standard / Compact / Mini / Micro · secondary square rails · single black divider · clipped centered labels" imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      {sizes.map(size => <div className="vt-confirmed-variant is-full-row" data-vt-library-component={`StudioSplitButtonFamily-${size}`} key={size}>
        <span>{size.toUpperCase()} · SPLIT VARIANTS</span>
        <StudioSplitLeftButton sizeVariant={size} icon={<Check aria-hidden="true" />} aria-label={`${size} split-left button`}>LEFT</StudioSplitLeftButton>
        <StudioSplitRightButton sizeVariant={size} icon={<Settings2 aria-hidden="true" />} aria-label={`${size} split-right button`}>RIGHT</StudioSplitRightButton>
        <StudioDoubleSplitButton sizeVariant={size} leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label={`${size} double-split button`}>DOUBLE</StudioDoubleSplitButton>
        <StudioTwoLineButton sizeVariant={size} firstLine="TWO LINE" secondLine="BUTTON" aria-label={`${size} two-line button`} />
        {(size === "standard" || size === "compact") && <StudioSplitTwoLineButton sizeVariant={size} icon={<Settings2 aria-hidden="true" />} firstLine="TWO LINE" secondLine="SPLIT BUTTON" aria-label={`${size} two-line split button`} />}
      </div>)}
    </Family>
  )
}

const ConfirmedStudioDropdownFamily: React.FC = () => {
  const sizes = ["supreme", "standard", "compact", "mini", "micro"] as const
  const options = [{ value: "balanced", label: "BALANCED" }, { value: "focused", label: "FOCUSED" }, { value: "explore", label: "EXPLORE" }]
  const multiOptions = [{ value: "videos", label: "VIDEOS" }, { value: "shorts", label: "SHORTS" }, { value: "live", label: "LIVE" }]
  return (
    <Family title="Dropdown Family · All Sizes × Single / Simple / Split-Left / Multi-Select" nonDefaultSettings={[
      "All supported size tiers are represented for the canonical single-select, simple presentation, split-left layout, and multi-select menu.",
      "Simple is a presentation variant of StudioDropdown, not a second menu engine; split-left is a layout variant.",
      "Multi-select preserves independent selected values and selected-count presentation; disabled state is shown separately.",
      "Trigger, chevron, and menu rows use the same selected size tier and shared tokens.",
    ]} provenance={<Provenance primitive="StudioDropdown · StudioSplitLeftDropdown · StudioLegendMultiDropdown" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Supreme / Standard / Compact / Mini / Micro · primary trigger · secondary chevron rail · size-matched menu rows" imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      {sizes.map(size => <div className="vt-confirmed-variant is-full-row" data-vt-library-component={`StudioDropdownFamily-${size}`} key={size}>
        <span>{size.toUpperCase()} · SINGLE / SIMPLE / SPLIT-LEFT / MULTI</span>
        <StudioDropdown sizeVariant={size} defaultValue="balanced" options={options} ariaLabel={`${size} single-select dropdown`} />
        <StudioDropdown sizeVariant={size} variant="simple" defaultValue="focused" options={options} ariaLabel={`${size} simple dropdown`} />
        <StudioSplitLeftDropdown sizeVariant={size} defaultValue="explore" options={options} ariaLabel={`${size} split-left dropdown`} />
        <StudioLegendMultiDropdown sizeVariant={size} label="FORMAT" defaultValue={["videos"]} options={multiOptions} />
      </div>)}
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioDropdown-disabled">
        <span>STANDARD · DISABLED / NO OPTIONS / CONNECTION MESSAGE</span>
        <StudioDropdown sizeVariant="standard" defaultValue="" options={[]} disabled placeholder="UNAVAILABLE" ariaLabel="Disabled dropdown specimen" />
        <StudioDropdown sizeVariant="standard" defaultValue="balanced" options={options} connectionMessage="CONNECT TO LOAD OPTIONS" ariaLabel="Connection-state dropdown specimen" />
        <StudioLegendMultiDropdown sizeVariant="standard" label="LOCKED FORMAT" defaultValue={["videos"]} options={multiOptions} disabled />
      </div>
    </Family>
  )
}

type ConfirmedCatalogFamilyName =
  | "Text Fields"
  | "Buttons & Badges"
  | "Dropdowns"
  | "Controls"
  | "Modules & Frames"
  | "Compositions"

const CONFIRMED_CATALOG_FAMILIES: ConfirmedCatalogFamilyName[] = [
  "Text Fields",
  "Buttons & Badges",
  "Dropdowns",
  "Controls",
  "Modules & Frames",
  "Compositions",
]

const classifyConfirmedCatalogItem = (node: React.ReactNode): ConfirmedCatalogFamilyName | null => {
  if (!React.isValidElement(node)) return null
  const props = node.props as { title?: unknown }
  const title = typeof props.title === "string" ? props.title : ""
  const componentType = node.type as { displayName?: string; name?: string }
  const componentName = typeof node.type === "function"
    ? (componentType.displayName || componentType.name || "")
    : ""

  if (/Compatibility Field Exports/.test(title)) return "Text Fields"
  if (/Compatibility Control Exports/.test(title)) return "Controls"

  // Choice primitives share one top-level family; check this before broad button rules.
  if (/Switches, Radios & Checkboxes|Word Toggles|Arrow \/ Side \/ Double Side \/ Bar Toggles|StudioSwitch|StudioRadio|StudioCheckbox|StudioXCheckbox|StudioWordToggle|StudioVerticalWordToggle|StudioArrowToggle|StudioSideToggle|StudioDoubleSideToggle|StudioBarToggle|StudioChoice/.test(title)
    || componentName === "CanonicalControlFamilies"
    || componentName === "CanonicalWordToggleFamily"
    || componentName === "ConfirmedStudioValueToggleFamily") {
    return "Controls"
  }

  if (/Split-left Badge|Split-right Badge|Double-split Badge|Brain Status LED Badges|Status \/ navigation|StudioBrainStatusBadge|StudioBrainStatusIndicator|StudioLedBadgeTab|StudioSplitLeftBadge|StudioSplitRightBadge|StudioDoubleSplitBadge/.test(title)
    || componentName === "CanonicalSplitBadgeFamily") return "Buttons & Badges"
  if (/Studio Text Input|Studio Text Area|Studio Text Box|StudioTextInput|StudioTextArea|StudioTextBox|UsernameInput|SplitLeftInput|SearchInput|NumberInput|Split Text Input|StudioSplitTextInput/.test(title)) return "Text Fields"
  if (/StudioCounter|StudioDoubleSplitSlider|StudioSideCounter|StudioLeftCounter|StudioLeftWordCounter|StudioLeftWordSlider|Double Split Slider|Side Counter|Left Word Counter|Slider/.test(title)
    || componentName === "ConfirmedStudioCounterFamily"
    || componentName === "ConfirmedStudioDoubleSplitSliderFamily"
    || componentName === "ConfirmedStudioSideCounterFamily"
    || componentName === "ConfirmedStudioLeftWordCounterFamily"
    || componentName === "ConfirmedStudioDoubleSplitWordCounterFamily"
    || componentName === "ConfirmedStudioLeftWordSliderFamily") return "Controls"
  if (/Dropdown/.test(title) || componentName === "ConfirmedStudioDropdownFamily") return "Dropdowns"
  if (/Button ·|Prominent Action|Square Icon Button|Two-Line Button|Split-left Button|Play\/Pause Split-left Button|Circle Icon Button|StudioIconButton/.test(title)
    || componentName === "ConfirmedStudioButtonFamily"
    || componentName === "ConfirmedStudioSplitButtonFamily") return "Buttons & Badges"
  if (/Top Split Module|Collapsing|InterModule|Split Accordion|Upload Frame|Response Meta Row/.test(title)) return "Modules & Frames"
  if (/SpectrumTag|TagEditor|Tag Editor|Spectrum Tags|Closeable Badge|StudioCloseableBadge|Ranked Metadata Tag/.test(title)) return "Compositions"
  if (/Publishing Card|StudioChatResponseShell|StudioResponseMetaRow/.test(title)) return "Compositions"
  return null
}

const isSwitchToggleChoiceFamily = (title: string): boolean =>
  /^(?:Switches, Radios & Checkboxes|Word Toggles · Standard \+ Compact \+ Vertical|Arrow \/ Side \/ Double Side \/ Bar Toggles)$/.test(title)

const ConfirmedCatalogFamilyGroups: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const nodes = React.Children.toArray(children)
  const defaults: React.ReactNode[] = []
  const unclassified: React.ReactNode[] = []
  const switchToggleFamilies: React.ReactNode[] = []
  const grouped = new Map<ConfirmedCatalogFamilyName, React.ReactNode[]>(
    CONFIRMED_CATALOG_FAMILIES.map((family) => [family, []]),
  )
  for (const node of nodes) {
    if (React.isValidElement(node) && (node.props as { "data-vt-confirmed-family"?: string })["data-vt-confirmed-family"] === "defaults") {
      defaults.push(node)
      continue
    }
    const title = React.isValidElement(node) && typeof (node.props as { title?: unknown }).title === "string"
      ? (node.props as { title: string }).title
      : ""
    if (isSwitchToggleChoiceFamily(title)) {
      switchToggleFamilies.push(node)
      continue
    }
    const family = classifyConfirmedCatalogItem(node)
    if (!family) {
      unclassified.push(node)
      continue
    }
    grouped.get(family)?.push(node)
  }
  const controls = grouped.get("Controls") ?? []
  if (switchToggleFamilies.length > 0) {
    controls.unshift(
      <ConfirmedFamilyModule key="switch-toggle-choice-family" title="Switches / Toggles / Radio / Checkbox" className="vt-confirmed-family-group vt-confirmed-switch-toggle-family" defaultOpen>
        {switchToggleFamilies}
      </ConfirmedFamilyModule>,
    )
  }
  return (
    <div className="vt-confirmed-catalog">
      {defaults}
      {unclassified.length > 0 && (
        <section className="vt-confirmed-unclassified-family" role="alert" data-vt-confirmed-family="unclassified">
          <strong>Unclassified family</strong>
          <p>Add an explicit category rule in classifyConfirmedCatalogItem before this specimen can be placed in a confirmed family.</p>
          <div>{unclassified}</div>
        </section>
      )}
      <div className="vt-confirmed-family-grid">
        {CONFIRMED_CATALOG_FAMILIES
          .filter((family) => (grouped.get(family)?.length ?? 0) > 0)
          .map((family) => (
            <ConfirmedFamilyModule key={family} title={family} className="vt-confirmed-family-group" defaultOpen={family === "Controls"}>
              {grouped.get(family)}
            </ConfirmedFamilyModule>
          ))}
      </div>
    </div>
  )
}

const useConfirmedAdditionalPrimitiveSections = (): React.ReactNode[] => {
  const [choiceChecks, setChoiceChecks] = React.useState<boolean[]>(Array(5).fill(false))
  const [leftCounterValue, setLeftCounterValue] = React.useState(6)
  const [number, setNumber] = React.useState("12")
  const dropdownOptions = [
    { value: "balanced", label: "BALANCED" },
    { value: "focused", label: "FOCUSED" },
    { value: "explore", label: "EXPLORE" },
  ]
  const content = (
    <>
      <Family title="StudioChatComposerDock · Message Composer Layout" nonDefaultSettings={[
        "The dock owns responsive placement only; field state, tool state, and message submission remain caller-owned.",
        "The inline-actions variant puts tools before the field row; toolbar-actions moves tools and actions below the field.",
        "Status/context chips and tools tray are optional slots; catalog chips are static and are not connected to live Brain state.",
      ]} provenance={<Provenance primitive="StudioChatComposerDock" tsx="src/studio-ui/primitives/StudioChatComposerDock.tsx" css="src/styles/studio-chat-composer-dock.css" tokens="Responsive composer shell · inline-actions / toolbar-actions layouts · optional status, context chips and tools tray" imports={["src/studio-ui/primitives/StudioChatComposerDock.tsx", "src/styles/studio-chat-composer-dock.css"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioChatComposerDock">
          <span>STANDARD · INLINE ACTIONS</span>
          <StudioChatComposerDock
            aria-label="Static composer dock representative"
            status={<StudioBrainStatusBadge label="READY" tone="green" appearance="tinted" sizeVariant="compact" />}
            chips={<span>CHANNEL CONTEXT</span>}
            tray={<StudioButton sizeVariant="compact" variant="v2">PROMPTS</StudioButton>}
            field={<StudioTextArea aria-label="Composer dock specimen field" placeholder="WRITE A MESSAGE…" />}
            action={<StudioButton sizeVariant="standard" onClick={() => undefined}>SEND</StudioButton>}
          />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioChatComposerDock-toolbar">
          <span>COMPACT · TOOLBAR ACTIONS</span>
          <StudioChatComposerDock
            layout="toolbar-actions"
            aria-label="Static toolbar composer dock representative"
            tray={<StudioButton sizeVariant="compact" variant="v2">CONTEXT</StudioButton>}
            field={<StudioTextArea aria-label="Toolbar composer dock specimen field" placeholder="WRITE A MESSAGE…" />}
            action={<StudioButton sizeVariant="compact" onClick={() => undefined}>SEND</StudioButton>}
          />
        </div>
      </Family>
      <Family title="StudioIconButton · All Five Sizes" nonDefaultSettings={["Standalone icon-button face is not the joined square-icon rail or the circular icon-button shape.", "All five canonical size tiers inherit StudioButton geometry and interaction defaults."]} provenance={<Provenance primitive="StudioIconButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Supreme / Standard / Compact / Mini / Micro · canonical stroke/radius · no lift." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
        {(["supreme", "standard", "compact", "mini", "micro"] as const).map(size => <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioIconButton" key={size}><span>{size.toUpperCase()} · SETTINGS</span><StudioIconButton icon={<Settings2 aria-hidden="true" />} label={size + " settings"} sizeVariant={size} /></div>)}
      </Family>
      
      <Family title="StudioChoice · All Five Sizes" nonDefaultSettings={["Shared choice engine underlies radio, checkbox, and X-checkbox wrappers; each wrapper supplies its own native input semantics.", "All five size tiers are shown using the canonical radio choice face."]} provenance={<Provenance primitive="StudioChoice" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-distill-overrides.css" tokens="Supreme / Standard / Compact / Mini / Micro · secondary focus outline at 65% of the active border." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
        {(["supreme", "standard", "compact", "mini", "micro"] as const).map((size, index) => <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioChoice" key={size}><span>{size.toUpperCase()} · SHARED RADIO CHOICE</span><StudioChoice kind="radio" skin="solid" checked={choiceChecks[index]} onClick={() => setChoiceChecks(current => current.map((value, itemIndex) => itemIndex === index ? !value : value))} sizeVariant={size} aria-label={size + " shared choice specimen"} /></div>)}
      </Family>
            <Family title="Compatibility Field Exports · Standard" nonDefaultSettings={[
        "Legacy field aliases are retained for compatibility; new work should use StudioTextInput and StudioTextArea.",
      ]} provenance={<Provenance primitive="StudioInput · Studioarea" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Compatibility aliases inherit the canonical text-field token contract." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioInput">
          <span>STUDIO INPUT · COMPATIBILITY EXPORT</span>
          <StudioInput sizeVariant="standard" aria-label="Compatibility StudioInput specimen" placeholder="CREATOR TITLE" />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studioarea">
          <span>STUDIOAREA · COMPATIBILITY EXPORT</span>
          <Studioarea sizeVariant="standard" rows={2} aria-label="Compatibility Studioarea specimen" placeholder="DESCRIPTION" />
        </div>
      </Family>

      <Family title="Compatibility Control Exports · Standard" nonDefaultSettings={[
        "Legacy switch, toggle, radio, checkbox, and X-checkbox aliases remain under Controls; use canonical Studio control APIs for new work.",
      ]} provenance={<Provenance primitive="Studiotoggle · Studioswitch · Studioradio · Studiocheck · Studioxbox" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Compatibility aliases inherit their canonical control token contracts." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studiotoggle">
          <span>STUDIOTOGGLE · COMPATIBILITY EXPORT</span>
          <Studiotoggle size="44" value={false} words={["OFF", "ON"]} aria-label="Compatibility Studiotoggle specimen" />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studioswitch">
          <span>STUDIOSWITCH · COMPATIBILITY EXPORT</span>
          <Studioswitch sizeVariant="standard" shape="round" checked={false} aria-label="Compatibility Studioswitch specimen" />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studioradio">
          <span>STUDIORADIO · COMPATIBILITY EXPORT</span>
          <Studioradio sizeVariant="standard" shape="round" skin="solid" checked={false} aria-label="Compatibility Studioradio specimen" />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studiocheck">
          <span>STUDIOCHECK · COMPATIBILITY EXPORT</span>
          <Studiocheck sizeVariant="standard" shape="rect" skin="solid" checked={false} aria-label="Compatibility Studiocheck specimen" />
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="Studioxbox">
          <span>STUDIOXBOX · COMPATIBILITY EXPORT</span>
          <Studioxbox sizeVariant="standard" shape="rect" skin="solid" checked={false} aria-label="Compatibility Studioxbox specimen" />
        </div>
      </Family>

      <Family title="Component Grid · Grid / Cell / Row" nonDefaultSettings={[
        "The production grid arranges existing controls; it does not create alternate control faces or a second composition framework.",
      ]} provenance={<Provenance primitive="StudioComponentGrid · StudioComponentGridCell · StudioComponentGridRow" tsx="src/studio-ui/primitives/StudioComponentGrid.tsx" css="src/styles/studio-component-grid.css" tokens="Production grid layout; embedded controls retain their owning family contracts." imports={["src/studio-ui/primitives/StudioComponentGrid.tsx"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioComponentGrid">
          <span>STUDIO COMPONENT GRID · COMPOSITION LAYOUT</span>
          <StudioComponentGrid cols={2} rows={1} size="standard" aria-label="Component grid composition specimen">
            <StudioComponentGridCell><StudioButton sizeVariant="standard">GRID CELL A</StudioButton></StudioComponentGridCell>
            <StudioComponentGridCell><StudioButton sizeVariant="standard">GRID CELL B</StudioButton></StudioComponentGridCell>
          </StudioComponentGrid>
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioComponentGridCell">
          <span>STUDIO COMPONENT GRID CELL · COMPOSITION HELPER</span>
          <StudioComponentGrid cols={1} rows={1} size="standard" aria-label="Component grid cell specimen">
            <StudioComponentGridCell><StudioButton sizeVariant="standard">STANDARD GRID CELL</StudioButton></StudioComponentGridCell>
          </StudioComponentGrid>
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioComponentGridRow">
          <span>STUDIO COMPONENT GRID ROW · COMPOSITION HELPER</span>
          <StudioComponentGrid cols={2} rows={1} size="standard" aria-label="Component grid row helper specimen">
            <StudioComponentGridRow><StudioButton sizeVariant="standard">FULL-WIDTH GRID ROW</StudioButton></StudioComponentGridRow>
          </StudioComponentGrid>
        </div>
      </Family>

      <Family title="StudioLeftCounter · Standard" defaultOpen nonDefaultSettings={["Left-action counter variant with the same 2:1 numeric display as the standard counter."]} provenance={<Provenance primitive="StudioLeftCounter" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Square action rail and 2:1 value region." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioLeftCounter"><span>STANDARD · LEFT ACTION RAIL</span><StudioLeftCounter value={leftCounterValue} onValueChange={setLeftCounterValue} size="standard" min={0} max={100} ariaLabel="Left counter dedicated specimen" /></div>
      </Family>
    </>
  )
  return React.Children.toArray((content as React.ReactElement<{ children?: React.ReactNode }>).props.children)
}

export const StudioHubConfirmedPrimitiveCatalog: React.FC = () => {
  const additionalPrimitiveSections = useConfirmedAdditionalPrimitiveSections()
  return (
  <>
    <div className="vt-confirmed-catalog">
      <ConfirmedPrimitiveGridOverview />
      <ConfirmedDirectPrimitiveRows />
    </div>
    <ConfirmedCatalogFamilyGroups>
    <details className="vt-confirmed-family vt-confirmed-defaults-combined" data-vt-confirmed-family="defaults">
      <summary className="vt-confirmed-defaults-heading" id="vt-confirmed-global-defaults-title">Global Defaults + Exceptions · Source Contract</summary>
      <p className="vt-confirmed-defaults-summary">60px Supreme · 44px Standard · 28px Compact · 20px Mini · 12px Micro · 3px / 3px / 2px / 1.5px / 1.5px borders · 6px / 6px / 4px / 3px / 3px radii · Inter 1000 uppercase with size-scaled text stroke · 4px standard gap · row-fill by default; data-width="content" opts into intrinsic width · single-line input 38px / 24px · textarea 18px / 14px</p>
      <p><a href="https://github.com/viewtube-dev/viewtube/blob/master/consolidated-feature-integration/docs/ui/STUDIO_CONTROLS_GLOBAL_DEFAULTS_AND_EXCEPTION_INDEX.md" target="_blank" rel="noreferrer">Global defaults, exception index, and certification rules ↗</a></p>
      <details className="vt-confirmed-defaults-details">
        <summary>Show defaults, effective CSS behavior, and exceptions</summary>
        <div className="vt-confirmed-defaults-dense">
        <div className="vt-confirmed-size-grid">
          <div className="vt-confirmed-size-card"><strong>44PX STANDARD</strong><span>H {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.height}px · Stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.stroke}px · R {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.radius}px · Font {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.fontSize}px / weight {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.fontWeight}</span><span>Flat default: no shadow, hover offset, or press offset · icon {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.iconSize}px / stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.standard.iconStroke}</span></div>
          <div className="vt-confirmed-size-card"><strong>28PX COMPACT</strong><span>H {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.height}px · Stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.stroke}px · R {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.radius}px · Font {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.fontSize}px / weight {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.fontWeight}</span><span>Flat default: no shadow, hover offset, or press offset · icon {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.iconSize}px / stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.compact.iconStroke}</span></div>
          <div className="vt-confirmed-size-card"><strong>20PX MINI</strong><span>H {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.height}px · Stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.stroke}px · R {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.radius}px · Font {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.fontSize}px / weight {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.fontWeight}</span><span>Flat default: no shadow, hover offset, or press offset · icon {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.iconSize}px / stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.mini.iconStroke}</span></div>
          <div className="vt-confirmed-size-card"><strong>12PX MICRO</strong><span>H {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.height}px · Stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.stroke}px · R {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.radius}px · Font {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.fontSize}px / weight {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.fontWeight}</span><span>Flat default: no shadow, hover offset, or press offset · icon {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.iconSize}px / stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.micro.iconStroke}</span></div>
          <div className="vt-confirmed-size-card"><strong>60PX SUPREME</strong><span>H {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.height}px · Stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.stroke}px · R {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.radius}px · Font {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.fontSize}px / weight {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.fontWeight}</span><span>Flat default: no shadow, hover offset, or press offset · icon {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.iconSize}px / stroke {STUDIO_COMPONENT_SIZE_DEFAULTS.supreme.iconStroke}</span></div>
        </div>
        <div className="vt-confirmed-size-card"><strong>SINGLE-LINE INPUTS · GLOBAL TYPOGRAPHY</strong><span>Standard {STUDIO_COMPONENT_SIZE_DEFAULTS.textInput.standardFontSize}px · compact {STUDIO_COMPONENT_SIZE_DEFAULTS.textInput.compactFontSize}px · weight {STUDIO_COMPONENT_SIZE_DEFAULTS.textInput.fontWeight} · line-height {STUDIO_COMPONENT_SIZE_DEFAULTS.textInput.lineHeight}</span><span>Inputs keep the selected 44px / 28px geometry and use the global single-line type scale.</span></div>
        <div className="vt-confirmed-size-card vt-confirmed-field-typography-exception"><strong>MULTILINE TEXTAREA · REGISTERED EXCEPTION</strong><span>Standard {STUDIO_COMPONENT_SIZE_DEFAULTS.multiline.standardFontSize}px · compact {STUDIO_COMPONENT_SIZE_DEFAULTS.multiline.compactFontSize}px · minimum surface {STUDIO_COMPONENT_SIZE_DEFAULTS.multiline.minHeight}px · weight {STUDIO_COMPONENT_SIZE_DEFAULTS.multiline.fontWeight}</span><span>Textarea-only multiline line-height, padding, and vertical resizing; selected size still controls height family, border, and radius.</span></div>
        <div className="vt-confirmed-size-card vt-confirmed-action-exception"><strong>PROMINENT ACTION · SUPREME DEFAULT</strong><span>60px Supreme default; standard and compact variants use shared tier tokens · flat and stationary.</span><span>StudioActionButton is a workflow role, not a separate fixed-height size family; shell shadows, transitions, and hover/press movement are removed.</span></div>
        <div className="vt-confirmed-global-grid">{Object.entries(STUDIO_COMPONENT_GLOBAL_DEFAULTS).map(([key, value]) => <div key={key}><strong>{key.replace(/([A-Z])/g, " $1")}</strong><span>{formatDefaultValue(value)}</span></div>)}</div>
        <div className="vt-confirmed-defaults-explainer">
          <strong>HOW TO READ THE CURRENT CONTRACT</strong>
          <p><b>Geometry:</b> standard is 44px high / 3px border / 6px radius; compact is 28px / 2px / 4px; Mini is 20px / 1.5px / 3px; Micro is 12px / 1.5px / 3px; Supreme is 60px / 3px / 6px. Default type is Inter, weight 1000, uppercase, -0.02em tracking, and default line-height (1) unless a family exception is documented.</p>
          <p><b>Field colors:</b> At rest, value, placeholder, caret, and inline text stroke use primary (--pair-a); fill uses primary at 50% opacity and the outer border is black. Focus uses primary fill at 15%, black text fill with primary inline stroke, plus a secondary-color outline at 65% of border width with 0px offset.</p>
          <p><b>Global interaction defaults:</b> primitive shells are flat and stationary. No shell shadow, hover/press movement, or transition is part of the default contract; explicitly registered inner-icon effects must remain isolated and honor reduced motion.</p>
          <p><b>Icon presets:</b> the default production preset is 38px / 1.9 stroke standard and 24px / 2.0 compact. Current (28px / 18px) and moderate (34px / 22px) presets are opt-in. Circle icon buttons scale the large preset to 80%.</p>
          <p><b>Certification boundary:</b> This section describes the intended canonical contract. Focus, responsive layout, accessibility, and any explicitly registered inner-icon effect require browser verification before certification; primitive shells remain flat and stationary.</p>
        </div>
        </div>
      <h4 className="vt-confirmed-exceptions-heading" id="vt-confirmed-exception-index-title">Global Exceptions · Current Implementation + Verification Boundary</h4>
      <p>Canonical sources: <code>src/studio-ui/primitives/StudioControls.tsx</code>, <code>src/studio-ui/tokens.ts</code>, and <code>src/styles/studio-control-system.css</code>. Named size exceptions are registered in <code>STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS</code>; effective CSS can diverge from token metadata.</p>
      <ul>
        <li><strong>BASE SIZE LATTICE:</strong> standard is 44px / 3px stroke / 6px radius; compact is 28px / 2px stroke / 4px radius; Mini is 20px / 1.5px / 3px; Micro is 12px / 1.5px / 3px; Supreme is 60px / 3px / 6px. These are ordinary component sizes, not universal dimensions for every metadata element.</li>
        <li><strong>SINGLE-LINE INPUT TYPOGRAPHY:</strong> 38px standard / 24px compact, weight 1000 and default line-height (1) while retaining selected-size geometry.</li>
        <li><strong>MULTILINE TEXTAREA:</strong> 18px standard / 14px compact, multiline line-height and padding, 92px minimum writing surface, and vertical resize.</li>
        <li><strong>PROMINENT WORKFLOW ACTION:</strong> StudioActionButton is a Supreme 60px default with standard/compact variants and token-driven geometry, and no shell shadow, transition, or hover/press translation.</li>
        <li><strong>GLOBAL SHADOW + MOTION POLICY:</strong> canonical primitive shells and faces are flat and stationary; obsolete shadow/movement declarations must be removed, not masked by override layers. Browser computed-style verification remains a release gate.</li>
        <li><strong>DROPDOWN:</strong> the trigger uses standard/compact sizing; menu rows and options are not button-press surfaces. A floating panel may have its own stationary shadow. Panel typography and stacking use dropdown-specific CSS.</li>
        <li><strong>SQUARE / CIRCLE ICON BUTTONS:</strong> share the standard/compact size lattice and default flat, stationary shell behavior. Large icon preset is default; circle buttons scale it to 80%. V1–V4 skins and documented inner-icon effects are explicit variants, not global shell behavior.</li>
        <li><strong>VAULT SPECTRUM TAG:</strong> registered 15px dense metadata chip with 2px border, 4px radius, 8px / weight-900 type, 35% white-mixed spectrum fill, and flat selected-state color treatment with no shadow, glow, or geometry offset.</li>
        <li><strong>CLOSEABLE BADGE:</strong> registered family exception: 20px pill height, no outer border, 16px Inter 1000 uppercase label, primary fill, and 16px circular secondary close control with primary glyph. This fixed removable-chip geometry does not redefine the five-tier lattice.</li>
        <li><strong>TAG EDITOR ACTION:</strong> registered compact 28px square plus/check action, 2px stroke and 4px radius with a no shadow under the global flat-control contract.</li>
        <li><strong>SPLIT-LEFT BADGE MICRO DENSITY:</strong> the informational badge uses the global Micro tier: 12px height / 1.5px stroke / 3px radius / 10px type and icons, matching the shared token contract.</li>
        <li><strong>FIELD CARET + FOCUS:</strong> native insertion caret is retained; <code>caret-shape: block</code> is requested where supported and must not be simulated with a fake overlay. Focus uses the secondary outline at 65% of the selected border width and 0px offset; verify computed styles in a rendered browser.</li>
        <li><strong>REDUCED MOTION:</strong> primitive shells have no default transitions or movement. Explicitly registered inner-icon effects must honor reduced-motion preferences.</li>
        <li><strong>VERIFICATION BOUNDARY:</strong> source text and source tests do not certify the live deployment. Verify standard/compact dimensions, effective shadows/transforms, selected/disabled/loading states, keyboard focus, dropdown stacking, narrow layouts, and reduced motion in a browser.</li>
      </ul>
      <p><strong>Audit status:</strong> this library records the canonical global defaults. A primitive is not certified until its production rendering, tokens, effective CSS, and responsive/accessibility behavior agree with this contract.</p>
      </details>
    </details>
    <Family title="Studio Text Input · Standalone + Simple + Floating + Fixed Label" nonDefaultSettings={[
        "Typography is intentionally 38px Standard, 24px Compact, and 10px Micro; label variants do not change those sizes.",
        "Floating labels use 80% of the input font size; fixed-label mode reserves a separate label box matching the multi-select dropdown.",
      ]} provenance={<Provenance primitive="StudioTextInput · StudioSplitTextInput" tsx="src/studio-ui/primitives/StudioTextInput.tsx + src/studio-ui/primitives/StudioSplitTextInput.tsx" css="src/styles/studio-control-system.css + src/styles/studio-text-input.css + src/studio-ui/primitives/studio-split-text-input.css" tokens="One native input family with simple, floating-label, and fixed-label variants; standard 44px / 38px, compact 28px / 24px, micro 12px / 10px." imports={["src/studio-ui/primitives/StudioTextInput.tsx", "src/studio-ui/primitives/StudioSplitTextInput.tsx", "src/styles/studio-control-entry.css", "src/styles/studio-text-input.css", "src/studio-ui/primitives/studio-split-text-input.css"]} />}>
      <div className="vt-confirmed-variant is-full-row"><span>60px supreme · simple input</span><StudioTextInput sizeVariant="supreme" aria-label="Studio plain text input supreme" placeholder="TYPE HERE" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>44px standard · simple input</span><StudioTextInput sizeVariant="standard" aria-label="Studio plain text input standard" placeholder="TYPE HERE" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>20px Mini · simple input</span><StudioTextInput sizeVariant="mini" aria-label="Studio plain text input Mini" placeholder="TYPE HERE" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>28px compact · simple input</span><StudioTextInput sizeVariant="compact" aria-label="Studio plain text input compact" placeholder="TYPE HERE" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>12px micro · simple input</span><StudioTextInput sizeVariant="micro" aria-label="Studio plain text input micro" placeholder="TITLE" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>Floating label · 44px standard · A</span><StudioTextInput variant="floating-label" floatingLabelVariant="a" label="TITLE" aria-label="Studio floating-label input standard A" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>Floating label · 28px compact · A</span><StudioTextInput variant="floating-label" floatingLabelVariant="a" label="TITLE" aria-label="Studio floating-label input compact A" sizeVariant="compact" data-vt-library-component="StudioTextInput" /></div>
        <div className="vt-confirmed-variant"><span>Floating label · 28px compact · B · reverse colors</span><StudioTextInput className="is-reverse-colors" variant="floating-label" floatingLabelVariant="b" label="TITLE" aria-label="Studio floating-label input compact B reverse colors" sizeVariant="compact" data-vt-library-component="StudioTextInput" /></div>
      </div>
      <div className="vt-confirmed-variant is-full-row"><span>Fixed label box · 44px standard · A</span><StudioTextInput variant="fixed-label" label="TITLE" aria-label="Studio fixed-label input standard A" sizeVariant="standard" data-vt-library-component="StudioTextInput" /></div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>Fixed label box · 28px compact · A</span><StudioTextInput variant="fixed-label" label="TITLE" aria-label="Studio fixed-label input compact A" sizeVariant="compact" data-vt-library-component="StudioTextInput" /></div>
        <div className="vt-confirmed-variant"><span>Fixed label box · 28px compact · B · reverse colors</span><StudioTextInput className="is-reverse-colors" variant="fixed-label" label="TITLE" aria-label="Studio fixed-label input compact B reverse colors" sizeVariant="compact" data-vt-library-component="StudioTextInput" /></div>
      </div>
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSplitTextInput">
        <span>SPLIT TEXT INPUT · LEFT / RIGHT / DOUBLE</span>
        <StudioSplitTextInput split="left" sizeVariant="standard" leftIcon={<Check aria-hidden="true" />} aria-label="Standard split-left text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="right" sizeVariant="standard" rightIcon={<Settings2 aria-hidden="true" />} aria-label="Standard split-right text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="double" sizeVariant="standard" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Standard double-split text input" placeholder="TYPE HERE" />
        <span>COMPACT · LEFT / RIGHT / DOUBLE</span>
        <StudioSplitTextInput split="left" sizeVariant="compact" leftIcon={<Check aria-hidden="true" />} aria-label="Compact split-left text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="right" sizeVariant="compact" rightIcon={<Settings2 aria-hidden="true" />} aria-label="Compact split-right text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="double" sizeVariant="compact" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Compact double-split text input" placeholder="TYPE HERE" />
        <span>SUPREME · LEFT / RIGHT / DOUBLE</span>
        <StudioSplitTextInput split="left" sizeVariant="supreme" leftIcon={<Check aria-hidden="true" />} aria-label="Supreme split-left text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="right" sizeVariant="supreme" rightIcon={<Settings2 aria-hidden="true" />} aria-label="Supreme split-right text input" placeholder="TYPE HERE" />
        <StudioSplitTextInput split="double" sizeVariant="supreme" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Supreme double-split text input" placeholder="TYPE HERE" />
        <span>MINI · LEFT / RIGHT / DOUBLE</span>
        <StudioSplitTextInput split="left" sizeVariant="mini" leftIcon={<Check aria-hidden="true" />} aria-label="Mini split-left text input" placeholder="TYPE" />
        <StudioSplitTextInput split="right" sizeVariant="mini" rightIcon={<Settings2 aria-hidden="true" />} aria-label="Mini split-right text input" placeholder="TYPE" />
        <StudioSplitTextInput split="double" sizeVariant="mini" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Mini double-split text input" placeholder="TYPE" />
        <span>MICRO · LEFT / RIGHT / DOUBLE</span>
        <StudioSplitTextInput split="left" sizeVariant="micro" leftIcon={<Check aria-hidden="true" />} aria-label="Micro split-left text input" placeholder="TYPE" />
        <StudioSplitTextInput split="right" sizeVariant="micro" rightIcon={<Settings2 aria-hidden="true" />} aria-label="Micro split-right text input" placeholder="TYPE" />
        <StudioSplitTextInput split="double" sizeVariant="micro" leftIcon={<Check aria-hidden="true" />} rightIcon={<Sparkles aria-hidden="true" />} aria-label="Micro double-split text input" placeholder="TYPE" />
      </div>
    </Family>
    <Family title="Studio Text Area · Standalone + Simple + Floating + Fixed Label" nonDefaultSettings={[
        "Textarea exception: 18px Standard / 14px Compact text, multiline line-height/padding, and 92px minimum writing height.",
      ]} provenance={<Provenance primitive="StudioTextArea" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="One native textarea family with simple and floating-label variants; 92px minimum surface and standard 18px / compact 14px multiline typography." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row"><span>60px supreme · StudioTextArea</span><StudioTextArea sizeVariant="supreme" rows={4} aria-label="Studio text area supreme" placeholder="TYPE HERE" data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>44px standard · StudioTextArea</span><StudioTextArea sizeVariant="standard" rows={4} aria-label="Studio text area 44px" placeholder="TYPE HERE" data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>20px Mini · StudioTextArea</span><StudioTextArea sizeVariant="mini" rows={4} aria-label="Studio text area Mini" placeholder="TYPE HERE" data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>28px compact · StudioTextArea</span><StudioTextArea sizeVariant="compact" rows={4} aria-label="Studio text area 28px" placeholder="TYPE HERE" data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-variant is-full-row"><span>Floating label · 44px standard · A</span><StudioTextArea variant="floating-label" floatingLabelVariant="a" label="DESCRIPTION" aria-label="Studio floating-label textarea standard A" rows={4} data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>Floating label · 28px compact · A</span><StudioTextArea variant="floating-label" floatingLabelVariant="a" label="DESCRIPTION" aria-label="Studio floating-label textarea compact A" sizeVariant="compact" rows={4} data-vt-library-component="StudioTextArea" /></div>
        <div className="vt-confirmed-variant"><span>Floating label · 28px compact · B · reverse colors</span><StudioTextArea className="is-reverse-colors" variant="floating-label" floatingLabelVariant="b" label="DESCRIPTION" aria-label="Studio floating-label textarea compact B reverse colors" sizeVariant="compact" rows={4} data-vt-library-component="StudioTextArea" /></div>
      </div>
      <div className="vt-confirmed-variant is-full-row"><span>Fixed label box · 44px standard · A</span><StudioTextArea variant="fixed-label" label="DESCRIPTION" aria-label="Studio fixed-label textarea standard A" sizeVariant="standard" rows={4} data-vt-library-component="StudioTextArea" /></div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>Fixed label box · 28px compact · A</span><StudioTextArea variant="fixed-label" label="DESCRIPTION" aria-label="Studio fixed-label textarea compact A" sizeVariant="compact" rows={4} data-vt-library-component="StudioTextArea" /></div>
        <div className="vt-confirmed-variant"><span>Fixed label box · 28px compact · B · reverse colors</span><StudioTextArea className="is-reverse-colors" variant="fixed-label" label="DESCRIPTION" aria-label="Studio fixed-label textarea compact B reverse colors" sizeVariant="compact" rows={4} data-vt-library-component="StudioTextArea" /></div>
      </div>
    </Family>

    <Family title="Studio Text Box · Supreme + Standard + Compact + Mini + Micro" nonDefaultSettings={[
        "Read-only display exception: selectable text, preserved newlines, wrapping long words, and no caret, editing behavior, or tab stop.",
        "Display text stays black with black glyph stroke; primary inset and secondary 65%-stroke outline remain visible, with 0.85 line-height.",
        "Height is content-driven; newlines are preserved and long words wrap rather than overflow.",
      ]} provenance={<Provenance primitive="StudioTextBox" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Shared field geometry across Supreme / Standard / Compact / Mini / Micro; black text and black glyph stroke; primary inset and secondary outline at 65% of the selected border; 0.85 line-height." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row"><span>SUPREME · 24.55PX</span><StudioTextBox size="supreme" aria-label="Studio text box supreme" data-vt-library-component="StudioTextBox">Supreme read-only text uses the shared field border and focus contract.</StudioTextBox></div>
      <div className="vt-confirmed-variant is-full-row"><span>STANDARD · 18PX</span><StudioTextBox aria-label="Studio text box standard" data-vt-library-component="StudioTextBox">A read-only description that can contain as little or as much text as needed.</StudioTextBox></div>
      <div className="vt-confirmed-variant is-full-row"><span>COMPACT · 14PX</span><StudioTextBox size="compact" aria-label="Studio text box compact" data-vt-library-component="StudioTextBox">Compact display text. A second row remains aligned to the textarea line-height.</StudioTextBox></div>
      <div className="vt-confirmed-variant is-full-row"><span>MINI · 17.5PX</span><StudioTextBox size="mini" aria-label="Studio text box Mini" data-vt-library-component="StudioTextBox">Mini display text uses the 20px control tier.</StudioTextBox></div>
      <div className="vt-confirmed-variant is-full-row"><span>MICRO · 10PX</span><StudioTextBox size="micro" aria-label="Studio text box micro" data-vt-library-component="StudioTextBox">Micro display text.</StudioTextBox></div>
    </Family>
    <CanonicalControlFamilies />
    <CanonicalWordToggleFamily />
    <p className="vt-confirmed-intro">Production primitives · standard + compact.</p>
    <ConfirmedStudioButtonFamily />
    <ConfirmedStudioSplitButtonFamily />
    <ConfirmedStudioDropdownFamily />
    <CanonicalSplitBadgeFamily />


    <Family title="Prominent Action · 60px Supreme" nonDefaultSettings={[
        "Supreme 60px is the default; Standard 44px and Compact 28px are explicit opt-down variants.",
        "Workflow prominence changes role, not geometry; dimensions still come from the shared size tokens.",
      ]} provenance={<Provenance primitive="StudioActionButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Supreme 60px default · Standard 44px · Compact 28px; workflow role shares canonical size tokens." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row"><span>60px Supreme · default</span><StudioActionButton sizeVariant="supreme" data-vt-library-component="StudioActionButton">CREATE PACKAGE</StudioActionButton></div>
      <div className="vt-confirmed-variant"><span>44px standard</span><StudioActionButton sizeVariant="standard" data-vt-library-component="StudioActionButton">CREATE PACKAGE</StudioActionButton></div>
      <div className="vt-confirmed-variant"><span>28px compact</span><StudioActionButton sizeVariant="compact" data-vt-library-component="StudioActionButton">CREATE</StudioActionButton></div>
    </Family>

    <Family title="Square Icon Button · Standard + Compact" nonDefaultSettings={[
        "All skins and interaction effects are arranged by size, not split into separate effect modules.",
        "Bell ring and download/check variants are interactive toggles; success feedback is shown only for a confirmed outcome.",
        "Badges, tooltips, and effect ripples are allowed to extend beyond the square button face.",
      ]} provenance={<Provenance primitive="StudioSquareIconButton · V1–V4 + activation, badge, heart, bell, refresh, like, download/check effects" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px standard / 28px compact; token-owned control geometry; optional effects and state feedback." imports={["src/studio-ui/index.ts", "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row vt-confirmed-square-variant-row">
        <span>44px STANDARD · ALL SKINS + EFFECTS</span>
        <div className="vt-confirmed-square-variant-grid">
          <StudioSquareIconButton iconPreset="heart" label="Standard V1 primary" variant="v1" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Standard V2 secondary" variant="v2" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Standard V3 state toggle" variant="v3" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Standard V4 black" variant="v4" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Pop on activation" effect="pop-on-activation" variant="v3" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="bell" label="Notification badge" effect="notification" badge={3} sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Heart pop ripple" effect="heart-pop" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="bell" label="Bell ring state toggle" effect="bell-ring" variant="v3" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="download-check" label="Download check toggle" effect="download" variant="v3" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="download-check" label="Download succeeded" effect="download-success" success tooltip="DOWNLOADED" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="refresh" label="Refresh spin with tooltip" effect="refresh" tooltip="REFRESH" sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="like" label="Like pop with live count" effect="like" badge={0} sizeVariant="standard" data-vt-library-component="StudioSquareIconButton" />
        </div>
      </div>
      <div className="vt-confirmed-variant is-full-row vt-confirmed-square-variant-row">
        <span>28px COMPACT · ALL SKINS + EFFECTS</span>
        <div className="vt-confirmed-square-variant-grid">
          <StudioSquareIconButton iconPreset="heart" label="Compact V1 primary" variant="v1" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Compact V2 secondary" variant="v2" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Compact V3 state toggle" variant="v3" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Compact V4 black" variant="v4" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Compact pop on activation" effect="pop-on-activation" variant="v3" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="bell" label="Compact notification badge" effect="notification" badge={3} sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="heart" label="Compact heart pop ripple" effect="heart-pop" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="bell" label="Compact bell ring state toggle" effect="bell-ring" variant="v3" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="download-check" label="Compact download check toggle" effect="download" variant="v3" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="download-check" label="Compact download succeeded" effect="download-success" success tooltip="DOWNLOADED" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="refresh" label="Compact refresh spin with tooltip" effect="refresh" tooltip="REFRESH" sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
          <StudioSquareIconButton iconPreset="like" label="Compact like pop with live count" effect="like" badge={0} sizeVariant="compact" data-vt-library-component="StudioSquareIconButton" />
        </div>
      </div>
    </Family>
    <Family
      title="Square Icon Button Groups · Standard + Compact"
      nonDefaultSettings={[
        "Groups are rendered by the canonical StudioSquareIconButtonGroup primitive and contain real StudioSquareIconButton children.",
        "Joined group uses max-content width instead of stretching across the catalog row.",
        "Compact is the dense-toolbar variant; Standard is for lower-density action rows.",
      ]}
      provenance={<Provenance primitive="StudioSquareIconButtonGroup / StudioSquareIconButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px standard / 28px compact · intrinsic content width · one shared shell border with joined square faces" imports={["src/studio-ui/primitives/StudioControls.tsx", "src/studio-ui/index.ts"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioSquareIconButtonGroup" style={{ display: "grid", gap: 8, justifyItems: "start", minWidth: 0 }}>
        <span>STANDARD · JOINED ICON ACTIONS</span>
        <StudioSquareIconButtonGroup sizeVariant="standard" aria-label="Standard joined icon actions">
          <StudioSquareIconButton icon={<Home aria-hidden="true" />} label="Home" sizeVariant="standard" />
          <StudioSquareIconButton icon={<Settings2 aria-hidden="true" />} label="Settings" sizeVariant="standard" />
          <StudioSquareIconButton icon={<Sparkles aria-hidden="true" />} label="Enhance" sizeVariant="standard" />
        </StudioSquareIconButtonGroup>
        <span>COMPACT · CONTENT-WIDTH RAIL</span>
        <StudioSquareIconButtonGroup sizeVariant="compact" aria-label="Compact joined icon actions">
          <StudioSquareIconButton icon={<Check aria-hidden="true" />} label="Helpful" sizeVariant="compact" />
          <StudioSquareIconButton icon={<Info aria-hidden="true" />} label="Not useful" sizeVariant="compact" />
          <StudioSquareIconButton icon={<Settings2 aria-hidden="true" />} label="More options" sizeVariant="compact" />
        </StudioSquareIconButtonGroup>
      </div>
    </Family>
    
    
    <Family
      title="Top Split Module · Left / Right / Double / None"
      nonDefaultSettings={[
        "The canonical module composes a split-control header with a white content body; it does not replace the retired split-rail accordion.",
        "Header rails use the secondary pair color and remain square; the body is a separate white content region.",
        "Examples cover all four header layouts at standard and compact sizes; accent tone is shown separately.",
      ]}
      provenance={<Provenance primitive="StudioTopSplitModule" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px standard / 28px compact · left/right/double/none header rails · default/accent tone · white body" imports={["src/studio-ui/primitives/StudioControls.tsx", "src/studio-ui/index.ts"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioTopSplitModule" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, minWidth: 0 }}>
        <StudioTopSplitModule title="LEFT RAIL" split="left" startIcon={<Home size={18} aria-hidden="true" />} sizeVariant="standard">
          <p style={{ margin: 0, padding: 8 }}>Header rail at start; content stays white.</p>
        </StudioTopSplitModule>
        <StudioTopSplitModule title="RIGHT RAIL" split="right" endIcon={<Settings2 size={18} aria-hidden="true" />} sizeVariant="standard">
          <p style={{ margin: 0, padding: 8 }}>Header rail at end; content stays white.</p>
        </StudioTopSplitModule>
        <StudioTopSplitModule title="DOUBLE RAIL" split="double" startIcon={<Home size={16} aria-hidden="true" />} endIcon={<Settings2 size={16} aria-hidden="true" />} sizeVariant="compact">
          <p style={{ margin: 0, padding: 8 }}>Paired secondary rails around the title.</p>
        </StudioTopSplitModule>
        <StudioTopSplitModule title="NO RAILS" split="none" sizeVariant="compact" tone="accent">
          <p style={{ margin: 0, padding: 8 }}>Compact accent header with no side rails.</p>
        </StudioTopSplitModule>
      </div>
    </Family>
    <Family
      title="Split-left Button · Standard + Compact"
      nonDefaultSettings={[
        "Canonical split-left button with an independent leading icon rail and stationary outer shell.",
        "The two compact examples share one row and retain their individual accessible names.",
      ]}
      provenance={<Provenance primitive="StudioSplitLeftButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px standard / 28px compact · shared button palettes · square leading icon rail." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row">
        <span>44px standard · edit action</span>
        <StudioSplitLeftButton icon={<Settings2 aria-hidden="true" />} sizeVariant="standard" aria-label="Standard split-left edit action" data-vt-library-component="StudioSplitLeftButton">EDIT</StudioSplitLeftButton>
      </div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>28px compact · edit action</span><StudioSplitLeftButton icon={<Settings2 aria-hidden="true" />} sizeVariant="compact" aria-label="Compact split-left edit action" data-vt-library-component="StudioSplitLeftButton">EDIT</StudioSplitLeftButton></div>
        <div className="vt-confirmed-variant"><span>28px compact · create action</span><StudioSplitLeftButton icon={<Sparkles aria-hidden="true" />} sizeVariant="compact" aria-label="Compact split-left create action" data-vt-library-component="StudioSplitLeftButton">CREATE</StudioSplitLeftButton></div>
      </div>
    </Family>
    <Family
      title="Play/Pause Split-left Button · 44px + 28px"
      nonDefaultSettings={[
        "Reserves label width so Play/Pause does not resize the control.",
        "Supports uncontrolled or parent-controlled playback state.",
      ]}
      provenance={<Provenance primitive="StudioPlayPauseButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Canonical StudioSplitLeftButton composition; stable Play/Pause label geometry; selected-color swap; 44px / 28px sizes." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row">
        <span>44px standard · click to toggle Play / Pause</span>
        <StudioPlayPauseButton sizeVariant="standard" data-vt-library-component="StudioPlayPauseButton" />
      </div>
      <div className="vt-confirmed-paired-compact-row">
        <div className="vt-confirmed-variant"><span>28px compact · click to toggle</span><StudioPlayPauseButton sizeVariant="compact" data-vt-library-component="StudioPlayPauseButton" /></div>
        <div className="vt-confirmed-variant"><span>28px compact · starts selected</span><StudioPlayPauseButton sizeVariant="compact" defaultPlaying data-vt-library-component="StudioPlayPauseButton" /></div>
      </div>
    </Family>
    <Family
      title="Circle Icon Button · 44px + 28px"
      nonDefaultSettings={[
        "Circular shape uses 80% of the canonical large icon preset: 30.4px / 1.9 stroke standard and 19.2px / 2.0 compact.",
      ]}
      provenance={<Provenance primitive="StudioCircleIconButton" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Circular shape wrapper over StudioSquareIconButton; shared V1–V4, sizing, effects, and accessibility contracts." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row">
        <span>44px standard · variants 1–4</span>
        <div className="vt-confirmed-square-variant-grid">
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Circle icon button V1" variant="v1" sizeVariant="standard" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Circle icon button V2" variant="v2" sizeVariant="standard" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Sparkles aria-hidden="true" />} label="Circle icon button V3 toggle" variant="v3" sizeVariant="standard" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Circle icon button V4" variant="v4" sizeVariant="standard" data-vt-library-component="StudioCircleIconButton" />
        </div>
      </div>
      <div className="vt-confirmed-variant is-full-row">
        <span>28px compact · variants 1–4</span>
        <div className="vt-confirmed-square-variant-grid">
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Compact circle icon button V1" variant="v1" sizeVariant="compact" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Compact circle icon button V2" variant="v2" sizeVariant="compact" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Sparkles aria-hidden="true" />} label="Compact circle icon button V3 toggle" variant="v3" sizeVariant="compact" data-vt-library-component="StudioCircleIconButton" />
          <StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Compact circle icon button V4" variant="v4" sizeVariant="compact" data-vt-library-component="StudioCircleIconButton" />
        </div>
      </div>
      {(["supreme", "mini", "micro"] as const).map(size => <div className="vt-confirmed-variant is-full-row vt-confirmed-square-variant-row" key={size}><span>{size.toUpperCase()} · VARIANTS 1–4</span><div className="vt-confirmed-square-variant-grid">{(["v1", "v2", "v3", "v4"] as const).map(variant => <StudioCircleIconButton key={variant} icon={<Settings2 aria-hidden="true" />} label={size + " circle icon " + variant} variant={variant} sizeVariant={size} data-vt-library-component="StudioCircleIconButton" />)}</div></div>)}
      <div className="vt-confirmed-variant"><span>44px standard · disabled</span><StudioCircleIconButton icon={<Settings2 aria-hidden="true" />} label="Disabled circle icon button" variant="v1" sizeVariant="standard" disabled data-vt-library-component="StudioCircleIconButton" /></div>
    </Family>

    <Family
      title="StudioSpectrumTag · Vault Metadata Exception"
      nonDefaultSettings={[
        "Dense metadata exception: 15px height, spectrum-derived border/text, 35% color fill, and opt-in selected glow.",
      ]}
      provenance={<Provenance
        primitive="StudioSpectrumTag"
        tsx="src/studio-ui/primitives/StudioControls.tsx"
        css="src/styles/studio-control-system.css"
        tokens={`H ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag.height}px · border ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag.borderWidth}px · radius ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag.radius}px · ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag.fontSize}px / weight ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.vaultSpectrumTag.fontWeight} · fill 35% white mix`}
        imports={["src/components/subtoolbox/VaultAssetModule.tsx", "src/studio-ui/primitives/StudioControls.tsx"]}
      />}
    >
      <p className="vt-confirmed-defaults-summary">Intentional exception to global control geometry · exact Vault asset-module chip styling</p>
      <div className="vt-confirmed-variant is-full-row vt-confirmed-spectrum-tag-variant" data-vt-library-component="StudioSpectrumTag">
        <span>50 continuous alphabetical spectrum samples</span>
        <div className="vt-confirmed-spectrum-tag-grid">
          <StudioSpectrumTag label="AARDVARK" />
          <StudioSpectrumTag label="AZURE" />
          <StudioSpectrumTag label="BANANA" />
          <StudioSpectrumTag label="BLUEBELL" />
          <StudioSpectrumTag label="CANDY" />
          <StudioSpectrumTag label="CITRUS" />
          <StudioSpectrumTag label="DAFFODIL" />
          <StudioSpectrumTag label="DENIM" />
          <StudioSpectrumTag label="EBONY" />
          <StudioSpectrumTag label="EMERALD" />
          <StudioSpectrumTag label="FERN" />
          <StudioSpectrumTag label="FROST" />
          <StudioSpectrumTag label="GOLD" />
          <StudioSpectrumTag label="GREEN" />
          <StudioSpectrumTag label="HAZEL" />
          <StudioSpectrumTag label="HONEY" />
          <StudioSpectrumTag label="INDIGO" />
          <StudioSpectrumTag label="IVORY" />
          <StudioSpectrumTag label="JADE" />
          <StudioSpectrumTag label="JASMINE" />
          <StudioSpectrumTag label="KIWI" />
          <StudioSpectrumTag label="KUMQUAT" />
          <StudioSpectrumTag label="LAVENDER" />
          <StudioSpectrumTag label="LEMON" />
          <StudioSpectrumTag label="MAGENTA" />
          <StudioSpectrumTag label="MINT" />
          <StudioSpectrumTag label="NAVY" />
          <StudioSpectrumTag label="NEON" />
          <StudioSpectrumTag label="OPAL" />
          <StudioSpectrumTag label="ORANGE" />
          <StudioSpectrumTag label="PEACH" />
          <StudioSpectrumTag label="PERIWINKLE" />
          <StudioSpectrumTag label="QUARTZ" />
          <StudioSpectrumTag label="QUINCE" />
          <StudioSpectrumTag label="ROSE" />
          <StudioSpectrumTag label="RUBY" />
          <StudioSpectrumTag label="SAPPHIRE" />
          <StudioSpectrumTag label="SCARLET" />
          <StudioSpectrumTag label="TEAL" />
          <StudioSpectrumTag label="TURQUOISE" />
          <StudioSpectrumTag label="ULTRAMARINE" />
          <StudioSpectrumTag label="UMBER" />
          <StudioSpectrumTag label="VIOLET" />
          <StudioSpectrumTag label="VIRIDIAN" />
          <StudioSpectrumTag label="WALNUT" />
          <StudioSpectrumTag label="WHITE" />
          <StudioSpectrumTag label="XANTHAN" />
          <StudioSpectrumTag label="XENON" />
          <StudioSpectrumTag label="YELLOW" />
          <StudioSpectrumTag label="ZUCCHINI" />
        </div>
        <div className="vt-confirmed-spectrum-tag-selected">
          <span>Selected-state treatment</span>
          <StudioSpectrumTag label="DESIGN" selected />
        </div>
      </div>
    </Family>
    <Family
      title="StudioCloseableBadge · Fixed 20px Exception"
      nonDefaultSettings={[
        "Fixed 20px metadata pill with a secondary-pair close affordance and explicit close feedback.",
        "This metadata badge is an intentional family exception, not an ordinary size-tier control.",
      ]}
      provenance={<Provenance primitive="StudioCloseableBadge" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="20px pill · no border · 16px heavy type · content width · secondary close affordance." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-tag-editor-variant" data-vt-library-component="StudioCloseableBadge">
        <span>20PX FIXED · CLOSE / REMOVE</span>
        <div className="vt-confirmed-tag-editor-badge-row">
          <StudioCloseableBadge label="Tag One" />
          <StudioCloseableBadge label="Featured" />
          <StudioCloseableBadge label="Live" />
        </div>
      </div>
    </Family>
    <Family
      title="StudioTagEditor · Tokenized Actions"
      nonDefaultSettings={[
        "Dedicated tag editor section with its own add, confirm, remove, and action-size contract.",
        "The editor's action geometry follows the registered exception tokens; tag chips are not promoted to the top primitive ledger.",
      ]}
      provenance={<Provenance primitive="StudioTagEditor" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens={`Action H ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.tagEditorAction.height}px / stroke ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.tagEditorAction.stroke}px / radius ${STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS.tagEditorAction.radius}px.`} imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row vt-confirmed-tag-editor-variant" data-vt-library-component="StudioTagEditor">
        <span>INTERACTIVE TAG EDITOR · ADD, CONFIRM, FLY, REMOVE</span>
        <StudioTagEditor defaultValue={["Tag One", "Featured"]} ariaLabel="Dedicated tag editor specimen" />
      </div>
    </Family>
    <Family
      title="Upload Frame · Standard + Compact"
      nonDefaultSettings={[
        "Canvas component uses a 16:9 frame at every breakpoint.",
        "Conic border, breathing layers, and image preview derive their colors from the active primary/secondary pair.",
        "Native file picker, drag/drop, disabled state, image preview, and reduced-motion behavior are supported.",
      ]}
      provenance={<Provenance primitive="StudioUploadFrame" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Full-row canvas · pair A/B gradients · 16:9 ratio" imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioUploadFrame">
        <span>Standard · default upload frame</span>
        <StudioUploadFrame aria-label="Standard upload frame example" />
        <span>Compact · image upload</span>
        <StudioUploadFrame sizeVariant="compact" accept="image/*" aria-label="Compact image upload example" />
      </div>
    </Family>
    <Family
      title="Publishing Card · 5:7 Compound Composition"
      nonDefaultSettings={[
        "Composition built from canonical Studio Controls primitives; it is a composition, not a new primitive family.",
        "Outer shell maintains a 5:7 ratio with a black 3px border, 6px radius, and 25% secondary-pair fill.",
        "Includes standard, compact, and micro density variants; micro uses the canonical compact textarea because Studio textareas do not define a micro tier.",
        "Includes fixed-label title and description, a 16:9 image upload frame, removable tags, and Playlist / Category / Location / Publish Date selectors.",
        "Uses active primary/secondary pair styling and canonical upload and tag components; composition-specific responsive layout is owned by studio-publishing-card.css.",
      ]}
      provenance={<Provenance primitive="StudioPublishingCard composition" tsx="src/studio-ui/compositions/StudioPublishingCard.tsx" css="src/styles/studio-publishing-card.css" tokens="5:7 shell · standard 44px / compact 28px / micro 12px control tiers · 16:9 thumbnail · 25% secondary fill · size-matched black border/radius · primary inset + secondary outline" imports={["src/studio-ui/compositions/StudioPublishingCard.tsx", "src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioPublishingCard">
        {([
          { size: "standard" as const, label: "Standard · 44px controls" },
          { size: "compact" as const, label: "Compact · 28px controls" },
          { size: "micro" as const, label: "Micro · 12px controls (textarea uses canonical compact tier)" },
        ]).map(({ size, label }) => <div className="vt-confirmed-publishing-card-specimen" key={size} data-publishing-card-size={size}>
          <span>{label}</span>
          <div style={{ width: "min(100%, 360px)", marginInline: "auto" }}>
            <StudioPublishingCard
              sizeVariant={size}
              title="NEW VIDEO"
              description="A short description of the video and what viewers can expect."
              playlistOptions={[{ value: "featured", label: "FEATURED" }, { value: "gameplay", label: "GAMEPLAY" }, { value: "tutorial", label: "TUTORIAL" }]}
              categoryOptions={[{ value: "gaming", label: "GAMING" }, { value: "education", label: "EDUCATION" }, { value: "entertainment", label: "ENTERTAINMENT" }]}
              locationOptions={[{ value: "youtube", label: "YOUTUBE" }, { value: "shorts", label: "SHORTS" }, { value: "community", label: "COMMUNITY" }]}
              publishDateOptions={[{ value: "2026-10-21", label: "10/21/2026" }, { value: "2026-10-22", label: "10/22/2026" }]}
            />
          </div>
        </div>)}
      </div>
    </Family>
    <ConfirmedStudioValueToggleFamily />
    <ConfirmedStudioCounterFamily />
    <ConfirmedStudioSideCounterFamily />
    <ConfirmedStudioDoubleSplitSliderFamily />
    <ConfirmedStudioLeftWordCounterFamily />
    <ConfirmedStudioDoubleSplitWordCounterFamily />
    <ConfirmedStudioLeftWordSliderFamily />
    <Family
      title="Split Accordion · Train Motion"
      nonDefaultSettings={[
        "Independent single-open accordion with square secondary-color icon rails and primary-color content panels.",
        "Uses buildTri-style staggered width animation with 1000ms segment duration and reduced-motion snapping.",
        "Catalog rows are independently controlled: standard 3 / 4 / 5 / 10, compact 5 / 10, and micro 5 / 10 sections.",
        "Labels clip without ellipsis; train motion is implemented in the primitive rather than a uniform CSS flex transition.",
      ]}
      provenance={<Provenance primitive="StudioSplitAccordion" tsx="src/studio-ui/primitives/StudioSplitAccordion.tsx" css="src/styles/studio-split-accordion.css" tokens="44px / 28px / 12px · secondary icon rails · primary content panels · buildTri staggered train" imports={["src/studio-ui/primitives/StudioSplitAccordion.tsx", "src/styles/studio-split-accordion.css", "src/components/studio-hub/StudioSplitAccordionCatalogSpecimens.tsx"]} />}
    >
      <div className="w-full min-w-0 max-w-none" style={{ width: "100%", minWidth: 0, maxWidth: "none", gridTemplateColumns: "minmax(0, 1fr)" }}>
        <StudioSplitAccordionCatalogSpecimens />
      </div>
    </Family>
    <Family
      title="InterModule · Standard"
      nonDefaultSettings={[
        "Single standard-size representative only; nested category and prompt modules are intentionally documented separately from the top representative strip.",
        "Production intermodule component with collapsible content and inherited palette styling.",
      ]}
      provenance={<Provenance primitive="StudioInterModule" tsx="src/studio-ui/primitives/StudioInterModule.tsx" css="src/styles/studio-control-system.css" tokens="44px standard · shared Studio control tokens · nested module content" imports={["src/studio-ui/primitives/StudioInterModule.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioInterModule">
        <span>INTERMODULE · STANDARD</span>
        <StudioInterModule className="vt-studio-inter-host--bleed" title="PROMPT LIBRARY" startIcon={<Home aria-hidden="true" />} sizeVariant="standard" defaultOpen>
          <p className="vt-confirmed-intermodule-prompt">A standard-size intermodule keeps its content aligned to the shared parent edges.</p>
        </StudioInterModule>
      </div>
    </Family>
    <Family
      title="Collapsing Split Module · Standard + Compact"
      nonDefaultSettings={[
        "Production collapsible split module is catalogued separately from the intermodule and multi-section split accordion.",
        "The top imported-primitive ledger stays limited to one standard-size representative per primitive; size comparisons belong here.",
      ]}
      provenance={<Provenance primitive="StudioCollapsingSplitModule" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="44px standard / 28px compact · shared split-shell geometry." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCollapsingSplitModule">
        <span>44px STANDARD</span>
        <StudioCollapsingSplitModule title="COLLAPSING MODULE" split="double" startIcon={<Info aria-hidden="true" />} sizeVariant="standard" defaultOpen>
          <span>Standard collapsible module body content.</span>
        </StudioCollapsingSplitModule>
      </div>
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCollapsingSplitModule-compact">
        <span>28px COMPACT</span>
        <StudioCollapsingSplitModule title="COMPACT MODULE" split="double" startIcon={<Info aria-hidden="true" />} sizeVariant="compact">
          <span>Compact collapsible module body content.</span>
        </StudioCollapsingSplitModule>
      </div>
    </Family>
    <Family
      title="Collapsing Two-Line Module · Standard"
      nonDefaultSettings={[
        "Dedicated production specimen for the two-line collapsing module; kept separate from the top direct-control ledger and the ordinary collapsing split module.",
        "The title and description are rendered by the canonical StudioCollapsingTwoLineModule primitive.",
      ]}
      provenance={<Provenance primitive="StudioCollapsingTwoLineModule" tsx="src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-control-system.css" tokens="Standard 44px shell with a two-line title/description content exception." imports={["src/studio-ui/primitives/StudioControls.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCollapsingTwoLineModule">
        <span>STANDARD · TWO-LINE HEADER</span>
        <StudioCollapsingTwoLineModule title="CREATOR SETTINGS" description="Channel identity, defaults, and publishing preferences." split="double" sizeVariant="standard" defaultOpen={false}>
          <p>Two-line module body content rendered by the production primitive.</p>
        </StudioCollapsingTwoLineModule>
      </div>
    </Family>
    <Family
      title="Status / navigation · LED badge and tab system"
      nonDefaultSettings={[
        "Borderless metadata/status exception; LED is smaller than the label height and sits before the text.",
        "Dark appearance uses black fill/white text; tinted appearance uses a light tone-matched fill/black text.",
        "Six tones are supported; the ripple is disabled under reduced-motion preferences.",
        "Catalog labels are illustrative only; production status text must come from the owning workflow state.",
      ]}
      provenance={<Provenance primitive="StudioLedBadgeTab · StudioBrainStatusBadge" tsx="src/studio-ui/primitives/StudioLedBadgeTab.tsx + src/studio-ui/primitives/StudioControls.tsx" css="src/styles/studio-led-badge-tab.css + src/styles/studio-control-system.css" tokens="LED diameter 1em · beveled edge · flat joined tab rail · reduced-motion support" imports={["src/studio-ui/primitives/StudioLedBadgeTab.tsx", "src/styles/studio-led-badge-tab.css", "src/components/studio-hub/StudioHubConfirmedPrimitiveCatalog.tsx"]} />}
    >
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioBrainStatusBadge">
        <span>STANDARD · DARK FILL / WHITE TEXT</span>
        <div className="vt-catalog-brain-status-badges__group">
          <StudioBrainStatusBadge label="READY" tone="green" appearance="dark" sizeVariant="standard" />
          <StudioBrainStatusBadge label="THINKING" tone="cyan" appearance="dark" sizeVariant="standard" />
          <StudioBrainStatusBadge label="LEARNING" tone="purple" appearance="dark" sizeVariant="standard" />
        </div>
        <span>STANDARD · MATCHING LIGHT FILL / BLACK TEXT</span>
        <div className="vt-catalog-brain-status-badges__group">
          <StudioBrainStatusBadge label="REVIEW" tone="yellow" appearance="tinted" sizeVariant="standard" />
          <StudioBrainStatusBadge label="BLOCKED" tone="red" appearance="tinted" sizeVariant="standard" />
          <StudioBrainStatusBadge label="SYNCED" tone="blue" appearance="tinted" sizeVariant="standard" />
        </div>
        <span>COMPACT + MICRO</span>
        <div className="vt-catalog-brain-status-badges__group">
          <StudioBrainStatusBadge label="ACTIVE" tone="green" appearance="dark" sizeVariant="compact" />
          <StudioBrainStatusBadge label="QUEUED" tone="cyan" appearance="dark" sizeVariant="compact" />
          <StudioBrainStatusBadge label="PAUSED" tone="yellow" appearance="tinted" sizeVariant="compact" />
          <StudioBrainStatusBadge label="IDLE" tone="purple" appearance="tinted" sizeVariant="micro" />
          <StudioBrainStatusBadge label="ERROR" tone="red" appearance="dark" sizeVariant="micro" />
          <StudioBrainStatusBadge label="SYNC" tone="blue" appearance="tinted" sizeVariant="micro" />
        </div>
      </div>
    </Family>
      <Family title="Calendar Event & Media Rails · Standard Representatives" nonDefaultSettings={[
        "Each specimen below renders the production calendar primitive itself; the component root carries its library identity.",
        "Event chips cover all five semantic kinds, scheduled and in-progress states, selected state, and the canonical removable-badge path.",
        "Media rails cover both 16:9 landscape and 9:16 portrait ratios across left, right, and double rail arrangements.",
        "Calendar state and publish dates remain owned by Projects; these are presentation primitives only.",
      ]} provenance={<Provenance primitive="StudioCalendarEventChip · StudioCalendarMediaRail" tsx="src/studio-ui/primitives/StudioCalendarPrimitives.tsx" css="src/studio-ui/primitives/studio-calendar-primitives.css" tokens="Semantic primary/secondary colors · global Studio stroke/radius/spacing · ratio-based media geometry" imports={["src/studio-ui/primitives/StudioCalendarPrimitives.tsx", "src/studio-ui/primitives/studio-calendar-primitives.css", "src/studio-ui/primitives/StudioControls.tsx"]} />}>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCalendarEventChip">
          <span>EVENT CHIPS · ALL SEMANTIC KINDS + REAL STATUS STATES</span>
          <div className="flex flex-wrap items-center gap-2">
            <StudioCalendarEventChip label="PUBLISH EPISODE" kind="publish" status="scheduled" selected onClick={() => undefined} />
            <StudioCalendarEventChip label="SCRIPT REVIEW" kind="task" status="in progress" />
            <StudioCalendarEventChip label="PROJECT MILESTONE" kind="milestone" status="upcoming" />
            <StudioCalendarEventChip label="CREATOR REMINDER" kind="reminder" status="open" />
            <StudioCalendarEventChip label="SPONSOR DEADLINE" kind="deadline" status="due soon" />
            <StudioCalendarEventChip label="REMOVABLE EVENT" kind="reminder" onRemove={() => undefined} />
          </div>
        </div>
        <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioCalendarMediaRail">
          <span>MEDIA RAILS · 16:9 LANDSCAPE · LEFT / RIGHT / DOUBLE</span>
          <div className="grid grid-cols-1 gap-2">
            <StudioCalendarMediaRail aspectRatio="16:9" split="left" label="Landscape thumbnail with leading event rail" leftLabel="VIDEO" />
            <StudioCalendarMediaRail aspectRatio="16:9" split="right" label="Landscape thumbnail with trailing event rail" rightLabel="PUBLISH" />
            <StudioCalendarMediaRail aspectRatio="16:9" split="double" label="Landscape thumbnail with double event rails" leftLabel="VIDEO" rightLabel="PUBLISH" />
          </div>
        </div>
        <div className="vt-confirmed-variant is-full-row">
          <span>MEDIA RAILS · 9:16 PORTRAIT · LEFT / RIGHT / DOUBLE</span>
          <div className="grid grid-cols-1 gap-2">
            <StudioCalendarMediaRail aspectRatio="9:16" split="left" label="Portrait thumbnail with leading event rail" leftLabel="SHORT" />
            <StudioCalendarMediaRail aspectRatio="9:16" split="right" label="Portrait thumbnail with trailing event rail" rightLabel="SCHEDULE" />
            <StudioCalendarMediaRail aspectRatio="9:16" split="double" label="Portrait thumbnail with double event rails" leftLabel="SHORT" rightLabel="SCHEDULE" />
          </div>
        </div>
      </Family>
      {additionalPrimitiveSections}
    </ConfirmedCatalogFamilyGroups>
  </>
  )
}

const ConfirmedStudioValueToggleFamily: React.FC = () => {
  const [arrowStd, setArrowStd] = React.useState("ONE")
  const [arrowCmp, setArrowCmp] = React.useState("ONE")
  const [sideStd, setSideStd] = React.useState("LOW")
  const [sideLeftCmp, setSideLeftCmp] = React.useState("LOW")
  const [sideCmp, setSideCmp] = React.useState("LOW")
  const [leftValues, setLeftValues] = React.useState(["SOURCE", "SOURCE", "SOURCE", "SOURCE", "SOURCE", "SOURCE"])
  const [rightValues, setRightValues] = React.useState(["TARGET", "TARGET", "TARGET", "TARGET", "TARGET", "TARGET"])
  const [levelStd, setLevelStd] = React.useState(50)
  const [levelCmp, setLevelCmp] = React.useState(50)
  const options = ["ONE", "TWO", "THREE"] as const
  return (
    <Family title="Arrow / Side / Double Side / Bar Toggles" nonDefaultSettings={[
      "All four controls use controlled value/selection APIs and shared Studio size/color tokens.",
      "Arrow Toggle exposes independent label, face fill, text color, icon color, and icon fill settings.",
      "Side Toggle defaults to a right-side arrow stack; the left-side orientation is the explicit alternative.",
      "Double Side Toggle shows V1/V2 divider treatment and primary, secondary, or black right-face states.",
      "Bar Toggle uses ten fixed-width bars (10 percentage points each) and press-and-hold arrow controls.",
    ]} provenance={<Provenance primitive="StudioArrowToggle · StudioSideToggle · StudioDoubleSideToggle · StudioBarToggle" tsx="src/studio-ui/primitives/StudioValueToggles.tsx" css="src/styles/studio-control-system.css" tokens="Studio size lattice · semantic primary/secondary colors · ten 18×38px standard bars" imports={["src/studio-ui/primitives/StudioValueToggles.tsx", "src/styles/studio-control-system.css", "src/studio-ui/primitives/StudioControls.tsx"]} />}>
      <div className="vt-confirmed-variant is-full-row" data-vt-library-component="StudioArrowToggle">
        <span>ARROW TOGGLE · STANDARD</span>
        <StudioArrowToggle value={arrowStd} options={options} onValueChange={setArrowStd} ariaLabel="Arrow toggle specimen" />
        <span>SIDE TOGGLE · DEFAULT RIGHT / V2 LEFT</span>
        <div style={{ display: "grid", gap: 4 }}>
          <StudioSideToggle value={sideStd} options={["LOW", "MID", "HIGH"]} onValueChange={setSideStd} />
          <StudioSideToggle value={sideLeftCmp} options={["LOW", "MID", "HIGH"]} onValueChange={setSideLeftCmp} arrowSide="left" size="compact" />
        </div>
        <span>DOUBLE SIDE TOGGLE · V1 / V2 × THREE RIGHT-FACE APPEARANCES</span>
        <div style={{ display: "grid", gap: 4 }}>
          {([
            { variant: "v1", appearance: "primary", label: "V1 · PRIMARY RIGHT" },
            { variant: "v1", appearance: "secondary", label: "V1 · SECONDARY RIGHT" },
            { variant: "v1", appearance: "black-primary-text", label: "V1 · BLACK / PRIMARY TEXT RIGHT" },
            { variant: "v2", appearance: "primary", label: "V2 · PRIMARY RIGHT" },
            { variant: "v2", appearance: "secondary", label: "V2 · SECONDARY RIGHT" },
            { variant: "v2", appearance: "black-primary-text", label: "V2 · BLACK / PRIMARY TEXT RIGHT" },
          ] as const).map(({ variant, appearance, label }, index) => <div key={variant + "-" + appearance} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 2 }}>
            <small>{label}</small>
            <StudioDoubleSideToggle variant={variant} rightAppearance={appearance}
              size={index === 1 || index === 3 ? "compact" : "standard"}
              left={{ value: leftValues[index], options: ["SOURCE", "INPUT", "ORIGIN"], onValueChange: value => setLeftValues(current => current.map((item, i) => i === index ? value : item)), ariaLabel: "Left side selection " + label }}
              right={{ value: rightValues[index], options: ["TARGET", "OUTPUT", "DESTINATION"], onValueChange: value => setRightValues(current => current.map((item, i) => i === index ? value : item)), ariaLabel: "Right side selection " + label }} />
          </div>)}
        </div>
        <span>BAR TOGGLE · {levelStd}%</span>
        <StudioBarToggle value={levelStd} onValueChange={setLevelStd} ariaLabel="Bar toggle specimen" />
        <span>COMPACT SPECIMENS</span>
        <div style={{ display: "grid", gap: 4 }}>
          <StudioArrowToggle size="compact" value={arrowCmp} options={options} onValueChange={setArrowCmp} />
          <StudioSideToggle size="compact" value={sideCmp} options={["LOW", "MID", "HIGH"]} onValueChange={setSideCmp} />
          <StudioBarToggle size="compact" value={levelCmp} onValueChange={setLevelCmp} />
        </div>
      </div>
    </Family>
  )
}

export default StudioHubConfirmedPrimitiveCatalog
