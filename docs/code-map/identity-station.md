# Identity Station

## Current operating status

- Last visited: 2026-10-02
- Last updated: 2026-10-02
- Verified against: Phase 9B candidate `feat/identity-station-bootstrap`, based
  on `origin/main` at `27642f1d42facf310a061db52174a57df257e2de`.
- Runtime scope: the standalone Station owns allocation issuance and its ledger;
  it has no public transport, deployment, caller authentication, platform
  binding, domain record, or presentation responsibility.

### Recent work (newest first)

- Phase 9B adds the Node Station, PostgreSQL ledger migration, and deterministic
  local PostgreSQL lifecycle proof for the Admin Manager root and Admin Header
  direct child only.

## Purpose and scope

This map routes the WEX UI Identity Authority / Station to its accepted
identity authority, runtime, migration, and focused verification. It does not
define allocation families, transport, deployment, credentials, platform
bindings, domain records, or Header presentation.

## Governing authority and evidence routes

- [ADR 0013: WEX UI Platform Identity](../decisions/0013-wex-ui-platform-identity.md)
- [ADR 0014: WEX UI Identity Bootstrap Authority](../decisions/0014-wex-ui-identity-bootstrap-authority.md)
- [ADR 0015: WEX UI Identity Station Placement](../decisions/0015-wex-ui-identity-station-placement.md)
- [Platform identity architecture](../architecture/platform-identity.md)
- [Repository map](../architecture/repository-map.md)
- [Dependency rules](../architecture/dependency-rules.md)

## Current source and focused verification

- Service boundary: [`apps/identity-station/src/station.ts`](../../apps/identity-station/src/station.ts)
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
move issuance or persistence into schemas, WEX, Shared UI, adapters, the web
runtime, or a consuming platform. The ledger contains allocation lifecycle
evidence only; bindings and platform/domain data remain outside it.

## Safe change routing

- Change allocation forms, families, lifecycle, or placement through the
  governing accepted ADRs and identity architecture first.
- Change database deployment, credentials, public transport, or caller
  authentication only with separately authorised operational architecture.
- Add bindings, reverse lookup, retirement operations, bulk issuance, Header
  presentation, or child components only in their separately authorised phase.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
