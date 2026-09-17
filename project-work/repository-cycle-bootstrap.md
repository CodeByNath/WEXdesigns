# Repository Cycle Bootstrap

Status: BUILDER ACTION REQUIRED  
Phase: Bootstrap — Make cycle instructions discoverable from `main`

## Reviewer Assignment

Reviewer authorises Builder to add the minimum repository-level instruction needed so a Builder opened on `main` understands `run the cycle` without a separate explanatory prompt.

Current problem: `main` has no root `AGENTS.md`, so a Builder can inspect README/package scripts and incorrectly interpret `run the cycle` as `pnpm check` instead of the WeeraX Project Cycle.

## Authorised Change

Add a concise root `AGENTS.md` on `main` that is workflow/bootstrap guidance only. It must:

- state this repository is independent from sibling repositories;
- state that `run the cycle`, `continue the work`, `review the latest work`, or equivalent mean the WeeraX Project Cycle;
- require fetching/reading `origin/Project-work-instructions` before normal project work;
- require reading `project-work/AGENTS.md`, `project-work/PROJECT-RULES.md` when relevant, and the active work file;
- require following the active file's `Status`, `Phase`, scope, exclusions, and actor literally;
- state that package validation such as `pnpm check` is only a phase step when required, never the meaning of `run the cycle`;
- state Builder cannot self-approve, self-advance, or invent new work;
- state only Reviewer may approve/refuse work, pass new Builder work, or advance/defer phases;
- state product/system authority remains repository architecture, ADRs, historical WEX source, and verified implementation; the root `AGENTS.md` must not become WEX architecture authority.

Do not modify product architecture, WEX source, package manifests, lockfiles, or Button implementation as part of this bootstrap.

## Evidence Required

Builder must provide:

- commit SHA on the implementation branch;
- exact `AGENTS.md` contents;
- confirmation no other source files changed;
- confirmation a fresh Builder session on `main` would encounter root `AGENTS.md` before interpreting `run the cycle`.

Stop after pushing this bootstrap change. Reviewer will inspect and either approve/refuse it. Button work remains paused until this bootstrap is accepted.
