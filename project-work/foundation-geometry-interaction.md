# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Independently verify promoted Button-radius correction and deployed GitHub Pages

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected the corrected candidate:
`origin/feat/foundation-geometry-interaction` at
`68f9d05d65b7fb0b5b3f5cd834de125c9f16484a`.

## Accepted correction

The candidate fixes the promoted Button-radius authority error without widening scope.

Authority now states:

- WEX radius tiers remain reusable `4 / 8 / 12px`.
- Components explicitly choose a radius tier; size tiers do not imply radius tiers.
- Small / Default / Large ordinary Buttons all use Default radius `8px`.
- Button size tiers control size/typography only.
- Full-circle/pill is a separate shape contract and is explicitly NOT authorised by ordinary size tiers.
- No new pill/full-circle API or shape variant was invented.

Implementation now matches that authority:

- `.wex-button` owns `border-radius: var(--wex-radius-default)`.
- Small / Default / Large tier rules contain no radius selection.
- Tests reject Small/Large radius consumption by ordinary Button.
- Existing accepted height, padding, 2px Button boundary, outer focus ring, disabled opacity, variants, and non-selectable ordinary state remain unchanged.

Compared with current `main` `62efb748977cea124df73e96c1bba5e580fb9dc5`, the candidate is exactly two commits ahead and changes only:

- `docs/decisions/0010-foundation-geometry-interaction.md`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

Builder evidence reports passing:
- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (typecheck + 5/5 tests)
- local Chrome light/dark, all variants/tiers, disabled, outside focus/no-layout-shift, and 200% compact layout.

## Promotion safeguard

Promote only exact candidate SHA
`68f9d05d65b7fb0b5b3f5cd834de125c9f16484a`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `62efb748977cea124df73e96c1bba5e580fb9dc5`.
3. Verify `main` is an ancestor of the candidate and the topic tip is exactly `68f9d05...`.
4. Fast-forward `main` only to that exact SHA. No merge commit, rebase, amendment, or extra source change.
5. Push `main` and verify remote SHA.
6. Verify the GitHub Pages deployment for that SHA succeeds.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion/deployment evidence and stop.

Do not delete the topic branch yet and do not begin another phase.

Final Reviewer boundary:
- verify promoted `main`;
- verify deployed Pages shows the same 8px ordinary Button radius across Small / Default / Large;
- then authorize branch closeout if clean.

## Builder Promotion Handoff — 2026-09-20

- `origin` verified as `https://github.com/CodeByNath/WEXdesigns.git`.
- Remote `main` was verified at `62efb748977cea124df73e96c1bba5e580fb9dc5` and as an ancestor of the accepted candidate.
- `main` fast-forwarded without a merge commit to exact accepted SHA `68f9d05d65b7fb0b5b3f5cd834de125c9f16484a`; remote `main` SHA verified after push.
- GitHub Actions **Deploy WEX index** run #13 for commit `68f9d05` on `main` completed successfully: `https://github.com/CodeByNath/WEXdesigns/actions/runs/35451891249`.
- Topic branch `feat/foundation-geometry-interaction` remains remote as required; no new phase or source change began.

Reviewer: independently verify promoted `main` and live Pages' common 8px ordinary Button radius before deciding whether branch closeout is safe.
