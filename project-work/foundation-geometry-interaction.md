# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote unified Pressed / Selected / Focused outer-state candidate to main

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected:
`origin/feat/foundation-geometry-interaction` at
`d10bac62ad65690d68b43c9420b7935dc0e9aefe`.

## Accepted correction

The candidate now matches the clarified WEX outer-state rule.

### Shared presentation

Pressed, Selected, and Focused now share:

- Default structural boundary = `1px`;
- outer ring = `2px`;
- outer gap = `2px`;
- one shared ring colour via `--wex-outer-ring-color`;
- no layout-size change.

`--wex-outer-ring-color` resolves from the existing WEX focus-border colour rather than creating separate state colours.

### State semantics remain distinct

- Pressed remains transient native `:active`.
- Focused remains the independent accessibility overlay.
- Selected remains persistent/current and available only to selection-capable components.
- Ordinary command Button remains non-selectable; no `aria-pressed`, toggle schema, or shared-UI selection contract was introduced.

### Verified implementation

Button `:active` and `:focus-visible` both consume the same reusable outer-ring width, colour, and gap.

System Settings now presents **Pressed / Focused / Selected together**, each using the same visible ring treatment and separate semantic explanatory copy.

Compared with current `main` `47ad2d815c01fabd77d3de1b202edbad117d1736`, the candidate is exactly one commit ahead and changes only:

- `docs/decisions/0005-button-authority.md`
- `docs/decisions/0010-foundation-geometry-interaction.md`
- `packages/wex/src/foundations/geometry.css`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`
- `apps/web-runtime/index.html`
- `apps/web-runtime/src/catalogue.css`
- `apps/web-runtime/test/catalogue.test.mjs`

Builder evidence reports passing:

- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 6/6 tests)
- local Chrome light/dark, native Button active/pressed, keyboard focus, three-state comparison, 200% compact layout, and no overflow/layout shift.

## Promotion safeguard

Promote only exact candidate SHA
`d10bac62ad65690d68b43c9420b7935dc0e9aefe`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `47ad2d815c01fabd77d3de1b202edbad117d1736`.
3. Verify `main` is an ancestor of the candidate and topic tip is exactly `d10bac62...`.
4. Fast-forward `main` only to that exact SHA. No merge commit, rebase, amendment, or extra source changes.
5. Push `main` and verify remote SHA.
6. Verify GitHub Pages deployment for that SHA succeeds.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion/deployment evidence and stop.

Do not delete the topic branch yet and do not begin another phase.

Final Reviewer closeout boundary:

- verify promoted `main`;
- verify live Pages visibly shows Pressed / Selected / Focused with the same outer-ring treatment;
- verify native Button Pressed and keyboard Focus behavior;
- if clean, authorize topic-branch deletion and accept this work area.
