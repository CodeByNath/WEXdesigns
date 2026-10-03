# Identity Station

## Current operating status

- Last visited: 2026-10-03
- Last updated: 2026-10-03
- Verified against: `origin/main` at `38b762c04d1b41c8e70616a270dd525646f1e5fa`.
- Runtime scope: this historical PostgreSQL proof implements allocation-ledger
  mechanics only. Accepted ADR 0016 removes its former central-authority role;
  it is awaiting conversion to an optional portable storage adapter.

### Recent work (newest first)

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
- [Platform identity architecture](../architecture/platform-identity.md)
- [Repository map](../architecture/repository-map.md)
- [Dependency rules](../architecture/dependency-rules.md)

## Current source and focused verification

- Service boundary: [`apps/identity-station/src/station.ts`](../../apps/identity-station/src/station.ts)
- Durable bootstrap command: [`apps/identity-station/src/bootstrap-command.ts`](../../apps/identity-station/src/bootstrap-command.ts)
- PostgreSQL transaction adapter:
  [`apps/identity-station/src/postgres.ts`](../../apps/identity-station/src/postgres.ts)
- Durable migration:
  [`apps/identity-station/migrations/001_create_allocation_ledger.sql`](../../apps/identity-station/migrations/001_create_allocation_ledger.sql)
- Local PostgreSQL lifecycle proof:
  [`apps/identity-station/test/station.test.mjs`](../../apps/identity-station/test/station.test.mjs)
- Foundation dependency audit:
  [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
@weerax/schemas -> apps/identity-station -> PostgreSQL ledger
```

The Station may consume schema validation and a PostgreSQL client. It must not
move WEX identity semantics into schemas, WEX, Shared UI, or the web runtime.
Under accepted ADR 0016, the WEX Identity Plugin + Tool owns identity semantics
and operations while host storage adapters persist its contract in host-local
identity spaces. This Station is no longer the universal issuer or persistence
owner. The ledger contains allocation lifecycle evidence only; bindings and
platform/domain data remain outside it.

## Safe change routing

- Change allocation forms, families, lifecycle, placement, or portable
  storage-adapter semantics through the governing decisions and identity
  architecture first.
- Convert this proof into an optional PostgreSQL adapter only after the shared
  contract and local-folder reference adapter are accepted.
- Change database deployment, credentials, public transport, caller
  authentication, bindings, reverse lookup, retirement operations, bulk
  issuance, Header presentation, or child components only in their separately
  authorised phase.
- Run `pnpm --filter @weerax/identity-station bootstrap` only with
  `WEX_IDENTITY_DATABASE_URL` pointing to an already-configured, Station-owned
  PostgreSQL ledger; its printed IDs are durable only after that operation and
  a separate-session read-back succeed.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
