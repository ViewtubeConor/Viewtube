import React from "react"
import "../../styles/studio-control-entry.css"
import "../../styles/studio-led-badge-tab.css"

export type StudioLedBadgeTabMode = "badge" | "tab"
export type StudioLedAnimation = "prism" | "radar" | "flare2" | "steady" | "blink" | "none"
export type StudioLedTone = "pink" | "cyan" | "green" | "yellow" | "purple" | "neutral"
export type StudioLedAlert = "none" | "attention" | "error"

export type StudioLedBadgeTabProps = {
  mode?: StudioLedBadgeTabMode
  label: string
  firstLine?: string
  secondLine?: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  led?: "off" | "solid" | "rainbow"
  animation?: StudioLedAnimation
  tone?: StudioLedTone
  alert?: StudioLedAlert
  sizeVariant?: "compact" | "mini"
  id?: string
  className?: string
  tabIndex?: number
  "aria-label"?: string
  "aria-controls"?: string
}

const toneColors: Record<StudioLedTone, string> = {
  pink: "#FF7AC8",
  cyan: "#36E0F6",
  green: "#3FEE56",
  yellow: "#FFDA47",
  purple: "#B49CFF",
  neutral: "#9299A3",
}

const toneSecondaryColors: Record<StudioLedTone, string> = {
  pink: "#36E0F6",
  cyan: "#FF7AC8",
  green: "#36E0F6",
  yellow: "#528FFA",
  purple: "#FF7AC8",
  neutral: "#080808",
}

/** Canonical LED badge / border-attached page-tab primitive, visually matched to the Brain Status Badge Lab. */
export function StudioLedBadgeTab({
  mode = "badge",
  label,
  firstLine,
  secondLine,
  active = false,
  disabled = false,
  onClick,
  led = "rainbow",
  animation = "prism",
  tone = "cyan",
  alert = "none",
  sizeVariant = "compact",
  id,
  className = "",
  tabIndex,
  "aria-label": ariaLabel,
  "aria-controls": ariaControls,
}: StudioLedBadgeTabProps) {
  const isTab = mode === "tab"
  const resolvedAnimation: StudioLedAnimation =
    alert === "attention" && animation === "steady" ? "radar"
      : alert === "error" && animation === "steady" ? "blink"
        : animation

  const content = firstLine || secondLine ? (
    <span className="vt-studio-led-badge-tab__two-line">
      <span>{firstLine ?? label}</span>
      {secondLine ? <span>{secondLine}</span> : null}
    </span>
  ) : <span className="vt-studio-led-badge-tab__label">{label}</span>

  const classes = [
    "vt-studio-led-badge-tab",
    isTab ? "is-tab" : "is-badge",
    active ? "is-active" : "",
    alert !== "none" ? "is-attention" : "",
    "is-" + sizeVariant,
    "tone-" + tone,
    "led-" + led,
    "motion-" + resolvedAnimation,
    className,
  ].filter(Boolean).join(" ")

  const style = {
    "--vt-led-tone": toneColors[tone],
    "--vt-led-secondary": toneSecondaryColors[tone],
    "--led-size": "1em",
  } as React.CSSProperties

  const children = <>
    <span className="vt-studio-led-badge-tab__bevel" aria-hidden="true" />
    <span className="vt-studio-led-badge-tab__led" aria-hidden="true" />
    {content}
  </>

  if (isTab || onClick) {
    return (
      <button
        type="button"
        id={id}
        className={classes}
        style={style}
        disabled={disabled}
        onClick={onClick}
        tabIndex={tabIndex}
        aria-label={ariaLabel ?? label}
        role={isTab ? "tab" : undefined}
        aria-selected={isTab ? active : undefined}
        aria-controls={ariaControls}
        aria-pressed={!isTab && onClick ? active : undefined}
        data-vt-studio-primitive="StudioLedBadgeTab"
        data-vt-led-animation={resolvedAnimation}
        data-vt-led-alert={alert}
      >{children}</button>
    )
  }

  return (
    <span
      id={id}
      className={classes}
      style={style}
      role="status"
      aria-label={ariaLabel ?? label}
      data-vt-studio-primitive="StudioLedBadgeTab"
      data-vt-led-animation={resolvedAnimation}
      data-vt-led-alert={alert}
    >{children}</span>
  )
}

export default StudioLedBadgeTab
