# Admin Shell / Admin Station

## Current operating status

- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Verified against: `origin/main` at
  `ddbdf89208bf8bca077ae01cf4b86da1d03e77e5`.
- Registration status: application/runtime layout; not a Shared UI component
  or Component Manager specimen.

### Recent work (newest first)

- ADR 0021 establishes Header as the Admin Station shell and Logo as its first
  reusable child. It does not fit Logo into the empty Header region.
- Phase 4 moves the Admin Shell from Shared UI to the standalone Admin Station
  runtime route and restores Component Manager to an empty component sandbox.

## Purpose and scope

This map routes the Admin Station's structural application layout to its
authority, source, and validation. It contains Header, Sidebar, Main, and
Footer regions only; it does not define navigation, records, permissions,
persistence, adapters, schemas, or pluggable components.

## Governing authority and evidence routes

- [Studio Operating Model](../foundation/studio-operating-model.md)
- [Repository map](../architecture/repository-map.md)
- [Layout](layout.md)
- [Component Manager](component-manager.md)
- [Header Component](header-component.md)

## Current source and focused verification

- Runtime route: [`apps/web-runtime/admin-station/index.html`](../../apps/web-runtime/admin-station/index.html)
- Runtime entry resources: [`apps/web-runtime/src/admin-station.css`](../../apps/web-runtime/src/admin-station.css), [`apps/web-runtime/src/admin-station.js`](../../apps/web-runtime/src/admin-station.js)
- Runtime registration: [`apps/web-runtime/vite.config.ts`](../../apps/web-runtime/vite.config.ts)
- WEX shell presentation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css),
  [`packages/wex/src/foundations/header.css`](../../packages/wex/src/foundations/header.css)
- Focused checks: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs), [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Admin Station runtime layout
  -> WEX layout, spacing, colour, typography, geometry, responsive authority
  -> future accepted Shared UI Lego pieces
  -> future authorised domain adapters
```

Component Manager independently develops and validates reusable Lego pieces
before an accepted piece is fitted here.

## Safe change routing

- Change visual values or responsive behaviour through WEX authority.
- Develop reusable Header children in Component Manager through separately
  authorised component work. Header is already the Admin Station shell and is
  never a Component Manager specimen.
- Add navigation, records, permissions, adapters, persistence, or product
  behaviour only through separately authorised runtime work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
