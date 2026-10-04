# Identity Station

## Current operating status

- Last visited: 2026-10-04
- Last updated: 2026-10-04
- Verified against: `origin/main` at `a74be3d66a297a1d7db511f2d15aa73629997037`.
- Runtime scope: optional PostgreSQL storage-adapter proof for one host-scoped
  WEX identity space. It persists supplied portable records and supplies
  transactions/constraints; it never issues IDs or owns lifecycle semantics.

### Recent work (newest first)

- Phase 5 converts the historical Station runtime into an optional PostgreSQL
  adapter. Its PGlite proof covers supplied registration persistence, address
  collision rejection, compare/write transitions, non-reuse, isolated lookup,
  and fail-closed damaged/mismatched storage evidence.
- Phase 4B implements `@weerax/identity` bootstrap: strict WEXPR validation,
  CSPRNG generation, approval-gated create/readback, idempotent reopen, and
  fail-closed failure handling through an injected local-folder adapter.
- ADR 0019 establishes `packages/identity` / `@weerax/identity` as the
  permanent portable Plugin + Tool runtime residence. Its implementation uses
  only schemas and an injected framework-neutral storage-adapter boundary.
- Phase 3 adds the local-folder reference adapter. It persists only supplied
  records under one configured WEX identity-space directory and proves file
  atomicity/readback without becoming an identity authority.
- Phase 2A corrects the portable contract with a first-class WEX-owned platform
  registration identity. The candidate adds framework-neutral schema validation
  only; no adapter, Plugin + Tool runtime, or PostgreSQL conversion is authorised.
- Phase 9B-D adds a PostgreSQL-serialized durable bootstrap command and
  deterministic concurrent-session lifecycle proof. Test fixture IDs are not
  durable allocations.
- Phase 1 Identity Portability records the authority correction: host-local
  WEX identity spaces and a storage-adapter contract supersede central Station
  ownership. No runtime conversion is authorised yet.

## Purpose and scope

This map routes the historical PostgreSQL proof to the portable WEX Identity
authority, runtime, migration, and focused verification. It does not define
allocation families, transport, deployment, credentials, platform bindings,
domain records, or Header presentation.

## Governing authority and evidence routes

- [ADR 0013: WEX UI Platform Identity](../decisions/0013-wex-ui-platform-identity.md)
- [ADR 0014: WEX UI Identity Bootstrap Authority](../decisions/0014-wex-ui-identity-bootstrap-authority.md)
- [ADR 0015: WEX UI Identity Station Placement](../decisions/0015-wex-ui-identity-station-placement.md)
- [Accepted ADR 0016: Portable WEX Identity Spaces](../decisions/0016-portable-wex-identity-spaces.md)
- [Accepted ADR 0017: Portable WEX Identity Storage Contract](../decisions/0017-portable-identity-storage-contract.md)
- [Accepted ADR 0018: WEX Platform Registration Bootstrap Contract](../decisions/0018-wex-platform-registration-bootstrap-contract.md)
- [Accepted ADR 0019: WEX Identity Runtime Residence](../decisions/0019-wex-identity-runtime-residence.md)
- [Platform identity architecture](../architecture/platform-identity.md)
- [Portable WEX Identity storage contract](../architecture/portable-identity-storage-contract.md)
- [Repository map](../architecture/repository-map.md)
- [Dependency rules](../architecture/dependency-rules.md)

## Current source and focused verification

- PostgreSQL portable storage adapter:
  [`apps/identity-station/src/adapter.ts`](../../apps/identity-station/src/adapter.ts)
- PostgreSQL transaction boundary:
  [`apps/identity-station/src/postgres.ts`](../../apps/identity-station/src/postgres.ts)
- Historical ledger migration retained for additive test proof:
  [`apps/identity-station/migrations/001_create_allocation_ledger.sql`](../../apps/identity-station/migrations/001_create_allocation_ledger.sql)
- Portable PostgreSQL adapter migration:
  [`apps/identity-station/migrations/002_create_portable_identity_adapter.sql`](../../apps/identity-station/migrations/002_create_portable_identity_adapter.sql)
- Portable PostgreSQL adapter proof:
  [`apps/identity-station/test/postgres-identity-adapter.test.mjs`](../../apps/identity-station/test/postgres-identity-adapter.test.mjs)
- Portable identity contract records:
  [`packages/schemas/src/identifiers/wex-identity-space.schema.ts`](../../packages/schemas/src/identifiers/wex-identity-space.schema.ts)
- Schema contract validation:
  [`packages/schemas/test/foundation.test.mjs`](../../packages/schemas/test/foundation.test.mjs)
- Local-folder storage adapter:
  [`packages/adapters/src/local-folder-identity-adapter.ts`](../../packages/adapters/src/local-folder-identity-adapter.ts)
- Local-folder adapter proof:
  [`packages/adapters/test/local-folder-identity-adapter.test.mjs`](../../packages/adapters/test/local-folder-identity-adapter.test.mjs)
- Portable bootstrap coordinator:
  [`packages/identity/src/bootstrap.ts`](../../packages/identity/src/bootstrap.ts)
- Portable bootstrap proof:
  [`packages/identity/test/bootstrap.test.mjs`](../../packages/identity/test/bootstrap.test.mjs)
- Foundation dependency audit:
  [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
@weerax/schemas -> @weerax/adapters -> local WEX identity-space directory
@weerax/schemas -> @weerax/identity -> injected storage-adapter boundary
@weerax/schemas -> apps/identity-station -> PostgreSQL identity space (optional adapter proof)
```

The Station may consume schema validation and a PostgreSQL client. It must not
move WEX identity semantics into schemas, WEX, Shared UI, or the web runtime.
Under accepted ADRs 0016–0019, the WEX Identity Plugin + Tool owns identity
semantics and operations in `@weerax/identity`, while host storage adapters
persist its contract in host-local identity spaces. This PostgreSQL adapter is
optional and is neither a universal issuer nor a persistence owner. The schema
package validates serializable contract records only; `@weerax/identity`
applies identity rules through an injected framework-neutral adapter boundary,
and adapters provide atomic persistence. The local-folder and PostgreSQL
adapters are persistence mechanisms, not the Plugin + Tool or WEX identity
authority. Bindings and platform/domain data remain outside them.

## Safe change routing

- Change allocation forms, families, lifecycle, placement, or portable
  storage-adapter semantics through ADR 0017 and the portable contract before
  implementation.
- Change local-folder persistence mechanics and focused proof through this map;
  do not add Plugin + Tool initialization, approval UI, host-domain data, or
  another backend in this adapter phase.
- Change portable bootstrap orchestration through `@weerax/identity` and its
  focused proof; keep adapters persistence-only and do not add allocation
  lifecycle issuance, approval UI, host integration, or a concrete-adapter
  runtime dependency without separately authorised work.
- Change PostgreSQL persistence mechanics and focused proof through this map;
  retain supplied-record semantics and do not add ID issuance, approval UI,
  host integration, or a mandatory backend.
- Change database deployment, credentials, public transport, caller
  authentication, bindings, reverse lookup, retirement operations, bulk
  issuance, Header presentation, or child components only in their separately
  authorised phase.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
