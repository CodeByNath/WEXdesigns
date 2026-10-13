# Admin Shell / Admin Station

## Current operating status

- Last visited: 2026-10-13
- Last updated: 2026-10-13
- Verified source candidate on `codex/logo-property-binding` at
  `3971693e7b3468b9d48bf8011d9c1ac916de9994`: the Logo-fitted, empty Dashboard
  shell remains standalone, and the portable Studio entry exposes only the
  narrow Logo image-property adapter seam.
- Registration status: application/runtime layout; not a Shared UI component
  or Component Manager specimen.

### Recent work (newest first)

- Logo image property binding accepts an application-resolved typed value at
  the Studio/Admin Station boundary; it does not fetch QSD data or change the
  empty Dashboard body.
- Phase 1A adds a relative-asset Studio host entry that mounts this empty shell
  at a host-provided `#qsd-studio-host`; its manifest and installer guidance
  are WEX-owned. It makes no QSD, business-data, identity, storage, or
  bootstrap call. The actual QSD host runtime remains a separately authorised
  verification boundary.
- The dashboard shell work package gives the root grid explicit tracks and a
  full-height layout, an empty collapsible Sidebar rail, a compact overlay
  drawer, and Heroicons shell controls, promoted to `main`.
- The Logo fitting work mounts the Shared UI-owned Logo structure through a
  generic web materializer, without identity-host or domain behaviour.
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
- Runtime entry resources: [`apps/web-runtime/src/admin-station.css`](../../apps/web-runtime/src/admin-station.css), [`apps/web-runtime/src/admin-station.js`](../../apps/web-runtime/src/admin-station.js), [`apps/web-runtime/src/admin-station-runtime.js`](../../apps/web-runtime/src/admin-station-runtime.js), [`apps/web-runtime/src/admin-station-shell.js`](../../apps/web-runtime/src/admin-station-shell.js)
- Portable Studio host: [`apps/web-runtime/src/studio-host.js`](../../apps/web-runtime/src/studio-host.js), [`apps/web-runtime/vite.studio-host.config.ts`](../../apps/web-runtime/vite.studio-host.config.ts), [`apps/web-runtime/studio-host/README.md`](../../apps/web-runtime/studio-host/README.md)
- Logo image property adapter:
  [`apps/web-runtime/src/logo-property-binding.js`](../../apps/web-runtime/src/logo-property-binding.js)
- Sidebar rail and compact drawer interaction: [`apps/web-runtime/src/admin-station-sidebar.js`](../../apps/web-runtime/src/admin-station-sidebar.js)
- Runtime registration: [`apps/web-runtime/vite.config.ts`](../../apps/web-runtime/vite.config.ts)
- WEX shell presentation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css),
  [`packages/wex/src/foundations/header.css`](../../packages/wex/src/foundations/header.css)
- Generic web materializer: [`apps/web-runtime/src/render-description.js`](../../apps/web-runtime/src/render-description.js)
- Focused checks: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs), [`apps/web-runtime/test/studio-host.test.mjs`](../../apps/web-runtime/test/studio-host.test.mjs), [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Admin Station runtime layout
  -> WEX layout, spacing, colour, typography, geometry, responsive authority
  -> accepted Shared UI Logo render description via generic materializer
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
