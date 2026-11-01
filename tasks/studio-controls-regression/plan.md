# Studio Controls Regression Recovery

**Branch:** `fix/studio-controls-regression-recovery-2026-10-31`  
**Scope:** Split text input interaction and field styling, canonical width defaults/imports, complete representative inventory and family grouping.

## Guardrails
- Preserve the existing recovery branch and all landed fixes; do not reset, rebase destructively, or create parallel primitive implementations.
- Canonical global width is full-row/auto. Horizontal and vertical word toggles are the only content-width exceptions.
- Keep token ownership centralized; primitives import their owning styles and consume canonical tokens rather than restating defaults.
- Representatives must render actual production primitives, full-row or naturally content-width, and be grouped by family.
- Do not edit the unrelated Settings Frontend Redesign task files.
- Use test-first changes and report verification honestly. Remote source editing alone is not proof of build or browser behavior.

## Phase 1 — Split Left text input interaction and styling
1. Reproduce the non-editable nested-input behavior in the split-text-input geometry contract.
2. Inspect the split badge DOM and all shared split-label pointer-event rules.
3. Make the actual input hit-testable without making decorative rails intercept input interaction.
4. Restore the persistent primary inset stroke using the same shared field tokens/rules as ordinary text inputs; retain black outer perimeter.
5. Keep resting primary text/stroke, primary 50% fill and caret; focused black text/stroke, primary 15% fill, persistent inset and secondary outline at 0.65 × stroke.
6. Verify left, right and double split variants accept pointer/touch, focus, cursor placement, selection, keyboard input and controlled/uncontrolled props.

## Phase 2 — Canonical auto-width ownership
1. Audit all primitive source modules and their stylesheets for width defaults and local overrides.
2. Ensure component modules import their own required style entry points and consume the canonical global full-row auto-width rule.
3. Remove duplicated/non-default width settings from counters, sliders, toggles and other primitives except horizontal/vertical word toggles.
4. Keep content-width exceptions explicit and limited to the two word-toggle families.
5. Add/adjust contract tests for imports, defaults, exceptions and rendered attributes.

## Phase 3 — Representative inventory and family organization
1. Build an inventory from actual public exports and production primitive implementations.
2. Compare it with the confirmed representative section and identify every missing production primitive.
3. Add one actual standard representative per primitive; add meaningful variants within that primitive's family module.
4. Group related split variants and families together (buttons, badges, fields, choices/switches, toggles, counters, sliders, dropdowns, icon controls, modules/frames, compositions).
5. Keep specimens full-row or naturally auto-width; avoid multi-column representative layouts and decorative substitutes.
6. Ensure each representative has a unique `data-vt-library-component` identifier and an owning-module/style provenance.

## Phase 4 — Verification and handoff
- Run focused split-input tests first, then width/import and representative-coverage tests.
- Run `npm run test:studio-controls`, `npm run typecheck`, `npm run build`, and relevant catalog audits.
- Inspect the actual Studio UI at mobile and desktop widths; verify no console errors and exercise input editing.
- Review diff for duplicate implementations, wrong file locations, hard-coded geometry, and unnecessary overrides.
- Open/update a PR only after executable tests and review evidence are available.

## Completion criteria
All phases complete, all production primitives represented and family-grouped, no missing imports/undefined identifiers, all required checks green, and a concise evidence-backed handoff with changed files and commit/PR links.
