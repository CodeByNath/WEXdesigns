# Header Shell and Logo Component

## Current operating status

- Created: 2026-10-05
- Last visited: 2026-10-23
- Last updated: 2026-10-23
- Verified against: Owner-authorised Header Results shell candidate on `main`.
  ADRs 0021–0023 define Header's Brand compartment, Logo's shared render
  description, and the narrow external-image property-binding boundary. ADR
  0026 adds the Header-owned, content-empty Results shell and its structural
  mode boundary.

### Recent work (newest first)

- ADR 0026 adds a direct Header Results shell with `popover`, `full-span`, and
  `end-rail` structural modes. It owns allocation only; mounted result
  components own Skeleton Shimmer and all content states.
- The Admin Station Header is a fixed 64px-high shell at every viewport. Its
  outer wrapper has no padding; the Brand compartment uses the established
  4px block and 16px inline token padding. The compact Header/Sidebar column
  is 76px, while the fitted Logo allocation is constrained to the resulting
  56px inner height.
- The Header Brand renders the owner-approved `VRAX Admin` title when the
  Sidebar is expanded. The Header remains a two-compartment shell: Brand on
  the left, with the independent navigation compartment on the right.
- ADR 0023 preserves Logo's label-only definition while allowing an
  application-resolved, typed HTTPS image property through a closed,
  serializable binding descriptor.
- ADR 0021 supersedes the former reusable Header boundary. Header remains the
  Admin Station shell; Logo is the isolated Component Manager candidate.
- ADR 0022 makes Shared UI the single author of Logo's structure; Component
  Manager and Admin Station use the same description through a generic web
  materializer.

## Purpose and scope

This map routes the Admin Station Header shell and its first reusable Logo
child to their authority, WEX foundations, identity boundary, and validation
surface. It is navigation evidence; it does not restate their contracts.

## Governing authority and evidence routes

- [ADR 0021: Header Shell and Logo Component Authority](../decisions/0021-header-shell-and-logo-component-authority.md)
- [ADR 0022: Logo Render Description Boundary](../decisions/0022-logo-render-description-boundary.md)
- [ADR 0023: Logo Image Property Binding](../decisions/0023-logo-image-property-binding.md)
- [ADR 0026: Header Results Shell Authority](../decisions/0026-header-results-shell-authority.md)
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

The Header shell and Logo boundaries and focused verification are:

- WEX layout and compact responsive foundation:
  [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- WEX spacing foundation:
  [`packages/wex/src/foundations/spacing.css`](../../packages/wex/src/foundations/spacing.css)
- Header WEX presentation foundation and focused proof:
  [`packages/wex/src/foundations/header.css`](../../packages/wex/src/foundations/header.css),
  [`packages/wex/test/header-foundation.test.mjs`](../../packages/wex/test/header-foundation.test.mjs)
- Header Results shell mode controller and navigation request mapping:
  [`apps/web-runtime/src/admin-station-header-results.js`](../../apps/web-runtime/src/admin-station-header-results.js),
  [`admin-station-nav-actions.js`](../../apps/web-runtime/src/admin-station-nav-actions.js), and
  [`catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)
- Framework-neutral Logo contract and proof:
  [`packages/schemas/src/components/logo.schema.ts`](../../packages/schemas/src/components/logo.schema.ts),
  [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Platform-neutral Logo presentation resolver and proof:
  [`packages/ui/src/components/logo.ts`](../../packages/ui/src/components/logo.ts),
  [`packages/ui/src/render-description.ts`](../../packages/ui/src/render-description.ts),
  [`packages/ui/test/logo.test.mjs`](../../packages/ui/test/logo.test.mjs)
- Generic web render-description materializer:
  [`apps/web-runtime/src/render-description.js`](../../apps/web-runtime/src/render-description.js)
- Application-side Logo property resolver:
  [`apps/web-runtime/src/logo-property-binding.js`](../../apps/web-runtime/src/logo-property-binding.js)
- Studio entry's one-time host input boundary:
  [`apps/web-runtime/src/studio-host.js`](../../apps/web-runtime/src/studio-host.js)
- Isolated Logo validation surface:
  [`apps/web-runtime/component-manager/index.html`](../../apps/web-runtime/component-manager/index.html),
  [`apps/web-runtime/component-manager/preview.html`](../../apps/web-runtime/component-manager/preview.html),
  [`apps/web-runtime/src/component-manager-preview.js`](../../apps/web-runtime/src/component-manager-preview.js)
- Component Manager focused proof:
  [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)
- Admin Station Header shell and fitted Logo proof:
  [`apps/web-runtime/admin-station/index.html`](../../apps/web-runtime/admin-station/index.html),
  [`apps/web-runtime/src/admin-station.js`](../../apps/web-runtime/src/admin-station.js)
- Authority/dependency audit:
  [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Header shell              -> Admin Station + WEX
Header Results allocation  -> Admin Station + WEX
Result content/states      -> requesting result component
Logo definition           -> @weerax/schemas
Logo image binding        -> application/domain adapter
Logo render description   -> @weerax/ui + @weerax/wex
Web materializer          -> platform DOM only
Component Manager/Admin Station -> shared Logo description
```

Header owns direct compartments only. Its main grid remains Brand on the left
and Navigation on the right; Results is a direct overlay allocation whose
approved modes are Header-owned. Logo and every mounted results component
retain their internal presentation boundaries. `WEXAMH` is an Admin Header
allocation, not a reusable capability, and is never created through a local
application ID.

## Current layout rules

- The Header wrapper is border-box and fixed to the WEX Admin Header token;
  the current token resolves to 64px on every device.
- Header owns no outer padding. The Brand compartment consumes 4px block and
  16px inline spacing tokens, including its right-side padding.
- The compact Brand/Header column and compact Sidebar share the 76px shell
  allocation. The Logo consumes the resulting inner allocation without
  stretching beyond its 56px block-size cap.
- The Header grid keeps the tokenized 8px compartment gap. A future
  navigation or action child belongs to its own right-side compartment and
  must not be folded into Logo or Brand ownership.
- Header Results may use only its accepted `popover`, `full-span`, or
  `end-rail` structural allocation. It supplies no result content or loading
  presentation.

## Safe change routing

- Change Header shell ownership or Logo scope through ADR 0021; change Header
  Results modes or boundaries through ADR 0026.
- Change WEX values through WEX authority, not a Logo definition.
- Add Header children only through separate authority; do not infer them.
- Keep Skeleton Shimmer, empty, error, and interactive result elements in the
  mounted component; do not reintroduce them into the Header shell.
- Change Logo's structural render boundary through ADRs 0022 and 0023; do not
  extend the materializer beyond their narrow contract without separate
  authority.
- Integrate WEX identity only in separately authorised work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
