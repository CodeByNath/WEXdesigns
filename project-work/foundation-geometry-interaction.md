# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review corrected Button stable-boundary / outer-ring authority separation

## Reviewer Verdict

**Stop — architectural risk**

Reviewer independently inspected `origin/feat/foundation-geometry-interaction` at `c74899e1b4cf9a4439ddacf0580d5af9a1cb4e10` against ADR 0010.

## Accepted parts of the candidate

- Radius tiers are registered as `4 / 8 / 12px`.
- Default structural border geometry is registered as `1px`.
- Outer-ring width/gap are registered as `2px / 2px`.
- Universal disabled opacity is correctly changed to `0.2`.
- Button tier heights, padding, radius, direct-content gap, focus offset, and ordinary non-selectable state direction match the accepted values.
- Scope remains within the authorised WEX foundation/test/tooling boundary.

## Blocking defect

ADR 0010 deliberately separates:
- reusable outer-state geometry: Focused/Selected use a `2px` outside ring; and
- Button-specific stable boundary: Button reserves its own `2px` component boundary in every appearance/state.

The candidate couples those two authorities:

`buttons.css`
- Button base border uses `var(--wex-outer-ring-width)`.

The deterministic tests and `validate-foundation.mjs` then assert that same coupling.

That makes the Button's component boundary semantically depend on the outer-state ring token. A future change to outer-state geometry would therefore silently alter Button's base boundary, contradicting ADR 0010's explicit separation.

## Builder correction

Change only the candidate implementation needed to restore that separation:

1. Give Button's stable `2px` boundary its own Button-specific presentation token/contract.
2. Keep `--wex-outer-ring-width` exclusively for Focused/Selected outside-state geometry.
3. Keep transparent boundaries for visually borderless Button appearances.
4. Update Button tests and foundation validation so they assert the semantic separation rather than the current coupling.
5. Preserve all already-correct ADR 0010 values and all exclusions.
6. Re-run the previously required deterministic checks and browser evidence if the CSS change can affect rendered geometry.
7. Push the corrected candidate on the same topic branch and update this same work file to `AWAITING REVIEWER REVIEW` with the exact new SHA/evidence.

Do not widen scope, promote to `main`, add Selected support to ordinary Button, or change unrelated foundation values.

## Builder Resubmission — 2026-09-20

- Corrected candidate: `origin/feat/foundation-geometry-interaction` at `62efb748977cea124df73e96c1bba5e580fb9dc5` (remote SHA verified).
- Correction: `--wex-button-boundary-width: 2px` now owns the stable Button boundary. `--wex-outer-ring-width` remains exclusively in the focus outer treatment. Transparent variant border colours remain unchanged.
- Changed for correction: `packages/wex/src/foundations/buttons.css`, `packages/wex/test/button-foundation.test.mjs`, and `tooling/scripts/validate-foundation.mjs`.
- Passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7); `pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (typecheck and 5/5 tests).
- Chrome local candidate preview: `http://localhost:5173/WEXdesigns/`. Revalidated dark/light themes, all Button variants/tiers and disabled controls, focus visibility without layout shift, and compact layout. The focus ring remains outside the Button boundary.

Reviewer: independently inspect the remote correction and evidence. Do not promote to `main` unless review accepts it.
