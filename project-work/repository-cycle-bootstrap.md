# Repository Cycle Bootstrap

Status: BUILDER ACTION REQUIRED  
Phase: Bootstrap — Make cycle instructions discoverable from `main`

## Active Work Rule

This is the **single active work file**. All other work areas, including Button, are paused until Reviewer accepts this bootstrap and explicitly reactivates them.

## Reviewer Assignment

Reviewer authorises Builder to add the minimum repository-level instruction needed so a Builder opened on `main` understands `run the cycle` without a separate explanatory prompt.

Current problem: `main` has no root `AGENTS.md`, so a Builder can inspect README/package scripts and incorrectly interpret `run the cycle` as `pnpm check` instead of the WeeraX Project Cycle.

## Authorised Change

Add a concise root `AGENTS.md` on `main` that is workflow/bootstrap guidance only. It must:

- state this repository is independent from sibling repositories;
- state that `run the cycle`, `continue the work`, `review the latest work`, or equivalent mean the WeeraX Project Cycle;
- require fetching/reading `origin/Project-work-instructions` before normal project work;
- require reading `project-work/AGENTS.md`, `project-work/PROJECT-RULES.md` when relevant, and the single active work file;
- require following the active file's `Status`, `Phase`, scope, exclusions, and actor literally;
- state that package validation such as `pnpm check` is only a phase step when required, never the meaning of `run the cycle`;
- state Builder cannot self-approve, self-advance, invent new work, or ask the user to choose the next task after completion;
- state only Reviewer may approve/refuse work, pass new Builder work, reactivate paused work, or advance/defer phases;
- state product/system authority remains repository architecture, ADRs, historical WEX source, and verified implementation; the root `AGENTS.md` must not become WEX architecture authority.

Do not modify product architecture, WEX source, package manifests, lockfiles, or Button implementation as part of this bootstrap.

## Completion Behaviour

After completing the authorised task, Builder must:

1. run only the checks required for this bootstrap;
2. commit and push the change;
3. report the exact commit SHA, changed files, checks/evidence, and any deviation;
4. stop immediately;
5. not ask the user what to build next;
6. not start Button or any other work;
7. wait for Reviewer to inspect the pushed state and issue the next instruction through `Project-work-instructions`.

## Evidence Required

Builder must provide:

- commit SHA on the implementation branch;
- exact `AGENTS.md` contents;
- confirmation no other source files changed;
- confirmation a fresh Builder session on `main` would encounter root `AGENTS.md` before interpreting `run the cycle`.

Stop after pushing this bootstrap change. Reviewer will inspect and either approve/refuse it. Button work remains paused until this bootstrap is accepted.
