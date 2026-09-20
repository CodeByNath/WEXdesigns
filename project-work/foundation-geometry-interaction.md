# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote System Settings outer-state presentation candidate to main

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected:
`origin/feat/foundation-geometry-interaction` at
`47ad2d815c01fabd77d3de1b202edbad117d1736`.

## Accepted presentation correction

The candidate fixes the System Settings coverage gap without changing Button authority.

- Adds persistent **Focused** and **Selected** reference specimens under a separate `Outer states` section.
- Both specimens are explicitly labelled as reusable WEX state geometry, not interactive Buttons.
- Focused specimen consumes:
  - `--wex-border-width-default`
  - `--wex-outer-ring-width`
  - `--wex-outer-ring-gap`
  - `--wex-color-border-focus`
- Selected specimen consumes the same reusable geometry with `--wex-color-interactive-selected`.
- No ordinary Button gains Selected state, `aria-pressed`, toggle semantics, schema changes, or shared-UI changes.
- Native Button `:focus-visible` remains unchanged.
- No raw colour values were introduced.
- Runtime tests now assert both specimens remain present and that no selectable Button state was introduced.

Compared with current `main` `94c4a99521015b17a253e695b29ba56d9cc6df2f`, the candidate is exactly one commit ahead and changes only:

- `apps/web-runtime/index.html`
- `apps/web-runtime/src/catalogue.css`
- `apps/web-runtime/test/catalogue.test.mjs`

Builder evidence reports passing:
- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 6/6 tests)
- local Chrome light/dark, native keyboard focus, both reference specimens, 200% compact layout, and no overflow/layout shift.

## Promotion safeguard

Promote only exact candidate SHA
`47ad2d815c01fabd77d3de1b202edbad117d1736`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `94c4a99521015b17a253e695b29ba56d9cc6df2f`.
3. Verify `main` is an ancestor of the candidate and the topic tip is exactly `47ad2d815...`.
4. Fast-forward `main` only to that exact SHA. No merge commit, rebase, amendment, or extra source changes.
5. Push `main` and verify remote SHA.
6. Verify GitHub Pages deployment for that SHA succeeds.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion/deployment evidence and stop.

Do not delete the topic branch yet and do not begin another phase.

Final Reviewer closeout boundary:
- verify promoted `main`;
- verify live Pages visibly shows both Focused and Selected reference specimens plus native Button keyboard focus;
- if clean, authorize topic-branch deletion and accept this work area.
