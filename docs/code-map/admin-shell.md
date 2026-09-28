# Admin Shell

## Current operating status

- Last visited: 2026-09-28
- Last updated: 2026-09-28
- Verified against: Phase 1 correction candidate on `feat/admin-shell`, based on
  `origin/main` at `32e4866edd6576edf2b6f86f5cffc446cf509e03`.
- Registration status: Candidate is isolated to Component Manager; it is not a
  runtime or product shell.

### Recent work (newest first)

- Phase 1 correction keeps the Shared UI API fixed and empty; Component Manager
  mounts neutral fixture nodes into the named regions.
- Phase 1 authorises the first minimal Shared UI shell candidate for isolated
  Component Manager validation.

## Purpose and scope

This map routes the reusable Admin Shell structure to its authority, source,
and validation. It does not define a page, product navigation, domain records,
permissions, persistence, or a future Drawer integration.

## Governing authority and evidence routes

- [Studio Operating Model](../foundation/studio-operating-model.md)
- [Repository map](../architecture/repository-map.md)
- [Layout](layout.md)
- [Component Manager](component-manager.md)

## Current source and focused verification

- Shared UI structure: [`packages/ui/src/components/admin-shell.ts`](../../packages/ui/src/components/admin-shell.ts)
- WEX shell presentation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- Isolated browser mount: [`apps/web-runtime/component-manager/preview.html`](../../apps/web-runtime/component-manager/preview.html), [`apps/web-runtime/src/component-manager-preview.js`](../../apps/web-runtime/src/component-manager-preview.js)
- Focused checks: [`packages/ui/test/admin-shell.test.mjs`](../../packages/ui/test/admin-shell.test.mjs), [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs), [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Shared UI Admin Shell structure
  -> WEX presentation classes and responsive authority
  -> Component Manager isolated validation mount
```

Applications assemble approved shells. Products supply only permitted data and
behaviour; neither is represented by this candidate.

## Safe change routing

- Change visual values or responsive behaviour through WEX authority.
- Change reusable structure, rendering, interaction, or accessibility through
  Shared UI with isolated Component Manager evidence.
- Add product assembly, navigation, records, permissions, or pluggable
  components only through separately authorised work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
