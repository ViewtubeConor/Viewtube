import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const root = new URL("../../", import.meta.url)
const read = (relative: string) => readFileSync(new URL(relative, root), "utf8")
const fields = read("styles/studio-text-input.css")
const recovery = read("styles/studio-control-recovery-overrides.css")
const splitInput = read("studio-ui/primitives/studio-split-text-input.css")
const controls = read("studio-ui/primitives/StudioControls.tsx")

describe("Studio controls regression recovery contract", () => {
  it("keeps a primary inset stroke on standalone and nested split text fields", () => {
    expect(fields).toContain("FINAL FIELD CONTRACT")
    expect(fields).toContain("html body .vt-studio-split-text-input input.vt-studio-text-input")
    expect(fields).toContain("box-shadow: inset 0 0 0 var(--vt-studio-control-stroke, 3px)")
  })

  it("shows the secondary outline on focused textareas without losing the inset", () => {
    expect(fields).toContain('textarea[data-vt-studio-control="true"]:is(:focus, :focus-visible)')
    expect(fields).toContain("var(--vt-studio-control-secondary, var(--pair-b, #ff7f6b)) !important")
  })

  it("gives standalone square and circle icon buttons an outer border", () => {
    expect(recovery).toContain('button[data-vt-studio-icon-button="true"]')
    expect(recovery).toContain('button[data-vt-studio-circle-icon-button="true"]')
    expect(recovery).toContain("border: var(--vt-studio-control-stroke, 3px) solid #000")
  })

  it("provides five selectable default icon squares and a standard default size", () => {
    expect(controls).toContain('sizeVariant = "standard"')
    expect(controls).toContain('label: "Notifications"')
    expect(controls).toContain('label: "Favorites"')
    expect(controls).toContain('label: "Add"')
    expect(controls).toContain('label: "Refresh"')
    expect(controls).toContain('label: "Settings"')
    expect(controls).toContain("selected={selectedDefaultIndex === index}")
  })

  it("defaults double split sliders to counter controls", () => {
    expect(controls).toContain('leftControls = "counter"')
  })

  it("restores double-side separators, aligned arrows, module edges, and header dividers", () => {
    expect(recovery).toContain(".vt-studio-value-toggle--double .vt-studio-side-counter__rail[data-rail=\"start\"]")
    expect(recovery).toContain(".vt-studio-value-toggle--double .vt-studio-side-counter__rail[data-rail=\"end\"]")
    expect(recovery).toContain(".vt-studio-top-split-module:not([data-open=\"true\"]) > .vt-studio-top-split-module__head")
    expect(recovery).toContain("border-left: var(--vt-im-stroke")
    expect(recovery).toContain("grid-template-rows: minmax(0, 1fr) minmax(0, 1fr)")
    expect(splitInput).toContain("calc(var(--vt-studio-control-height, 44px) + var(--vt-studio-control-stroke, 3px))")
  })
})
