# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 9B — Implement Identity Station and first allocations

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently closed Phase 9A-P:

- remote `main` is exactly
  `27642f1d42facf310a061db52174a57df257e2de`;
- ADR 0015 is `Accepted — architecture authority`;
- the decision index lists ADR 0015 under Accepted;
- the completed topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`;
- no Phase 9B runtime/storage/allocation work was introduced during promotion.

## Authorised Phase 9B scope

Implement only the minimum accepted WEX UI Identity Authority / Station needed
to prove ADRs 0013–0015 and create the first two durable allocations.

### Runtime placement

Use `apps/identity-station` as the standalone Node runtime. It may consume
`@weerax/schemas`; it must not move issuance/persistence into schemas, WEX,
Shared UI, adapters, web-runtime, or a consuming domain application.

### Durable ledger

Implement the Station-owned PostgreSQL
`wex_identity.allocation_ledger` migration/storage boundary with:

- `allocationId` as primary/unique key;
- family;
- explicit placement: root OR parentAllocationId + slot;
- lifecycle state: reserved / assigned / retired;
- reservation / assignment / retirement timestamps as applicable;
- immutable allocation ID, family and placement after reservation;
- no deletion/reuse path for committed rows.

Only a successfully committed reservation consumes an ID. Collision or failed
transaction must leave no new durable row.

### Minimum operations

Implement and test only:

- `reserve(family, placement)` — Station generates the candidate; caller cannot
  supply an allocation ID;
- `assign(allocationId)` — reserved -> assigned only;
- `lookup(allocationId)` — returns durable allocation evidence/state.

For the authorised bootstrap:

1. reserve + assign one Admin Manager root from family `WEXAM`;
2. only after that assignment, reserve + assign one Admin Header from family
   `WEXAMH`;
3. persist the Header's exact `parentAllocationId` and parent-owned
   `header` slot.

### Required proof

Add deterministic tests proving at minimum:

- suffix/family generation obeys accepted schema authority;
- collision retry does not consume a failed candidate;
- committed reservation cannot be reused;
- family/placement cannot mutate after reservation;
- assign cannot create a missing row or reassign invalid state;
- Header reservation fails before parent assignment;
- Header reservation succeeds after parent assignment;
- Header lookup returns exact parent ID + `header` slot;
- caller-supplied allocation IDs are impossible through the operation boundary;
- no platform binding/domain record/presentation data enters the ledger.

Run focused Station tests plus:
- `pnpm --filter @weerax/schemas check`;
- `pnpm audit:foundation`;
- `pnpm check`;
- `git diff --check`.

## Safeguards / exclusions

Do not implement production deployment topology, hosted database provisioning,
secret management, caller authentication, public API design, reverse platform
lookup, bindings, retirement operations, bulk issuance, migrations of existing
records, Header source/presentation, Component Manager fixtures, or child
components.

Use only enough local/test PostgreSQL infrastructure to prove the accepted
durable transaction semantics. If the repository cannot provide that proof
without adding a new permanent deployment/auth architecture, stop and report the
gate instead of inventing it.

Commit/push one bounded topic branch, update this same file to
`AWAITING REVIEWER REVIEW` with exact SHA, changed files, migration/storage
evidence, test output, and the two allocated IDs. Stop for Reviewer.

## Remaining roadmap

### Phase 10 — Empty Header shell compartments
After Phase 9B acceptance/promotion only: implement Header root, Brand shell,
Navigation shell, Navigation left/location inner shell, and Navigation
utility/quick-navigation inner shell. Empty named mounts/direct-child constraints
only; no real child components.

### Phase 11 — Responsive shell behaviour proof
Prove the empty shell in Component Manager at 1440, 1024, 767 and Fluid with
accepted geometry/gutter/responsive rules.

### Phase 12 — Promote and close pre-composition Header
Promote exact accepted shell, verify hosted behaviour, remove topic branch, then
stop before child composition or Admin Station fitting.
