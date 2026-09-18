# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — Repository branch housekeeping

## Reviewer Verdict

**Proceed with safeguards**

Foundation Phase 1 is accepted. The next work is authorised only in the sequence below.

## Phase 0 Handoff — Repository branch housekeeping

Verified `origin` as `https://github.com/CodeByNath/WEXdesigns.git` and compared all remote topic tips with `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`.

Deleted as fully contained in `main` and no longer active:

- `chore/root-cycle-entrypoint` — `0af842c66028f48659d74c870186a74deff4031c`
- `designmaster/core-colour-tokens` — `2d2da65f64aec299e8245371e56f712296098177`
- `designmaster/ibm-plex-font-delivery` — `e5a3a858ee480699939af8bdf41ed772f2bb6651`
- `designmaster/inversion-ready-colours` — `ae800c07d30a4ee3bcab1e772c4f72a345b6f892`
- `docs/button-authority-proposal` — `fd3c6e791ae1bb77a00ca1eb6130df788d9c7e4d`
- `docs/button-geometry-authority` — `ced2d01029f531f3acc6fba370f765ecf0a6bbe9`
- `docs/button-runtime-invocation-authority` — `6be2adc7214ec1c22dada90c5e94852c6bf9bef9`
- `docs/button-semantic-action-authority` — `e565749bfbbfbc7957d4f6c23db96dc3080dd643`
- `docs/foundation-studio-operating-model` — `b701a9d497442cf714c7ecbd39ee8660635d6f11`
- `docs/guidance-minimum-structure` — `5b558bf3c06576660c5dc7cf8cbbfb70e0536845`
- `docs/repository-guidance-architecture` — `af72a2f5f645786665e84b87b7c5490bb7481a88`
- `feat/button-action-schema-migration` — `d56338bdd0d3575a570b38f63aa0675ddb65df45`
- `feat/button-foundation-slice` — `46bdaf04ac1e90d49b908417321d9363888e6970`
- `feat/button-geometry-slice` — `f514db3d9894ad277aacdea9fcbcc2704c6618c0`

Retained:

- protected `main` — `b701a9d497442cf714c7ecbd39ee8660635d6f11`
- protected `Project-work-instructions` — `e4da214f1984504c20cc10e434756f8fbe0980b0` at inventory time
- unmerged `review/button-local-recovery` — `19795644f033f43a7ebb99617d748fdce2c7e1ea`; divergence from `main` was 21 main-only commits and one recovery-only commit, so it was not safe to delete.

Evidence: pre-deletion `git branch -r --merged origin/main` contained every deleted topic tip; `--no-merged` contained only the protected coordination branch and the recovery branch. After deletion and prune, the only remote branches were `main`, `Project-work-instructions`, and `review/button-local-recovery`. Uncertainty: none; the unmerged recovery branch is retained for Reviewer decision. No new topic branch was created.

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
