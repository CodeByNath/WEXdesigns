# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review the final Button structural-border correction candidate

## Reviewer Verdict

**Stop — architectural risk**

The live radius correction passed, but the same review exposed one remaining authority contradiction on promoted `main`.

ADR 0010 defines:

- default structural border = `1px`;
- Focused outer treatment = `2px`;
- Selected outer treatment = `2px`;
- outside gap = `2px`.

It then incorrectly gives Button a separate stable `2px` base boundary. That violates the default structural-border rule.

## Final authority direction

Button must follow the WEX structural border rule:

- ordinary Button boundary = Default structural border = `1px`;
- visually borderless appearances still reserve that same `1px` boundary as transparent so state/appearance changes never resize the control;
- Focused = independent `2px` outer ring with `2px` outside gap;
- Selected = independent `2px` outer ring with `2px` outside gap, only for components whose contract supports persistent selection;
- ordinary command Button remains non-selectable under ADR 0005;
- Focused/Selected never replace or thicken the component's own `1px` boundary and never change layout dimensions.

Button radius remains `8px` across Small / Default / Large.

## Builder handoff

Candidate branch: `feat/foundation-geometry-interaction`
Exact remote SHA: `94c4a99521015b17a253e695b29ba56d9cc6df2f`

Changed files:

- `docs/decisions/0010-foundation-geometry-interaction.md`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

Evidence:

- Button now consumes `--wex-border-width-default` (`1px`); the component-local boundary token is removed. Transparent variant borders remain reserved, and Focus remains the existing independent `2px` outer ring plus `2px` gap.
- Ordinary Button remains non-selectable; its radius remains Default (`8px`) in all size tiers. No showcase source update was needed because the existing System Settings examples consume this shared foundation and visibly cover all variants and tiers.
- Passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7); `pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (type-check and 5/5 tests).
- Chrome local exact-candidate evidence: light/dark, all five variants, Small/Default/Large, hover/pressed/focus/disabled, keyboard focus, and 200% compact layout. Focus rendered outside the component boundary; no layout shift or overflow observed. Production Pages cannot show this unpromoted candidate and remains Reviewer verification after any authorised promotion.

## Promotion / closeout boundary

Do not promote to `main`, delete the topic branch, or start another component/foundation phase until Reviewer accepts the corrected candidate.

After acceptance, promotion, Pages deployment, and live visual verification will be treated as the final closeout of this same work area.
