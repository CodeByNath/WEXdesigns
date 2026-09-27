# Component Manager

## Current operating status

- Last visited: 2026-09-27
- Last updated: 2026-09-27
- Verified against: Phase 1 Builder candidate on `feat/component-manager`, based
  on `origin/main` at `b85a2f98bfb22765c27f824ec4be42b2a23e924e`.
- Registration status: No shared UI component is mounted or registered.

### Recent work (newest first)

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

## Current source and focused verification

- Sandbox route: [`apps/web-runtime/component-manager/index.html`](../../apps/web-runtime/component-manager/index.html)
- Runtime route configuration: [`apps/web-runtime/vite.config.ts`](../../apps/web-runtime/vite.config.ts)
- Focused check: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
Component Manager sandbox
  -> future approved Shared UI component candidate
  -> candidate-owned contract and WEX presentation
```

The sandbox is an application validation surface. Shared UI remains responsible
for reusable structure, interaction, and accessibility mechanics; WEX retains
presentation authority; domain authority is not represented here.

## Safe change routing

- Add a mount, fixture, or definition input only with a separately approved
  component phase and that component's authority.
- Do not use the sandbox to register a component or introduce domain behaviour.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
