# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 9B-P — Accepted Identity Station implementation promoted; closeout submitted

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`feat/identity-station-bootstrap` at
`d06538613d6f25b2337daaf9727b5604c3524c75`.

Verified across the full branch from current `main`:

- branch is three commits ahead, zero behind;
- implementation remains confined to the standalone Identity Station runtime,
  PostgreSQL migration/adapter, deterministic tests, dependency/foundation
  routing, and Code Map;
- fixture IDs are explicitly test-only;
- the durable bootstrap command requires an already-configured Station-owned
  PostgreSQL ledger and never accepts caller-supplied IDs;
- sequential reruns resolve the existing pair and conflicting bootstrap evidence
  stops;
- production PostgreSQL bootstrap acquires one transaction-scoped
  `pg_advisory_xact_lock` before any bootstrap read/write;
- `bootstrapAdminManagerHeader()` uses only that serialized transaction
  boundary;
- adapter verification proves the lock is acquired after BEGIN and before
  bootstrap work;
- deterministic concurrent two-Station proof yields exactly one Admin Manager
  root and one matching Header pair, with both calls resolving the same pair;
- normal reserve/assign/lookup, collision, non-reuse, immutable placement and
  root-before-child rules remain intact;
- no deployment, credential, public transport/auth, binding, Header
  presentation, Component Manager, or child-component work is introduced.

### Safeguard

The concurrent PGlite proof uses a test serialization surrogate because it does
not exercise PostgreSQL advisory-lock semantics itself. Acceptance therefore
depends on the production adapter's explicit
`pg_advisory_xact_lock` call being preserved. Do not replace/remove that
database transaction lock without a separately reviewed concurrency proof.

## Builder instruction — promotion only

Promote the exact accepted branch head
`d06538613d6f25b2337daaf9727b5604c3524c75` to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward/merge only the accepted three-commit candidate; do not alter
   implementation substance.
3. Run:
   - focused Identity Station check;
   - `pnpm --filter @weerax/schemas check`;
   - `pnpm audit:foundation`;
   - `pnpm check`;
   - `git diff --check`.
4. Push and verify remote `main` contains the exact accepted candidate.
5. Remove `feat/identity-station-bootstrap` only after promotion is proven
   safe.
6. Update this same file to `AWAITING REVIEWER REVIEW` with final `main` SHA,
   checks and remote-head evidence.
7. Stop for Reviewer.

## Operational gate after promotion

Phase 10 remains blocked after implementation promotion.

The next action is not more Station architecture. The bootstrap command must be
run once against a persistent Station-owned PostgreSQL ledger, then the assigned
Admin Manager and Admin Header records must be read back in a separate
session/process.

Required durable evidence:

- assigned Admin Manager `WEXAMxxxxx`;
- assigned Admin Header `WEXAMHxxxxx`;
- Header `parentAllocationId` exactly equals that Admin Manager ID;
- Header slot exactly `header`;
- rerunning bootstrap resolves the same pair and creates no additional rows.

If no persistent Station-owned PostgreSQL execution surface exists, record that
operational gate. Do not mint repository/test substitute IDs.

## Builder handoff

Accepted candidate was fast-forwarded to `origin/main` at
`d06538613d6f25b2337daaf9727b5604c3524c75`, with no implementation changes
or merge commit. The promoted candidate is exactly the Reviewer-inspected
three-commit head.

Passed after promotion preparation: focused Identity Station check; schemas
check; foundation audit; `pnpm check`; `git diff --check`.

Remote verification: `origin/main` resolves to the SHA above. The proven-safe
`feat/identity-station-bootstrap` topic branch was removed after confirming it
was an ancestor of `main`; remote heads then contained only `main` and
`Project-work-instructions`.

Operational gate remains: no persistent Station-owned PostgreSQL ledger or
credential surface was available, so no real Admin Manager/Header IDs were
minted or claimed.

## Remaining roadmap

After durable allocation evidence is accepted: Phase 10 empty Header shell
compartments; Phase 11 responsive shell proof; Phase 12 promote/close. Stop
before real child-component composition and Admin Station fitting.
