# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review corrected ADR 0010 Button-radius authority and reconciliation candidate

## Reviewer Verdict

**Stop — architectural risk**

The deployed presentation exposed a radius-authority error that had already been promoted to `main`.

## Root cause

ADR 0010 incorrectly mapped Button size tiers to radius tiers:

- Small Button → `4px`
- Default Button → `8px`
- Large Button → `12px`

That interpretation was approved during review and then implemented correctly against the wrong authority.

This is not the intended Button system.

## Corrected authority direction

WEX may register reusable radius values such as `4px / 8px / 12px` for the broader system and components that explicitly need them.

Button radius is independent from Button size tier:

- Small / Default / Large Button tiers control sizing and typography only.
- Ordinary Button uses a single default radius of `8px` across Small / Default / Large.
- A full-circle / pill Button shape is separate explicit Button shape authority; it must not be inferred from the Small/Default/Large size tier.
- Other registered radius values remain available for other WEX components or future explicitly authorised uses.

## Current promoted state

- `main` is currently `62efb748977cea124df73e96c1bba5e580fb9dc5`.
- The promoted implementation faithfully reflects the incorrect ADR 0010 tier-to-radius mapping.
- `feat/foundation-geometry-interaction` remains remote and must NOT be deleted.
- Do not treat the current GitHub Pages Button radii as accepted presentation authority.

## Builder correction required

1. Correct the architecture authority first:
   - amend/supersede the Button-radius portion of ADR 0010 so Button size tiers do not select radius tiers;
   - record ordinary Button radius as `8px`;
   - define full-circle/pill only as a separate explicit Button shape if existing accepted Button authority supports it; otherwise stop at an architecture gate and do not invent the shape contract.
2. Reconcile Button implementation and tests to the corrected authority:
   - Small / Default / Large ordinary Buttons all use `8px`;
   - preserve all accepted height, padding, stable-boundary, focus-ring, disabled-opacity, variant, and non-selectable-state rules unless separately changed by authority.
3. Update deterministic tests so tier size can no longer alter Button radius.
4. Re-run WEX/runtime checks and browser evidence.
5. Submit the corrected topic branch and same active work file as `AWAITING REVIEWER REVIEW`.
6. Do not delete the topic branch or begin another component/foundation phase.

No unrelated radius/component work is authorised.

## Builder Resubmission — 2026-09-20

- Candidate: `origin/feat/foundation-geometry-interaction` at `68f9d05d65b7fb0b5b3f5cd834de125c9f16484a` (remote SHA verified).
- Authority first: `6dbf64526c2ed2c0c857839a950cc399643671e9` amends ADR 0010 to make ordinary Button radius independent of size. Small/Default/Large now all consume the registered Default radius (`8px`); 4px/12px remain reusable for explicitly adopting components. No pill/full-circle contract was invented.
- Implementation: `68f9d05d65b7fb0b5b3f5cd834de125c9f16484a` moves `border-radius: var(--wex-radius-default)` to the shared ordinary Button rule and removes radius selection from every size tier.
- Changed: `docs/decisions/0010-foundation-geometry-interaction.md`, `packages/wex/src/foundations/buttons.css`, `packages/wex/test/button-foundation.test.mjs`, and `tooling/scripts/validate-foundation.mjs`.
- Passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7); `pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (typecheck and 5/5 tests).
- Chrome local candidate preview: `http://localhost:5173/WEXdesigns/`. Light/dark variants and all tiers render with a common ordinary Button radius; disabled, outside focus ring/no-layout-shift, and 200% compact layout were revalidated.

Reviewer: independently inspect the corrected authority and candidate. Current `main`/Pages still carry the superseded tier-to-radius mapping; do not delete this topic branch or promote without a new decision.
