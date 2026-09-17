# Project Work Protocol

Before any project work:

1. Check and sync the `Project-work-instructions` branch first.
2. Read `project-work/AGENTS.md`.
3. Read `project-work/PROJECT-RULES.md` when architecture or authority is relevant.
4. Read the single active work file and follow its current status literally.
5. Read the relevant authoritative `main`-branch documentation and implementation before acting.
6. Determine whether `BUILDER` or `REVIEWER` owns the next action.
7. Work only on the active phase.
8. Builder implements; Reviewer independently audits.
9. Do not advance until the current phase is accepted or explicitly deferred by the Reviewer.
10. Never treat `Project-work-instructions` as product architecture authority.

## Cycle Trigger Meaning

For this repository, `run the cycle`, `continue the work`, `review the latest work`, or equivalent always mean the **WeeraX Project Cycle**, not a package-manager validation command.

On those triggers, first fetch/read `origin/Project-work-instructions`, identify the single active work file and its `Status`/`Phase`, determine the current actor, and execute only the authorised next action. `pnpm check`, tests, builds, audits, or other validation are phase steps only when required; they are never a substitute for the project cycle.

## Roles

Roles are governance roles, not model/vendor names.

**Builder**
- May edit authorised source only when the active work file assigns Builder action.
- Must obey phase, scope, exclusions, architecture gates, and required evidence.
- Must not self-approve, self-advance, invent the next phase, widen scope, merge to `main`, or begin unrelated work.

**Reviewer**
- Independently inspects actual pushed source, diff, and evidence; Builder reports are pointers only.
- Only Reviewer may approve/refuse submitted work, assign new Builder work, change active phase/status, or mark work accepted/deferred.
- Reviewer does not implement the Builder's source correction.

## Builder Source-Push Handoff

When Builder completes an authorised task or reaches the authorised phase boundary:

1. run the checks required by the active work file;
2. commit the completed authorised work on the approved topic/work branch;
3. push that branch to `origin`;
4. verify the remote branch contains the pushed commit;
5. update the SAME active work file on `Project-work-instructions` to `Status: AWAITING REVIEWER REVIEW` and record the exact remote branch/SHA plus required evidence;
6. report the branch, pushed SHA, changed-file list, checks, limitations/deviations, and unresolved issues;
7. stop for Reviewer.

A local commit, local branch, passing local tests, browser verification, or Builder summary is not a completed handoff. The Reviewer must be able to inspect the pushed remote candidate.

When status is `AWAITING REVIEWER REVIEW`, Builder must not continue implementation or ask the user to choose the next task. Wait for Reviewer action.

## Reviewer Handoff Decision

When the active work file says `AWAITING REVIEWER REVIEW`, Reviewer must independently inspect the pushed candidate and update that SAME work file with one permitted verdict:

- `Proceed`
- `Proceed with safeguards`
- `Stop — architectural risk`

If corrections are required, Reviewer records the bounded Builder instruction in the same work file and changes status back to `BUILDER ACTION REQUIRED`. If accepted, Reviewer records the next authorised state/phase. A review completed only in chat does not change project state.

## Work File Discipline

- Keep one work area in one active work file until accepted or deferred.
- Keep active files normally under roughly 600 words.
- Repository/product rules come from authoritative project documentation and verified implementation, never from this coordination branch.
- Never import product rules from another project.

## Status Vocabulary

Use explicit ownership states:

- `BUILDER ACTION REQUIRED`
- `AWAITING REVIEWER REVIEW`
- `BLOCKED — DECISION REQUIRED`
- `ACCEPTED`
- `DEFERRED`

The active work file may define additional phase-specific statuses, but a completed Builder source handoff must use `AWAITING REVIEWER REVIEW` before Reviewer acts.
