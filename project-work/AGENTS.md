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
