# Header Component

## Current operating status

- Created: 2026-10-05
- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Authority verified against `origin/main` at
  `239d32c3f1e25489e159f9b016d3abf7ffa04ae5`; Header authority is recorded in
  ADR 0020. No Header source, schema, fixture, mount, or application fitting is
  implemented.

### Recent work (newest first)

- ADR 0020 establishes the reusable Header family, its direct-child boundary,
  WEX-specific allocation semantics, responsive replacement rule, future
  serializable-contract boundary, and identity separation. It authorises no
  implementation.

## Purpose and scope

This map routes the first future reusable Shared UI Header candidate to its
accepted authority, existing WEX foundations, identity boundary, validation
surface, and eventual application fitting boundary. It is navigation evidence;
it does not restate the Header contract or introduce implementation.

## Governing authority and evidence routes

- [ADR 0020: Header Component Authority](../decisions/0020-header-component-authority.md)
- [Atomic Composition](../architecture/atomic-composition.md)
- [Authority Model](../architecture/authority-model.md)
- [Dependency Rules](../architecture/dependency-rules.md)
- [WEX Platform Identity](../architecture/platform-identity.md)
- [Layout](layout.md)
- [Spacing](spacing.md)
- [Component Manager](component-manager.md)
- [Admin Shell](admin-shell.md)
- [Global Components Catalogue](global-components.md)

## Current source and focused verification

There is no Header implementation or focused Header test. The relevant existing
boundaries are:

- WEX layout and compact responsive foundation:
  [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- WEX spacing foundation:
  [`packages/wex/src/foundations/spacing.css`](../../packages/wex/src/foundations/spacing.css)
- Isolated future component validation surface:
  [`apps/web-runtime/component-manager/index.html`](../../apps/web-runtime/component-manager/index.html)
- Empty Admin Station Header region:
  [`apps/web-runtime/admin-station/index.html`](../../apps/web-runtime/admin-station/index.html)
- Authority/dependency audit:
  [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
future Header definition -> @weerax/schemas
future Header structure  -> @weerax/ui + @weerax/wex
Component Manager        -> isolated candidate validation
Admin Station            -> later application fitting
```

The Header family must keep schema, WEX, Shared UI, application, domain, and
portable identity concerns on their established sides of the dependency graph.
An Admin Header allocation is not the reusable Header capability and is never
created through a local application ID.

## Safe change routing

- Change Header slots, ownership, allocation semantics, responsive replacement,
  or the serializable boundary through ADR 0020 before implementation.
- Change WEX values or responsive behaviour through WEX authority, not a
  Header definition or application stylesheet.
- Add a Header definition, WEX/Shared UI implementation, child contract,
  Component Manager fixture/mount, or browser evidence only in an authorised
  Header implementation phase.
- Fit an accepted Header into Admin Station only in a later authorised
  application phase; do not use that fit to create route, search, account, or
  domain behaviour.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
