# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote corrected Button perimeter-state candidate to main

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected:
`origin/feat/foundation-geometry-interaction` at
`5e13a35318704c2df15e39b807650af05a22c498`.

## Accepted state construction

The candidate now implements the clarified Button perimeter rule correctly.

### Default

- normal Button boundary = `1px`;
- normal variant-specific border colour remains authoritative.

### Pressed / Focused / Selected reference

The shared state treatment now occupies the same fixed Button perimeter:

1. the existing `1px` Button border changes to `--wex-outer-ring-color`;
2. `--wex-outer-ring-inner-width` supplies the remaining `1px` immediately inside that border;
3. together those form the visible `2px` state boundary at the Button perimeter;
4. the shared `2px` visual separation begins only after that state boundary;
5. the Button surface/content continues inward.

There is no normal/neutral border visible outside the state boundary, no detached smaller blue rectangle, no positive outline offset, and no increase in external width or height.

Pressed and Focused on real Buttons use this exact treatment. The Selected System Settings reference uses the identical visual construction without adding Selected semantics to ordinary command Button.

## Preserved invariants

- external Button dimensions remain fixed;
- Small / Default / Large minimum heights remain `36 / 40 / 44px`;
- ordinary Button radius remains Default `8px`;
- padding, typography, variant colour mappings and disabled behaviour remain unchanged;
- Pressed remains transient native `:active`;
- Focused remains accessibility focus;
- ordinary command Button remains non-selectable;
- no `aria-pressed`, Toggle Button contract, schema or shared-UI selection change.

Compared with current `main` `ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`, candidate is exactly one commit ahead.

Builder evidence reports passing:

- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 6/6)
- light/dark local Chrome screenshots show continuous state perimeter with no exterior neutral edge;
- Small / Default / Large measured `63.75×36`, `80.515625×40`, `77.125×44` in state and default;
- 200% zoom shows no overflow/layout shift.

## Promotion safeguard

Promote only exact candidate SHA:
`5e13a35318704c2df15e39b807650af05a22c498`.

Builder must:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still `ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`.
3. Verify `main` is an ancestor of the exact candidate.
4. Fast-forward `main` only to `5e13a353...`; no merge commit, rebase, amendment, or extra source change.
5. Push and verify remote `main` at that exact SHA.
6. Verify GitHub Pages deployment succeeds for that SHA.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with promotion/deployment evidence and stop.

Do not delete the topic branch or begin another phase.

Final Reviewer closeout:
- verify promoted `main`;
- verify live Pages shows the same fixed Button perimeter for Default vs Pressed/Focused and the matching Selected reference;
- if clean, authorize topic-branch deletion and accept this work area.
