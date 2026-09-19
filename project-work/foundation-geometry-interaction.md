# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Independently verify promoted ADR 0010 implementation and deployed GitHub Pages

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected the corrected candidate:
`origin/feat/foundation-geometry-interaction` at
`62efb748977cea124df73e96c1bba5e580fb9dc5`.

## Accepted implementation

The corrected candidate now matches ADR 0010:

- Radius tiers are `4 / 8 / 12px`.
- Default structural border geometry is `1px`.
- Reusable outer-ring width/gap remain `2px / 2px`.
- Universal disabled opacity is `0.2`.
- Button has its own stable `--wex-button-boundary-width: 2px`.
- Button base border consumes only the Button boundary token.
- Focus consumes `--wex-outer-ring-width` and `--wex-outer-ring-gap`.
- Tests explicitly reject coupling Button's base border to the outer-ring token.
- Button heights are `36 / 40 / 44px`.
- Button radius consumption is Small / Default / Large.
- Button padding is `4px` block / `12px` inline with `4px` direct-content gap.
- Ordinary Button remains non-selectable.
- Scope stayed within WEX foundations, tests, and foundation validation tooling.

The correction from `c74899e1...` to `62efb748...` changed only:
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

Builder evidence reports passing:
- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (typecheck + 5/5 tests)
- local Chrome revalidation for light/dark, variants/tiers, disabled, focus/no-layout-shift, and compact layout.

## Promotion safeguard

Promote only the exact accepted candidate SHA
`62efb748977cea124df73e96c1bba5e580fb9dc5`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.
3. Verify `main` is an ancestor of the accepted candidate and the topic branch tip is exactly `62efb748...`.
4. Fast-forward `main` only to that exact candidate. No merge commit, rebasing, amendments, or additional source changes.
5. Push `main` and verify the remote SHA.
6. Verify the GitHub Pages/deployment workflow for that SHA completes successfully.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion/deployment evidence and stop.

Do not delete the topic branch yet. Do not begin another foundation/component phase.

Final Reviewer boundary after promotion:
- independently verify promoted `main`;
- verify deployed GitHub Pages presentation reflects ADR 0010;
- then authorize branch closeout if clean.

## Builder Promotion Handoff — 2026-09-20

- `origin` verified as `https://github.com/CodeByNath/WEXdesigns.git`.
- Remote `main` was verified at `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`; it was an ancestor of the accepted candidate.
- `main` fast-forwarded without a merge commit to exact accepted SHA `62efb748977cea124df73e96c1bba5e580fb9dc5`; remote `main` SHA verified after push.
- GitHub Actions **Deploy WEX index** run #12 for commit `62efb74` on `main` completed successfully in 27 seconds: `https://github.com/CodeByNath/WEXdesigns/actions/runs/35448104880`.
- Topic branch `feat/foundation-geometry-interaction` remains remote as required; no further source changes or new phase began.

Reviewer: independently verify `main`, the deployed GitHub Pages surface, and then decide whether branch closeout is safe.
