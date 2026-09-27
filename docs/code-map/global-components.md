# Global Components Catalogue

## Current operating status

- Last visited: 2026-09-27
- Last updated: 2026-09-27
- Verified against: Phase 1 Builder candidate on `feat/global-components`, based
  on `origin/main` at `e62818163b21bff94c77f2b4a0b6dfb889d7b971`
- Registration status: Button is the first registered global component; no
  additional component family is registered.

### Recent work (newest first)

- Phase 1 establishes the catalogue entrypoint and registers the existing
  approved Button family without changing its authority or implementation.

## Purpose and scope

This map routes the demonstrated Global Components catalogue surface to its
existing component authority, source, and focused checks. It does not define
component visual values, variants, states, schemas, browser invocation, or a
future component family.

## Governing authority and evidence routes

- [Repository map](../architecture/repository-map.md)
- [Button system map](button-system.md)
- [ADR 0005: Button Authority](../decisions/0005-button-authority.md)
- [ADR 0006: Button Geometry Authority](../decisions/0006-button-geometry-authority.md)
- [ADR 0007: Button Semantic-Action Binding Authority](../decisions/0007-button-semantic-action-authority.md)
- [ADR 0008: Button Runtime Invocation Authority](../decisions/0008-button-runtime-invocation-authority.md)

## Current source and focused verification

- Button schema: [`packages/schemas/src/components/button.schema.ts`](../../packages/schemas/src/components/button.schema.ts)
- Platform-neutral Button presentation: [`packages/ui/src/components/button.ts`](../../packages/ui/src/components/button.ts)
- WEX Button foundation: [`packages/wex/src/foundations/buttons.css`](../../packages/wex/src/foundations/buttons.css)
- Existing Button runtime presentation: [`apps/web-runtime/actions/index.html`](../../apps/web-runtime/actions/index.html)
- Global Components catalogue route: [`apps/web-runtime/global-components/index.html`](../../apps/web-runtime/global-components/index.html)
- Focused checks: [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs), [`packages/ui/test/button.test.mjs`](../../packages/ui/test/button.test.mjs), [`packages/wex/test/button-foundation.test.mjs`](../../packages/wex/test/button-foundation.test.mjs), and [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
existing Button schema + shared presentation + WEX foundation
  -> Global Components catalogue registration
  -> consuming application integration
```

The catalogue registers and routes to an accepted component; it does not
duplicate Button rendering, bind browser events, execute actions, or redefine
component authority. `@weerax/ui` remains platform-neutral and applications
remain responsible for browser and domain integration.

## Safe change routing

- Register only an existing accepted component family with a demonstrated need.
- Route a Button authority, schema, visual, or invocation gap through the
  Button system map and its governing ADRs before changing source.
- Keep Actions as the existing Button presentation route unless a separately
  authorised relationship changes that boundary.
- A proposed new component requires its own demonstrated need and authority;
  do not infer it from this catalogue entrypoint.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
