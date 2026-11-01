import React from "react"
import "../../styles/studio-control-entry.css"
import { StudioSplitLeftBadge, StudioSplitRightBadge, StudioDoubleSplitBadge } from "./StudioControls"
import { StudioTextInput } from "./StudioTextInput"
import "./studio-split-text-input.css"

export interface StudioSplitTextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "children" | "type"> {
  split?: "left" | "right" | "double"
  sizeVariant?: "standard" | "compact"
  type?: "text" | "search" | "email" | "url" | "tel" | "password"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  inputClassName?: string
}

/** Badge-owned perimeter and rails; the real simple input owns editing. */
export const StudioSplitTextInput = React.forwardRef<HTMLInputElement, StudioSplitTextInputProps>(
  ({ split = "left", sizeVariant = "standard", leftIcon, rightIcon, className, style, inputClassName, ...props }, ref) => {
    const input = <StudioTextInput {...props} ref={ref} variant="simple" sizeVariant={sizeVariant} className={inputClassName} />
    return (
      <span className={["vt-studio-split-text-input", className].filter(Boolean).join(" ")} data-vt-studio-control="true" data-size={sizeVariant} data-split={split} style={style}>
        {split === "double"
          ? <StudioDoubleSplitBadge sizeVariant={sizeVariant} leftIcon={leftIcon} rightIcon={rightIcon}>{input}</StudioDoubleSplitBadge>
          : split === "right"
            ? <StudioSplitRightBadge sizeVariant={sizeVariant} icon={rightIcon}>{input}</StudioSplitRightBadge>
            : <StudioSplitLeftBadge sizeVariant={sizeVariant} icon={leftIcon}>{input}</StudioSplitLeftBadge>}
      </span>
    )
  },
)
StudioSplitTextInput.displayName = "StudioSplitTextInput"
