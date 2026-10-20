# Admin Shell / Admin Station

## Current operating status

- Last visited: 2026-10-20
- Last updated: 2026-10-20
- Verified source candidate on `main`: the Logo-fitted, empty Dashboard shell
  remains standalone; the portable Studio entry consumes only the narrow Logo
  image-property adapter seam through a one-time serializable host input; and
  the Header-owned location label prints the selected local Sidebar path.
- Registration status: application/runtime layout; not a Shared UI component
  or Component Manager specimen.

### Recent work (newest first)

- The Header-owned location label derives its text from the selected local
  Sidebar tab and refreshes when that selection changes. It is hidden at the
  compact breakpoint, where the Header split control is visible.
- The owner-approved Sidebar navigation now has local, repeated tab
  presentation: Menu controls, root navigation and each internal wrapper use
  the registered 8px spacing; expanded tabs cap at 44px; and the Sidebar
  expands to a maximum 288px width.
- Icon-bearing top-level tabs have no extra leading tab padding. Their 44px
  icon allocation owns the leading position, the label follows at the
  tokenized 8px gap, and nested child labels align with that label column.
  Tabs without a leading icon retain their 16px inline tab padding.
- Active child state is reflected on its group. An inactive hover state is an
  interactive outline and remains distinct from the selected fill and accent
  text treatment.
- Phase 2E adds the WEX-owned staging-only release pointer
  (`studio-releases/staging-pointer.json`, ADR 0025). Only the pointer moves;
  `tooling/scripts/studio-staging-pointer.mjs` proposes and verifies it, the
  Pages workflow gates and live-checks it, and promotion to `main` is the
  approval. Consumer adoption stays outside this repository.

- Phase 2B adds the WEX-owned retained Studio-release producer:
  `tooling/scripts/studio-release.mjs` verifies final emitted bytes and writes
  an immutable source-SHA directory under `apps/web-runtime/public/studio-releases/`.
  The Pages workflow validates retained release directories; QSD consumption,
  lock selection and staging proof remain outside this repository.

- Logo image property binding accepts an application-resolved typed value at
  the Studio/Admin Station boundary. The entry reads the sole serializable
  host input once as it loads; it does not fetch QSD data or change the empty
  Dashboard body.
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
Footer regions, plus the owner-authorised local Sidebar-tab presentation. It
does not define product navigation, records, permissions, persistence,
adapters, schemas, or pluggable components.

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
- Staging pointer: [`ADR 0025`](../decisions/0025-studio-staging-release-pointer.md), [`tooling/scripts/studio-staging-pointer.mjs`](../../tooling/scripts/studio-staging-pointer.mjs), [`apps/web-runtime/test/studio-staging-pointer.test.mjs`](../../apps/web-runtime/test/studio-staging-pointer.test.mjs)
- Release producer and proof: [`tooling/scripts/studio-release.mjs`](../../tooling/scripts/studio-release.mjs), [`tooling/scripts/verify-studio-releases.mjs`](../../tooling/scripts/verify-studio-releases.mjs), [`apps/web-runtime/test/studio-release.test.mjs`](../../apps/web-runtime/test/studio-release.test.mjs)
- Logo image property adapter:
  [`apps/web-runtime/src/logo-property-binding.js`](../../apps/web-runtime/src/logo-property-binding.js)
- Sidebar rail and compact drawer interaction: [`apps/web-runtime/src/admin-station-sidebar.js`](../../apps/web-runtime/src/admin-station-sidebar.js)
- Sidebar-tab presentation and disclosure controls:
  [`apps/web-runtime/src/admin-station-navigation.js`](../../apps/web-runtime/src/admin-station-navigation.js)
- Header location-label presentation and local selection bridge:
  [`apps/web-runtime/src/admin-station-location.js`](../../apps/web-runtime/src/admin-station-location.js)
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
  -> local Sidebar-tab presentation with no product command bindings
  -> Header-owned location label derived only from the local Sidebar selection
  -> future authorised domain adapters
```

Component Manager independently develops and validates reusable Lego pieces
before an accepted piece is fitted here.

## Current Sidebar navigation rules

- Sidebar shell, controls, and navigation are independent internal wrappers.
  The shell, controls, and navigation each consume the established 8px
  padding/gap rule; they do not use margin for layout spacing.
- Expanded navigation tabs use 4px block and 16px inline token padding with a
  44px maximum block size. A root tab carrying a leading icon overrides only
  its leading padding to zero because its 44px icon allocation already owns
  that space.
- Tab SVGs are 20px inside their token-composed 44px icon allocation.
  Nested lists start at the parent label column, preserving alignment between
  a leading-icon parent and its children.
- Compact navigation hides labels while retaining 44px tab/icon targets.
  Expanded or hover-expanded navigation shows the labels and disclosure
  controls without changing the underlying navigation model.

## Safe change routing

- Change visual values or responsive behaviour through WEX authority.
- Develop reusable Header children in Component Manager through separately
  authorised component work. Header is already the Admin Station shell and is
  never a Component Manager specimen.
- Add product navigation, records, permissions, adapters, persistence, or
  product behaviour only through separately authorised runtime work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
