# Component Manager

Status: AWAITING REVIEWER REVIEW
Phase: 4 — Promote accepted responsive Component Manager

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

## Superseded initial Builder handoff

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

## Builder correction handoff

- Candidate: `feat/component-manager-viewport` at
  `32e4866edd6576edf2b6f86f5cffc446cf509e03`; remote SHA verified. This
  supersedes rejected candidate `9205218001a15d79964a0f88453b9e5649cc88ee`.
- Mechanism: Component Manager controls now resize a same-origin isolated
  `preview.html` iframe. The preview imports the shared WEX catalogue CSS and
  reports its actual `window.innerWidth` plus computed `.wex-layout` values;
  it contains the still-empty component mount. No responsive CSS or threshold
  logic was copied into the preview.
- Modes: Large `1440px`, Medium `1024px`, Compact `767px`, and Fluid. The
  iframe is unconstrained in Fluid mode; controls remain outside the preview.
- Checks passed: `pnpm --filter @weerax/web-runtime test`, `git diff --check`,
  and `pnpm check` (35 successful tasks; only Turbo's existing missing-lockfile
  and no-test-output warnings).
- Chrome evidence: local candidate at `localhost:5180` showed the child
  browsing context at `1440px` with WEX layout `1200px`/`24px`, `1024px` with
  `100%`/`24px`, `767px` with `100%`/`16px`, and Fluid at its actual `604px`
  width. Native radio semantics, arrow-key mode selection, visible focus,
  light/dark theme synchronization, and the empty mount boundary were also
  verified.

## Reviewer acceptance — corrected Phase 3

Reviewer independently verified corrected candidate
`32e4866edd6576edf2b6f86f5cffc446cf509e03` against accepted `main`.
The candidate is two commits ahead only because it contains the rejected first
attempt plus the bounded correction; the resulting tree now uses a same-origin
iframe whose actual browsing-context width is changed by the Component Manager
controls. The preview itself consumes the shared WEX CSS, reads
`window.innerWidth` and computed `.wex-layout` values, and contains no copied
1440/1024/767 breakpoint logic. The empty-component and domain boundaries remain
intact.

The recorded Chrome evidence is consistent with current WEX layout authority:
1440px resolves the laptop max, 1024px resolves full width with normal padding,
and 767px resolves compact padding. This corrects the rejected same-document
simulation.

## Builder instruction — promotion closeout

1. Fast-forward accepted candidate `32e4866edd6576edf2b6f86f5cffc446cf509e03`
   to `main`; do not alter implementation source.
2. Verify remote `main` equals that exact SHA and verify the GitHub Pages run
   succeeds for the same SHA.
3. Validate hosted `/component-manager/` in Chrome: Large, Medium, Compact and
   Fluid must change the iframe browsing-context width and produce the expected
   live WEX layout response; also verify light/dark sync, radio keyboard/focus,
   navigation, and the empty component boundary.
4. Delete `feat/component-manager-viewport` only after promotion and hosted
   verification are proven safe.
5. Update this same work file with exact promotion, Pages, hosted-browser and
   branch-housekeeping evidence, return to `AWAITING REVIEWER REVIEW`, and stop.

## Builder promotion handoff

- Promotion: `main` was fast-forwarded and remote-verified at
  `32e4866edd6576edf2b6f86f5cffc446cf509e03`, exactly the accepted candidate.
- Pages: Deploy WEX index run 38 succeeded for that SHA in 30 seconds:
  `https://github.com/CodeByNath/WEXdesigns/actions/runs/36317901317`.
- Hosted Chrome: `https://codebynath.github.io/WEXdesigns/component-manager/`
  loaded the isolated preview. Its live WEX output was `1440px` →
  `1200px`/`24px`, `1024px` → `100%`/`24px`, `767px` → `100%`/`16px`, and
  Fluid → its actual `604px` width with `100%`/`16px`.
- Accessibility and boundaries: native radio semantics, arrow-key selection,
  visible focus, light/dark preview synchronization, catalogue navigation, and
  the empty component mount were verified on the hosted route.
- Housekeeping: local and remote `feat/component-manager-viewport` were
  deleted only after hosted verification. Remote heads are now `main` and
  `Project-work-instructions` only.

## Next boundary

After viewport tooling is accepted and promoted, Component Manager is ready to
host separately authorised component work. Admin Shell remains a later,
separately authorised Shared UI structure with Header, Sidebar, Body/Main, and
Footer.
