import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const splitCss = readFileSync(new URL("./studio-split-text-input.css", import.meta.url), "utf8")
const textInputCss = readFileSync(new URL("../../styles/studio-text-input.css", import.meta.url), "utf8")
const controlSystemCss = readFileSync(new URL("../../styles/studio-control-system.css", import.meta.url), "utf8")

describe("split input source-branch field contract", () => {
  it("keeps the native input editable and gives it a persistent primary inset", () => {
    expect(splitCss).toContain("pointer-events: none")
    expect(splitCss).toContain("pointer-events: auto")
    expect(splitCss).toContain("border: 0 !important")
    expect(splitCss).toContain("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px) var(--vt-split-field-primary)")
  })
  it("uses the secondary focus outline while keeping the primary inset and focus fill", () => {
    expect(splitCss).toContain(":focus-within > [data-vt-studio-control=\"true\"]")
    expect(splitCss).toContain("var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b))")
    expect(splitCss).toContain("var(--vt-split-field-primary) 15%, transparent")
    expect(splitCss).toContain("caret-color: var(--vt-split-field-primary)")
  })
  it("preserves the canonical single-line size ladder including Supreme and Mini", () => {
    expect(textInputCss).toContain('input.vt-studio-text-input[data-size="supreme"]')
    expect(textInputCss).toContain("font-size: var(--vt-studio-supreme-font-size, 51.82px)")
    expect(textInputCss).toContain('input.vt-studio-text-input[data-size="standard"]')
    expect(textInputCss).toContain('input.vt-studio-text-input[data-size="compact"]')
    expect(textInputCss).toContain('input.vt-studio-text-input[data-size="mini"]')
    expect(textInputCss).toContain('input.vt-studio-text-input[data-size="micro"]')
  })
  it("keeps textareas on the primary resting fill and secondary focus outline contract", () => {
    expect(controlSystemCss).toContain("--vt-field-primary: var(--vt-studio-control-accent, var(--pair-a));");
    expect(controlSystemCss).toContain("background: color-mix(in srgb, var(--vt-field-primary) var(--vt-studio-control-default-fill-opacity), transparent);");
    expect(controlSystemCss).toContain("textarea[data-vt-studio-control=\"true\"][data-vt-studio-field-kind=\"textarea\"]:is(:focus, :focus-visible)");
    expect(controlSystemCss).toContain("background: color-mix(in srgb, var(--vt-field-primary) var(--vt-studio-control-focus-fill-opacity), transparent);");
    expect(controlSystemCss).toContain("outline: var(--vt-field-outline-stroke) solid var(--vt-field-secondary);");
    expect(controlSystemCss).toContain("-webkit-text-stroke: var(--vt-studio-control-text-stroke) #000;");
  })
  it("restores source-branch floating and fixed label focus metrics", () => {
    expect(controlSystemCss).toContain("--vt-studio-control-focus-outline-width: 1.95px;");
    expect(controlSystemCss).toContain("--vt-studio-micro-focus-outline-width, 0.975px");
    expect(controlSystemCss).toContain(".vt-studio-fixed-label-field:focus-within > :is(input, textarea)");
    expect(controlSystemCss).toContain("outline: var(--vt-studio-control-focus-outline-width, 3px) solid var(--vt-studio-control-secondary, var(--pair-b));");
  })
  it("keeps the shared primary inset stroke for standalone inputs and textareas", () => {
    expect(textInputCss).toContain("textarea[data-vt-studio-control=\"true\"]")
    expect(textInputCss).toContain("box-shadow: inset 0 0 0 var(--vt-field-inline-width) var(--vt-field-inline-primary)")
  })
})
