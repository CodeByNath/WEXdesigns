# Component Manager

Status: BUILDER ACTION REQUIRED
Phase: 3 — Correct WEX-responsive viewport validation tooling

## Reviewer verdict

**Stop — architectural risk**

Accepted `main`:
`6238ff920b9565c0ca3123ab3ca14f9497d0b56d`.

## Accepted Phase 1–2 state

Component Manager is live as the isolated Shared UI sandbox at
`/component-manager/`. It is a runtime/development validation surface, not
component authority, domain authority, Admin Shell, or a page-builder.

Reviewer independently verified:

- accepted candidate is now exact remote `main`;
- Pages run 37 succeeded for that exact SHA;
- remote heads are only `main` and `Project-work-instructions`;
- source contains an empty sandbox and no registered component/domain
  implementation.

Builder also recorded hosted Chrome validation for desktop/compact, light/dark,
navigation, semantic landmarks/headings, visible skip-link focus, and the empty
mount boundary. This Reviewer surface cannot directly open the hosted Pages URL,
so that browser result remains Builder-supplied evidence rather than an
independent browser replay.

## Authority

Start from:

- `docs/code-map/component-manager.md`
- `docs/code-map/layout.md`
- `packages/wex/src/foundations/layout.css`
- `docs/foundation/studio-operating-model.md`
- `docs/architecture/repository-map.md`

Current WEX responsive thresholds in `layout.css` are `1440px`, `1024px`,
and `767px`. These source values are authority; Component Manager must consume
or derive from them rather than create competing responsive rules.

## Owner-approved direction

Add viewport switching to Component Manager so a component candidate can be
validated against WEX responsive behaviour before shell integration.

Viewport controls are **Component Manager tooling**. They are not component
props, component schema, domain data, or WEX presentation authority.

## Builder instruction

1. Confirm remote heads are only `main` and `Project-work-instructions`,
   then create one topic branch from current `main`.
2. Extend the existing Component Manager Code Map before source implementation.
3. Add an accessible viewport control to the sandbox using the current WEX
   responsive thresholds. Use neutral WEX/size labels or explicit widths; do not
   invent phone/tablet/device authority.
4. Include a full/fluid sandbox option for unconstrained resizing.
5. The control may constrain the sandbox mount width only. It must not rewrite,
   emulate, or duplicate component responsive CSS.
6. Preserve the existing light/dark theme tooling and empty-component boundary.
7. Do not implement a real component, Admin Shell, Drawer, Data Card,
   Collection, forms, fixtures, adapters, or domain behaviour in this phase.
8. Add focused tests for control availability, selected-state semantics,
   authorised viewport widths/order, fluid mode, and absence of component
   registration.
9. Run focused web-runtime tests, `git diff --check`, `pnpm check`, and Chrome
   validation covering keyboard/focus plus each viewport mode in light/dark.
10. Commit/push one candidate, verify the remote SHA, update this same file to
    `AWAITING REVIEWER REVIEW` with exact evidence, and stop.

## Reviewer finding

The pushed candidate is one clean commit ahead of `main`, preserves the empty
component boundary, and uses the recorded WEX threshold values. However, the
current mechanism only sets `max-inline-size` on the sandbox mount in the same
document. WEX responsive authority currently uses viewport media queries in
`packages/wex/src/foundations/layout.css` (`@media (max-width: 1440px)`,
`1024px`, and `767px`). Element width does not change the document viewport,
so selecting these controls does not trigger the WEX media-query states being
claimed for validation.

This is a functional architecture mismatch for the sandbox purpose, not a
styling defect. Do not promote this candidate as-is.

## Builder correction instruction

1. Keep the correction inside this Phase 3 and the existing topic branch.
2. Preserve the accepted Component Manager boundaries and do not add a real
   component, fixture/domain authority, Admin Shell, or new WEX breakpoint.
3. Replace the same-document mount-width simulation with a sandbox mechanism
   whose actual browsing context viewport can be set to the authorised WEX
   widths (for example, an isolated iframe/preview document). Do not duplicate
   or reinterpret WEX responsive CSS.
4. The component candidate must render inside that isolated responsive context,
   while Component Manager controls remain outside it.
5. Keep Fluid as an unconstrained/full available preview mode.
6. Prove in focused tests and Chrome that changing modes changes the preview
   browsing-context width and that the current WEX media-query states actually
   respond at the selected thresholds. Verify keyboard/focus and light/dark
   behaviour remain intact.
7. Run the existing focused tests, `git diff --check`, and `pnpm check`.
8. Commit/push the bounded correction, update this same file with exact SHA and
   evidence, return to `AWAITING REVIEWER REVIEW`, and stop.

## Builder handoff

- Candidate: `feat/component-manager-viewport` at
  `9205218001a15d79964a0f88453b9e5649cc88ee`; remote SHA verified.
- Source: the Component Manager Code Map, accessible native radio group, live
  selected-width status, mount-only maximum inline-size controller, token-only
  catalogue styling, and focused tests.
- Modes: Large `1440px`, Medium `1024px`, Compact `767px`, then Fluid. The
  mount width alone changes; no component responsive CSS, device preset,
  fixture, registration, domain behaviour, or Shared UI component was added.
- Checks passed: `pnpm --filter @weerax/web-runtime test`, `git diff --check`,
  and `pnpm check` (35 successful tasks; Turbo reported only its pre-existing
  missing-lockfile and no-test-output warnings).
- Chrome evidence: exact local candidate at `localhost:5177` passed all four
  modes in light and dark themes, compact and desktop layouts, native selected
  radio semantics, live status updates, visible radio focus, and arrow-key
  mode selection. Existing skip-link and empty mount boundary remain present.
- Limitation: this pre-merge candidate is locally previewed only; hosted Pages
  validation is a separate post-promotion boundary.

## Next boundary

After viewport tooling is accepted and promoted, Component Manager is ready to
host separately authorised component work. Admin Shell remains a later,
separately authorised Shared UI structure with Header, Sidebar, Body/Main, and
Footer.
