# Admin Shell / Admin Station

## Current operating status

- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Verified against: `origin/main` at
  `abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.
- Registration status: application/runtime layout; not a Shared UI component
  or Component Manager specimen.

### Recent work (newest first)

- ADR 0020 establishes the future reusable Header family. It does not fit,
  mount, or otherwise alter the empty Admin Station Header region.
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
- WEX shell presentation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
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
- Develop reusable component mechanics in Component Manager through separately
  authorised component work. Header implementation must be accepted there
  before a separately authorised Admin Station fitting phase.
- Add navigation, records, permissions, adapters, persistence, or product
  behaviour only through separately authorised runtime work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
