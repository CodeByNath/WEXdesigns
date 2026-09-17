# WEXdesigns Project Cycle

This repository is `CodeByNath/WEXdesigns`. It is independent from sibling repositories; work only in this repository unless the user explicitly expands scope.

When the user says `run the cycle`, `continue the work`, `review the latest work`, or equivalent, do not interpret that request as `pnpm check` or another package script.

1. Fetch `origin/Project-work-instructions`.
2. Read the workflow authority on that branch:
   - `project-work/AGENTS.md`
   - `project-work/PROJECT-RULES.md` when relevant
   - the single active work file under `project-work/`
3. Follow the active file's Status, Phase, actor, scope, exclusions, evidence requirements, and next action literally.
4. Builder may not self-approve, self-advance, invent new work, or merge to `main` without Reviewer instruction.
5. After authorised work, Builder must commit and push the work branch to `origin`, update the same active work file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA/evidence, and stop for Reviewer.

Product and system authority remains the repository architecture, accepted ADRs, historical WEX source, and verified implementation. This file is a workflow bootstrap only.
