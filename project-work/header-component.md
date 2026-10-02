# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 9B-D — Concurrency-safe bootstrap submitted; allocation execution remains operationally gated

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected correction candidate
`feat/identity-station-bootstrap` at
`7195fd8346f8b139d1adb5eb87dd7975c2273025`.

Accepted parts of the correction:

- fixture IDs are now explicitly test-only and are no longer claimed as real
  allocations;
- a Station-owned bootstrap command uses the accepted Station operations rather
  than caller-supplied/hardcoded IDs;
- sequential repeat execution resolves the existing pair rather than creating a
  second pair;
- separate database-session read-back is tested;
- conflicting existing root evidence stops rather than silently choosing one;
- the command requires an already-configured Station PostgreSQL ledger;
- no deployment/authentication/Header/UI scope was introduced.

### Remaining risk

The bootstrap is repeat-safe only after one transaction has committed. Two
bootstrap processes started concurrently can both read zero Admin Manager roots,
then each reserve a different valid `WEXAMxxxxx` because the ledger uniqueness
constraint is only on `allocation_id`.

That can create two durable Admin Manager roots and then two Headers. A later run
would detect the conflict, but the namespace would already contain conflicting
bootstrap allocations that cannot be deleted or reused.

The first durable bootstrap must therefore be singleton-safe at the database
transaction boundary, not merely sequentially idempotent.

## Builder correction — same branch only

1. Add the smallest PostgreSQL-backed serialization/singleton guard that makes
   `bootstrapAdminManagerHeader()` safe across concurrent Station processes.
   Prefer a Station-owned transaction/database mechanism; do not introduce a
   generic application lock service.
2. The guarantee must be: concurrent first bootstrap attempts cannot commit more
   than one authorised Admin Manager root/Header pair.
3. Preserve normal `reserve` collision/non-reuse semantics and immutable ledger
   evidence.
4. Add a deterministic concurrency test using two independent Station/database
   sessions against the same PostgreSQL/PGlite ledger. After both attempts
   settle, exactly one root and one matching Header may exist; the second attempt
   must resolve the same pair or fail without creating another pair.
5. Keep fixture IDs non-durable and keep the real durable allocation execution
   operationally gated.
6. Do not add production deployment, credentials, auth/public transport,
   bindings, Header source/UI, or child composition.
7. Run focused Station check, schemas check, foundation audit, `pnpm check`,
   and `git diff --check`.
8. Push the bounded correction and update this same file to
   `AWAITING REVIEWER REVIEW`.

## Operational gate remains

Even after this implementation is accepted, Phase 10 remains blocked until the
bootstrap command is actually run against a persistent Station-owned PostgreSQL
ledger and the assigned Admin Manager/Header IDs plus exact Header parent/slot
are read back from a separate session.

If no persistent Station-owned PostgreSQL execution surface is available, report
that gate. Do not substitute PGlite test IDs or repository files.

## Builder handoff

Candidate: `feat/identity-station-bootstrap` at
`d06538613d6f25b2337daaf9727b5604c3524c75` (verified on `origin`).

The candidate adds a Station-private PostgreSQL transaction-scoped advisory
lock before `bootstrapAdminManagerHeader()` reads or writes bootstrap evidence.
It retains normal reservation semantics and adds an adapter-level lock-order
test plus a deterministic concurrent two-Station PGlite-ledger proof: exactly
one root and matching Header pair persist, and both calls resolve that pair.

Passed: focused Station check; schemas check; foundation audit; `pnpm check`;
`git diff --check`.

Operational gate: no persistent Station-owned PostgreSQL ledger or credential
surface is available here. The bootstrap was not run against durable storage,
and no real Admin Manager/Header IDs were minted or claimed.

## Remaining roadmap

After concurrency-safe Station implementation is accepted/promoted: execute and
verify the real durable bootstrap; then Phase 10 empty Header shell compartments;
then responsive shell proof; then closeout. Stop before real child-component
composition and Admin Station fitting.
