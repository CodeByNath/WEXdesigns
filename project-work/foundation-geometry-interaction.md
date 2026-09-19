# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Implement accepted ADR 0010 foundation geometry and Button reconciliation

## Reviewer Verdict

**Proceed**

Reviewer independently verified the completed authority-branch closeout.

- `main` remains exactly `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.
- `docs/foundation-geometry-interaction-authority` is no longer present remotely.
- `main`, `Project-work-instructions`, and `review/button-local-recovery` remain.
- The closeout introduced no implementation change.

## Authority

- `docs/decisions/0010-foundation-geometry-interaction.md`
- Existing Button authority in ADRs 0005 and 0006 except where ADR 0010 explicitly supersedes geometry.
- Existing colour authority in ADR 0004 except disabled opacity superseded by ADR 0010.
- Current main foundation source and tests.

## Verified implementation gap on main

Current source still reflects the pre-ADR geometry:
- Button base border is `1px`, radius is `0`.
- Button tier geometry is `32 / 40 / 48px` with old tier padding.
- Focus uses the existing Button-local outline geometry.
- Universal disabled opacity is still `0.1`.
- Existing tests assert the superseded Button geometry.

## Builder implementation scope

Implement only the accepted ADR 0010 presentation recovery:

1. Add reusable WEX radius tiers: `4 / 8 / 12px`.
2. Add reusable structural/state geometry required by ADR 0010:
   - default structural border `1px`;
   - Focused and Selected outer treatment `2px`;
   - shared outside gap `2px`;
   - no layout shift.
3. Change universal disabled opacity to `--wex-opacity-disabled: 0.2`, applied once at the outermost disabled component.
4. Reconcile Button:
   - stable `2px` boundary in every appearance/state, transparent where visually borderless;
   - Small / Default / Large radius consumption `4 / 8 / 12px`;
   - minimum heights `36 / 40 / 44px`;
   - padding `4px` block / `12px` inline;
   - direct-content relationship gap `4px`;
   - Focused consumes reusable outer-ring geometry;
   - ordinary Button remains non-selectable.
5. Update deterministic tests to assert the new authority.
6. Update the existing System Settings showcase only as needed to reflect the changed foundation and support browser verification.

## Exclusions

Do not add new Button variants, Selected support to ordinary Button, schemas, shared UI abstractions, runtime/business logic, theme editing, tenant overrides, new component families, or unrelated catalogue work.

## Required evidence

- exact topic branch/SHA and changed files;
- `git diff --check`;
- relevant WEX/runtime checks and tests;
- browser validation of light/dark, all Button tiers/variants, hover/pressed/focus/disabled, and compact layout;
- no layout shift from Focused outer treatment;
- handoff back as `AWAITING REVIEWER REVIEW`.

Stop at that boundary. Do not promote to `main`.
