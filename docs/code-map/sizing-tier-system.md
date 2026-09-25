# Sizing and Tier System

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`

### Recent work (newest first)

- `d99b1d5` (2026-09-25) preserved the ordered Typography modules, a demonstrated tier consumer.
- `5e13a35` (2026-09-20) placed Button states on the registered perimeter without changing the global tier boundary.

## Purpose and scope

This map navigates the demonstrated global WEX tier system across historical authority, its intentionally value-free sizing foundation, the serializable schema, and current consumers. It does not create numeric global sizing values or a separate geometry authority.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Composition architecture](../architecture/composition-architecture.md)
- [Dependency rules](../architecture/dependency-rules.md)
- [ADR 0006: Button Geometry Authority](../decisions/0006-button-geometry-authority.md) for one component's tier interpretation only

## Source and focused verification

- Tier boundary: [`packages/wex/src/foundations/sizing.css`](../../packages/wex/src/foundations/sizing.css)
- Serializable tier contract: [`packages/schemas/src/composition/wex-tier.schema.ts`](../../packages/schemas/src/composition/wex-tier.schema.ts)
- Schema checks: [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Repository tier and dependency audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)
- Demonstrated presentation consumers: [`packages/wex/src/foundations/typography.css`](../../packages/wex/src/foundations/typography.css), [`packages/wex/src/foundations/buttons.css`](../../packages/wex/src/foundations/buttons.css)

## Dependency path and boundary

```text
historical WEX tier authority
  -> @weerax/wex sizing boundary
  -> @weerax/schemas serializable tier contract
  -> authorised WEX component/type interpretations
```

The global tier language is shared, while each authorised component defines what a tier means for that component. The sizing foundation deliberately adds no unsupported numeric values, and schemas do not depend on WEX CSS.

## Safe change routing

- Treat changes to the global tier language or inheritance model as architecture/authority changes before editing source or schema.
- Route a component's tier measurements through that component's authority; do not promote them into global sizing values without independent evidence.
- Update schema, affected WEX consumers, and focused checks together while preserving the dependency direction.
- Do not create a Geometry/Border/Radius map unless future accepted authority and reusable source establish it as an independent subject.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Typography and font delivery map](typography-font-delivery.md)
