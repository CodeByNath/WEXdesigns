# Button System

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`

### Recent work (newest first)

- `5e13a35` (2026-09-20) placed Button states on the registered perimeter.
- `ccafd4f` (2026-09-20) retained fixed Button state bounds.
- `6be2adc` (2026-09-18) accepted the separate Button runtime invocation boundary.

## Purpose and scope

This map navigates the demonstrated ordinary Button foundation: serializable Button/action definitions, platform-neutral presentation resolution, and WEX visual foundation. It does not define a browser runtime or domain handler; those require a concrete consuming integration.

## Governing authority

- [Architecture authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Dependency rules](../architecture/dependency-rules.md)
- [Composition architecture](../architecture/composition-architecture.md)
- [ADR 0005: Button Authority](../decisions/0005-button-authority.md)
- [ADR 0006: Button Geometry Authority](../decisions/0006-button-geometry-authority.md)
- [ADR 0007: Button Semantic-Action Binding Authority](../decisions/0007-button-semantic-action-authority.md)
- [ADR 0008: Button Runtime Invocation Authority](../decisions/0008-button-runtime-invocation-authority.md)

## Consumed WEX foundation navigation

- [Colour](colour.md)
- [Typography and font delivery](typography-font-delivery.md)
- [Spacing](spacing.md)
- [Interaction and focus](interaction-focus.md)
- [Sizing and tier system](sizing-tier-system.md)

Current Button authority and source demonstrate no dependency on the WEX Layout foundation, so Layout is not linked as a Button dependency on the verified ref.

## Source and focused verification

- Serializable action identity: [`packages/schemas/src/actions/semantic-action.schema.ts`](../../packages/schemas/src/actions/semantic-action.schema.ts)
- Button definition: [`packages/schemas/src/components/button.schema.ts`](../../packages/schemas/src/components/button.schema.ts)
- Shared presentation resolver: [`packages/ui/src/components/button.ts`](../../packages/ui/src/components/button.ts)
- WEX Button foundation: [`packages/wex/src/foundations/buttons.css`](../../packages/wex/src/foundations/buttons.css), loaded by [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Schema checks: [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Shared UI checks: [`packages/ui/test/button.test.mjs`](../../packages/ui/test/button.test.mjs)
- WEX checks: [`packages/wex/test/button-foundation.test.mjs`](../../packages/wex/test/button-foundation.test.mjs)

The package scripts in the relevant package manifests are the current focused check entrypoints; inspect them before running a change-specific validation.

## Dependency path and boundary

```text
SemanticAction + ButtonDefinition  -> @weerax/schemas
                                      -> @weerax/ui presentation resolver
WEX Button foundation              -> @weerax/wex CSS
consuming application              -> reusable packages
```

`@weerax/wex` and `@weerax/schemas` are dependency roots. `@weerax/ui` may depend only on schemas and WEX. Application-specific click binding, executor registration, and domain handlers remain in the consuming integration layer and are not a shared Button concern.

## Safe change routing

- For a visual/state/geometry authority gap, establish or amend the relevant ADR before changing the WEX foundation and its focused checks.
- For a serializable Button or semantic-action contract change, begin with the governing action/schema authority, then update schemas and affected presentation/tests within the dependency rules.
- For platform-neutral presentation changes, use the shared UI boundary and its focused checks; do not introduce browser events or domain behavior.
- For runtime invocation, first demonstrate a concrete application-owned domain integration and follow ADR 0008; do not place dispatcher, registry, handlers, or browser binding in schemas, WEX, or shared UI.

## Related documents

- [Foundation entrypoint](../foundation/README.md)
- [Code Map entrypoint](README.md)
- [Repository guidance architecture ADR](../decisions/0009-repository-guidance-architecture.md)
