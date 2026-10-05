# Header Shell and Logo Component

## Current operating status

- Created: 2026-10-05
- Last visited: 2026-10-05
- Last updated: 2026-10-05
- Authority verified against `origin/main` at `ddbdf89208bf8bca077ae01cf4b86da1d03e77e5`.
  ADR 0021 defines Header as the Admin Station shell and Logo as its first
  reusable child; no Admin Station fitting is implemented.

### Recent work (newest first)

- ADR 0021 supersedes the former reusable Header boundary. Header remains the
  Admin Station shell; Logo is the isolated Component Manager candidate.

## Purpose and scope

This map routes the Admin Station Header shell and its first reusable Logo
child to their authority, WEX foundations, identity boundary, and validation
surface. It is navigation evidence; it does not restate their contracts.

## Governing authority and evidence routes

- [ADR 0021: Header Shell and Logo Component Authority](../decisions/0021-header-shell-and-logo-component-authority.md)
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
- Framework-neutral Logo contract and proof:
  [`packages/schemas/src/components/logo.schema.ts`](../../packages/schemas/src/components/logo.schema.ts),
  [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Platform-neutral Logo presentation resolver and proof:
  [`packages/ui/src/components/logo.ts`](../../packages/ui/src/components/logo.ts),
  [`packages/ui/test/logo.test.mjs`](../../packages/ui/test/logo.test.mjs)
- Isolated Logo validation surface:
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
Header shell              -> Admin Station + WEX
Logo definition           -> @weerax/schemas
Logo presentation         -> @weerax/ui + @weerax/wex
Component Manager fixture -> isolated Logo validation
Admin Station             -> later fitting
```

Header owns direct compartments only. Logo retains its internal presentation
boundary. `WEXAMH` is an Admin Header allocation, not a reusable capability,
and is never created through a local application ID.

## Safe change routing

- Change Header shell ownership or Logo scope through ADR 0021.
- Change WEX values through WEX authority, not a Logo definition.
- Add Header children only through separate authority; do not infer them.
- Fit into Admin Station or integrate WEX identity only in separately
  authorised work.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
