# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Branch housekeeping before WEX Foundation Code Maps

## Reviewer Verdict

**Proceed with safeguards**

Foundation Phase 1 is accepted. The next work is authorised only in the sequence below.

## Phase 0 — Repository branch housekeeping

Before creating another topic branch:

1. Fetch current remote state and verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Inventory remote branches and compare each historical work branch with current `main`.
3. Classify branches as:
   - safely merged/contained in `main`;
   - still required/unmerged;
   - uncertain.
4. Delete only remote topic branches proven fully merged/contained and no longer required.
5. Never delete `main` or `Project-work-instructions`.
6. Do not delete uncertain/unmerged branches. Report them for Reviewer decision.
7. Do not create the new Code Map topic branch yet.
8. Update this file with exact branch inventory, deletions, retained branches, evidence, and any uncertainty; then stop for Reviewer.

The repository now permits only one active implementation/topic work branch at a time under the coordination workflow.

## Planned Phase 1 — WEX Foundation Code Maps

This phase is **not yet executable** until Phase 0 is reviewed.

After housekeeping acceptance, Builder may be authorised to audit current `main` and create Code Maps only for demonstrated WEX foundation systems already present in source.

Expected subjects, subject to source verification:

- Colour — `packages/wex/src/foundations/colour.css`
- Typography/font delivery — `font-family.css`, `typography.css`, and current WEX font package dependency
- Spacing — `spacing.css`; padding is usage of spacing authority, not a separate token authority unless source proves otherwise
- Interaction/focus — `interaction.css`
- Layout — `layout.css`
- Sizing/tier system — `sizing.css`, only to the extent current authority/source supports a meaningful map

Do not invent a Geometry/Border/Radius map unless independent demonstrated authority/source exists beyond component-local rules.

Each map must follow ADR 0009: navigation only, with verification metadata, authority links, actual source/tests/checks, dependency path, safe change routing, and no duplicated token tables/contracts.

## Planned Phase 2 — Button map integration

Only after the new Foundation maps are accepted:

- update `docs/code-map/button-system.md` to link to the accepted foundation maps it consumes;
- do not duplicate spacing, colour, typography, focus, layout, or geometry values in the Button map;
- refresh Button map verification metadata against the then-current `main`.

## Exclusions

Do not modify WEX source, Button source, schemas, UI, adapters, applications, CI/tooling, Foundation rules, ADRs, or external repositories during these documentation phases.
