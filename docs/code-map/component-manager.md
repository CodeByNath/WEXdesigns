# Component Manager

## Current operating status

- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Verified against: `origin/main` at
  `e1a2bd722f57f716eb009d881c200180e30f5e71`.
- Registration status: Logo is mounted only as an isolated inert fixture;
  no component is registered in Global Components or fitted into Admin Station.

### Recent work (newest first)

- ADR 0021 mounts Logo, the first reusable Header child, in the isolated
  preview. It adds no Header component, domain behaviour, or Admin Station fitting.
- Phase 4 removes the superseded Admin Shell fixture and mount; the isolated
  preview remains an empty responsive component sandbox.
- Phase 3 corrects sandbox-only viewport validation to use an isolated preview
  browsing context, so WEX media-query states respond at the selected widths.
- Phase 1 establishes an isolated sandbox route without a component, definition,
  fixture, domain record, adapter, or product behaviour.

## Purpose and scope

This map routes the Component Manager validation surface to its governing
boundaries, source, and focused verification. It does not define a component,
component contract, WEX values, domain data, or a page-builder model.

## Governing authority and evidence routes

- [Studio Operating Model](../foundation/studio-operating-model.md)
- [Repository map](../architecture/repository-map.md)
- [Global Components Catalogue](global-components.md)
- [Header Component](header-component.md)
- [Layout](layout.md)

## Current source and focused verification

- Sandbox route: [`apps/web-runtime/component-manager/index.html`](../../apps/web-runtime/component-manager/index.html)
- Runtime route configuration: [`apps/web-runtime/vite.config.ts`](../../apps/web-runtime/vite.config.ts)
- Shared theme and viewport-control behaviour:
  [`apps/web-runtime/src/main.js`](../../apps/web-runtime/src/main.js)
- Isolated responsive preview:
  [`apps/web-runtime/component-manager/preview.html`](../../apps/web-runtime/component-manager/preview.html)
- Isolated Logo fixture renderer:
  [`apps/web-runtime/src/component-manager-preview.js`](../../apps/web-runtime/src/component-manager-preview.js)
- Focused check: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
Component Manager sandbox
  -> WEX layout responsive thresholds
  -> sandbox mount-width tooling
  -> future approved Shared UI component candidate
  -> candidate-owned contract and WEX presentation
```

The sandbox is an application validation surface. Shared UI remains responsible
for reusable structure, interaction, and accessibility mechanics; WEX retains
presentation authority; domain authority is not represented here.

Viewport tooling may constrain only the sandbox mount width at the current WEX
thresholds or remain fluid. Its isolated preview browsing context must consume
the WEX responsive CSS directly; it must not emulate, rewrite, or become
component responsive CSS, a component prop, schema, fixture, or device
authority.

## Safe change routing

- Logo follows ADR 0021 and is the only authorised fixture here. Keep it
  isolated until a later Admin Station fitting phase; do not register it in
  Global Components from this surface.
- Change responsive thresholds through WEX layout authority, not this sandbox.
- Do not use the sandbox to register a component or introduce domain behaviour.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
