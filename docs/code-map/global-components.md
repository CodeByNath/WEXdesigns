# Global Components Catalogue

## Current operating status

- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Verified against: `origin/main` at
  `e1a2bd722f57f716eb009d881c200180e30f5e71`.
- Registration status: No global component family is registered.

### Recent work (newest first)

- ADR 0021 validates Logo only in Component Manager. It does not register Logo
  or any other family in this catalogue.
- Phase 1 establishes an empty catalogue entrypoint without adding a component
  registration, implementation, or authority.

## Purpose and scope

This map routes the demonstrated Global Components catalogue surface to its
registration boundary, source, and focused checks. It does not define component
visual values, variants, states, schemas, browser invocation, or a future
component family.

## Governing authority and evidence routes

- [Repository map](../architecture/repository-map.md)
- [Header Component](header-component.md)

## Current source and focused verification

- Global Components catalogue route: [`apps/web-runtime/global-components/index.html`](../../apps/web-runtime/global-components/index.html)
- Focused check: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
Global Components catalogue entrypoint
  -> future demonstrated component authority
  -> component registration
```

The catalogue contains no component registration. It does not render a
component, bind browser events, execute actions, or redefine component
authority. `@weerax/ui` remains platform-neutral and applications remain
responsible for browser and domain integration.

## Safe change routing

- Register a component family only after its demonstrated need and authority
  are accepted in a separately authorised phase. ADR 0021's Logo authority
  has isolated implementation proof but still requires separate registration
  work.
- A proposed new component requires its own demonstrated need and authority;
  do not infer it from this catalogue entrypoint.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
