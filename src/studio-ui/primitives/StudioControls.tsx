import React from "react"
import "../../styles/studio-control-entry.css"
import { getAlphabeticalSpectrumColor } from "../../styles/toolboxPalette"
import { Bell, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Download, Heart as HeartIcon, Minus, Plus, RefreshCw, Settings2, ThumbsUp, Upload } from "lucide-react"
import { STUDIO_CONTROL_SIZE_CONTRACT, STUDIO_DROPDOWN_TOKENS, STUDIO_FOCUS_INTERACTION_TOKENS, type StudioControlSize, type StudioControlInteractiveSize, type StudioIconSizeVariant } from "../tokens"
import { StudioTextInput, StudioInput } from "./StudioTextInput"
import { StudioTextArea } from "./StudioTextArea"

/** Canonical numeric field; shares the same Studio field geometry and tokens as text inputs. */
export const StudioNumberInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & { sizeVariant?: StudioControlSize }
>(({ sizeVariant = "standard", ...props }, ref) => (
  <StudioTextInput {...props} ref={ref} type="number" sizeVariant={sizeVariant} />
));
StudioNumberInput.displayName = "StudioNumberInput";


export type StudioControlTone = "accent" | "neutral" | "danger" | "warning" | "success"

/**
 * Explicit register of intentional departures from the global five-tier Studio size ladder (60 / 44 / 28 / 20 / 12px).
 * Studio control lattice. Exceptions must remain named, source-backed, and
 * represented in the confirmed primitive library instead of being silently
 * normalized by generic control selectors.
 */
export const STUDIO_CONTROL_GLOBAL_RULE_EXCEPTIONS = {
  vaultSpectrumTag: {
    owner: "VaultAssetModule / StudioSpectrumTag",
    globalRuleException: true,
    height: 15,
    borderWidth: 2,
    radius: 4,
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: "0.3px",
    fill: "alphabetical spectrum color mixed at 35% with white",
    textAndBorder: "resolved alphabetical spectrum color",
    colorResolver: "getAlphabeticalSpectrumColor",
    selectedTreatment: "flat selected color treatment; no shadow, glow, or geometry offset",
    rationale: "Asset-module tags are donor-specified dense metadata chips, not ordinary 44px/28px controls.",
  },
  closeableBadge: {
    owner: "StudioCloseableBadge",
    globalRuleException: true,
    height: "20px at every density",
    borderWidth: "0px",
    radius: "999px full pill",
    fontSize: "16px at every density",
    fontWeight: 1000,
    textTransform: "uppercase",
    textColor: "primary pair mixed 50% with white",
    fill: "primary color pair",
    closeControl: "16px circular secondary-pair control with a primary-pair glyph",
    motion: "Close glyph swaps colors, then the badge fades out over 1000ms; reduced-motion disables visual animation",
    rationale: "Historical closeable-tag exception: fixed 20px pill height, no border, 16px heavy type, content width, and explicit close feedback; it does not inherit the five-tier control ladder.",
  },
  tagEditorAction: {
    owner: "StudioTagEditor",
    globalRuleException: true,
    height: 28,
    stroke: 2,
    radius: 4,
    shadow: "none; primitive/component shadow prohibition",
    rationale: "The plus/check actions use the canonical compact 28px square-button size.",
  },
  uploadFrame: {
    owner: "StudioUploadFrame",
    globalRuleException: true,
    geometry: "16:9 canvas at every breakpoint; container-relative quarter strokes and breathing-layer spacing; responsive inset black frame; center image preview scales to 3x and its secondary ring clips slightly at the top/bottom",
    colorPair: "conic perimeter and breathing layers use primary (--pair-a) and secondary (--pair-b) from the active Toolbox pair",
    behavior: "native file picker after a 1s click pulse, drag/drop, left upload and right thumbnail split rails, two-line half-scale prompt, oversized circular image preview, bottom filename badge, hover breathing at 2x speed and extra saturation, disabled state, and reduced-motion support",
    shadowPolicy: "none",
    rationale: "The upload frame is a ratio-based media canvas, not a fixed-height 44px/28px/12px control.",
  },
  verticalWordToggle: {
    owner: "StudioVerticalWordToggle",
    globalRuleException: true,
    height: "content-driven two-word stack; intentionally not fixed to the 60 / 44 / 28 / 20 / 12px control heights",
    typography: "inherits standard/compact/micro Studio text-size, weight, family, case, and letter-spacing tokens",
    stroke: "Supreme 3px (Standard system) / standard 3px / compact 2px / Mini 1.5px / micro 1.5px (Mini system)",
    radius: "Supreme 6px (Standard system) / standard 6px / compact 4px / Mini 3px / micro 3px (Mini system)",
    motion: "vertical expand-and-release handle with a color wipe; word colors switch quickly at animation start; reduced-motion settles immediately",
    rationale: "Two stacked word faces need a content-driven vertical surface; only height departs from the global size lattice.",
  },
  textareaTypography: {
    globalRuleException: true,
    standardFontSize: 18,
    compactFontSize: 14,
    rationale: "Multiline reading/writing surface uses a dedicated type scale while retaining canonical field geometry.",
  },
} as const


/** Global defaults apply to every Studio primitive unless a size-specific override is declared. */
export const STUDIO_COMPONENT_GLOBAL_DEFAULTS = {
  splitSegmentRatio: "icon rails are square (1:1) to the selected size tier; split-left, split-right, and double-split labels share the full component outer-border centerline regardless of rail placement",
  fixedRatioDefaults: {
    toggles: "1:1 square track/face geometry at the selected size tier; thumb is centered on its axis",
    switches: "1:1 square control footprint at the selected size tier; thumb and glyph are centered",
    checkboxes: "1:1 square face at the selected size tier; check glyph centered",
    radioButtons: "1:1 circular face within a square 1:1 footprint; dot centered",
    squareIconButtons: "1:1 square face at the selected size tier; size-tier icon centered",
    circleIconButtons: "1:1 square footprint with circular face; size-tier icon centered",
    badges: "fixed height from the global size lattice; split icon rails are 1:1 squares and centered",
  },
  splitIconRailColor: "secondary (--pair-b) by default; size-tier icon dimensions; centered on both axes",
  badgeTypography: "Inter, font-weight 1000, font-synthesis none; labels centered; no thin-weight inheritance",
  splitDividers: "single split has exactly one shared internal divider; double split has exactly two; dividers use the global border width and are never duplicated on label edges",
  globalSizeLattice: "supreme 60px / 3px border / 6px radius / 52px type and icon; standard 44px / 3px border / 6px radius / 38px type and icon; compact 28px / 2px border / 4px radius / 24px type and icon; mini 20px / 1.5px border / 3px radius / 17.5px type and icon; micro 12px / 1px border / 2px radius / 10px type and icon",
  globalTextWeight: 1000,
  globalTextAlignment: "center for buttons, badges, split labels, and icon faces; single-line text inputs and text areas align left",
  textContainment: "Global rule for all single-line text-bearing Studio primitives: split-left, split-right, and double-split labels center against the full component outer border box, independent of rail placement; use overflow hidden, nowrap, and clip (never ellipsis); never overlap adjacent controls. Multiline textareas are excluded.",
  buttonVariantContract: {
    v1: "primary fill / black text",
    v2: "secondary fill / black text",
    v3: "independent click toggle between V1 and V2",
    v4: "black fill / primary text",
    v5: "V1 initially; toggle to V2 with optional alternate text and/or icon",
    v6: "V1 initially; toggle to black fill / white text with optional alternate text and/or icon",
    v7: "primary fill / white text; split icon rails use secondary fill and white icons",
  },

  width: "full-row by default; data-width=content is an explicit opt-in exception",
  labelAlignment: "centered by default for all primitive labels",
  primaryColor: "--pair-a is the global primary fill",
  secondaryColor: "--pair-b is the global secondary fill and alternate rail",
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  fontWeight: 1000,
  strokeColor: "#000000",
  colorPairSystem: "primary = --pair-a; secondary = --pair-b",
  backgroundFill: "buttons and badges use the global primary/secondary color pair; text inputs and text areas use a 50% white + 50% primary fill by default and an 85% white + 15% primary fill on focus",
  textColor: "editable text fields use primary text and primary glyph stroke at rest, black text and black glyph stroke on focus, with a persistent primary inset; display text boxes always use black text/stroke, primary inset, and secondary outline",
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
  lineHeight: 1,
  shadowPolicy: "Global Studio primitive/component rule: no box-shadow, text-shadow, fake-shadow pseudo-layers, or shadow-based geometry compensation. No CSS transitions or press/hover transforms on primitive/component shells. Text-field borders and focus outlines remain explicit non-shadow strokes. Any future exception requires an approved token-backed contract and an accurate Reference Library entry.",
  squareIconButtonDefaults: {
    geometry: "Square face matching the split-left icon rail: 44px standard / 28px compact; default large icon preset is 38px / 1.9 stroke standard and 24px / 2.0 stroke compact. The current (28px/18px) and moderate (34px/22px) icon presets are opt-in only.",
    v1: "Primary (--pair-a) face fill; no shadow.",
    v2: "Secondary (--pair-b) face fill; no shadow.",
    v3: "Selectable v1/v2 color swap; click toggles the face fill only.",
    v4: "Black face fill with primary (--pair-a) icon stroke.",
    iconPresets: {
      heart: "Heart outline; pair with heart-pop for temporary secondary-color fill and expanding border ripple.",
      bell: "Bell outline; pair with bell-ring for bell rotation, secondary-color alert-dot pop, and border ripple.",
      sunMoon: "Sun icon with Moon alternate face for a persistent selected toggle.",
      lockUnlock: "Lock icon with Unlock alternate face for a persistent selected toggle.",
      downloadCheck: "Download icon with Check alternate face; use download-success and success=true only after completion.",
      refresh: "RefreshCw icon; pair with refresh for activation spin.",
      like: "ThumbsUp icon; pair with like for pop feedback and a live activation count.",
    },
    effects: {
      standard: "No additional motion; shared Studio press, hover, focus and disabled behavior only.",
      notification: "Optional positioned badge; count/status pop and icon shake. Supply badge only when a real count/status exists.",
      popOnActivation: "One-shot inner icon pop; with the heart preset, also briefly fills the heart and emits an expanding secondary-color border ripple.",
      heartPop: "Temporary heart fill, pop, and expanding/fading paired-color border ripple; never persists as selected state.",
      bellRing: "Bell rotates, alert dot pops, and a secondary-color border ripple expands.",
      like: "Live count increments on activation and the icon pops; count badge animates with the update.",
      refresh: "Activation-triggered refresh rotation with a small scale response.",
      sunMoon: "Persistent selected toggle crossfades and rotates between Sun and Moon.",
      lockUnlock: "Persistent selected toggle morphs between Lock and Unlock.",
      downloadSuccess: "Outcome-driven Download-to-Check state; set success only after the operation succeeds.",
      rotatedToggle: "Opt-in inner-stage rotation; outer geometry remains controlled by the selected Studio size tier.",
      flip: "Opt-in two-face 3D flip; provide activeIcon for a meaningful alternate face.",
      tooltip: "Opt-in contextual label revealed on hover/focus; accessible name remains label.",
      morph: "Opt-in icon crossfade/scale/rotation; provide activeIcon for the selected state.",
      success: "Outcome-driven checkmark and optional tooltip label; set success only after confirmed success.",
    },
    motion: "Outer shell geometry stays stationary and flat; approved inner indicators, labels, and icons may animate through studio-control-motion.css and must honor reduced-motion preferences.",
  },
  focusOutline: "Text inputs and text areas use a zero-offset secondary-color outline at 65% of the selected border width; focused text and glyph stroke are black, focus fill is primary at 15%, and focus is communicated by outline, not box-shadow.",
  textFieldDefaults: {
    typography: {
      standardInputFontSize: "38px",
      compactInputFontSize: "24px",
      standardTextAreaFontSize: "18px",
      compactTextAreaFontSize: "14px",
      rule: "Single-line inputs follow global 38px standard / 24px compact typography. Textareas alone use 18px standard / 14px compact, with multiline line-height, padding, and a 92px minimum writing surface.",
    },
    sizeFamily: "Single-line inputs use 51.82px Supreme / 38px standard / 24px compact / 17.5px Mini / 10px Micro typography. Textareas use 24.55px Supreme / 18px standard / 14px compact / 17.5px Mini with multiline line-height, padding, and a 92px minimum surface. Size selects 60/44/28/20/12px geometry, 4.09/3/2/1.5/1px stroke, and 8.18/6/4/3/2px radius where the family supports each tier.",
    defaultMode: {
      textColor: "primary",
      textStrokeColor: "matches text color (primary)",
      fill: "primary at 50% opacity",
      borderStrokeColor: "#000000",
      inlineStrokeColor: "primary at 100% opacity",
      inlineStrokeWidth: "same as global standard/compact/micro border width",
    },
    focusMode: {
      fill: "primary at 15% opacity",
      textColor: "#000000",
      textStrokeColor: "matches text color (#000000)",
      borderStrokeColor: "#000000",
      inlineStrokeColor: "#000000 at 100% opacity",
      outlineStrokeColor: "secondary",
      focusOutlineWidth: "65% of border width: 1.95px standard / 1.3px compact / 0.65px micro",
      focusOutlineOffset: "0px for both sizes",
      outlineStrokeWidth: "65% of the selected border width; secondary color remains at 100% opacity",
    },
    caret: { color: "primary (--pair-a)", style: "native insertion caret; request block shape where supported; never simulate text insertion" },
  },
  motionEasing: "ease-out",
} as const

/** Canonical machine-readable contract; defined once in studio-ui/tokens.ts. */
export const STUDIO_COMPONENT_SIZE_DEFAULTS = STUDIO_CONTROL_SIZE_CONTRACT

const withStudioAttrs = (size: StudioControlSize, tone?: StudioControlTone) => ({
  "data-vt-studio-control": "true",
  "data-size": size,
  ...(tone ? { "data-tone": tone } : {}),
})

export { StudioTextInput, StudioInput }
export type { StudioTextInputProps } from "./StudioTextInput"

export { StudioTextArea }
export type { StudioTextAreaProps, StudioTextAreaSize } from "./StudioTextArea"

/** Read-only display surface that inherits the canonical textarea size tokens. */
export type StudioTextBoxSize = StudioControlSize
export type StudioTextBoxProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "contentEditable" | "dangerouslySetInnerHTML" | "children"
> & {
  /** Plain display text; embedded line breaks are preserved. */
  children?: React.ReactNode
  /** Corresponding textarea typography and surface size. */
  size?: StudioTextBoxSize
}

export const StudioTextBox = React.forwardRef<HTMLDivElement, StudioTextBoxProps>(
  ({ children, size = "standard", className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      contentEditable={false}
      aria-readonly="true"
      className={studioClasses("vt-studio-text-box", className)}
      data-vt-studio-control="true"
      data-vt-studio-text-box="true"
      data-vt-studio-field-kind="textarea-display"
      data-vt-library-component="StudioTextBox"
      data-size={size}
    >
      {children}
    </div>
  ),
)
StudioTextBox.displayName = "StudioTextBox"


const studioClasses = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ")
/** Canonical Studio switch, choice, and word-toggle primitives with token-driven size variants. */
export type StudioControlSkin = "solid" | "color-swap" | "black-indicator" | "white-indicator";
export interface StudioControlButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  skin?: StudioControlSkin;
  checked: boolean;
  shape?: "round" | "rect";
  sizeVariant?: StudioControlSize;
}
const studioSkinClass = (skin: StudioControlSkin) => ({
  "solid": "is-solid",
  "color-swap": "is-color-swap",
  "black-indicator": "is-black-indicator",
  "white-indicator": "is-white-indicator",
}[skin]);
export const Studioswitch: React.FC<StudioControlButtonProps> = ({ skin = "solid", checked, className, shape = "round", sizeVariant = "standard", type = "button", ...props }) => (
  <button type={type} role="switch" aria-checked={checked} data-vt-studio-control="true" data-size={sizeVariant} className={studioClasses("vt-studio-44-switch", `is-${shape}`, studioSkinClass(skin), checked && "is-on", className)} {...props}><span className="vt-studio-44-handle" aria-hidden="true" /></button>
);
export type StudioChoiceKind = "radio" | "checkbox";
export interface StudioChoiceProps extends StudioControlButtonProps { kind: StudioChoiceKind; mark?: "check" | "xwide" }
const STUDIO_RADIO_MOTIONS = ["build", "orbit", "spiral"] as const
type StudioRadioMotion = typeof STUDIO_RADIO_MOTIONS[number]
const StudioRadioMotion: React.FC<{ motion: "build" | "orbit" | "spiral"; direction: "on" | "off"; run: number; checked: boolean; onEmpty: () => void }> = ({ motion, direction, run, checked, onEmpty }) => {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const progressRef = React.useRef(0)

  React.useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const outer = svg.querySelector<SVGCircleElement>(".vt-studio-radio-ring-outer")
    const middle = svg.querySelector<SVGCircleElement>(".vt-studio-radio-ring-inner")
    const core = svg.querySelector<SVGCircleElement>(".vt-studio-radio-core")
    const rings = svg.querySelector<SVGGElement>(".vt-studio-radio-rings")
    const arms = svg.querySelector<SVGGElement>(".vt-studio-radio-spirals")
    const spiralA = svg.querySelector<SVGPathElement>(".vt-studio-radio-spiral-a")
    const spiralB = svg.querySelector<SVGPathElement>(".vt-studio-radio-spiral-b")
    const solid = svg.querySelector<SVGCircleElement>(".vt-studio-radio-solid")
    if (!outer || !middle || !core || !rings || !arms || !spiralA || !spiralB || !solid) return

    const ease = (value: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, value)), 3)
    const opacity = (element: SVGElement, value: number) => element.setAttribute("opacity", String(Math.max(0, Math.min(1, value))))
    const scale = (element: SVGElement, value: number) => element.setAttribute("transform", `translate(22 22) scale(${value}) translate(-22 -22)`)
    const spiralPath = (phase: number) => {
      let path = ""
      for (let i = 0; i <= 180; i += 1) {
        const t = i / 180
        const radius = 2 + 12.5 * t
        const angle = phase + t * Math.PI * 2
        path += (i ? " L " : "M ") + (22 + radius * Math.cos(angle)).toFixed(3) + " " + (22 + radius * Math.sin(angle)).toFixed(3)
      }
      return path
    }
    spiralA.setAttribute("d", spiralPath(0))
    spiralB.setAttribute("d", spiralPath(Math.PI))
    const lengthA = spiralA.getTotalLength()
    const lengthB = spiralB.getTotalLength()
    spiralA.setAttribute("stroke-dasharray", String(lengthA))
    spiralB.setAttribute("stroke-dasharray", String(lengthB))

    const render = (t: number) => {
      ;[outer, middle, core].forEach(element => {
        element.removeAttribute("transform")
        element.removeAttribute("stroke-dasharray")
        opacity(element, 1)
      })
      const merge = ease((t - 0.64) / 0.36)
      opacity(solid, merge)
      scale(solid, 0.24 + 0.76 * merge)
      opacity(rings, motion === "spiral" ? 0 : 1 - merge)
      opacity(arms, motion === "spiral" ? ease(t / 0.12) * (1 - merge) : 0)

      if (motion === "build") {
        scale(core, ease(t / 0.22))
        scale(middle, ease((t - 0.1) / 0.36))
        scale(outer, ease((t - 0.22) / 0.4))
        opacity(core, ease(t / 0.15))
        opacity(middle, ease((t - 0.1) / 0.18))
        opacity(outer, ease((t - 0.22) / 0.18))
      } else if (motion === "orbit") {
        const q = ease(t / 0.78)
        outer.setAttribute("stroke-dasharray", `${23.17 + 23.17 * q} ${23.17 * (1 - q)}`)
        middle.setAttribute("stroke-dasharray", `${12.96 + 12.96 * q} ${12.96 * (1 - q)}`)
        outer.setAttribute("transform", `rotate(${-110 + 220 * q} 22 22)`)
        middle.setAttribute("transform", `rotate(${110 - 220 * q} 22 22)`)
        scale(core, ease(t / 0.22))
        opacity(rings, ease(t / 0.12) * (1 - merge))
      } else {
        const q = ease(t / 0.7)
        spiralA.setAttribute("stroke-dashoffset", String(lengthA * (1 - q)))
        spiralB.setAttribute("stroke-dashoffset", String(lengthB * (1 - ease((t - 0.05) / 0.65))))
        arms.setAttribute("transform", `rotate(${-65 + 200 * q} 22 22)`)
      }

      if (t === 0) {
        opacity(rings, 0)
        opacity(arms, 0)
        opacity(solid, 0)
      }
      if (t === 1) {
        // Match the reference animation: collapse the motion motif into the
        // selected 75%-diameter indicator, leaving no overlapping rings behind.
        opacity(rings, 0)
        opacity(arms, 0)
        opacity(solid, 1)
        scale(solid, 1)
      }
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (run === 0) {
      progressRef.current = checked ? 1 : 0
      render(progressRef.current)
      return
    }

    let frame = 0
    const target = direction === "on" ? 1 : 0
    const from = progressRef.current
    const duration = 1000 * Math.abs(target - from)
    if (reducedMotion.matches || duration === 0) {
      progressRef.current = target
      render(target)
      if (target === 0) onEmpty()
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const fraction = Math.max(0, Math.min(1, (now - start) / duration))
      const progress = from + (target - from) * fraction
      progressRef.current = progress
      render(progress)
      if (fraction < 1) frame = requestAnimationFrame(tick)
      else if (target === 0) onEmpty()
    }
    frame = requestAnimationFrame(tick)
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return
      cancelAnimationFrame(frame)
      progressRef.current = target
      render(target)
      if (target === 0) onEmpty()
    }
    reducedMotion.addEventListener?.("change", onMotionPreferenceChange)
    return () => {
      cancelAnimationFrame(frame)
      reducedMotion.removeEventListener?.("change", onMotionPreferenceChange)
    }
  }, [motion, direction, run, checked, onEmpty])

  return (
    <svg ref={svgRef} className="vt-studio-radio-motion" viewBox="0 0 44 44" aria-hidden="true">
      <g className="vt-studio-radio-rings" opacity="0">
        <circle className="vt-studio-radio-ring vt-studio-radio-ring-outer" cx="22" cy="22" r="14.75" />
        <circle className="vt-studio-radio-ring vt-studio-radio-ring-inner" cx="22" cy="22" r="8.25" />
        <circle className="vt-studio-radio-core" cx="22" cy="22" r="3.75" />
      </g>
      <g className="vt-studio-radio-spirals" opacity="0">
        <path className="vt-studio-radio-spiral vt-studio-radio-spiral-a" d="" />
        <path className="vt-studio-radio-spiral vt-studio-radio-spiral-b" d="" />
      </g>
      <circle className="vt-studio-radio-solid" cx="22" cy="22" r="16.5" opacity="0" />
    </svg>
  )
}

export const StudioChoice: React.FC<StudioChoiceProps> = ({
  kind, mark = "check", skin = "solid", checked, className, shape = "round", sizeVariant = "standard",
  type = "button", onClick, disabled, ...props
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false)
  const [motionIndex, setMotionIndex] = React.useState(0)
  const [activeMotionIndex, setActiveMotionIndex] = React.useState(0)
  const [motionDirection, setMotionDirection] = React.useState<"on" | "off">("on")
  const isChecked = checked ?? uncontrolledChecked
  const [motionRun, setMotionRun] = React.useState(0)
  const [motionAtEmpty, setMotionAtEmpty] = React.useState(true)
  const handleMotionEmpty = React.useCallback(() => setMotionAtEmpty(true), [])
  const handleChoiceClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event)
    if (event.defaultPrevented || disabled) return
    if (kind === "radio") {
      setMotionDirection(isChecked ? "off" : "on")
      if (!isChecked && motionAtEmpty) {
        // Select the next motif only when the previous reverse has fully emptied.
        setActiveMotionIndex(motionIndex)
        setMotionIndex(index => (index + 1) % STUDIO_RADIO_MOTIONS.length)
      }
      setMotionAtEmpty(false)
      setMotionRun(run => run + 1)
    }
    if (checked === undefined) setUncontrolledChecked(value => !value)
  }
  const radioMotion = STUDIO_RADIO_MOTIONS[activeMotionIndex] as StudioRadioMotion
  return (
    <button
      type={type}
      role={kind}
      aria-checked={isChecked}
      data-vt-studio-control="true" 
      data-size={sizeVariant}
      data-radio-motion={kind === "radio" ? radioMotion : undefined}
      data-radio-direction={kind === "radio" ? motionDirection : undefined}
      data-radio-motion-run={kind === "radio" ? motionRun : undefined}
      className={studioClasses("vt-studio-44-choice", `is-${kind}`, `is-${shape}`, `is-${mark}`, studioSkinClass(skin), isChecked && "is-on", className)}
      onClick={handleChoiceClick}
      disabled={disabled}
      {...props}
    >
      {kind === "radio" ? (
        <StudioRadioMotion motion={radioMotion} direction={motionDirection} run={motionRun} checked={isChecked} onEmpty={handleMotionEmpty} />
      ) : (
        <svg viewBox="0 0 50 50" aria-hidden="true">
          {mark === "xwide" ? (
            <>
              <path d="M 10 10 L 40 40" />
              <path d="M 40 10 L 10 40" />
            </>
          ) : <path d="M 7 26 L 19 39 L 43 11" />}
        </svg>
      )}
    </button>
  )
}
export interface StudioWordToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  words?: readonly [string, string];
  size?: "60" | "44" | "28" | "20" | "12";
  skin?: StudioControlSkin;
  /** Optional fixed handle width in CSS pixels; omitted means measure the active word. */
  handleWidth?: number;
  /** Inset between the active word bounds and handle edges; defaults by size. */
  handleInset?: number;
  /** Scale the measured active-handle width when a fixed width is not supplied. */
  handleWidthScale?: number;
  /** Horizontal spacing between the two word labels in CSS pixels. */
  wordGap?: number;
  /** Base orientation; horizontal remains the default. */
  orientation?: "horizontal" | "vertical";
  /** Automatically use the existing vertical variant on mobile portrait. */
  verticalOnMobilePortrait?: boolean;
}
export const Studiotoggle: React.FC<StudioWordToggleProps> = ({ value, onValueChange, words = ["WRITE", "CREATE"], size = "44", skin = "solid", handleWidth, handleInset, handleWidthScale = 1, wordGap = 0, orientation = "horizontal", verticalOnMobilePortrait = false, className, style, ...props }) => {
  const [mobilePortrait, setMobilePortrait] = React.useState(false);
  React.useEffect(() => {
    if (!verticalOnMobilePortrait || typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const sync = () => setMobilePortrait(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, [verticalOnMobilePortrait]);
  const effectiveOrientation = verticalOnMobilePortrait && mobilePortrait ? "vertical" : orientation;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLSpanElement>(null);
  const overlayRef = React.useRef<HTMLSpanElement>(null);
  const wordRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const animationFrameRef = React.useRef(0);
  const busyRef = React.useRef(false);
  const animationTargetRef = React.useRef(value);
  const latestValueRef = React.useRef(value);
  const stepRef = React.useRef(0);
  const [handle, setHandle] = React.useState({ left: 2.75, width: 16 });

  const getBounds = React.useCallback((index: number) => {
    const root = rootRef.current;
    const target = wordRefs.current[index];
    if (!root || !target) return null;
    const rootRect = root.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const inset = handleInset ?? (size === "60" ? 5.5 : size === "28" ? 2 : size === "20" ? 1.5 : size === "12" ? 1 : 2.75);
    const measuredWidth = Math.max(targetRect.width - inset * 2, Number(size) * 0.272727) * handleWidthScale;
    const nextWidth = handleWidth === undefined ? measuredWidth : Math.max(0, handleWidth);
    return {
      left: targetRect.left - rootRect.left - root.clientLeft + (targetRect.width - nextWidth) / 2,
      width: nextWidth,
    };
  }, [handleInset, handleWidth, handleWidthScale, size]);

  const setHandleBounds = React.useCallback((bounds: { left: number; width: number }) => {
    const handleElement = handleRef.current;
    if (!handleElement) return;
    handleElement.style.setProperty("--vt-word-toggle-handle-left", `${bounds.left}px`);
    handleElement.style.setProperty("--vt-word-toggle-handle-width", `${bounds.width}px`);
    setHandle(current => Math.abs(current.left - bounds.left) < .5 && Math.abs(current.width - bounds.width) < .5
      ? current
      : bounds);
  }, []);

  const settle = React.useCallback((nextValue: boolean) => {
    const target = getBounds(nextValue ? 1 : 0);
    if (target) setHandleBounds(target);
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.display = "none";
      overlay.style.clipPath = "";
    }
    const handleElement = handleRef.current;
    if (handleElement) handleElement.style.background = "";
  }, [getBounds, setHandleBounds]);

  const cancelAnimation = React.useCallback((settledValue = value) => {
    if (typeof window !== "undefined") window.cancelAnimationFrame(animationFrameRef.current);
    busyRef.current = false;
    animationTargetRef.current = settledValue;
    latestValueRef.current = settledValue;
    settle(settledValue);
  }, [settle, value]);

  const animateWordToggle = React.useCallback((to: boolean) => {
    if (busyRef.current || to === latestValueRef.current) return;
    const root = rootRef.current;
    const handleElement = handleRef.current;
    const overlay = overlayRef.current;
    const source = getBounds(latestValueRef.current ? 1 : 0);
    const destination = getBounds(to ? 1 : 0);
    if (!root || !handleElement || !overlay || !source || !destination) {
      onValueChange?.(to);
      return;
    }

    const from = latestValueRef.current;
    const velvet = Math.floor(stepRef.current / 2) % 2 === 1;
    const duration = velvet ? 1250 : 1100;
    const reachEnd = velvet ? 0.58 : 0.70;
    const releaseStart = velvet ? 0.72 : 0.84;
    const expandedLeft = Math.min(source.left, destination.left);
    const expandedRight = Math.max(source.left + source.width, destination.left + destination.width);
    const expandedWidth = expandedRight - expandedLeft;
    const skinClass = root.classList;
    const indicatorColor = (active: boolean) => {
      if (skinClass.contains("is-black-indicator")) return "#000";
      if (skinClass.contains("is-white-indicator")) return "#fff";
      if (skinClass.contains("is-color-swap") && active) {
        return "var(--vt-studio-control-accent, var(--pair-a, #36e0f6))";
      }
      return "var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b))";
    };
    const fromColor = indicatorColor(from);
    const toColor = indicatorColor(to);
    const blendColors = (a: string, b: string, progress: number) => {
      if (a === b) return a;
      const toRgb = (color: string) => {
        const probe = document.createElement("span");
        probe.style.color = color;
        root.appendChild(probe);
        const resolved = getComputedStyle(probe).color;
        probe.remove();
        const channels = resolved.match(/[\\d.]+/g);
        return channels ? channels.slice(0, 3).map(Number) : null;
      };
      const first = toRgb(a);
      const second = toRgb(b);
      if (!first || !second) return progress < 1 ? a : b;
      return `rgb(${first.map((channel, index) => Math.round(channel + (second[index] - channel) * progress)).join(" ")})`;
    };

    stepRef.current += 1;
    busyRef.current = true;
    animationTargetRef.current = to;
    root.dataset.motion = velvet ? "Velvet Release" : "Late Silk";
    overlay.style.display = velvet ? "block" : "none";
    overlay.style.background = toColor;
    overlay.style.clipPath = "";
    handleElement.style.background = fromColor;
    onValueChange?.(to);

    const reducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      busyRef.current = false;
      latestValueRef.current = to;
      settle(to);
      return;
    }

    const started = performance.now();
    const clamp = (number: number) => Math.max(0, Math.min(1, number));
    const mix = (a: number, b: number, progress: number) => a + (b - a) * progress;
    const smooth = (number: number) => {
      const t = clamp(number);
      return t * t * (3 - 2 * t);
    };
    const easeOut = (number: number) => 1 - Math.pow(1 - clamp(number), 3);
    const easeInOut = (number: number) => {
      const t = clamp(number);
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const tick = (now: number) => {
      const t = clamp((now - started) / duration);
      const reach = (velvet ? easeOut : smooth)(t / reachEnd);
      const release = (velvet ? smooth : easeInOut)((t - releaseStart) / (1 - releaseStart));
      const left = t < releaseStart
        ? mix(source.left, expandedLeft, reach)
        : mix(expandedLeft, destination.left, release);
      const width = t < releaseStart
        ? mix(source.width, expandedWidth, reach)
        : mix(expandedWidth, destination.width, release);
      handleElement.style.setProperty("--vt-word-toggle-handle-left", `${left}px`);
      handleElement.style.setProperty("--vt-word-toggle-handle-width", `${width}px`);

      if (velvet) {
        handleElement.style.background = fromColor;
        const wipe = smooth((t - 0.80) / 0.20);
        overlay.style.clipPath = to && !from
          ? `inset(0 0 0 ${(1 - wipe) * 100}%)`
          : `inset(0 ${(1 - wipe) * 100}% 0 0)`;
      } else if (skinClass.contains("is-color-swap")) {
        handleElement.style.background = blendColors(fromColor, toColor, smooth((t - 0.92) / 0.08));
      } else {
        handleElement.style.background = fromColor;
      }

      if (t < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        busyRef.current = false;
        latestValueRef.current = to;
        settle(to);
      }
    };
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [getBounds, onValueChange, settle]);

  React.useEffect(() => {
    let frame = 0;
    const measure = () => {
      if (busyRef.current) return;
      const target = getBounds(value ? 1 : 0);
      if (target) setHandleBounds(target);
    };
    const schedule = () => {
      if (typeof window !== "undefined") {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(measure);
      } else measure();
    };
    latestValueRef.current = value;
    if (!busyRef.current) animationTargetRef.current = value;
    schedule();
    const root = rootRef.current;
    const observer = typeof ResizeObserver !== "undefined" && root ? new ResizeObserver(schedule) : null;
    if (root) observer?.observe(root);
    wordRefs.current.forEach(node => { if (node) observer?.observe(node); });
    const handleResize = () => {
      if (busyRef.current) cancelAnimation(value);
      schedule();
    };
    if (typeof window !== "undefined") window.addEventListener("resize", handleResize);
    const reducedMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    const handleMotionChange = () => { if (busyRef.current) cancelAnimation(value); };
    reducedMotion?.addEventListener?.("change", handleMotionChange);
    if (typeof document !== "undefined") document.fonts?.ready?.then(schedule);
    return () => {
      if (typeof window !== "undefined") {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", handleResize);
      }
      reducedMotion?.removeEventListener?.("change", handleMotionChange);
      observer?.disconnect();
    };
  }, [value, words, size, handleWidth, handleInset, handleWidthScale, getBounds, setHandleBounds, cancelAnimation]);

  if (effectiveOrientation === "vertical") {
    return (
      <StudioVerticalWordToggle
        value={value}
        onValueChange={onValueChange}
        words={words}
        sizeVariant={verticalOnMobilePortrait ? "compact" : size === "28" ? "compact" : "standard"}
        variant={skin === "white-indicator" ? "white-fill" : skin === "black-indicator" ? "black-fill" : "primary-secondary"}
        className={className}
        style={{
          ...style,
          ...(skin === "black-indicator" ? { background: "#000", borderColor: "#000" } : {}),
        }}
        aria-label={typeof props["aria-label"] === "string" ? props["aria-label"] : undefined}
      />
    );
  }

  return <div ref={rootRef} role="group" data-vt-studio-control="true" data-vt-studio-width="content" data-size={size === "60" ? "supreme" : size === "28" ? "compact" : size === "20" ? "mini" : size === "12" ? "micro" : "standard"} data-vt-word-toggle-size={size} className={studioClasses("vt-studio-44-word-toggle", `is-size-${size}`, studioSkinClass(skin), className)} style={{ ...style, "--vt-word-toggle-handle-inset": `${handleInset ?? (size === "60" ? 5.5 : size === "28" ? 2 : size === "20" ? 1.5 : size === "12" ? 1 : 2.75)}px`, "--vt-word-toggle-handle-width-scale": handleWidthScale, "--vt-word-toggle-word-gap": `${wordGap}px`, "--vt-word-toggle-handle-left": `${handle.left}px`, "--vt-word-toggle-handle-width": `${handle.width}px` } as React.CSSProperties} {...props}>
    <span ref={handleRef} className="vt-studio-44-word-handle" aria-hidden="true" style={{ "--vt-word-toggle-handle-left": `${handle.left}px`, "--vt-word-toggle-handle-width": `${handle.width}px` } as React.CSSProperties} data-active={value ? "true" : "false"}>
      <span ref={overlayRef} className="vt-studio-44-word-handle-color" aria-hidden="true" />
    </span>
    {words.map((word, index) => <button key={index} ref={node => { wordRefs.current[index] = node }} type="button" aria-pressed={value === (index === 1)} className={value === (index === 1) ? "is-active" : ""} onClick={() => animateWordToggle(index === 1)}>{word}</button>)}
  </div>;
};



export type StudioVerticalWordToggleVariant = "primary-secondary" | "black-fill" | "primary-white-handle" | "white-fill";
export interface StudioVerticalWordToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  words?: readonly [string, string];
  sizeVariant?: StudioControlSize;
  variant?: StudioVerticalWordToggleVariant;
}
export const StudioVerticalWordToggle: React.FC<StudioVerticalWordToggleProps> = ({
  value,
  onValueChange,
  words = ["WRITE", "CREATE"],
  sizeVariant = "compact",
  variant = "primary-secondary",
  className,
  style,
  onClick,
  onKeyDown,
  disabled,
  "aria-label": ariaLabel,
  ...props
}) => {
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const handleRef = React.useRef<HTMLSpanElement>(null);
  const overlayRef = React.useRef<HTMLSpanElement>(null);
  const wordRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = React.useRef(0);
  const busyRef = React.useRef(false);
  const latestValueRef = React.useRef(value);
  const stepRef = React.useRef(0);

  const getBounds = React.useCallback((index: number) => {
    const root = rootRef.current;
    const word = wordRefs.current[index];
    if (!root || !word) return null;
    const rootRect = root.getBoundingClientRect();
    const wordRect = word.getBoundingClientRect();
    // Mirror the horizontal word-toggle handle: exact word-block bounds with no
    // line-height fudge. Side insets stay in CSS, so the handle's corner radius
    // and edge spacing align evenly on all four sides of the module.
    return { top: wordRect.top - rootRect.top - root.clientTop, height: wordRect.height };
  }, []);

  const settle = React.useCallback((nextValue: boolean) => {
    const bounds = getBounds(nextValue ? 1 : 0);
    const handle = handleRef.current;
    const overlay = overlayRef.current;
    const root = rootRef.current;
    if (root) root.dataset.value = String(nextValue);
    if (bounds && handle) {
      // The base stylesheet sets both block edges for the resting handle.
      // Release the bottom edge whenever JS owns measured top/height, so it cannot
      // compete with the selected row's position during settle.
      handle.style.bottom = "auto";
      handle.style.insetBlockEnd = "auto";
      handle.style.top = String(bounds.top) + "px";
      handle.style.height = String(bounds.height) + "px";
      handle.style.background = "";
    }
    if (overlay) {
      overlay.style.display = "none";
      overlay.style.opacity = "";
      overlay.style.clipPath = "";
      overlay.style.background = "";
    }
  }, [getBounds]);

  const cancelAnimation = React.useCallback(() => {
    if (typeof window !== "undefined") window.cancelAnimationFrame(frameRef.current);
    busyRef.current = false;
    settle(latestValueRef.current);
  }, [settle]);

  const animateToggle = React.useCallback((to: boolean) => {
    const from = latestValueRef.current;
    if (busyRef.current || to === from || disabled) return;
    const root = rootRef.current;
    const handle = handleRef.current;
    const overlay = overlayRef.current;
    const source = getBounds(from ? 1 : 0);
    const destination = getBounds(to ? 1 : 0);
    if (!root || !handle || !overlay || !source || !destination) {
      latestValueRef.current = to;
      onValueChange?.(to);
      return;
    }

    const colorFor = (state: boolean) => {
      if (variant === "primary-white-handle") return state ? "#ffffff" : "#000000";
      if (variant === "white-fill" || variant === "black-fill") return "#000000";
      return state
        ? "var(--vt-studio-control-secondary, var(--pair-b, #f276c5))"
        : "var(--vt-studio-control-accent, var(--pair-a, #20f13e))";
    };
    const fromColor = colorFor(from);
    const toColor = colorFor(to);
    const expandedTop = Math.min(source.top, destination.top);
    const expandedBottom = Math.max(source.top + source.height, destination.top + destination.height);
    const expandedHeight = expandedBottom - expandedTop;
    const velvet = Math.floor(stepRef.current / 2) % 2 === 1;
    const duration = velvet ? 1250 : 1100;
    const reachEnd = velvet ? 0.58 : 0.70;
    const releaseStart = velvet ? 0.72 : 0.84;

    // Keep CSS variant state in lockstep with the optimistic target, not the next React render.
    latestValueRef.current = to;
    root.dataset.value = String(to);
    stepRef.current += 1;
    busyRef.current = true;
    root.dataset.motion = velvet ? "Velvet Release" : "Late Silk";
    handle.style.background = fromColor;
    overlay.style.background = toColor;
    overlay.style.display = "block";
    overlay.style.opacity = velvet ? "1" : "0";
    overlay.style.clipPath = velvet ? "inset(100% 0 0 0)" : "none";
    onValueChange?.(to);

    const reducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      busyRef.current = false;
      settle(to);
      return;
    }

    const clamp = (number: number) => Math.max(0, Math.min(1, number));
    const mix = (a: number, b: number, progress: number) => a + (b - a) * progress;
    const smooth = (number: number) => { const t = clamp(number); return t * t * (3 - 2 * t); };
    const easeOut = (number: number) => 1 - Math.pow(1 - clamp(number), 3);
    const easeInOut = (number: number) => {
      const t = clamp(number);
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const started = performance.now();

    const tick = (now: number) => {
      const t = clamp((now - started) / duration);
      const reach = (velvet ? easeOut : smooth)(t / reachEnd);
      const release = (velvet ? smooth : easeInOut)((t - releaseStart) / (1 - releaseStart));
      const top = t < releaseStart
        ? mix(source.top, expandedTop, reach)
        : mix(expandedTop, destination.top, release);
      const height = t < releaseStart
        ? mix(source.height, expandedHeight, reach)
        : mix(expandedHeight, destination.height, release);
      handle.style.bottom = "auto";
      handle.style.insetBlockEnd = "auto";
      handle.style.top = String(top) + "px";
      handle.style.height = String(height) + "px";
      if (velvet) {
        handle.style.background = fromColor;
        const wipe = smooth((t - 0.80) / 0.20);
        overlay.style.clipPath = to
          ? "inset(" + String((1 - wipe) * 100) + "% 0 0 0)"
          : "inset(0 0 " + String((1 - wipe) * 100) + "% 0)";
      } else {
        overlay.style.opacity = String(smooth((t - 0.92) / 0.08));
      }
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        busyRef.current = false;
        settle(to);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [disabled, getBounds, onValueChange, settle, variant]);

  React.useEffect(() => {
    if (busyRef.current) return;
    latestValueRef.current = value;
    const schedule = () => {
      if (busyRef.current) return;
      const target = getBounds(value ? 1 : 0);
      const handle = handleRef.current;
      if (target && handle) {
        handle.style.top = String(target.top) + "px";
        handle.style.height = String(target.height) + "px";
      }
    };
    let frame = 0;
    const queue = () => {
      if (typeof window !== "undefined") {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(schedule);
      } else schedule();
    };
    queue();
    const root = rootRef.current;
    const observer = typeof ResizeObserver !== "undefined" && root ? new ResizeObserver(queue) : null;
    if (root) observer?.observe(root);
    wordRefs.current.forEach(word => { if (word) observer?.observe(word); });
    if (typeof window !== "undefined") window.addEventListener("resize", queue);
    const reducedMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    reducedMotion?.addEventListener?.("change", cancelAnimation);
    if (typeof document !== "undefined") document.fonts?.ready?.then(queue);
    return () => {
      if (typeof window !== "undefined") {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", queue);
      }
      reducedMotion?.removeEventListener?.("change", cancelAnimation);
      observer?.disconnect();
    };
  }, [value, words, sizeVariant, getBounds, cancelAnimation]);

  React.useEffect(() => () => {
    if (typeof window !== "undefined") window.cancelAnimationFrame(frameRef.current);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    animateToggle(!latestValueRef.current);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      animateToggle(true);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      animateToggle(false);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      animateToggle(!latestValueRef.current);
    }
  };

  return (
    <button
      ref={rootRef}
      type="button"
      role="switch"
      aria-checked={value}
      disabled={disabled}
      aria-label={ariaLabel ?? words[0] + " / " + words[1]}
      data-vt-studio-control="true"
      data-vt-studio-vertical-word-toggle="true" data-vt-studio-width="content"
      data-vertical-word-toggle-variant={variant}
      data-size={sizeVariant}
      data-value={String(value)}
      className={studioClasses("vt-studio-vertical-word-toggle", "is-" + sizeVariant, "is-" + variant, className)}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span ref={handleRef} className="vt-studio-vertical-word-toggle__handle" aria-hidden="true">
        <span ref={overlayRef} className="vt-studio-vertical-word-toggle__handle-color" aria-hidden="true" />
      </span>
      {words.map((word, index) => (
        <span
          key={String(index) + "-" + word}
          ref={node => { wordRefs.current[index] = node; }}
          className={"vt-studio-vertical-word-toggle__word" + (value === (index === 1) ? " is-active" : "")}
          data-word-index={index}
        >
          {word}
        </span>
      ))}
    </button>
  );
};
StudioVerticalWordToggle.displayName = "StudioVerticalWordToggle";


export const Studioradio: React.FC<Omit<StudioChoiceProps, "kind" | "mark">> = props => <StudioChoice {...props} kind="radio" />
Studioradio.displayName = "Studioradio"
export const Studiocheck: React.FC<Omit<StudioChoiceProps, "kind" | "mark">> = props => <StudioChoice {...props} kind="checkbox" mark="check" />
Studiocheck.displayName = "Studiocheck"
export const Studioxbox: React.FC<Omit<StudioChoiceProps, "kind" | "mark">> = props => <StudioChoice {...props} kind="checkbox" mark="xwide" />
Studioxbox.displayName = "Studioxbox"
export const Studioarea = StudioTextArea

/** Canonical public names; lowercase legacy exports remain compatibility aliases. */
export const StudioSwitch = Studioswitch
export const StudioWordToggle = Studiotoggle
export const StudioRadio = Studioradio
export const StudioCheckbox = Studiocheck
export const StudioXCheckbox = Studioxbox

export type StudioButtonVariant = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7"

export interface StudioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Global visual/interaction variant shared by all StudioButton consumers. */
  variant?: StudioButtonVariant
  /** Keep nested split-shell anatomy intact; ordinary labels use a constrained text slot. */
  faceLayout?: "label" | "split"
  /** Alternate label/content for V5 and V6 when toggled on. */
  activeChildren?: React.ReactNode
  /** Optional leading icon; activeIcon replaces it when V5/V6 is toggled on. */
  icon?: React.ReactNode
  activeIcon?: React.ReactNode
  /** Initial local toggle state for V3, V5 and V6; every instance owns independent state. */
  defaultOn?: boolean
  onVariantChange?: (on: boolean) => void
  /** StudioButton supports all five canonical tiers where its content/layout variant permits them. */
  sizeVariant?: StudioControlSize
  tone?: StudioControlTone
  loading?: boolean
  selected?: boolean
  /** Explicit geometry variant for Supreme 60px, Standard 44px, and Compact 28px button geometry. */
  heightVariant?: "60" | "44" | "28" | "20" | "12"
  /** Layout variant owned by StudioButton; geometry and behavior remain canonical. */
  textLayout?: "single-line" | "two-line"
  /** First row for the two-line text layout variant. */
  firstLine?: React.ReactNode
  /** Second row for the two-line text layout variant. */
  secondLine?: React.ReactNode
}

export const StudioButton = React.forwardRef<HTMLButtonElement, StudioButtonProps>(
  (
    {
      variant = "v1",
      faceLayout = "label",
      activeChildren,
      icon,
      activeIcon,
      defaultOn = false,
      onVariantChange,
      onClick,
      sizeVariant,
      tone = "accent",
      loading = false,
      selected = false,
      heightVariant,
      textLayout = "single-line",
      firstLine,
      secondLine,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [localOn, setLocalOn] = React.useState(defaultOn)
    const isToggleVariant = variant === "v3" || variant === "v5" || variant === "v6"
    const isOn = isToggleVariant && localOn
    // Height is the authoritative geometry when supplied. This prevents a 28px
    // control from accidentally inheriting standard border/radius tokens.
    const resolvedSize = heightVariant
      ? heightVariant === "60" ? "supreme" : heightVariant === "28" ? "compact" : heightVariant === "20" ? "mini" : heightVariant === "12" ? "micro" : "standard"
      : sizeVariant ?? "standard"
    const resolvedHeight = heightVariant ?? (resolvedSize === "supreme" ? "60" : resolvedSize === "compact" ? "28" : resolvedSize === "mini" ? "20" : resolvedSize === "micro" ? "12" : "44")
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
      onClick?.(event)
      if (event.defaultPrevented || event.currentTarget.disabled || !isToggleVariant) return
      const next = !localOn
      setLocalOn(next)
      onVariantChange?.(next)
    }
    const visibleChildren = (variant === "v5" || variant === "v6") && isOn && activeChildren !== undefined
      ? activeChildren
      : children
    const visibleIcon = (variant === "v5" || variant === "v6") && isOn && activeIcon !== undefined
      ? activeIcon
      : icon

    return (
      <button
        ref={ref}
        type={type}
        {...props}
        {...withStudioAttrs(resolvedSize, tone)}
        data-vt-studio-button="true"
        data-vt-studio-button-variant={variant}
        data-vt-studio-button-on={isOn ? "true" : "false"}
        data-vt-studio-button-lines={textLayout === "two-line" ? "two" : undefined}
        data-height-variant={resolvedHeight}
        data-selected={selected || undefined}
        aria-pressed={props["aria-pressed"] ?? (isToggleVariant ? isOn : selected || undefined)}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        onClick={handleClick}
      >
        <span data-vt-studio-button-face>
          {visibleIcon !== undefined && <span data-vt-studio-button-icon>{visibleIcon}</span>}
          {faceLayout === "split" ? visibleChildren : (
            <span data-vt-studio-button-label>
              {textLayout === "two-line" ? (
                <>
                  <span data-vt-studio-button-line="first">{firstLine}</span>
                  <span data-vt-studio-button-line="second">{secondLine}</span>
                </>
              ) : visibleChildren}
            </span>
          )}
        </span>
      </button>
    )
  },
)
StudioButton.displayName = "StudioButton"

/** Backwards-compatible named wrapper; the actual layout variant belongs to StudioButton. */
export interface StudioTwoLineButtonProps extends Omit<StudioButtonProps, "children" | "textLayout" | "firstLine" | "secondLine"> {
  firstLine: React.ReactNode
  secondLine: React.ReactNode
}

export const StudioTwoLineButton = React.forwardRef<HTMLButtonElement, StudioTwoLineButtonProps>(
  ({ firstLine, secondLine, sizeVariant = "standard", ...props }, ref) => (
    <StudioButton
      {...props}
      ref={ref}
      sizeVariant={sizeVariant}
      textLayout="two-line"
      firstLine={firstLine}
      secondLine={secondLine}
    />
  ),
)
StudioTwoLineButton.displayName = "StudioTwoLineButton"

/** Split-left action button with a stacked two-line label inside the flexible face. */
export interface StudioSplitTwoLineButtonProps extends Omit<StudioButtonProps, "children" | "faceLayout" | "textLayout" | "firstLine" | "secondLine" | "icon" | "sizeVariant"> {
  icon: React.ReactNode
  firstLine: React.ReactNode
  secondLine: React.ReactNode
  /** Split rail icon sizing uses the shared Studio size-tier presets. */
  iconSizeVariant?: StudioIconSizeVariant
  sizeVariant?: Extract<StudioControlSize, "standard" | "compact">
}

export const StudioSplitTwoLineButton = React.forwardRef<HTMLButtonElement, StudioSplitTwoLineButtonProps>(
  ({ icon, firstLine, secondLine, sizeVariant = "standard", iconSizeVariant = "large", className, ...props }, ref) => (
    <StudioButton
      {...props}
      ref={ref}
      className={studioClasses("vt-studio-split-two-line-button", className)}
      sizeVariant={sizeVariant}
      faceLayout="split"
      textLayout="two-line"
      data-vt-studio-split="left"
      data-split-left="true"
      data-icon-size-variant={iconSizeVariant}
      data-vt-library-component="StudioSplitTwoLineButton"
    >
      <StudioSplitShell layout="left" sizeVariant={sizeVariant} iconLeft={icon} faceOnly>
        <span data-vt-studio-button-label>
          <span data-vt-studio-button-line="first">{firstLine}</span>
          <span data-vt-studio-button-line="second">{secondLine}</span>
        </span>
      </StudioSplitShell>
    </StudioButton>
  ),
)
StudioSplitTwoLineButton.displayName = "StudioSplitTwoLineButton"


/**
 * Prominent workflow action button defaults to Supreme and supports Standard and Compact variants.
 */
export interface StudioActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sizeVariant?: StudioControlInteractiveSize
  tone?: StudioControlTone
  loading?: boolean
}

export const StudioActionButton = React.forwardRef<HTMLButtonElement, StudioActionButtonProps>(
  ({ sizeVariant = "supreme", tone = "accent", loading = false, disabled, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      {...props}
      {...withStudioAttrs(sizeVariant, tone)}
      data-vt-studio-action-button="true"
      data-tone={tone}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
    >
      <span data-vt-studio-action-face>{children}</span>
    </button>
  ),
)
StudioActionButton.displayName = "StudioActionButton"

export interface StudioIconButtonProps extends Omit<StudioButtonProps, "children"> {
  icon: React.ReactNode
  label: string
}

export const StudioIconButton = React.forwardRef<HTMLButtonElement, StudioIconButtonProps>(
  ({ icon, label, ...props }, ref) => (
    <StudioButton ref={ref} aria-label={label} data-icon-only="true" {...props}>
      <span aria-hidden="true" data-vt-studio-button-icon>{icon}</span>
    </StudioButton>
  ),
)
StudioIconButton.displayName = "StudioIconButton"


export type StudioSquareIconButtonVariant = "v1" | "v2" | "v3" | "v4"
export type StudioSquareIconPreset = "heart" | "bell" | "sun-moon" | "lock-unlock" | "download-check" | "refresh" | "like"

export type StudioSquareIconButtonEffect =
  | "standard"
  | "notification"
  | "pop-on-activation"
  | "heart-pop"
  | "bell-ring"
  | "like"
  | "unlock"
  | "download"
  | "rotated-toggle"
  | "sun-moon"
  | "lock-unlock"
  | "download-success"
  | "refresh"
  | "flip"
  | "tooltip"
  | "morph"
  | "success"

export interface StudioSquareIconButtonProps extends Omit<StudioButtonProps, "children" | "selected"> {
  /** Visual comparison preset; outer button geometry is unchanged. */
  iconSizeVariant?: StudioIconSizeVariant
  /** Canonical feature icon pair; removes the need for placeholder glyphs. */
  iconPreset?: StudioSquareIconPreset
  /** Custom icon override. If omitted, iconPreset supplies the icon automatically. */
  icon?: React.ReactNode
  label: string
  /** v1: primary fill / secondary shadow; v2: secondary fill / primary shadow;
   * v3: click-to-toggle between v1 and v2; v4: black fill / primary icon. */
  variant?: StudioSquareIconButtonVariant
  /** Optional interaction effect. Defaults to standard; visual skin remains controlled by variant. */
  effect?: StudioSquareIconButtonEffect
  /** Alternate icon used by flip/morph effects; for success effect, defaults to a checkmark. */
  activeIcon?: React.ReactNode
  /** Notification count or short status. Omit to hide the badge. */
  badge?: number | string
  /** Floating contextual label; also becomes a supplementary description when supplied. */
  tooltip?: string
  /** Outcome-driven success state. Set true only after the associated operation succeeds. */
  success?: boolean
  /** Replay the small pop feedback when activated; false by default. */
  animate?: boolean
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
}

/** Sun and moon share the same 6.5-unit circular radius and center. */
const StudioSunGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-vt-sun-moon-glyph="sun">
    <circle cx="12" cy="12" r="6.5" data-vt-sun-moon-disc="true" />
    <path d="M12 2v1.5M12 20.5V22M2 12h1.5M20.5 12H22M4.93 4.93 6 6M18 18l1.07 1.07M19.07 4.93 18 6M6 18l-1.07 1.07" />
  </svg>
)
const StudioMoonGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-vt-sun-moon-glyph="moon">
    <path d="M16.3 7.2A6.5 6.5 0 1 0 16.3 16.8A4.8 4.8 0 0 1 16.3 7.2Z" data-vt-sun-moon-disc="true" />
  </svg>
)
/** The lock body never morphs. Only the separate shackle group rotates when unlocked. */
const StudioLockUnlockGlyph = ({ unlocked = false }: { unlocked?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-vt-lock-unlock-glyph="true">
    <path d="M5 10h14v11H5z" data-vt-lock-body="true" />
    <g data-vt-lock-shackle="true" data-unlocked={unlocked ? "true" : "false"} className={unlocked ? "is-unlocked" : undefined}>
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </g>
  </svg>
)
/** Canonical icon pair mapping; feature presets use consistent Lucide SVGs rather than placeholder glyphs. */
const getStudioSquarePresetIcons = (preset?: StudioSquareIconPreset): { icon: React.ReactNode; activeIcon?: React.ReactNode } | undefined => {
  switch (preset) {
    case "heart": return { icon: <HeartIcon />, activeIcon: <HeartIcon /> }
    case "bell": return { icon: <Bell />, activeIcon: <Bell /> }
    case "sun-moon": return { icon: <StudioSunGlyph />, activeIcon: <StudioMoonGlyph /> }
    case "download-check": return { icon: <Download />, activeIcon: <Check /> }
    case "refresh": return { icon: <RefreshCw /> }
    case "like": return { icon: <ThumbsUp />, activeIcon: <ThumbsUp /> }
    default: return undefined
  }
}

/** Canonical square icon primitive. Visual skins (V1–V4) and interaction effects are orthogonal. */
export const StudioSquareIconButton = React.forwardRef<HTMLButtonElement, StudioSquareIconButtonProps>(
  ({
    icon, iconPreset, label, variant = "v1", effect = "standard", iconSizeVariant = "large", activeIcon, badge, tooltip, success = false, animate = false,
    sizeVariant = "standard", selected, defaultSelected = false, onSelectedChange, onClick, className,
    disabled, ...props
  }, ref) => {
    const presetIcons = getStudioSquarePresetIcons(iconPreset)
    const resolvedIcon = icon ?? presetIcons?.icon ?? <Plus />
    const resolvedActiveIcon = activeIcon ?? presetIcons?.activeIcon
    const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected)
    const [animationKey, setAnimationKey] = React.useState(0)
    const [liveCount, setLiveCount] = React.useState(typeof badge === "number" ? badge : 0)
    React.useEffect(() => { if (typeof badge === "number") setLiveCount(badge) }, [badge])
    const counterEnabled = effect === "like" || (effect === "notification" && typeof badge === "number")
    const effectiveBadge: number | string | undefined = counterEnabled ? liveCount : badge
    const badgeValue = effectiveBadge === undefined || effectiveBadge === null || effectiveBadge === "" ? null : String(effectiveBadge)
    const previousBadgeValue = React.useRef(badgeValue)
    React.useEffect(() => {
      if (previousBadgeValue.current !== badgeValue) setAnimationKey(key => key + 1)
      previousBadgeValue.current = badgeValue
    }, [badgeValue])
    const selectable = variant === "v3" || effect === "rotated-toggle" || effect === "flip" || effect === "morph" || effect === "unlock" || effect === "download" || effect === "sun-moon" || effect === "lock-unlock"
    const isSelected = selectable ? (selected ?? uncontrolledSelected) : false
    const isSuccess = (effect === "success" || effect === "download-success") && success
    const effectClass = effect === "standard" ? (animate ? "is-effect-pop" : undefined) : `is-effect-${effect}`
    const replayOnActivation = animate || ["notification", "pop-on-activation", "heart-pop", "bell-ring", "like", "refresh"].includes(effect)
    const tooltipId = React.useId()
    const successStatusId = React.useId()
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
      // Disabled controls must not dispatch actions or state/animation changes,
      // including when an event is dispatched programmatically in a test or wrapper.
      if (event.currentTarget.disabled) return
      onClick?.(event)
      if (event.defaultPrevented) return
      if (replayOnActivation) setAnimationKey(key => key + 1)
      if (counterEnabled) setLiveCount(count => count + 1)
      if (!selectable) return
      const next = !isSelected
      if (selected === undefined) setUncontrolledSelected(next)
      onSelectedChange?.(next)
    }
    const fallbackCheck = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg>
    )
    const iconNode = effect === "success" && isSuccess ? (resolvedActiveIcon ?? fallbackCheck) : resolvedIcon
    const alternateNode = resolvedActiveIcon ?? resolvedIcon
    const describedBy = [
      props["aria-describedby"],
      effect === "tooltip" && tooltip ? tooltipId : undefined,
      isSuccess && tooltip ? successStatusId : undefined,
    ].filter(Boolean).join(" ") || undefined
    return (
      <StudioButton
        ref={ref}
        {...props}
        className={studioClasses("vt-studio-square-icon-button", effectClass, className)}
        disabled={disabled}
        sizeVariant={sizeVariant}
        aria-label={effect === "notification" && badge !== undefined && badge !== null && badge !== "" ? `${label}, ${effectiveBadge}` : label}
        aria-describedby={describedBy}
        aria-pressed={selectable ? isSelected : undefined}
        selected={selectable && isSelected}
        data-vt-studio-icon-button="true"
        data-icon-size-variant={iconSizeVariant}
        data-control-size={sizeVariant}
        data-icon-variant={variant}
        data-icon-effect={effect}
        data-icon-preset={iconPreset}
        data-icon-only="true"
        data-icon-active={isSelected || isSuccess || animate ? "true" : "false"}
        data-pop={replayOnActivation && animationKey > 0 ? "true" : undefined}
        data-success={isSuccess ? "true" : undefined}
        data-has-badge={badgeValue !== null ? "true" : undefined}
        data-notification-pulse={(effect === "notification" || effect === "bell-ring" || effect === "like") && (effect === "bell-ring" || badgeValue !== null) && animationKey > 0 ? "true" : undefined}
        onClick={handleClick}
      >
        <span aria-hidden="true" data-vt-studio-button-icon data-vt-square-icon-stage>
          {effect === "lock-unlock" ? (
            <span data-vt-square-icon-current><StudioLockUnlockGlyph unlocked={isSelected} /></span>
          ) : effect === "flip" ? (
            <span data-vt-square-flip-inner>
              <span data-vt-square-flip-face="front">{resolvedIcon}</span>
              <span data-vt-square-flip-face="back">{alternateNode}</span>
            </span>
          ) : effect === "morph" || effect === "rotated-toggle" || effect === "unlock" || effect === "download" || effect === "sun-moon" || effect === "download-success" ? (
            <span data-vt-square-morph-inner>
              <span data-vt-square-morph-face="front">{resolvedIcon}</span>
              <span data-vt-square-morph-face="back">{alternateNode}</span>
            </span>
          ) : (
            <span key={`${effect}:${animationKey}:${effect === "notification" || effect === "like" ? String(effectiveBadge ?? "") : ""}`} data-vt-square-icon-current>{iconNode}</span>
          )}
        </span>
        {effect === "bell-ring" ? <span data-vt-square-alert-dot aria-hidden="true" /> : null}
        {(effect === "notification" || effect === "like") && effectiveBadge !== undefined && effectiveBadge !== null && effectiveBadge !== "" ? (
          <span key={`${String(effectiveBadge)}:${animationKey}`} data-vt-square-badge aria-hidden="true">{effectiveBadge}</span>
        ) : null}
        {effect === "tooltip" && tooltip ? (
          <span id={tooltipId} role="tooltip" data-vt-square-tooltip>{tooltip}</span>
        ) : null}
        {(effect === "success" || effect === "download-success") && isSuccess && tooltip ? (
          <span id={successStatusId} role="status" aria-live="polite" aria-atomic="true" data-vt-square-success-label>{tooltip}</span>
        ) : null}
      </StudioButton>
    )
  },
)
StudioSquareIconButton.displayName = "StudioSquareIconButton"

export interface StudioSplitLeftButtonProps extends StudioButtonProps {
  /** Visual comparison preset; outer button geometry is unchanged. */
  iconSizeVariant?: StudioIconSizeVariant
  icon: React.ReactNode
}

/** Shared split anatomy for left, right, and double-split controls.
 * Buttons render only face contents; badges and composite fields render the shell. */
type StudioSplitLayout = "left" | "right" | "double"
type StudioDataAttributeProps = {
  [key: `data-${string}`]: string | undefined
}
export interface StudioSplitShellProps {
  layout: StudioSplitLayout
  sizeVariant?: StudioControlSize
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children?: React.ReactNode
  faceOnly?: boolean
  fieldSlot?: boolean
  className?: string
  labelClassName?: string
  railClassName?: string
  railProps?: React.HTMLAttributes<HTMLSpanElement> & StudioDataAttributeProps
  leftRailClassName?: string
  rightRailClassName?: string
  leftRailProps?: React.HTMLAttributes<HTMLSpanElement> & StudioDataAttributeProps
  rightRailProps?: React.HTMLAttributes<HTMLSpanElement> & StudioDataAttributeProps
  leftRailContent?: React.ReactNode
  rightRailContent?: React.ReactNode
  shellProps?: React.HTMLAttributes<HTMLSpanElement> & StudioDataAttributeProps
}
export const StudioSplitShell: React.FC<StudioSplitShellProps> = ({
  layout, sizeVariant = "standard", iconLeft, iconRight, children,
  faceOnly = false, fieldSlot = false, className, labelClassName, railClassName, railProps,
  leftRailClassName, rightRailClassName, leftRailProps, rightRailProps,
  leftRailContent, rightRailContent, shellProps,
}) => {
  const content = (
    <>
      {layout !== "right" && <span {...railProps} {...leftRailProps} aria-hidden={leftRailContent !== undefined ? undefined : "true"} data-vt-studio-split-rail data-rail="start" className={[railClassName, leftRailClassName].filter(Boolean).join(" ")}>{leftRailContent ?? iconLeft}</span>}
      {fieldSlot
        ? <span data-vt-studio-split-field>{children}</span>
        : <span data-vt-studio-split-label className={labelClassName}>{children}</span>}
      {layout !== "left" && <span {...railProps} {...rightRailProps} aria-hidden={rightRailContent !== undefined ? undefined : "true"} data-vt-studio-split-rail data-rail="end" className={[railClassName, rightRailClassName].filter(Boolean).join(" ")}>{rightRailContent ?? iconRight}</span>}
    </>
  )
  if (faceOnly) return <span data-vt-studio-split-face="true" data-vt-studio-split={layout} data-size={sizeVariant} className="vt-studio-split-face">{content}</span>
  return (
    <span {...shellProps} data-vt-studio-control="true" data-vt-studio-split-shell="true" data-vt-studio-split={layout}
      data-size={sizeVariant} className={studioClasses("vt-studio-split-shell", className)}>
      {content}
    </span>
  )
}

export const StudioSplitLeftButton = React.forwardRef<HTMLButtonElement, StudioSplitLeftButtonProps>(
  ({ icon, children, sizeVariant = "standard", iconSizeVariant = "large", ...props }, ref) => (
    <StudioButton ref={ref} sizeVariant={sizeVariant} faceLayout="split" data-split-left="true" data-vt-studio-split="left" data-icon-size-variant={iconSizeVariant} data-vt-library-component="StudioSplitLeftButton" {...props}>
      <StudioSplitShell layout="left" sizeVariant={sizeVariant} iconLeft={icon} faceOnly>{children}</StudioSplitShell>
    </StudioButton>
  ),
)
StudioSplitLeftButton.displayName = "StudioSplitLeftButton"

/** Double split button rebuilt around the same face/rail geometry as the confirmed split-left button and split badges. */
export interface StudioDoubleSplitButtonProps extends Omit<StudioButtonProps, "faceLayout" | "children" | "icon"> {
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
  children?: React.ReactNode
  iconSizeVariant?: StudioIconSizeVariant
}
export const StudioDoubleSplitButton = React.forwardRef<HTMLButtonElement, StudioDoubleSplitButtonProps>(
  ({ leftIcon, rightIcon, children, sizeVariant = "standard", iconSizeVariant = "large", className, ...props }, ref) => (
    <StudioButton ref={ref} sizeVariant={sizeVariant} faceLayout="split"
      className={studioClasses("vt-studio-double-split-button", className)}
      data-vt-studio-split="double" data-icon-size-variant={iconSizeVariant}
      data-vt-library-component="StudioDoubleSplitButton" {...props}>
      <span data-vt-studio-split-face="true" data-vt-studio-split="double" data-size={sizeVariant} className="vt-studio-split-face">
        <span data-vt-studio-split-rail data-rail="start" aria-hidden="true">{leftIcon}</span>
        <span data-vt-studio-split-label>{children}</span>
        <span data-vt-studio-split-rail data-rail="end" aria-hidden="true">{rightIcon}</span>
      </span>
    </StudioButton>
  ),
)
StudioDoubleSplitButton.displayName = "StudioDoubleSplitButton"

/** Right split button rebuilt as a flexible label plus one full-height right rail. */
export interface StudioSplitRightButtonProps extends StudioButtonProps {
  /** Icon rendered in the square right rail. */
  icon: React.ReactNode
  iconSizeVariant?: StudioIconSizeVariant
}
export const StudioSplitRightButton = React.forwardRef<HTMLButtonElement, StudioSplitRightButtonProps>(
  ({ icon, children, sizeVariant = "standard", iconSizeVariant = "large", className, ...props }, ref) => (
    <StudioButton ref={ref} sizeVariant={sizeVariant} faceLayout="split"
      className={studioClasses("vt-studio-split-right-button", className)}
      data-split-right="true" data-vt-studio-split="right" data-icon-size-variant={iconSizeVariant}
      data-vt-library-component="StudioSplitRightButton" {...props}>
      <span data-vt-studio-split-face="true" data-vt-studio-split="right" data-size={sizeVariant} className="vt-studio-split-face">
        <span data-vt-studio-split-label>{children}</span>
        <span data-vt-studio-split-rail data-rail="end" aria-hidden="true">{icon}</span>
      </span>
    </StudioButton>
  ),
)
StudioSplitRightButton.displayName = "StudioSplitRightButton"


/** Circular shape variant of the canonical square icon button. All icon sizing,
 * palette, selection, effects, focus and disabled behavior remain shared. */
export type StudioCircleIconButtonProps = StudioSquareIconButtonProps

export const StudioCircleIconButton = React.forwardRef<HTMLButtonElement, StudioCircleIconButtonProps>(
  ({ className, ...props }, ref) => (
    <StudioSquareIconButton
      ref={ref}
      {...props}
      className={studioClasses("vt-studio-circle-icon-button", className)}
      data-vt-studio-circle-icon-button="true"
    />
  ),
)
/** Shared-shell horizontal rail for joined square icon actions. */
export type StudioSquareIconButtonGroupSize = StudioControlInteractiveSize

export interface StudioSquareIconButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Two or more square icon button faces, preferably StudioSquareIconButton. */
  children?: React.ReactNode
  sizeVariant?: StudioSquareIconButtonGroupSize
  /** Accessible name for the action toolbar. */
  "aria-label"?: string
}

export const StudioSquareIconButtonGroup = React.forwardRef<HTMLDivElement, StudioSquareIconButtonGroupProps>(
  ({ children, sizeVariant = "standard", className, "aria-label": ariaLabel = "Actions", ...rest }, ref) => {
    const [selectedDefaultIndex, setSelectedDefaultIndex] = React.useState(-1)
    const suppliedItems = React.Children.toArray(children).filter(Boolean)
    const items = suppliedItems.length ? suppliedItems : [
      { icon: <Bell />, label: "Notifications" },
      { icon: <HeartIcon />, label: "Favorites" },
      { icon: <Plus />, label: "Add" },
      { icon: <RefreshCw />, label: "Refresh" },
      { icon: <Settings2 />, label: "Settings" },
    ].map((item, index) => (
      <StudioSquareIconButton
        key={item.label}
        icon={item.icon}
        label={item.label}
        variant="v3"
        selected={selectedDefaultIndex === index}
        onSelectedChange={selected => setSelectedDefaultIndex(selected ? index : -1)}
        sizeVariant={sizeVariant}
      />
    ))

    return (
      <div
        {...rest}
        ref={ref}
        role="toolbar"
        aria-label={ariaLabel}
        data-vt-studio-control="true"
        data-vt-studio-icon-button-group="true"
        data-size={sizeVariant}
        className={studioClasses("vt-studio-square-icon-button-group", className)}
      >
        {items}
      </div>
    )
  },
)
StudioSquareIconButtonGroup.displayName = "StudioSquareIconButtonGroup"


export type StudioTopSplitModuleSplit = "left" | "right" | "double" | "none"
export type StudioTopSplitModuleSize = StudioControlSize

export interface StudioTopSplitModuleProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode
  children?: React.ReactNode
  split?: StudioTopSplitModuleSplit
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  sizeVariant?: StudioTopSplitModuleSize
  tone?: "default" | "accent"
  as?: "section" | "article" | "div"
}

/** A Studio split-control header joined to a white content body. */
export const StudioTopSplitModule: React.FC<StudioTopSplitModuleProps> = ({
  title,
  children,
  split = "none",
  startIcon,
  endIcon,
  sizeVariant = "compact",
  tone = "default",
  as: Comp = "section",
  className,
  ...rest
}) => {
  const headSplit = split === "none" ? "none" : split
  return (
    <Comp
      data-vt-studio-control="true"
      data-vt-studio-top-split-module="true"
      data-size={sizeVariant}
      data-tone={tone}
      className={studioClasses("vt-studio-top-split-module", className)}
      {...rest}
    >
      <div
        className="vt-studio-top-split-module__head"
        data-split={headSplit}
        style={split === "none" ? { display: "flex", alignItems: "center", paddingInline: 8 } : undefined}
      >
        {(split === "left" || split === "double") ? (
          <span className="vt-studio-top-split-module__rail" data-rail="start" aria-hidden="true">{startIcon}</span>
        ) : null}
        <span className="vt-studio-top-split-module__title">{title}</span>
        {(split === "right" || split === "double") ? (
          <span className="vt-studio-top-split-module__rail" data-rail="end" aria-hidden="true">{endIcon}</span>
        ) : null}
      </div>
      {children != null ? <div className="vt-studio-top-split-module__body">{children}</div> : null}
    </Comp>
  )
}
StudioTopSplitModule.displayName = "StudioTopSplitModule"

/** Collapsible counterpart to StudioTopSplitModule; native details/summary keeps keyboard behavior. */
export interface StudioCollapsingSplitModuleProps extends Omit<React.HTMLAttributes<HTMLDetailsElement>, "title" | "onToggle"> {
  title: React.ReactNode
  children?: React.ReactNode
  split?: StudioTopSplitModuleSplit
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  sizeVariant?: StudioTopSplitModuleSize
  tone?: "default" | "accent"
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const StudioCollapsingSplitModule: React.FC<StudioCollapsingSplitModuleProps> = ({
  title, children, split = "double", startIcon, endIcon, sizeVariant = "compact",
  tone = "default", defaultOpen = false, open, onOpenChange, className, ...rest
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen
  const headSplit = split === "none" ? "none" : split
  return (
    <details
      {...rest}
      open={isOpen}
      data-vt-studio-control="true"
      data-vt-studio-collapsing-split-module="true"
      data-size={sizeVariant}
      data-tone={tone}
      className={studioClasses("vt-studio-top-split-module", "vt-studio-collapsing-split-module", className)}
      onToggle={event => {
        const nextOpen = event.currentTarget.open
        if (open === undefined) setInternalOpen(nextOpen)
        onOpenChange?.(nextOpen)
      }}
    >
      <summary
        className="vt-studio-top-split-module__head vt-studio-collapsing-split-module__head"
        data-split={headSplit}
      >
        {(split === "left" || split === "double") ? (
          <span className="vt-studio-top-split-module__rail" data-rail="start" aria-hidden="true">{startIcon}</span>
        ) : null}
        <span className="vt-studio-top-split-module__title">{title}</span>
        {(split === "right" || split === "double") ? (
          <span className="vt-studio-top-split-module__rail" data-rail="end" aria-hidden="true">{endIcon ?? <ChevronDown aria-hidden="true" />}</span>
        ) : (
          <span className="vt-studio-collapsing-split-module__disclosure" aria-hidden="true"><ChevronDown /></span>
        )}
      </summary>
      {children != null && isOpen ? <div className="vt-studio-top-split-module__body">{children}</div> : null}
    </details>
  )
}
StudioCollapsingSplitModule.displayName = "StudioCollapsingSplitModule"

/** Collapsible module with a compact, readable title + description header. */
export interface StudioCollapsingTwoLineModuleProps extends Omit<StudioCollapsingSplitModuleProps, "title"> {
  title: React.ReactNode
  description: React.ReactNode
}

/** Two-line header composition that reuses the canonical collapsible split module shell. */
export const StudioCollapsingTwoLineModule: React.FC<StudioCollapsingTwoLineModuleProps> = ({
  title, description, className, ...props
}) => (
  <StudioCollapsingSplitModule
    {...props}
    title={(
      <span className="vt-studio-two-line-module__content">
        <span className="vt-studio-two-line-module__title">{title}</span>
        <span className="vt-studio-two-line-module__description">{description}</span>
      </span>
    )}
    className={studioClasses("vt-studio-two-line-module", className)}
    data-vt-studio-two-line-module="true"
  />
)
StudioCollapsingTwoLineModule.displayName = "StudioCollapsingTwoLineModule"




StudioCircleIconButton.displayName = "StudioCircleIconButton"


export interface StudioPlayPauseButtonProps extends Omit<StudioSplitLeftButtonProps, "icon" | "children" | "selected"> {
  /** True while playing; omit to use the internal toggle state. */
  playing?: boolean
  defaultPlaying?: boolean
  onPlayingChange?: (playing: boolean) => void
  playLabel?: string
  pauseLabel?: string
  playIcon?: React.ReactNode
  pauseIcon?: React.ReactNode
}

/** Stateful split-left action. The two labels are measured in the same grid cell
 * so the label region does not resize when Play changes to Pause. */
export const StudioPlayPauseButton = React.forwardRef<HTMLButtonElement, StudioPlayPauseButtonProps>(
  ({
    playing,
    defaultPlaying = false,
    onPlayingChange,
    playLabel = "Play",
    pauseLabel = "Pause",
    playIcon,
    pauseIcon,
    onClick,
    disabled,
    className,
    sizeVariant = "standard",
    ...props
  }, ref) => {
    const [uncontrolledPlaying, setUncontrolledPlaying] = React.useState(defaultPlaying)
    const isPlaying = playing ?? uncontrolledPlaying
    const resolvedPlayIcon = playIcon ?? (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" stroke="none" /></svg>
    )
    const resolvedPauseIcon = pauseIcon ?? (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14M17 5v14" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
    )
    const activeLabel = isPlaying ? pauseLabel : playLabel
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
      onClick?.(event)
      if (event.defaultPrevented || event.currentTarget.disabled) return
      const next = !isPlaying
      if (playing === undefined) setUncontrolledPlaying(next)
      onPlayingChange?.(next)
    }
    return (
      <StudioSplitLeftButton
        ref={ref}
        {...props}
        className={studioClasses("vt-studio-play-pause-button", className)}
        data-vt-studio-play-pause="true"
        sizeVariant={sizeVariant}
        icon={isPlaying ? resolvedPauseIcon : resolvedPlayIcon}
        aria-label={activeLabel}
        aria-pressed={isPlaying}
        selected={isPlaying}
        disabled={disabled}
        onClick={handleClick}
      >
        <span data-vt-studio-play-pause-label-grid>
          <span data-vt-studio-play-pause-label>{activeLabel}</span>
          <span data-vt-studio-play-pause-measure="play" aria-hidden="true">{playLabel}</span>
          <span data-vt-studio-play-pause-measure="pause" aria-hidden="true">{pauseLabel}</span>
        </span>
      </StudioSplitLeftButton>
    )
  },
)
StudioPlayPauseButton.displayName = "StudioPlayPauseButton"


export interface StudioLegendMultiDropdownOption {
  value: string
  label: string
  disabled?: boolean
}

export interface StudioLegendMultiDropdownProps {
  label: React.ReactNode
  /** Accessible plain-text name when the visible label is rich React content. */
  accessibleLabel?: string
  options: StudioLegendMultiDropdownOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  /** Commit one option and close, or allow independent multiple selection. */
  selectionMode?: "single" | "multiple"
  sizeVariant?: StudioControlInteractiveSize
  level?: "l0" | "l1" | "l2"
  placeholder?: string
  clearLabel?: string
  maxMenuHeight?: number
  className?: string
  disabled?: boolean
  name?: string
}

/**
 * Canonical implementation of component-library 09/V2 "Legend Multi".
 * Uses the module's pair-A trigger/panel and pair-B floating legend/actions;
 * selection is multi-valued and never depends on a native browser menu.
 */
export const StudioLegendMultiDropdown: React.FC<StudioLegendMultiDropdownProps> = ({
  label, accessibleLabel, options, value, defaultValue = [], onChange, selectionMode = "multiple", sizeVariant = "standard",
  level = "l1", placeholder = "ANY", clearLabel = "CLEAR ALL",
  maxMenuHeight = 280, className, disabled = false, name,
}) => {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const selected = value ?? uncontrolled
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()
  const setSelected = (next: string[]) => {
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
  }
  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])
  const selectedLabels = options.filter(option => selected.includes(option.value)).map(option => option.label)
  const extra = selectedLabels.length - 1
  const menuAccessibleLabel = accessibleLabel ?? (typeof label === "string" || typeof label === "number" ? String(label) : "Filter options")
  return (
    <div
      ref={rootRef}
      data-vt-primitive-id="140"
      data-vt-studio-field="legend-multi-dropdown"
      data-vt-studio-control-family="dropdown"
      data-vt-studio-dropdown-variant={selectionMode === "single" ? "single-select" : "multiselect"}
      data-vt-control-level={level}
      data-size={sizeVariant}
      data-open={open || undefined}
      className={["vt-studio-legend-multi", className].filter(Boolean).join(" ")}
    >
      <div className="vt-studio-legend-anchor">
        <span className="vt-studio-legend-label">{label}</span>
        <button
          type="button"
          className="vt-studio-legend-trigger"
          data-vt-studio-control="true"
          data-size={sizeVariant}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          disabled={disabled}
          onClick={() => setOpen(current => !current)}
        >
          <span className="vt-studio-legend-trigger-text">
            {selectedLabels.length === 0 ? (
              placeholder
            ) : (
              <>
                <span className="vt-studio-legend-trigger-label">{selectedLabels[0]}</span>
                {extra > 0 ? (
                  <span className="vt-studio-legend-count-badge" aria-label={`${extra} more selected`}>
                    +{extra}
                  </span>
                ) : null}
              </>
            )}
          </span>
          <svg className="vt-studio-legend-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>
      {open && !disabled && (
        <div className="vt-studio-legend-menu" style={{ maxHeight: maxMenuHeight }} id={listId} role="listbox" aria-label={menuAccessibleLabel} aria-multiselectable={selectionMode === "multiple"}>
          <div className="vt-studio-legend-options">
            {options.map(option => {
              const isSelected = selected.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  data-selected={isSelected || undefined}
                  className="vt-studio-legend-option"
                  onClick={() => {
                    if (selectionMode === "single") {
                      setSelected([option.value])
                      setOpen(false)
                      return
                    }
                    setSelected(isSelected ? selected.filter(item => item !== option.value) : [...selected, option.value])
                  }}
                >
                  <span className="vt-studio-legend-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span>
                  <span className="vt-studio-legend-option-text">{option.label}</span>
                </button>
              )
            })}
          </div>
          {selectionMode === "multiple" && <button type="button" className="vt-studio-legend-clear" onClick={() => setSelected([])} disabled={selected.length === 0}>{clearLabel}</button>}
          {name && selected.map(item => <input key={item} type="hidden" name={name} value={item} />)}
        </div>
      )}
    </div>
  )
}
StudioLegendMultiDropdown.displayName = "StudioLegendMultiDropdown"


export interface StudioSpectrumTagProps {
  label: string
  /** Preserve spectrum identity when the visible label includes an action prefix/suffix. */
  spectrumKey?: string
  selected?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  ariaLabel?: string
}

/**
 * Vault's donor-backed 15px monochromatic tag. Static tags render as spans so
 * they can safely sit inside accessible parent buttons; interactive tags keep
 * native button semantics. The alphabetic spectrum and chip geometry are shared.
 */
export const StudioSpectrumTag: React.FC<StudioSpectrumTagProps> = ({
  label,
  spectrumKey,
  selected = false,
  className,
  onClick,
  ariaLabel,
}) => {
  const normalized = label.trim().toUpperCase()
  const identity = (spectrumKey ?? label).trim().toUpperCase()
  const color = getAlphabeticalSpectrumColor(identity)
  const classes = ["vt-studio-spectrum-tag", selected && "is-selected", className].filter(Boolean).join(" ")
  const style = { ["--vt-spectrum-tag-color" as string]: color } as React.CSSProperties
  if (!onClick) {
    return (
      <span
        className={classes}
        data-vt-studio-exception="vault-spectrum-tag"
        data-tag={identity}
        style={style}
      >
        {normalized}
      </span>
    )
  }
  return (
    <button
      type="button"
      className={classes}
      data-vt-studio-exception="vault-spectrum-tag"
      data-tag={identity}
      aria-label={ariaLabel ?? normalized}
      aria-pressed={selected}
      style={style}
      onClick={onClick}
    >
      {normalized}
    </button>
  )
}
StudioSpectrumTag.displayName = "StudioSpectrumTag"


// Canonical dropdown family: single-select variants share the same trigger/menu implementation.
export interface StudioDropdownOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface StudioDropdownProps {
  value?: string
  defaultValue?: string
  options: StudioDropdownOption[]
  onChange?: (value: string) => void
  placeholder?: React.ReactNode
  disabled?: boolean
  connectionMessage?: React.ReactNode
  className?: string
  id?: string
  ariaLabel?: string
  sizeVariant?: StudioControlInteractiveSize
  variant?: "default" | "simple" | "split-left"
  splitIcon?: React.ReactNode
}

export const StudioDropdown: React.FC<StudioDropdownProps> = ({
  value,
  defaultValue,
  options,
  onChange,
  placeholder = "Select",
  disabled = false,
  connectionMessage,
  className = "",
  id,
  ariaLabel,
  sizeVariant = "standard",
  variant = "default",
  splitIcon = <Settings2 aria-hidden="true" focusable="false" />,
}) => {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue
  const enabledOptions = options.filter((option) => !option.disabled)
  const selected = options.find((option) => option.value === currentValue)

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  const selectValue = (next: string) => {
    if (!controlled) setInternalValue(next)
    onChange?.(next)
    setOpen(false)
  }

  const moveActive = (direction: 1 | -1) => {
    if (!enabledOptions.length) return
    const currentEnabledIndex = enabledOptions.findIndex((option) => option.value === options[activeIndex]?.value)
    const nextEnabledIndex = currentEnabledIndex < 0
      ? direction === 1 ? 0 : enabledOptions.length - 1
      : (currentEnabledIndex + direction + enabledOptions.length) % enabledOptions.length
    const option = enabledOptions[nextEnabledIndex]
    setActiveIndex(options.findIndex((candidate) => candidate.value === option.value))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      if (!open) setOpen(true)
      moveActive(event.key === "ArrowDown" ? 1 : -1)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        const selectedIndex = options.findIndex((option) => option.value === currentValue && !option.disabled)
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled))
      } else if (activeIndex >= 0 && !options[activeIndex]?.disabled) {
        selectValue(options[activeIndex].value)
      }
    } else if (event.key === "Escape") {
      setOpen(false)
    } else if (event.key === "Home" && open) {
      event.preventDefault()
      setActiveIndex(options.findIndex((option) => !option.disabled))
    } else if (event.key === "End" && open) {
      event.preventDefault()
      const reversed = [...options].reverse().findIndex((option) => !option.disabled)
      if (reversed >= 0) setActiveIndex(options.length - 1 - reversed)
    }
  }

  return (
    <div ref={rootRef} className={`vt-studio-dropdown ${variant === "simple" ? "is-simple" : ""} ${variant === "split-left" ? "is-split-left" : ""} ${className}`} data-vt-studio-dropdown data-vt-studio-control-family="dropdown" data-vt-studio-dropdown-variant={variant} data-size={sizeVariant} data-open={open ? "true" : "false"}>
      <button
        id={id}
        type="button"
        data-vt-studio-control="true"
        data-size={sizeVariant}
        data-dropdown-trigger="true"
        data-vt-studio-split={variant === "split-left" ? "left" : undefined}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id ? `${id}-listbox` : undefined}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        {variant === "split-left" ? (
          <StudioSplitShell
            layout="double"
            sizeVariant={sizeVariant}
            iconLeft={splitIcon}
            iconRight={
              <ChevronDown
                size={STUDIO_DROPDOWN_TOKENS.chevronSize[sizeVariant]}
                strokeWidth={STUDIO_DROPDOWN_TOKENS.chevronStroke[sizeVariant]}
              />
            }
            faceOnly
            railClassName="vt-studio-dropdown-split-rail"
            leftRailProps={{ "aria-hidden": true }}
            rightRailClassName="vt-studio-dropdown-chevron is-trailing"
            rightRailProps={{ "data-vt-studio-dropdown-chevron": "true", "aria-hidden": true }}
          >
            {connectionMessage ?? selected?.label ?? placeholder}
          </StudioSplitShell>
        ) : (
          <>
            <span data-vt-studio-dropdown-value>{connectionMessage ?? selected?.label ?? placeholder}</span>
            <span className="vt-studio-dropdown-chevron is-trailing" data-vt-studio-dropdown-chevron aria-hidden="true">
              <ChevronDown
                size={STUDIO_DROPDOWN_TOKENS.chevronSize[sizeVariant]}
                strokeWidth={STUDIO_DROPDOWN_TOKENS.chevronStroke[sizeVariant]}
              />
            </span>
          </>
        )}
      </button>
      {open && !disabled ? (
        <div id={id ? `${id}-listbox` : undefined} role="listbox" className="vt-studio-dropdown-menu" data-size={sizeVariant} aria-label={ariaLabel}>
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === currentValue}
              disabled={option.disabled}
              className="vt-studio-dropdown-option"
              data-vt-studio-dropdown-split-option={variant === "split-left" ? "true" : undefined}
              data-active={index === activeIndex || undefined}
              data-selected={option.value === currentValue || undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectValue(option.value)}
            >
              {variant === "split-left" ? (
                <>
                  <span className="vt-studio-dropdown-option-rail vt-studio-dropdown-option-rail--start" aria-hidden="true">
                    {splitIcon}
                  </span>
                  <span className="vt-studio-dropdown-option-label">{option.label}</span>
                </>
              ) : option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** Single-select dropdown with a secondary icon rail on the left and a trailing chevron rail. */
export interface StudioSimpleDropdownOption { value: string; label: string; disabled?: boolean }
export interface StudioSimpleDropdownProps {
  value?: string
  defaultValue?: string
  options: StudioSimpleDropdownOption[]
  onChange?: (value: string) => void
  placeholder?: React.ReactNode
  disabled?: boolean
  className?: string
  id?: string
  ariaLabel?: string
  sizeVariant?: StudioControlInteractiveSize
}

/** Simple single-select child variant of the canonical StudioDropdown family. */
export const StudioSimpleDropdown: React.FC<StudioSimpleDropdownProps> = ({ options, ...props }) => (
  <StudioDropdown {...props} options={options} variant="simple" />
)
StudioSimpleDropdown.displayName = "StudioSimpleDropdown"

export const StudioSplitLeftDropdown: React.FC<Omit<StudioDropdownProps, "variant">> = (props) => (
  <StudioDropdown {...props} variant="split-left" />
)
StudioSplitLeftDropdown.displayName = "StudioSplitLeftDropdown"

// Canonical Studio stepper implementations are owned by this module.
/** Shared hold-repeat timing.
 * Starts at 150ms (slower than the prior 128ms), reaches 23ms in 520ms
 * with one continuous ease-out curve, and smoothsteps to 75ms within the
 * final three steps after beginning boundary easing 16 steps from the bound. */
export const getStudioCounterRepeatDelay = (elapsedMs: number, remainingSteps: number) => {
  const accelerationProgress = Math.min(1, Math.max(0, elapsedMs / 520));
  const accelerationEase = 1 - Math.pow(1 - accelerationProgress, 2.2);
  const accelerationDelay = 150 - accelerationEase * 127;
  const boundaryProgress = Number.isFinite(remainingSteps)
    ? Math.min(1, Math.max(0, (16 - remainingSteps) / 13))
    : 0;
  const boundaryEase = boundaryProgress * boundaryProgress * (3 - 2 * boundaryProgress);
  const boundaryDelay = 23 + boundaryEase * 52;
  return Math.round(Math.max(accelerationDelay, boundaryDelay));
};

/** Shared in-use dwell: active immediately, then remains active until the shared hold expires. */
function useStudioInteractionFocus(holdMs = STUDIO_FOCUS_INTERACTION_TOKENS.holdMs) {
  const [active, setActive] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const pulse = React.useCallback(() => {
    setActive(true);
    clear();
    timer.current = setTimeout(() => { setActive(false); timer.current = null; }, holdMs);
  }, [clear, holdMs]);
  const start = React.useCallback(() => { setActive(true); clear(); }, [clear]);
  const end = React.useCallback(() => {
    clear();
    timer.current = setTimeout(() => { setActive(false); timer.current = null; }, holdMs);
  }, [clear, holdMs]);
  React.useEffect(() => () => clear(), [clear]);
  return { active, pulse, start, end };
}

/** Pointer hold-repeat shared by the canonical counter buttons. */
const useStudioCounterHold = (
  direction: -1 | 1, current: number, min: number, max: number, step: number,
  adjust: (direction: -1 | 1) => void, disabled: boolean,
  interactionFocus?: ReturnType<typeof useStudioInteractionFocus>,
) => {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const latestRef = React.useRef({ min, max, step, adjust });
  latestRef.current = { min, max, step, adjust };
  const startedAt = React.useRef(0);
  const held = React.useRef(false);
  const suppressClick = React.useRef(false);
  const [isHolding, setIsHolding] = React.useState(false);
  const stop = React.useCallback(() => {
    interactionFocus?.end();
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (held.current) suppressClick.current = true;
    held.current = false;
    setIsHolding(false);
  }, [interactionFocus]);
  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const onPointerDown = React.useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    interactionFocus?.start();
    if (timer.current) clearTimeout(timer.current);
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Embedded webviews may not support pointer capture. */ }
    held.current = false;
    suppressClick.current = false;
    timer.current = setTimeout(() => {
      startedAt.current = Date.now();
      held.current = true;
      setIsHolding(true);
      const repeat = () => {
        if (!held.current) return;
        const value = currentRef.current;
        const latest = latestRef.current;
        const atBound = direction > 0 ? value >= latest.max : value <= latest.min;
        if (atBound) { stop(); return; }
        latest.adjust(direction);
        const nextValue = Math.min(latest.max, Math.max(latest.min, value + direction * latest.step));
        const remaining = direction > 0 ? latest.max - nextValue : nextValue - latest.min;
        const remainingSteps = Number.isFinite(remaining) ? Math.max(0, remaining / latest.step) : Number.POSITIVE_INFINITY;
        const elapsed = Date.now() - startedAt.current;
        const delay = getStudioCounterRepeatDelay(elapsed, remainingSteps);
        timer.current = setTimeout(repeat, delay);
      };
      repeat();
    }, 380);
  }, [adjust, direction, disabled, interactionFocus, max, min, step, stop]);
  const onClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (suppressClick.current) {
      event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
    } else if (!disabled) { interactionFocus?.pulse(); adjust(direction); }
  }, [adjust, direction, disabled, interactionFocus]);
  return { isHolding, events: {
    onPointerDown, onPointerUp: stop, onPointerLeave: (event: React.PointerEvent<HTMLButtonElement>) => { if (event.pointerType === "mouse") stop(); },
    onPointerCancel: stop, onLostPointerCapture: stop, onBlur: stop, onClick,
  }};
};

/** Independent button-only counter primitives. These deliberately do not compose either legacy stepper. */
export interface StudioCounterProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  [key: `data-${string}`]: string | undefined;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: StudioControlSize;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface StudioLeftCounterProps extends StudioCounterProps {
  /** Optional display override used by semantic variants that retain numeric counter mechanics. */
  displayValue?: React.ReactNode;
}

export type StudioLeftWordCounterProps = Omit<StudioCounterProps, "min" | "max" | "step">;
export type StudioLeftWordSliderProps = Omit<StudioDoubleSplitSliderProps, "min" | "max" | "step" | "leftControls">;

export const STUDIO_LEFT_WORD_OPTIONS = ["ONE", "TWO", "THREE", "FOUR"] as const;
export type StudioLeftWord = typeof STUDIO_LEFT_WORD_OPTIONS[number];

export const normalizeStudioLeftWordIndex = (value: number): number => {
  if (!Number.isFinite(value)) return 1;
  return ((Math.round(value) - 1 + STUDIO_LEFT_WORD_OPTIONS.length) % STUDIO_LEFT_WORD_OPTIONS.length + STUDIO_LEFT_WORD_OPTIONS.length) % STUDIO_LEFT_WORD_OPTIONS.length + 1;
};

/** Three-part counter: square action rails and a flexible full-row value pane. */
export const StudioCounter: React.FC<StudioCounterProps> = ({
  value, onValueChange, min = 0, max = 100, step = 1,
  size = "standard", disabled = false, ariaLabel = "Value",
  className, ...props
}) => {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const interactionFocus = useStudioInteractionFocus();
  const validBounds = min <= max;
  const current = Number.isFinite(value) ? value : 0;
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const adjust = React.useCallback((direction: -1 | 1) => {
    const base = currentRef.current;
    const precision = Math.min(12, Math.max(String(base).split(".")[1]?.length ?? 0, String(safeStep).split(".")[1]?.length ?? 0));
    const next = Number((base + direction * safeStep).toFixed(precision));
    onValueChange(Math.min(max, Math.max(min, next)));
  }, [max, min, onValueChange, safeStep]);
  const decrement = useStudioCounterHold(-1, current, min, max, safeStep, adjust, disabled || !validBounds || current <= min, interactionFocus);
  const increment = useStudioCounterHold(1, current, min, max, safeStep, adjust, disabled || !validBounds || current >= max, interactionFocus);
  return (
    <StudioSplitShell
      layout="double"
      sizeVariant={size}
      className={studioClasses("vt-studio-counter", interactionFocus.active && "is-interaction-focus", `is-${size}`, className)}
      railClassName="vt-studio-counter__rail"
      leftRailContent={<button type="button" className={`vt-studio-stepper-button vt-studio-counter__button${decrement.isHolding ? " is-holding" : ""}`} data-press-holding={decrement.isHolding ? "true" : undefined} aria-label={`Decrease ${ariaLabel}`} disabled={disabled || !validBounds || current <= min} {...decrement.events}><ChevronLeft aria-hidden="true" focusable="false" /></button>}
      rightRailContent={<button type="button" className={`vt-studio-stepper-button vt-studio-counter__button${increment.isHolding ? " is-holding" : ""}`} data-press-holding={increment.isHolding ? "true" : undefined} aria-label={`Increase ${ariaLabel}`} disabled={disabled || !validBounds || current >= max} {...increment.events}><ChevronRight aria-hidden="true" focusable="false" /></button>}
      shellProps={{ ...props, "data-vt-interaction-focus": interactionFocus.active ? "true" : undefined, role: "group", "aria-label": ariaLabel, "data-vt-studio-control-family": "counter", "data-vt-studio-control-kind": "studio-counter", "data-vt-library-component": "StudioCounter" }}
    >
      <span className="vt-studio-counter__value" data-vt-studio-counter-value aria-live="polite">{String(current)}</span>
    </StudioSplitShell>
  );
};
StudioCounter.displayName = "StudioCounter";

/** Side counter: flexible full-row value pane plus a square right rail with two equal button cells. */
export const StudioSideCounter: React.FC<StudioCounterProps> = ({
  value, onValueChange, min = 0, max = 100, step = 1,
  size = "standard", disabled = false, ariaLabel = "Value",
  className, ...props
}) => {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const interactionFocus = useStudioInteractionFocus();
  const validBounds = min <= max;
  const current = Number.isFinite(value) ? value : 0;
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const adjust = React.useCallback((direction: -1 | 1) => {
    const base = currentRef.current;
    const precision = Math.min(12, Math.max(String(base).split(".")[1]?.length ?? 0, String(safeStep).split(".")[1]?.length ?? 0));
    const next = Number((base + direction * safeStep).toFixed(precision));
    onValueChange(Math.min(max, Math.max(min, next)));
  }, [max, min, onValueChange, safeStep]);
  const decrement = useStudioCounterHold(-1, current, min, max, safeStep, adjust, disabled || !validBounds || current <= min);
  const increment = useStudioCounterHold(1, current, min, max, safeStep, adjust, disabled || !validBounds || current >= max);
  return (
    <StudioSplitShell
      layout="right"
      sizeVariant={size}
      className={studioClasses("vt-studio-side-counter", interactionFocus.active && "is-interaction-focus", `is-${size}`, className)}
      railClassName="vt-studio-side-counter__rail"
      rightRailContent={<span className="vt-studio-side-counter__actions">
        <button type="button" className={increment.isHolding ? "is-holding" : undefined} data-press-holding={increment.isHolding ? "true" : undefined} aria-label={`Increase ${ariaLabel}`} disabled={disabled || !validBounds || current >= max} {...increment.events} onClick={(event) => { increment.events.onClick(event); interactionFocus.pulse(); }}><ChevronUp aria-hidden="true" focusable="false" /></button>
        <button type="button" className={decrement.isHolding ? "is-holding" : undefined} data-press-holding={decrement.isHolding ? "true" : undefined} aria-label={`Decrease ${ariaLabel}`} disabled={disabled || !validBounds || current <= min} {...decrement.events} onClick={(event) => { decrement.events.onClick(event); interactionFocus.pulse(); }}><ChevronDown aria-hidden="true" focusable="false" /></button>
      </span>}
      shellProps={{ ...props, "data-vt-interaction-focus": interactionFocus.active ? "true" : undefined, onPointerDownCapture: interactionFocus.start, onPointerUpCapture: interactionFocus.end, onPointerCancelCapture: interactionFocus.end, role: "group", "aria-label": ariaLabel, "data-vt-studio-control-family": "counter", "data-vt-studio-control-kind": "studio-side-counter", "data-vt-library-component": "StudioSideCounter" }}
    >
      <span className="vt-studio-side-counter__value" data-vt-studio-counter-value aria-live="polite">{String(current)}</span>
    </StudioSplitShell>
  );
};
StudioSideCounter.displayName = "StudioSideCounter";

export const StudioLeftCounter: React.FC<StudioLeftCounterProps> = ({
  value, onValueChange, min = 0, max = 100, step = 1,
  size = "standard", disabled = false, ariaLabel = "Value",
  displayValue, className, ...props
}) => {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const interactionFocus = useStudioInteractionFocus();
  const validBounds = min <= max;
  const current = Number.isFinite(value) ? value : 0;
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const adjust = React.useCallback((direction: -1 | 1) => {
    const base = currentRef.current;
    const precision = Math.min(12, Math.max(String(base).split(".")[1]?.length ?? 0, String(safeStep).split(".")[1]?.length ?? 0));
    const next = Number((base + direction * safeStep).toFixed(precision));
    onValueChange(Math.min(max, Math.max(min, next)));
  }, [max, min, onValueChange, safeStep]);
  const decrement = useStudioCounterHold(-1, current, min, max, safeStep, adjust, disabled || !validBounds || current <= min);
  const increment = useStudioCounterHold(1, current, min, max, safeStep, adjust, disabled || !validBounds || current >= max);
  return (
    <StudioSplitShell
      layout="left"
      sizeVariant={size}
      className={studioClasses("vt-studio-side-counter", interactionFocus.active && "is-interaction-focus", "vt-studio-left-counter", `is-${size}`, className)}
      railClassName="vt-studio-left-counter__rail"
      leftRailContent={<span className="vt-studio-side-counter__actions">
        <button type="button" className={increment.isHolding ? "is-holding" : undefined} data-press-holding={increment.isHolding ? "true" : undefined} aria-label={`Increase ${ariaLabel}`} disabled={disabled || !validBounds || current >= max} {...increment.events} onClick={(event) => { increment.events.onClick(event); interactionFocus.pulse(); }}><ChevronUp aria-hidden="true" focusable="false" /></button>
        <button type="button" className={decrement.isHolding ? "is-holding" : undefined} data-press-holding={decrement.isHolding ? "true" : undefined} aria-label={`Decrease ${ariaLabel}`} disabled={disabled || !validBounds || current <= min} {...decrement.events} onClick={(event) => { decrement.events.onClick(event); interactionFocus.pulse(); }}><ChevronDown aria-hidden="true" focusable="false" /></button>
      </span>}
      shellProps={{ ...props, "data-vt-interaction-focus": interactionFocus.active ? "true" : undefined, onPointerDownCapture: interactionFocus.start, onPointerUpCapture: interactionFocus.end, onPointerCancelCapture: interactionFocus.end, role: "group", "aria-label": ariaLabel, "data-vt-studio-control-family": "counter", "data-vt-studio-control-kind": "studio-left-counter", "data-vt-library-component": props["data-vt-library-component"] ?? "StudioLeftCounter" }}
    >
      <span className="vt-studio-side-counter__value" data-vt-studio-counter-value aria-live="polite">{displayValue ?? String(current)}</span>
    </StudioSplitShell>
  );
};
StudioLeftCounter.displayName = "StudioLeftCounter";

/** Four-state word cycle built on the canonical StudioLeftCounter interaction mechanics. */
export const StudioLeftWordCounter: React.FC<StudioLeftWordCounterProps> = ({
  value, onValueChange, size = "standard", className, disabled = false, ariaLabel = "Word",
  ...props
}) => {
  const wordIndex = normalizeStudioLeftWordIndex(value);
  const handleValueChange = React.useCallback((nextValue: number) => {
    onValueChange(normalizeStudioLeftWordIndex(nextValue));
  }, [onValueChange]);
  return (
    <StudioLeftCounter
      {...props}
      value={wordIndex}
      onValueChange={handleValueChange}
      min={0}
      max={STUDIO_LEFT_WORD_OPTIONS.length + 1}
      step={1}
      size={size}
      disabled={disabled}
      ariaLabel={ariaLabel}
      displayValue={STUDIO_LEFT_WORD_OPTIONS[wordIndex - 1]}
      className={studioClasses("vt-studio-left-word-counter", className)}
      data-vt-studio-word-index={String(wordIndex)}
      data-vt-library-component="StudioLeftWordCounter"
    />
  );
};
StudioLeftWordCounter.displayName = "StudioLeftWordCounter";


/** Closeable metadata badge using the global Studio size and palette contract. */
export interface StudioCloseableBadgeProps {
  label: string;
  onClose?: () => void;
  className?: string;
  entering?: boolean;
  sizeVariant?: StudioControlSize;
}
export const StudioCloseableBadge: React.FC<StudioCloseableBadgeProps> = ({
  label,
  onClose,
  className,
  entering = true,
}) => {
  const [swapping, setSwapping] = React.useState(false);
  const [fading, setFading] = React.useState(false);
  const [isEntering, setIsEntering] = React.useState(entering);
  const [removed, setRemoved] = React.useState(false);
  const busy = React.useRef(false);

  React.useEffect(() => {
    if (!isEntering) return;
    const timer = window.setTimeout(() => setIsEntering(false), 460);
    return () => window.clearTimeout(timer);
  }, [isEntering]);

  const close = () => {
    if (busy.current) return;
    busy.current = true;
    setSwapping(true);
    window.setTimeout(() => {
      setSwapping(false);
      setFading(true);
      window.setTimeout(() => { setRemoved(true); onClose?.(); }, 1000);
    }, 540);
  };

  const normalized = label.trim().toUpperCase();
  if (removed) return null;
  return (
    <span
      className={["vt-studio-closeable-badge", className].filter(Boolean).join(" ")}
      data-size="standard"
      data-vt-studio-badge="true"
      data-vt-studio-width="content"
      data-entering={isEntering ? "true" : undefined}
      data-fading={fading ? "true" : undefined}
    >
      <span className="vt-studio-closeable-badge__label">{normalized}</span>
      <button
        type="button"
        className="vt-studio-closeable-badge__close"
        aria-label={`Remove ${normalized || "tag"}`}
        title="Remove tag"
        data-swapping={swapping ? "true" : undefined}
        onClick={close}
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
          <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
        </svg>
      </button>
    </span>
  );
};
StudioCloseableBadge.displayName = "StudioCloseableBadge";

export interface StudioTagEditorProps {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onChange?: (tags: string[]) => void;
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
  maxTagLength?: number;
}

/** Canonical add/remove tag editor using StudioTextInput in compact mode. */
export const StudioTagEditor: React.FC<StudioTagEditorProps> = ({
  value,
  defaultValue = [],
  onChange,
  className,
  ariaLabel = "Tags",
  placeholder = "TAG NAME",
  maxTagLength = 32,
}) => {
  const [internalTags, setInternalTags] = React.useState<string[]>(() => [...defaultValue]);
  const tags = value === undefined ? internalTags : [...value];
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [fly, setFly] = React.useState<{ id: number; label: string; left: number; top: number } | null>(null);
  const [flyTarget, setFlyTarget] = React.useState<{ left: number; top: number } | null>(null);
  const [flyArrived, setFlyArrived] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const nextId = React.useRef(1);

  const commit = (next: string[]) => {
    if (value === undefined) setInternalTags(next);
    onChange?.(next);
  };
  const openComposer = () => {
    setDraft("");
    setOpen(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };
  const closeComposer = () => {
    setOpen(false);
    setDraft("");
  };
  const removeTag = (index: number) => commit(tags.filter((_, i) => i !== index));
  const confirmTag = () => {
    const label = draft.trim().toUpperCase().slice(0, maxTagLength);
    if (!label) {
      inputRef.current?.focus();
      return;
    }
    const inputRect = inputRef.current?.getBoundingClientRect();
    const id = nextId.current++;
    setFlyArrived(false);
    if (inputRect) {
      setFly({
        id,
        label,
        left: inputRect.left + 12,
        top: inputRect.top + (inputRect.height - 20) / 2,
      });
      setFlyTarget(null);
    }
    commit([...tags, label]);
    setDraft("");
  };

  React.useEffect(() => {
    if (!fly) return;
    const frame = window.requestAnimationFrame(() => {
      const labels = editorRef.current?.querySelectorAll<HTMLElement>(".vt-studio-closeable-badge__label");
      const target = labels?.[labels.length - 1];
      if (target) {
        const rect = target.getBoundingClientRect();
        setFlyTarget({ left: rect.left, top: rect.top });
      }
    });
    const arriveTimer = window.setTimeout(() => setFlyArrived(true), 450);
    const finishTimer = window.setTimeout(() => {
      setFly(null);
      setFlyTarget(null);
      setFlyArrived(false);
      setOpen(false);
      setDraft("");
    }, 850);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(arriveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [fly]);

  return (
    <div ref={editorRef} className={["vt-studio-tag-editor", className].filter(Boolean).join(" ")} data-vt-studio-tag-editor="true" role="group" aria-label={ariaLabel}>
      <div className="vt-studio-tag-editor__list">
        {tags.map((tag, index) => (
          <StudioCloseableBadge
            key={`${index}:${tag}`}
            label={tag}
            onClose={() => removeTag(index)}
            entering={false}
            className={fly && index === tags.length - 1 && tag === fly.label ? "is-fly-destination" : undefined}
          />
        ))}
      </div>
      {!open ? (
        <button type="button" className="vt-studio-tag-editor__square-action" data-vt-studio-control="true" data-size="compact" data-vt-studio-tag-editor-action="true" aria-label="Add tag" title="Add tag" onClick={openComposer}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><line x1="8" y1="3" x2="8" y2="13" /><line x1="3" y1="8" x2="13" y2="8" /></svg>
        </button>
      ) : (
        <div className={["vt-studio-tag-editor__composer", fly ? "is-fading" : ""].filter(Boolean).join(" ")}>
          <StudioTextInput
            ref={inputRef}
            sizeVariant="compact"
            value={draft}
            placeholder={placeholder}
            maxLength={maxTagLength}
            autoComplete="off"
            spellCheck={false}
            aria-label="New tag name"
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter") { event.preventDefault(); confirmTag(); }
              if (event.key === "Escape") { event.preventDefault(); closeComposer(); }
            }}
          />
          <button type="button" className="vt-studio-tag-editor__square-action" data-vt-studio-control="true" data-size="compact" data-vt-studio-tag-editor-action="true" aria-label="Confirm tag" title="Confirm tag" onClick={confirmTag}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><polyline points="3,8.5 6.5,12 13,4" /></svg>
          </button>
        </div>
      )}
      {fly && (
        <span
          className="vt-studio-tag-editor__fly"
          aria-hidden="true"
          data-targeted={flyTarget ? "true" : "false"}
          data-arrived={flyArrived ? "true" : "false"}
          style={{
            left: flyTarget?.left ?? fly.left,
            top: flyTarget?.top ?? fly.top,
          }}
        >
          {fly.label}
        </span>
      )}
    </div>
  );
};
StudioTagEditor.displayName = "StudioTagEditor";



export interface StudioUploadFrameProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange" | "children"> {
  accept?: string;
  prompt?: string;
  sizeVariant?: StudioControlSize;
  disabled?: boolean;
  multiple?: boolean;
  onFileChange?: (file: File) => void;
  onFilesChange?: (files: FileList | null) => void;
}

/** Canonical pair-colored upload canvas with responsive breathing layers and an optional image preview. */
export const StudioUploadFrame: React.FC<StudioUploadFrameProps> = ({
  accept = "image/*,video/*",
  prompt = "Drop or choose file",
  disabled = false,
  sizeVariant = "standard",
  multiple = false,
  onFileChange,
  onFilesChange,
  className,
  "aria-label": ariaLabel = "Upload: drag or drop an image or video here, or click to upload",
  ...labelProps
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const previewRef = React.useRef<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const beginPicker = React.useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const selectFile = React.useCallback((file?: File) => {
    if (!file || disabled) return;
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    setPreviewUrl(previewRef.current);
    setSelectedName(file.name.length > 34 ? `${file.name.slice(0, 32)}…` : file.name);
    onFileChange?.(file);
  }, [disabled, onFileChange]);

  const receiveDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    const file = files?.[0];
    if (!file) return;
    onFilesChange?.(files);
    const input = inputRef.current;
    if (input) {
      try { input.files = event.dataTransfer.files; } catch { /* FileList assignment is not supported by every browser. */ }
    }
    selectFile(file);
  };

  return (
    <label
      {...labelProps}
      className={studioClasses("vt-studio-upload-frame", dragging && "is-drag", previewUrl && "has-img", disabled && "is-disabled", className)}
      data-vt-studio-control="true"
      data-vt-studio-control-family="upload"
      data-vt-studio-upload-frame="true"
      data-vt-library-component="StudioUploadFrame"
      data-size={sizeVariant}
      aria-disabled={disabled ? "true" : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={event => {
        if (event.target === inputRef.current) return;
        event.preventDefault();
        beginPicker();
      }}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          beginPicker();
        }
      }}
      onDragEnter={event => { if (!disabled) { event.preventDefault(); setDragging(true); } }}
      onDragOver={event => { if (!disabled) { event.preventDefault(); setDragging(true); } }}
      onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
      onDrop={receiveDrop}
    >
      <input
        ref={inputRef}
        className="vt-studio-upload-frame__input"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={event => {
          onFilesChange?.(event.currentTarget.files);
          selectFile(event.currentTarget.files?.[0]);
        }}
      />
      <span className="vt-studio-upload-frame__inset" aria-hidden="true">
        <span className="vt-studio-upload-frame__layers">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} className="vt-studio-upload-frame__layer" style={{ "--layer": index } as React.CSSProperties} />
          ))}
          <i className="vt-studio-upload-frame__layer vt-studio-upload-frame__layer--core" style={{ "--layer": 9 } as React.CSSProperties} />
        </span>
      </span>
      <span className="vt-studio-upload-frame__center">
        <span className="vt-studio-upload-frame__icon" aria-hidden="true">
          <Upload />
          {previewUrl && <img src={previewUrl} alt="" />}
        </span>
        <span className="vt-studio-upload-frame__label" aria-live="polite">{selectedName || prompt}</span>
      </span>
    </label>
  );
};
StudioUploadFrame.displayName = "StudioUploadFrame";


/** BEM class names are retained for compatibility; split text fields reuse the same badge-owned shell anatomy. */
export interface StudioSplitLeftBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  sizeVariant?: StudioControlSize;
}
interface StudioSplitBadgeBaseProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  layout: "left" | "right" | "double";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  sizeVariant?: StudioControlSize;
}
const StudioSplitBadgeBase: React.FC<StudioSplitBadgeBaseProps> = ({
  layout, iconLeft, iconRight, children, sizeVariant = "standard", className, ...props
}) => {
  const rootClass = layout === "left" ? "vt-studio-split-left-badge"
    : layout === "right" ? "vt-studio-split-right-badge" : "vt-studio-double-split-badge";
  const railClass = layout === "left" ? "vt-studio-split-left-badge__rail"
    : layout === "right" ? "vt-studio-split-right-badge__rail" : "vt-studio-double-split-badge__rail";
  const labelClass = layout === "left" ? "vt-studio-split-left-badge__label"
    : layout === "right" ? "vt-studio-split-right-badge__label" : "vt-studio-double-split-badge__label";
  return (
    <StudioSplitShell layout={layout} sizeVariant={sizeVariant}
      iconLeft={iconLeft} iconRight={iconRight}
      className={studioClasses(rootClass, className)} railClassName={railClass} labelClassName={labelClass}
      shellProps={{
        ...props,
        "data-vt-studio-split-badge": layout,
        "data-vt-library-component": layout === "left" ? "StudioSplitLeftBadge" : layout === "right" ? "StudioSplitRightBadge" : "StudioDoubleSplitBadge",
      }}>
      {children}
    </StudioSplitShell>
  )
};
export const StudioSplitLeftBadge: React.FC<StudioSplitLeftBadgeProps> = ({ icon, ...props }) =>
  <StudioSplitBadgeBase {...props} layout="left" iconLeft={icon} />;
StudioSplitLeftBadge.displayName = "StudioSplitLeftBadge";

export interface StudioSplitRightBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  sizeVariant?: StudioControlSize;
}
export const StudioSplitRightBadge: React.FC<StudioSplitRightBadgeProps> = ({ icon, ...props }) =>
  <StudioSplitBadgeBase {...props} layout="right" iconRight={icon} />;
StudioSplitRightBadge.displayName = "StudioSplitRightBadge";

export interface StudioDoubleSplitBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  sizeVariant?: StudioControlSize;
}
export const StudioDoubleSplitBadge: React.FC<StudioDoubleSplitBadgeProps> = ({ leftIcon, rightIcon, ...props }) =>
  <StudioSplitBadgeBase {...props} layout="double" iconLeft={leftIcon} iconRight={rightIcon} />;
StudioDoubleSplitBadge.displayName = "StudioDoubleSplitBadge";

export interface StudioDoubleSplitSliderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  [key: `data-${string}`]: string | undefined;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: StudioControlSize;
  disabled?: boolean;
  ariaLabel?: string;
  /** Use the Studio side-counter up/down controls instead of the reset action. */
  leftControls?: "reset" | "counter";
}

/**
 * Range slider using the canonical double-split shell: secondary-color rails,
 * L1-style filled track and readout, with the rectangular v2 range handle.
 */
export const StudioDoubleSplitSlider: React.FC<StudioDoubleSplitSliderProps> = ({
  value, onValueChange, min = 0, max = 100, step = 1,
  size = "standard", disabled = false, ariaLabel = "Slider value", leftControls = "counter",
  className, ...props
}) => {
  const interactionFocus = useStudioInteractionFocus();
  const validBounds = Number.isFinite(min) && Number.isFinite(max) && min < max;
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const current = Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const adjustCounter = React.useCallback((direction: -1 | 1) => {
    const base = currentRef.current;
    const precision = Math.min(12, Math.max(
      String(base).split(".")[1]?.length ?? 0,
      String(safeStep).split(".")[1]?.length ?? 0,
    ));
    const next = Number((base + direction * safeStep).toFixed(precision));
    onValueChange(Math.min(max, Math.max(min, next)));
  }, [max, min, onValueChange, safeStep]);
  const decrement = useStudioCounterHold(-1, current, min, max, safeStep, adjustCounter, disabled || !validBounds || current <= min, interactionFocus);
  const increment = useStudioCounterHold(1, current, min, max, safeStep, adjustCounter, disabled || !validBounds || current >= max, interactionFocus);
  const progress = validBounds ? ((current - min) / (max - min)) * 100 : 0;
  const rangeStyle = { "--vt-studio-slider-progress": `${progress}%` } as React.CSSProperties;
  const changeValue = (raw: string) => {
    const nextValue = Number(raw);
    if (Number.isFinite(nextValue) && validBounds) onValueChange(Math.min(max, Math.max(min, nextValue)));
  };
  return (
    <StudioSplitShell
      layout="double"
      sizeVariant={size}
      fieldSlot
      className={studioClasses("vt-studio-double-split-slider", interactionFocus.active && "is-interaction-focus", `is-${size}`, leftControls === "counter" && "is-counter-controls", className)}
      railClassName="vt-studio-double-split-slider__rail"
      leftRailContent={leftControls === "counter" ? (
        <span className="vt-studio-double-split-slider__counter" aria-label={`Adjust ${ariaLabel}`}>
          <button type="button" className={`vt-studio-stepper-button${increment.isHolding ? " is-holding" : ""}`} data-press-holding={increment.isHolding ? "true" : undefined} aria-label={`Increase ${ariaLabel}`} title={`Increase ${ariaLabel}`} disabled={disabled || !validBounds || current >= max} {...increment.events}><ChevronUp aria-hidden="true" focusable="false" /></button>
          <button type="button" className={`vt-studio-stepper-button${decrement.isHolding ? " is-holding" : ""}`} data-press-holding={decrement.isHolding ? "true" : undefined} aria-label={`Decrease ${ariaLabel}`} title={`Decrease ${ariaLabel}`} disabled={disabled || !validBounds || current <= min} {...decrement.events}><ChevronDown aria-hidden="true" focusable="false" /></button>
        </span>
      ) : (
        <button
          type="button"
          className="vt-studio-double-split-slider__reset"
          aria-label={`Reset ${ariaLabel}`}
          title={`Reset ${ariaLabel}`}
          disabled={disabled || !validBounds || current === min}
          onClick={() => { interactionFocus.pulse(); onValueChange(min); }}
        >↺</button>
      )}
      rightRailContent={<output className="vt-studio-double-split-slider__value" aria-live="off">{current}</output>}
      shellProps={{ ...props, "data-vt-interaction-focus": interactionFocus.active ? "true" : undefined,
        "data-vt-studio-slider": "double-split",
        "data-vt-studio-slider-left-controls": leftControls,
        "data-vt-library-component": "StudioDoubleSplitSlider",
        "data-size": size,
        "aria-disabled": disabled || !validBounds ? "true" : undefined,
      }}
    >
      <input
        type="range"
        min={min}
        max={max}
        step={safeStep}
        value={current}
        disabled={disabled || !validBounds}
        aria-label={ariaLabel}
        className="vt-studio-double-split-slider__input"
        style={rangeStyle}
        onPointerDown={interactionFocus.start} onPointerUp={interactionFocus.end} onPointerCancel={interactionFocus.end} onChange={(event) => { interactionFocus.pulse(); changeValue(event.currentTarget.value); }}
      />
    </StudioSplitShell>
  );
};
StudioDoubleSplitSlider.displayName = "StudioDoubleSplitSlider";

/** Four-position left counter + slider with a live numeric value in the right rail. */
export const StudioLeftWordSlider: React.FC<StudioLeftWordSliderProps> = ({
  value, onValueChange, size = "standard", className, disabled = false, ariaLabel = "Word slider",
  ...props
}) => {
  const wordIndex = normalizeStudioLeftWordIndex(value);
  const handleValueChange = React.useCallback((nextValue: number) => {
    onValueChange(normalizeStudioLeftWordIndex(nextValue));
  }, [onValueChange]);
  return (
    <StudioDoubleSplitSlider
      {...props}
      value={wordIndex}
      onValueChange={handleValueChange}
      min={1}
      max={STUDIO_LEFT_WORD_OPTIONS.length}
      step={1}
      size={size}
      disabled={disabled}
      ariaLabel={ariaLabel}
      leftControls="counter"
      className={studioClasses("vt-studio-left-word-slider", className)}
      data-vt-studio-slider="left-word"
      data-vt-library-component="StudioLeftWordSlider"
    />
  );
};
StudioLeftWordSlider.displayName = "StudioLeftWordSlider";



export type StudioBrainStatusBadgeTone = "green" | "cyan" | "purple" | "yellow" | "red" | "blue";
export type StudioBrainStatusAppearance = "dark" | "tinted";
export type StudioBrainStatusBadgeSize = "standard" | "compact" | "micro";

export interface StudioBrainStatusBadgeProps {
  label: string;
  tone?: StudioBrainStatusBadgeTone;
  appearance?: StudioBrainStatusAppearance;
  sizeVariant?: StudioBrainStatusBadgeSize;
  active?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Compact Brain status primitive: a borderless text badge paired with a smaller
 * LED core. Active LEDs use the shared slow ripple contract; reduced-motion
 * preferences suppress the animation without hiding status.
 */
export const StudioBrainStatusBadge: React.FC<StudioBrainStatusBadgeProps> = ({
  label,
  tone = "green",
  appearance = "dark",
  active = true,
  className,
  "aria-label": ariaLabel,
}) => (
  <span
    className={["vt-studio-brain-status-badge", className].filter(Boolean).join(" ")}
    data-vt-studio-brain-status="true"
    data-tone={tone}
    data-appearance={appearance}
    data-size="standard"
    data-active={active ? "true" : "false"}
    role="status"
    aria-label={ariaLabel || label}
  >
    <span className="vt-studio-brain-status-badge__led" aria-hidden="true">
      <span className="vt-studio-brain-status-badge__core" />
      <span className="vt-studio-brain-status-badge__ripple" />
    </span>
    <span className="vt-studio-brain-status-badge__label">{label}</span>
  </span>
);
StudioBrainStatusBadge.displayName = "StudioBrainStatusBadge";


export type StudioBrainStatusTone = "running" | "success" | "warning" | "error" | "info" | "paused" | "idle" | "queued" | "processing" | "complete" | "blocked" | "failed";
export type StudioBrainStatusVariant = "dark" | "tinted";
export type StudioBrainStatusSize = "standard" | "compact" | "micro";

const STUDIO_BRAIN_STATUS_COLORS: Record<StudioBrainStatusTone, { led: string; tint: string; text: string }> = {
  running: { led: "#20ff62", tint: "#d8ffe2", text: "#000" },
  success: { led: "#168cff", tint: "#dcecff", text: "#000" },
  warning: { led: "#ffad18", tint: "#fff0cf", text: "#000" },
  error: { led: "#ff244f", tint: "#ffdce3", text: "#000" },
  info: { led: "#b94dff", tint: "#f0ddff", text: "#000" },
  paused: { led: "#00d9ee", tint: "#d6fbff", text: "#000" },
  idle: { led: "#9ca9b8", tint: "#edf0f4", text: "#000" },
  queued: { led: "#3478ff", tint: "#dce7ff", text: "#000" },
  processing: { led: "#00d9ee", tint: "#d6fbff", text: "#000" },
  complete: { led: "#20ff62", tint: "#d8ffe2", text: "#000" },
  blocked: { led: "#ffad18", tint: "#fff0cf", text: "#000" },
  failed: { led: "#ff244f", tint: "#ffdce3", text: "#000" },
};

/** LED + borderless badge composition for Brain/system status. Status remains readable without animation. */
export const StudioBrainStatusIndicator: React.FC<{
  status: StudioBrainStatusTone;
  label: string;
  variant?: StudioBrainStatusVariant;
  size?: StudioBrainStatusSize;
  pulse?: boolean;
  className?: string;
  title?: string;
}> = ({ status, label, variant = "dark", pulse = true, className = "", title }) => {
  const colors = STUDIO_BRAIN_STATUS_COLORS[status];
  return (
    <span
      className={`vt-studio-brain-status vt-studio-brain-status--${variant} ${className}`.trim()}
      data-vt-studio-control="brain-status"
      data-vt-library-component="StudioBrainStatusIndicator"
      data-status={status}
      data-variant={variant}
      data-size="standard"
      data-pulse={pulse ? "true" : "false"}
      title={title || label}
      role="status"
    >
      <span className="vt-studio-brain-status__led-wrap" aria-hidden="true" style={{ "--vt-brain-led": colors.led } as React.CSSProperties}>
        <span className="vt-studio-brain-status__led" />
        <span className="vt-studio-brain-status__lens" />
      </span>
      <span className="vt-studio-brain-status__label">{label}</span>
    </span>
  );
};
StudioBrainStatusIndicator.displayName = "StudioBrainStatusIndicator";




// ─── Canonical steppers: inline (double-split) and split (value + action rail) ───
export function normalizeStudioInlineStepperValue(
  value: number,
  direction: -1 | 1,
  step = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
): number {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const current = Number.isFinite(value) ? value : Number.isFinite(min) ? min : 0;
  const next = Math.min(max, Math.max(min, current + direction * safeStep));
  const precision = Math.min(12, Math.max(0, (String(safeStep).split(".")[1] ?? "").length));
  return Number(next.toFixed(precision));
}

export interface StudioInlineStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "standard" | "compact";
  ariaLabel?: string;
  disabled?: boolean;
}

/** Flat double-split numeric stepper: decrement, editable value, increment. */
export const StudioInlineStepper: React.FC<StudioInlineStepperProps> = ({
  value, onValueChange, min = 0, max = Number.POSITIVE_INFINITY, step = 1,
  size = "standard", ariaLabel = "Value", disabled = false, className, ...props
}) => {
  const change = (direction: -1 | 1) => onValueChange(normalizeStudioInlineStepperValue(value, direction, step, min, max));
  return (
    <div
      {...props}
      className={studioClasses("vt-studio-inline-stepper", size === "compact" ? "is-compact" : "is-standard", className)}
      data-vt-studio-control="true"
      data-vt-studio-control-family="stepper"
      data-vt-studio-control-kind="inline-stepper"
      data-vt-studio-split="double"
      data-size={size}
    >
      <div className="vt-studio-inline-stepper__actions">
        <button type="button" className="vt-studio-inline-stepper__rail" aria-label={`Decrease ${ariaLabel}`} disabled={disabled || value <= min} onClick={() => change(-1)}><Minus aria-hidden="true" /></button>
        <button type="button" className="vt-studio-inline-stepper__rail" aria-label={`Increase ${ariaLabel}`} disabled={disabled || value >= max} onClick={() => change(1)}><Plus aria-hidden="true" /></button>
      </div>
      <input
        className="vt-studio-inline-stepper__value"
        type="number"
        aria-label={ariaLabel}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={event => {
          const parsed = Number(event.currentTarget.value);
          if (event.currentTarget.value.trim() !== "" && Number.isFinite(parsed)) onValueChange(Math.min(max, Math.max(min, parsed)));
        }}
      />
    </div>
  );
};
StudioInlineStepper.displayName = "StudioInlineStepper"

export interface StudioSplitStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "standard" | "compact";
  ariaLabel?: string;
  disabled?: boolean;
}
export type StudioSplitStepperSize = NonNullable<StudioSplitStepperProps["size"]>;

/** Split numeric stepper with a secondary action rail. */
export const StudioSplitStepper: React.FC<StudioSplitStepperProps> = ({
  value, onValueChange, min = 0, max = Number.POSITIVE_INFINITY, step = 1,
  size = "standard", ariaLabel = "Value", disabled = false, className, ...props
}) => {
  const change = (direction: -1 | 1) => onValueChange(normalizeStudioInlineStepperValue(value, direction, step, min, max));
  return (
    <div
      {...props}
      className={studioClasses("vt-studio-split-stepper", className)}
      data-vt-studio-control="true"
      data-vt-studio-control-family="stepper"
      data-vt-studio-control-kind="split-stepper"
      data-size={size}
    >
      <input
        className="vt-studio-split-stepper-value"
        type="number"
        aria-label={ariaLabel}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={event => {
          const parsed = Number(event.currentTarget.value);
          if (event.currentTarget.value.trim() !== "" && Number.isFinite(parsed)) onValueChange(Math.min(max, Math.max(min, parsed)));
        }}
      />
      <div className="vt-studio-split-stepper-rail">
        <div className="vt-studio-split-stepper-actions">
          <button type="button" aria-label={`Decrease ${ariaLabel}`} disabled={disabled || value <= min} onClick={() => change(-1)}><Minus aria-hidden="true" /></button>
          <button type="button" aria-label={`Increase ${ariaLabel}`} disabled={disabled || value >= max} onClick={() => change(1)}><Plus aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
};
StudioSplitStepper.displayName = "StudioSplitStepper"


export { StudioArrowToggle, StudioSideToggle, StudioDoubleSideToggle, StudioBarToggle, STUDIO_VALUE_TOGGLE_VARIANTS } from "./StudioValueToggles";
export type { StudioToggleAppearance, StudioArrowToggleProps, StudioSideToggleProps, StudioDoubleSideToggleProps, StudioBarToggleProps } from "./StudioValueToggles";
