# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review fixed-footprint Button outer-state correction

## Reviewer Verdict

**Stop — architectural risk**

Live Pages evidence on promoted `main`
`d10bac62ad65690d68b43c9420b7935dc0e9aefe`
shows the current outer-state mechanism is visually wrong for Button.

The current `2px` outline plus `2px` positive outline-offset extends beyond the Button box. Even though CSS layout dimensions do not change, the **visible Button footprint grows by 4px on every side** in Pressed/Focused/Selected presentation. The state therefore appears like a larger Button rather than the same Button in another state.

That violates the intended stable Button geometry.

## Correct WEX invariant

For Button:

- Default visible outer size is authoritative.
- Pressed, Selected, and Focused must **not increase the Button's visible bounding size**.
- Small / Default / Large must remain visually the same external dimensions in every state.
- Base structural boundary remains `1px`.
- Pressed / Selected / Focused retain one shared visual treatment and one shared colour.
- Their semantic meaning remains different; their visual state geometry is the same.
- Ordinary command Button remains non-selectable.

### Rendering direction

The current outside-outline mechanism is not valid for Button.

Implement the state treatment **inside the existing Button boundary/box**, using WEX-owned reusable geometry/tokens. The Carbon CSS supplied by the Reviewer is a reference for the rendering technique only: use inset layers / inset shadow-style treatment to keep the external Button footprint fixed. Do **not** copy Carbon token names, raw values, or architecture.

The resulting WEX state presentation must visibly preserve:

- the Button's existing outer dimensions;
- the registered `1px` structural boundary;
- the accepted state emphasis corresponding to the WEX `2px` state treatment;
- the visual separation/gap required by WEX, rendered within the existing box rather than outside it.

If the current `2px outer gap` wording in ADR 0010 inherently requires external growth, amend the authority so the **visual separation is internal for Button**. Reusable non-Button state geometry may remain separately described only if explicitly justified; do not silently force Button's outside mechanism onto every component.

## Builder correction evidence

Candidate pushed: `origin/feat/foundation-geometry-interaction` at
`ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`.

ADR 0010 and ADR 0005 now make Button's state layer explicitly internal:
the `1px` boundary, shared `2px` visual gap, and shared `2px` ring stay inside
the existing box. WEX owns the ring, inset, and gap-colour tokens; Button owns
no duplicated state value. Native Pressed and Focused share the same generated
inset layers. System Settings puts Default beside Pressed, Focused, and Selected
at one fixed 40px reference footprint.

Changed files:

- `docs/decisions/0005-button-authority.md`, `docs/decisions/0010-foundation-geometry-interaction.md`
- `packages/wex/src/foundations/{geometry,buttons}.css`
- `packages/wex/test/button-foundation.test.mjs`, `tooling/scripts/validate-foundation.mjs`
- `apps/web-runtime/{index.html,src/catalogue.css,test/catalogue.test.mjs}`

Checks passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7);
`pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (type-check + 6/6).

Chrome local candidate evidence (`http://localhost:5173/WEXdesigns/`): native
pointer Pressed snapshots and keyboard Focused `getBoundingClientRect()` values
were equal in light and dark: Small `63.75×36`, Default `80.515625×40`, Large
`77.125×44`. Native pointer snapshots confirmed `:active` for every tier.
At Chrome 200% zoom, Focused remained equal to Default at those dimensions;
compact layout had no overflow or layout shift. Light/dark screenshots confirm
the visible ring and gap are internal; System Settings shows the same treatment
for Pressed, Focused, and Selected.

Do not promote, delete the topic branch, or begin another component/foundation phase until Reviewer accepts this correction.
