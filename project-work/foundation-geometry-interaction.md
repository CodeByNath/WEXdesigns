# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote final Button structural-border correction to main

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected the final correction candidate:
`origin/feat/foundation-geometry-interaction` at
`94c4a99521015b17a253e695b29ba56d9cc6df2f`.

## Accepted correction

The candidate now aligns Button with the WEX structural-border authority:

- Default structural border remains `1px`.
- Ordinary Button consumes `--wex-border-width-default`; no Button-local boundary-width token remains.
- Visually borderless Button appearances still reserve that 1px boundary transparently.
- Focus remains an independent `2px` outer ring using `--wex-outer-ring-width`.
- Focus uses the existing `2px` outside gap and does not change Button dimensions.
- ADR 0010 now explicitly states Focused/Selected neither replace nor thicken the Button's 1px boundary.
- Ordinary command Button remains non-selectable under ADR 0005.
- Button radius remains Default `8px` across Small / Default / Large.
- Size tiers still control size/typography only.
- Existing heights, padding, disabled opacity, variants, and interaction-state direction remain unchanged.

Compared with current `main` `68f9d05d65b7fb0b5b3f5cd834de125c9f16484a`, the candidate is exactly one commit ahead and changes only:

- `docs/decisions/0010-foundation-geometry-interaction.md`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

Builder evidence reports passing:
- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 5/5 tests)
- local Chrome light/dark, all five variants, all three sizes, hover/pressed/focus/disabled, keyboard focus, 200% compact layout, and no layout shift.

## Promotion safeguard

Promote only exact candidate SHA
`94c4a99521015b17a253e695b29ba56d9cc6df2f`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `68f9d05d65b7fb0b5b3f5cd834de125c9f16484a`.
3. Verify `main` is an ancestor of the candidate and the topic tip is exactly `94c4a995...`.
4. Fast-forward `main` only to that exact SHA. No merge commit, rebase, amendment, or extra source change.
5. Push `main` and verify remote SHA.
6. Verify GitHub Pages deployment for that SHA succeeds.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion/deployment evidence and stop.

Do not delete the topic branch yet and do not begin another phase.

Final Reviewer closeout boundary:
- verify promoted `main`;
- verify live Pages shows the corrected 1px Button boundary and independent 2px focus ring + 2px gap;
- if clean, authorize topic-branch deletion and accept this work area.
