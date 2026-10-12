---
name: wex-platform-architecture
description: Use when designing, implementing or reviewing WEX shells, UI composition, tokens, schemas, adapters, Logo/Header bindings, or other WEX presentation changes. Routes agents to authoritative WEX sources before work; never invents architecture.
---

# WEX architecture authority router

Before any WEX change, read root `AGENTS.md`, the active `Project-work-instructions` phase and relevant accepted repository sources. This skill does not supersede those files and does not govern the project cycle.

## Authority read order

1. `docs/foundation/README.md` for scoped repository standards and limits.
2. `docs/architecture/` and `docs/decisions/` (accepted ADRs) for WEX system and presentation boundaries.
3. Relevant `docs/code-map/` for actual entry points.
4. Relevant `packages/wex/`, `packages/schemas/`, `packages/ui/`, `packages/adapters/` and `apps/` implementation on the authoritative branch.

## Boundaries

- WEX owns registered presentation; never invent CSS values, tokens, geometry, interaction variants or inline styles.
- Serializable schema/composition defines what is placed; domain/adapters define what is allowed and supply values; shared UI renders approved structure; applications assemble runtime.
- A shell does not own mounted components' data or internals; do not invent identity or dynamic slot registration APIs that source does not support.
- A new abstraction requires a real product forcing case. Never import QSD or CompuZign domain rules as WEX rules.
- No agent can self-authorise an exception. Owner-only override, independent Reviewer.
- Backend data-delivery completion and WEX consumer/rendering completion are independently bounded unless an actual accepted contract requires otherwise.

Follow existing `run the cycle` with `BUILDER`, `BUILDER:CODER`, `BUILDER:DESIGNER` or `REVIEWER` assigned in work instructions. This skill is not another cycle.
