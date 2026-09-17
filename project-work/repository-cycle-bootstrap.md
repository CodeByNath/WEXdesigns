# Repository Cycle Bootstrap / Recovery

Status: BUILDER ACTION REQUIRED  
Phase: Recovery — Preserve unreviewed local Button work for Reviewer audit

## Reviewer Decision

Builder has already completed substantial Button work locally beyond the authorised bootstrap/authority-resolution scope. Do **not** delete, rewrite, continue, merge, or push that work to `main`.

The immediate task is evidence preservation only so Reviewer can inspect the actual implementation safely.

This file is the **single active work file**. `project-work/button-system.md` remains paused until Reviewer completes this recovery audit.

## Authorised Recovery Action

From the local WEXdesigns repository only:

1. Stop all implementation work.
2. Confirm the repo is `CodeByNath/WEXdesigns` and record current branch/base SHA.
3. Record `git status --short` and the full changed-file list.
4. Create a dedicated recovery branch from the current local state, preserving the working tree. Use a clearly isolated name such as `review/button-local-recovery`.
5. Do not alter source content while preparing the branch.
6. Before commit, exclude only machine/generated artifacts that are not intended repository source, such as `node_modules`, caches, temporary files, `.env` secrets, editor state, or an unintended generated lockfile. Do not "clean up" implementation code.
7. Commit the preserved repository changes exactly as they stand.
8. Push the recovery branch to `origin`.
9. Do **not** merge, rebase onto `main`, open a merge commit, or change `main`.
10. Stop immediately after the push.

## Required Evidence

Report:

- recovery branch name;
- base `origin/main` SHA the local work started from;
- recovery commit SHA;
- exact changed-file list;
- `git status --short` after commit;
- confirmation `origin/main` was not changed;
- confirmation no sibling repository was touched;
- confirmation no additional Button implementation was performed during recovery.

Do not ask the user what to do next. Reviewer will inspect the pushed recovery diff and decide what can be accepted, corrected, split, or rejected.
