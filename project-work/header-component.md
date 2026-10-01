# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 9B-C — Durable bootstrap command submitted; allocation execution remains operationally gated

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected
`feat/identity-station-bootstrap` at
`50aea1fb9ffefa38ca5f1974911f4d5ec4afc983`.

The Station implementation is broadly aligned with ADRs 0013–0015:

- standalone `apps/identity-station`;
- schema-only internal dependency plus PostgreSQL client;
- Station-generated IDs;
- transactional reserve/assign/lookup;
- unique `allocation_id`;
- immutable allocation/family/placement trigger;
- no-delete ledger protection;
- root-before-Header gating;
- strict reserve input excluding caller IDs/platform data;
- collision retry and lifecycle tests;
- Header placement persists explicit parent ID + `header` slot.

However, Phase 9B required the first **durable** Admin Manager and Admin Header
allocations. The reported `WEXAMABCDE` and `WEXAMHFGHJK` exist only inside
disposable PGlite test databases that are deleted after each test. They are test
fixtures, not allocations retained by the Station-owned authoritative ledger.

Those values therefore must **not** be treated as the real Header platform IDs.
Doing so would violate reservation/non-reuse authority because no durable ledger
currently remembers them.

## Builder correction — same branch, bounded scope

Keep the implementation candidate intact unless correction is required, but
separate deterministic implementation proof from real allocation bootstrap.

1. Do not present fixture IDs as real allocations.
2. Add an explicit Station-owned bootstrap operation/command that, against an
   already-configured PostgreSQL ledger, performs only:
   - reserve + assign Admin Manager root;
   - reserve + assign Admin Header child after the root;
   - return/print the two assigned IDs and persisted Header parent/slot evidence.
3. The bootstrap path must call the Station operations; it must not accept,
   seed, hardcode, or caller-supply allocation IDs.
4. It must be safe against accidental repeat execution: if the authorised
   bootstrap allocations already exist, it must stop/resolve them without
   creating another Admin Manager/Header pair. Do not invent a generic reverse
   lookup API beyond what is minimally necessary for this bootstrap guard; if
   that requires architecture beyond ADR 0015, stop and report the gate.
5. Keep production hosting, credentials, secret management, public API,
   authentication, bindings, Header UI, and child composition out of scope.
6. Tests may remain disposable, but must distinguish fixture IDs from durable
   bootstrap output.
7. Run focused Station checks plus schemas check, foundation audit, `pnpm check`,
   and `git diff --check`.
8. Push the bounded correction and update this same file to
   `AWAITING REVIEWER REVIEW`.

### Evidence requirement

A real Admin Manager/Header allocation cannot be accepted until the bootstrap
has actually run against a persistent Station-owned PostgreSQL ledger and the
resulting records can be read back after a separate process/session.

If no persistent Station-owned PostgreSQL execution surface is currently
available, report that operational gate explicitly. Do **not** substitute test
fixtures or repository files for the authoritative ledger.

## Builder handoff

Candidate: `feat/identity-station-bootstrap` at
`7195fd8346f8b139d1adb5eb87dd7975c2273025` (verified on `origin`).

The candidate adds a Station-owned, idempotent Admin Manager/Header bootstrap
command that invokes Station reserve/assign paths, returns the two assigned IDs
and Header parent/slot evidence, and stops on conflicting existing bootstrap
evidence. It adds separate-session read-back and conflict tests, labels fixture
IDs as non-durable, and updates the Identity Station Code Map.

Passed: focused Station check; schemas check; foundation audit; `pnpm check`;
`git diff --check`.

Operational gate: no persistent Station-owned PostgreSQL ledger or credential
surface is available here. The bootstrap command was therefore not run against
a durable ledger, and no real Admin Manager/Header IDs were minted or claimed.

## Remaining roadmap

Phase 10 stays blocked until the real Header allocation is durably established.
After that: empty Header shell compartments, then responsive shell proof, then
promotion/closeout. Stop before all real child-component composition and Admin
Station fitting.
