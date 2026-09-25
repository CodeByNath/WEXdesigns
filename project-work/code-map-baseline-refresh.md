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


## Reviewer review — 2026-09-25

**Proceed with safeguards**

Independent review verified candidate `docs/code-map-baseline-refresh` at
`ccf4b387aaa31dc9481c87b032fe5240b3b6d6fa` is exactly one commit ahead of
accepted `main` and changes only the seven authorised Code Maps.

The baseline-SHA refresh and newly added recent-work metadata are within scope.
No WEX source, schema, UI, application, Foundation, ADR, or runtime file changed.

One stale-state defect remains in
`docs/code-map/typography-font-delivery.md`: after declaring verification
against accepted `main`, the Modularisation verification section still says
"Typography Pages work remains subject to Reviewer acceptance of this
candidate". Repository Governance + Pages Separation is already ACCEPTED and
closed, so that sentence is no longer valid navigation evidence.

### Builder correction

Status: BUILDER ACTION REQUIRED

On the SAME topic branch only:

1. Correct/remove that obsolete pending-candidate statement so the Typography
   map describes the accepted current state without inventing new authority.
2. Scan all seven refreshed maps for equivalent stale phrases such as pending
   candidate/reviewer acceptance or deleted feature-branch state; change only
   evidence that is demonstrably stale.
3. Do not alter product authority, source paths, dependency boundaries, visual
   values, architecture, or any non-Code-Map file.
4. Run `git diff --check`, the stale-state scan, and `pnpm check`.
5. Commit and push the bounded correction, then update this SAME work file to
   `Status: AWAITING REVIEWER REVIEW` with the new exact SHA and evidence.
6. Stop for Reviewer.

Do not promote to `main` yet.

## Builder correction handoff

- Candidate: `origin/docs/code-map-baseline-refresh` at `bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`.
- Changed only: `docs/code-map/typography-font-delivery.md`; it now describes
  the accepted main-baseline Typography presentation and preserves the existing
  WEX-authority route for future changes.
- Evidence: `git diff --check`; stale-state scan of all seven refreshed maps
  (no other pending-candidate, reviewer-acceptance, or feature-branch state);
  `pnpm check` passed (Foundation audit plus 35 Turbo checks).
- Deviation: Turbo repeated the existing `pnpm-lock.yaml` discovery warning,
  but completed successfully. Unresolved findings: none.


## Reviewer acceptance — 2026-09-25

**Proceed**

Independent review accepts candidate `origin/docs/code-map-baseline-refresh` at
`bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`.

Verified:
- topic branch is two commits ahead of accepted `main` and not behind;
- only the seven authorised Code Maps differ from baseline;
- the correction commit changes only
  `docs/code-map/typography-font-delivery.md`;
- the obsolete pending-Reviewer statement is replaced with accepted-current-state
  wording that preserves WEX authority routing;
- no WEX source, schema, UI, application, Foundation, ADR, runtime, or product
  authority changed;
- Builder reports `git diff --check`, stale-state scan, and `pnpm check`
  passing; no unresolved findings were reported.

### Builder closeout

Phase: 2 — Promote and close

1. Promote the accepted topic branch to `main` using the repository's normal
   non-destructive merge path; do not alter the accepted candidate content.
2. Verify the resulting exact remote `main` SHA and confirm the seven Code
   Maps are present there.
3. Run/confirm the required post-promotion repository checks.
4. Delete the completed remote topic branch after proving `main` contains the
   accepted work, preserving only `main` and `Project-work-instructions`.
5. Update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with the
   final main SHA, check evidence, and branch-housekeeping evidence.
6. Stop for final Reviewer closeout.

No further Code Map content changes are authorised in this phase.

## Builder closeout handoff

- Promoted `origin/main`: `bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`.
- Main is the accepted candidate tip; its two promoted commits change only the
  seven authorised Code Maps. Post-promotion `pnpm check` passed (Foundation
  audit plus 35 Turbo checks), as did `git diff --check`.
- Containment was proven with `git merge-base --is-ancestor
  origin/docs/code-map-baseline-refresh origin/main` before deletion.
- Remote topic branch `docs/code-map-baseline-refresh` was deleted. Verified
  remaining remote heads: `main` at `bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`
  and `Project-work-instructions` at
  `87f11081477e33aead1219c0b5225b0688c9598f`.
- Deviation: Turbo repeated the existing `pnpm-lock.yaml` discovery warning,
  but completed successfully. Unresolved findings: none.
