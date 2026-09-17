# Repository Cycle Bootstrap

Status: BUILDER ACTION REQUIRED  
Phase: Bootstrap — Add root cycle entrypoint on `main`

## Reviewer Decision

The durable fix is simple:

- root `AGENTS.md` on `main` is the cycle entrypoint;
- `Project-work-instructions/project-work/AGENTS.md` is the workflow authority;
- active work files under `project-work/` define the current task.

This file is the **single active work file** until the root entrypoint is accepted. Button work remains paused.

## Authorised Builder Action

Create a small isolated work branch from current `origin/main` containing **only** a new root `AGENTS.md`.

The root `AGENTS.md` must say, in substance:

1. This repository is `CodeByNath/WEXdesigns` and is independent from sibling repositories.
2. On `run the cycle`, `continue the work`, `review the latest work`, or equivalent, do not interpret the request as `pnpm check` or another package script.
3. First fetch `origin/Project-work-instructions`.
4. Read, from that branch:
   - `project-work/AGENTS.md`
   - `project-work/PROJECT-RULES.md` when relevant
   - the single active work file under `project-work/`
5. Follow the active file's `Status`, `Phase`, actor, scope, exclusions, evidence requirements, and next action literally.
6. Builder may not self-approve, self-advance, invent new work, or merge to `main` without Reviewer instruction.
7. After authorised work, Builder must commit and push the work branch to `origin`, report branch/SHA/evidence, then stop for Reviewer.
8. Product/system authority remains repository architecture, accepted ADRs, historical WEX source, and verified implementation. The root `AGENTS.md` is workflow bootstrap only.

Do not add WEX architecture, Button rules, component rules, or domain rules to root `AGENTS.md`.

## Branch / Handoff

- Branch from `origin/main`.
- Change only root `AGENTS.md`.
- Commit and push the branch to `origin`.
- Do not modify or merge `main`.
- Report exact branch name, pushed SHA, and exact `AGENTS.md` content.
- Stop for Reviewer.

After Reviewer accepts this bootstrap and it reaches `main`, future fresh Builder sessions should discover the cycle correctly without a corrective prompt.
