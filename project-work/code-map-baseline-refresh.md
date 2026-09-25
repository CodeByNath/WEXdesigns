# Code Map Baseline Refresh

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Verify and refresh demonstrated Code Maps

## Reviewer verdict

**Proceed**

Open a documentation-only refresh against accepted `main` at:

`daf45d1d2138115db766d1011013817647ff24c7`

## Scope

Create one topic branch from the accepted `main` baseline, within the three-remote-branch limit.

Audit every demonstrated subject map listed by `docs/code-map/README.md`:

- `colour.md`
- `typography-font-delivery.md`
- `interaction-focus.md`
- `button-system.md`
- `spacing.md`
- `layout.md`
- `sizing-tier-system.md`

For each map, inspect the linked authority, source paths, focused checks, dependency boundary, and safe-change route against the accepted `main` tree.

Refresh navigation evidence where required:
- Last visited;
- Last updated only when the map content changes;
- exact verified branch/ref and SHA;
- newest-first recent work where materially relevant;
- stale/moved source, test, authority, or related-document links;
- dependency or safe-change routing only when current repository evidence proves the existing map stale.

Use the accepted `main` SHA as the final verification baseline after inspection. Do not merely replace old SHAs without verifying the mapped paths and boundaries.

## Exclusions

Do not change:
- WEX CSS or visual values;
- schemas, UI, adapters, catalogue, or applications;
- runtime/navigation presentation;
- architecture or ADR decisions;
- Foundation rules;
- tests except if a documentation-only verification command requires no source modification;
- deferred Shadows or Loading/Skeleton/Shimmer authority;
- component architecture.

Do not invent missing authority. Record any discovered authority gap and stop that item rather than resolving it inside this refresh.

## Required evidence

Builder must:
1. verify remote heads before creating the topic branch;
2. inspect each mapped path on accepted `main`;
3. provide the exact changed-file list and why each map changed;
4. run the repository checks appropriate to documentation-only work, including `pnpm check` if available on the execution surface;
5. confirm no non-Code-Map source files changed;
6. commit and push the topic branch;
7. update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with branch, SHA, checks, deviations, and unresolved findings;
8. stop for Reviewer.

If any map requires a product/architecture decision rather than evidence correction, leave that map unchanged and report the gate.

## Builder handoff

- Candidate: `origin/docs/code-map-baseline-refresh` at `ccf4b387aaa31dc9481c87b032fe5240b3b6d6fa`.
- Baseline inspected: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`.
- Changed only: `docs/code-map/colour.md`, `typography-font-delivery.md`,
  `interaction-focus.md`, `button-system.md`, `spacing.md`, `layout.md`, and
  `sizing-tier-system.md`. All seven now record the verified main ref; stale
  feature-branch or superseded-SHA evidence was removed. Button, Spacing, and
  Sizing now use the current operating-status format with relevant recent work.
- Checks: `git diff --check`; mapped-path existence inspection; stale-ref scan;
  `pnpm check` passed (Foundation audit plus 35 Turbo checks).
- Deviation: Turbo reported its existing `pnpm-lock.yaml` discovery warning,
  but completed successfully.
- Unresolved findings: none; no authority, dependency, safe-routing, or
  source-path changes were evidenced, so none were invented.
