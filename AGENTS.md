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

Authority is scoped: Foundation owns durable repository-wide rules and invariants within each Foundation document's stated scope; [architecture](docs/architecture/) and accepted ADRs retain WEX technical/system and decision authority within their scopes; historical WEX source and verified implementation remain authority or evidence within their established scopes. This file is a workflow bootstrap and router only; it does not define a universal precedence rule.

## Authority routing

- Start durable repository-wide rules and their scope at [Foundation](docs/foundation/README.md). For file length, remote-branch capacity, and Code Map operating rules, read [Repository governance](docs/foundation/repository-governance.md) before acting.
- Use the [Code Map](docs/code-map/README.md) as the first operating stop for a demonstrated subject. It navigates to verified authority, source, tests, dependency paths, and safe change routes; it is not independent product authority.
- For Heading DNA navigation and its unresolved registration gates, start at the [Heading DNA Code Map](docs/code-map/heading-dna.md). It routes existing evidence and Owner decisions; it does not register DNA or define values.
- Read [architecture](docs/architecture/) and [accepted decisions](docs/decisions/) for the technical and decision authority they own; inspect current source for implementation truth.
- For controlled work, follow `origin/Project-work-instructions` and its single active work file.
- For defined cycle triggers, use the WeeraX Project Cycle Skill when it is available; otherwise follow this file's cycle bootstrap and the routed workflow authority.

This index routes agents to downstream authority. It does not restate that authority or its procedures.
