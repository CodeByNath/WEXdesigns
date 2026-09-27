# Component Manager

Status: BUILDER ACTION REQUIRED
Phase: 2 — Promote accepted Component Manager candidate

## Reviewer verdict

**Proceed**

Baseline `main`:
`b85a2f98bfb22765c27f824ec4be42b2a23e924e`.

## Owner direction

Create **Component Manager** as the isolated component sandbox used before a
Shared UI component is plugged into a runtime shell.

Component Manager is where a component can be mounted with controlled
definitions/data, inspected, corrected, interaction-tested, accessibility-tested,
and validated against WEX presentation.

It is not the Admin Shell, not a consuming product, and not domain authority.

## Architecture boundary

Foundation remains binding:

- WEX owns reusable visual and interaction-presentation authority.
- Shared UI owns reusable structure, rendering, interaction, and accessibility
  mechanics that consume WEX.
- domain/product authority owns records, permissions, validation, lifecycle,
  workflow legality, and runtime behaviour.
- application/runtime shells own assembly and placement.

Component Manager is a development/runtime validation surface for Shared UI
components. It must not become permanent component authority or a page-builder.

## Builder instruction

1. Confirm only `main` and `Project-work-instructions` exist remotely, then
   create one topic branch from current `main`.
2. Start from the Global Components Code Map, Foundation Studio Operating Model,
   repository map, and current web-runtime catalogue shell.
3. Add a concise Component Manager Code Map before source implementation.
4. Add a first-class `/component-manager/` route to the catalogue ecosystem,
   positioned after Global Components unless existing authority requires a
   different non-breaking placement.
5. Build only the **sandbox shell** in this phase. It should provide a clear
   isolated mount/work area ready to host a component candidate and controlled
   fixture/definition input later.
6. Do not register or implement Admin Shell, Drawer, Data Card, Collection,
   forms, domain records, adapters, or product-specific behaviour yet.
7. Do not invent new WEX visual values. Use existing WEX foundations/DNA and
   existing catalogue-shell presentation.
8. Keep Component Manager authority separate from component authority: future
   components retain their own schemas/contracts/Code Maps/ADRs where required.
9. Add focused route/navigation/accessibility tests proving the sandbox exists
   and contains no registered component implementation yet.
10. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
    desktop/compact + light/dark + keyboard/focus validation.
11. Commit/push one candidate, update this same work file to
    `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Builder handoff

- Candidate: `feat/component-manager` at
  `6238ff920b9565c0ca3123ab3ca14f9497d0b56d`; remote SHA verified.
- Source: Component Manager catalogue route, Vite multi-page input, ordered
  navigation, focused empty-sandbox assertions, and its concise Code Map.
- Boundary: no component, definition, fixture, form, domain record, adapter,
  Admin Shell, Drawer, Data Card, or Collection implementation was registered.
- Checks passed: focused `pnpm --filter @weerax/web-runtime test`,
  `git diff --check`, and `pnpm check` (35 successful tasks; Turbo reported
  only its pre-existing missing-lockfile and no-test-output warnings).
- Chrome evidence: local candidate preview passed desktop and compact layouts,
  light and dark themes, semantic heading/landmark exposure, ordered catalogue
  navigation, theme toggle, and visible keyboard focus on the skip link.
- Limitation: this candidate is only locally previewable until promotion because
  GitHub Pages deploys `main`; no production Pages claim is made.

## Reviewer acceptance

Reviewer independently verified candidate `6238ff920b9565c0ca3123ab3ca14f9497d0b56d`
is exactly one commit ahead of accepted `main`, stays within the authorised
sandbox-only scope, adds the required Code Map/route/tests, and introduces no
component or domain authority. No commit CI/status checks are attached; recorded
focused/full checks and candidate Chrome evidence are accepted for this phase.

## Builder instruction — promotion closeout

1. Fast-forward accepted candidate `6238ff920b9565c0ca3123ab3ca14f9497d0b56d` to `main`; do not alter source.
2. Verify remote `main` equals that SHA and verify the GitHub Pages deployment succeeds.
3. Validate the promoted `/component-manager/` route in hosted Chrome, including desktop/compact, light/dark, navigation, keyboard/focus, and the empty sandbox boundary.
4. Delete `feat/component-manager` only after promotion and hosted verification are proven safe.
5. Update this same work file with exact promotion, Pages, hosted-browser, and branch-housekeeping evidence, then stop at `AWAITING REVIEWER REVIEW`.

## Next boundary

After promotion/hosted closeout is Reviewer-accepted, the next separately
authorised work is the **Admin Shell** structure: Header, Sidebar, Body/Main,
Footer. Drawer and later components are developed/corrected in Component Manager
before being plugged into that shell.
