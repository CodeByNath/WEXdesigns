# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Work Package: PostgreSQL optional storage-adapter conversion

## Builder handoff

Candidate: `feat/postgres-identity-adapter` at
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5`, pushed and remote-verified.

The historical issuer/bootstrap service was removed. The package now exposes an
optional PostgreSQL adapter for supplied registration/allocation records only:
detect, create/read registration, atomic reserve, compare/write transition,
and exact lookup. PostgreSQL does not generate IDs, choose families, infer
placement, or own lifecycle policy; `@weerax/identity` remains independent.

Changed files:

- added `apps/identity-station/migrations/002_create_portable_identity_adapter.sql`, `apps/identity-station/src/adapter.ts`, and `apps/identity-station/test/postgres-identity-adapter.test.mjs`;
- updated `apps/identity-station/package.json`, `apps/identity-station/src/database.ts`, `apps/identity-station/src/index.ts`, `apps/identity-station/src/postgres.ts`, and `apps/identity-station/test/postgres.test.mjs`;
- removed `apps/identity-station/src/bootstrap-command.ts`, `apps/identity-station/src/errors.ts`, `apps/identity-station/src/station.ts`, and `apps/identity-station/test/station.test.mjs`;
- updated `docs/architecture/repository-map.md`, `docs/code-map/identity-station.md`, and `docs/decisions/0017-portable-identity-storage-contract.md`.

The legacy `001` migration is untouched; the new portable-table migration is
additive and exercised only by PGlite fixtures. No production/live database
was connected, migrated, or deployed.

Checks passed: `pnpm audit:foundation`; schemas (10 tests); adapters (8);
identity (11); identity-station (5 PGlite tests); `pnpm check` (45 tasks); and
`git diff --check`. The proof covers registration read/create, collision
rejection, compare/write transitions, immutable/non-reusable evidence, lookup
isolation, and damaged/mismatched registration failure.

All hard exclusions remain untouched. Awaiting Reviewer audit; no promotion or
Phase 6 work is claimed.
