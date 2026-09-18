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

## Authority routing

- Start durable repository-wide rules and their scope at [Foundation](docs/foundation/README.md).
- Use the [Code Map](docs/code-map/README.md) to navigate demonstrated subjects to their verified authority, source, tests, dependency paths, and safe change routes.
- Read [architecture](docs/architecture/) and [accepted decisions](docs/decisions/) for the technical and decision authority they own; inspect current source for implementation truth.
- For controlled work, follow `origin/Project-work-instructions` and its single active work file.
- For defined cycle triggers, use the WeeraX Project Cycle Skill when it is available; otherwise follow this file's cycle bootstrap and the routed workflow authority.

This index routes agents to downstream authority. It does not restate that authority or its procedures.
