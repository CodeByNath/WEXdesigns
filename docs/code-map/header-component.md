# Header Component

## Current operating status

- Created: 2026-10-05
- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Authority verified against `origin/main` at
  `e1a2bd722f57f716eb009d881c200180e30f5e71`; accepted Header authority is
  recorded in ADR 0020. The reusable Header is implemented and mounted only as
  an inert Component Manager fixture; no Admin Station fitting is implemented.

### Recent work (newest first)

- The Header work package adds the strict serializable contract, WEX Header
  foundation, platform-neutral Shared UI presentation resolver, focused tests,
  and an isolated Component Manager fixture. It does not register Header in
  Global Components or fit it into Admin Station.
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

The implemented Header boundaries and focused verification are:

- WEX layout and compact responsive foundation:
  [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- WEX spacing foundation:
  [`packages/wex/src/foundations/spacing.css`](../../packages/wex/src/foundations/spacing.css)
- Header WEX presentation foundation and focused proof:
  [`packages/wex/src/foundations/header.css`](../../packages/wex/src/foundations/header.css),
  [`packages/wex/test/header-foundation.test.mjs`](../../packages/wex/test/header-foundation.test.mjs)
- Framework-neutral Header contract and proof:
  [`packages/schemas/src/components/header.schema.ts`](../../packages/schemas/src/components/header.schema.ts),
  [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Platform-neutral Header presentation resolver and proof:
  [`packages/ui/src/components/header.ts`](../../packages/ui/src/components/header.ts),
  [`packages/ui/test/header.test.mjs`](../../packages/ui/test/header.test.mjs)
- Isolated future component validation surface:
  [`apps/web-runtime/component-manager/index.html`](../../apps/web-runtime/component-manager/index.html),
  [`apps/web-runtime/component-manager/preview.html`](../../apps/web-runtime/component-manager/preview.html),
  [`apps/web-runtime/src/component-manager-preview.js`](../../apps/web-runtime/src/component-manager-preview.js)
- Component Manager focused proof:
  [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)
- Empty Admin Station Header region:
  [`apps/web-runtime/admin-station/index.html`](../../apps/web-runtime/admin-station/index.html)
- Authority/dependency audit:
  [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Header definition         -> @weerax/schemas
Header structure          -> @weerax/ui + @weerax/wex
Component Manager fixture -> isolated candidate validation
Admin Station             -> later application fitting
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
- Change Header schema, WEX/Shared UI implementation, or isolated fixture
  through ADR 0020 and their focused proofs; retain opaque child boundaries.
- Fit an accepted Header into Admin Station only in a later authorised
  application phase; do not use that fit to create route, search, account, or
  domain behaviour.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
