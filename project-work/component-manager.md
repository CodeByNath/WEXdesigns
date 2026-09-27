# Component Manager

Status: AWAITING REVIEWER REVIEW
Phase: 3 — Add WEX-responsive viewport validation tooling

## Reviewer verdict

**Proceed**

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
