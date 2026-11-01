# Studio Controls Regression Recovery — Checklist

## Phase 1 — Split Left input
- [ ] Add failing regression coverage for pointer/touch editability of left/right/double split inputs.
- [x] Correct split-label pointer-event ownership so the native input receives interaction.
- [x] Restore persistent primary inset stroke while preserving the shared focus behavior.
- [x] Port the text-input TSX and split-input CSS from `docs/studio-controls-regression-handoff-2026-10-30`.
- [x] Restore Supreme (51.82px), Mini, Standard, Compact and Micro single-line typography from the source branch.
- [x] Restore source-branch floating/fixed label focus metrics and verify the shared textarea primary-rest/secondary-focus contract.
- [ ] Verify keyboard, selection, cursor, controlled and uncontrolled editing.
- [x] Reassert the primary inset stroke in the final field stylesheet for standalone and split-native inputs; add textarea secondary focus outline in that same final layer.

## Phase 2 — Auto-width defaults and imports
- [x] Inspect core primitive modules and identify missing direct global-style ownership imports.
- [x] Add canonical control-entry imports to the audited standalone primitive modules and show global full-row auto-width defaults in every primitive settings panel.
- [ ] Remove component-local width overrides from counters, sliders and toggles.
- [x] Change the double-split slider's default left control from reset/recycle to the counter control.
- [ ] Preserve only horizontal and vertical word-toggle content-width exceptions.
- [x] Add focused regression contract coverage for field strokes, textarea focus, icon-group defaults, slider control, and module/toggle dividers.
- [x] Give the square-icon group five built-in selectable actions when no children are supplied; selected action uses secondary fill.

## Phase 3 — Representative library
- [x] Reconcile the existing confirmed representative inventory against the catalog's explicit coverage tests and production exports.
- [ ] Compare exports against representative identifiers.
- [ ] Add missing production primitive representatives.
- [x] Preserve the existing family grouping pass and organized representative family sections.
- [x] Preserve the single-column, full-row direct representative ledger.
- [ ] Add provenance and unique identifiers.

## Phase 4 — Verification
- [ ] Focused regression tests pass (added; execution pending).
- [ ] Studio controls test suite passes.
- [ ] Typecheck passes.
- [ ] Production build passes.
- [ ] Catalog coverage audit passes.
- [ ] Mobile and desktop interaction/visual checks pass.
- [ ] Diff reviewed for regressions, duplication and wrong file locations.
- [ ] PR created or updated with evidence.


## Execution note

The code and regression assertions above are committed to the recovery branch. Text-field styling was ported from `docs/studio-controls-regression-handoff-2026-10-30`; the shared inset-stroke selector and the recovery branch's explicit `studio-control-entry.css` import were retained. Additional recovery edits restore standalone square/circle icon borders, selected play/pause primary rail fill, double-side toggle alignment and dividers, top-split header separators, collapsed-header border positioning, intermodule side edges, and the default double-split slider counter. Focused regression assertions were added. Runtime tests, typecheck, production build, and browser interaction checks remain **pending** because this session has GitHub source-edit access but no repository checkout or executable project environment. Do not mark verification complete until those commands are run against this branch.


## Follow-up recovery commit record — 2026-10-31

- The five-action square icon group representative now relies on the component's default five actions rather than supplying a two-child demo; the group is full-row with equal-width items and one perimeter owner.
- Removed recovery-layer double borders from icon faces and removed local double-split slider / double-side counter paint overrides so those families defer to their canonical styling sheets.
- Remaining verification: confirm the component markup and CSS selectors in a running browser, run the focused Studio tests, typecheck, and production build. Do not mark the visual regressions closed until these gates pass.
