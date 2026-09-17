# Project Work Protocol

Before any project work:

1. Check the `Project-work-instructions` branch first.
2. Read `project-work/AGENTS.md`.
3. Read `project-work/PROJECT-RULES.md` when architecture or authority is relevant.
4. Read the active work file and follow its current status literally.
5. Read the relevant authoritative `main`-branch documentation and implementation before acting.
6. Determine whether `BUILDER` or `REVIEWER` owns the next action.
7. Work only on the active phase.
8. Builder implements; Reviewer independently audits.
9. Do not advance until the current phase is accepted or explicitly deferred by the Reviewer.
10. Never treat `Project-work-instructions` as product architecture authority.

## Cycle Trigger Meaning

For this repository, phrases such as `run the cycle`, `continue the work`, `review the latest work`, or equivalent always mean the **WeeraX Project Cycle**, not the package-manager validation command.

On those triggers, Builder must first fetch/read `origin/Project-work-instructions`, identify the active work file and its `Status`/`Phase`, determine the current actor, and execute only the authorised next action. `pnpm check`, tests, builds, audits, or other validation are steps inside a phase only when the active work file requires them; they are never a substitute for running the project cycle.

Roles are `BUILDER` and `REVIEWER`, not model-specific names.

- Builder may edit authorised source only when the active work file assigns Builder action.
- Reviewer independently inspects verifiable source, diffs, and evidence; Reviewer does not implement source corrections.
- Builder must not self-approve, self-advance, invent the next phase, or widen scope.
- Only the Reviewer may approve or refuse submitted work, issue the permitted phase verdict, assign new Builder work, change the active phase, or mark work accepted/deferred.
- Builder reports are evidence pointers only; they do not change project state until the Reviewer records the decision in the active work file.
- Keep one work area in one active work file instead of creating a new file for every correction round.
- Active work files should normally remain under roughly 600 words.
- Repository and product rules come from authoritative project documentation and verified implementation, never from this coordination branch.
- Never import product rules from another project.

## Builder Completion and Push Rule

When Builder completes an authorised task or reaches the authorised phase boundary, the work must not remain only on the local machine.

Builder must:

1. run the checks required by the active work file;
2. commit the completed authorised work on the current approved work branch;
3. push that work branch to `origin`;
4. verify the remote branch contains the pushed commit;
5. report the exact branch name, pushed commit SHA, changed-file list, and check/test results;
6. stop for Reviewer inspection.

Builder must not merge the work into `main`, move `main`, delete the work branch, or start the next phase unless Reviewer explicitly authorises it.

A local commit, local branch, passing local tests, browser verification, or Builder summary is not a completed handoff. The Reviewer must be able to inspect the pushed remote branch and commit before approval or refusal.

After handing off, Builder must not ask the user to choose the next task. Wait for Reviewer instruction through the active work file.
