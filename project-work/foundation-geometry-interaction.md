# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Correct Button radius authority after promoted ADR 0010 mismatch

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
