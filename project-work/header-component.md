# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 9A — Define Identity Authority implementation placement

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently closed Phase 8C:

- remote `main` is exactly
  `ae1c1683b3cd7bf50ae3297d403b63a254add9f6`;
- ADR 0014 is `Accepted — architecture authority`;
- the decision index lists ADR 0014 under Accepted;
- the correction topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`.

Phase 8 is closed.

## Phase 9 architecture gate

ADR 0014 now authorises a durable Station-owned allocation ledger, but current
repository authority does not yet identify a concrete Identity Authority runtime
home or storage technology. Repository search found no existing Identity Station,
SQLite/storage layer, or durable persistence implementation to reuse.

Do not invent that placement inside Header work.

## Builder instruction — Phase 9A only

Determine and propose the smallest repository-authoritative implementation
placement for the WEX UI Identity Authority / Station.

Required:

1. Start from ADRs 0013/0014, `docs/architecture/platform-identity.md`,
   `repository-map.md`, dependency rules, and current apps/packages.
2. Decide only:
   - which repository layer/application owns the Station runtime;
   - where its durable Authority-controlled ledger lives;
   - the minimum API/operation boundary for reserve, assign and lookup needed
     for the first two allocations;
   - how atomic uniqueness and permanent non-reuse are enforced.
3. Preserve:
   - no generator/registry/persistence in schemas, WEX, Shared UI or adapters;
   - applications consume identities but do not independently mint them;
   - successfully committed reservations only are consumed/non-reusable;
   - no platform/domain record authority enters the Station.
4. If this requires a new permanent service/package/storage architecture,
   record it through the smallest follow-up ADR/architecture update.
5. Do not implement storage, issuer code, mint IDs, allocate Admin Manager/Header,
   alter Header source, or compose any UI in this phase.
6. Run `pnpm audit:foundation` and `git diff --check`.
7. Commit/push one bounded authority candidate, update this same work file to
   `AWAITING REVIEWER REVIEW`, and stop.

## Remaining roadmap

### Phase 9B — Identity Authority implementation + first allocations
After 9A acceptance/promotion only: implement the minimum accepted Station
mechanism and issue/assign the Admin Manager root plus Admin Header direct child
with explicit parent/slot persistence. No Header presentation or child
components.

### Phase 10 — Empty Header shell compartments
Implement only Header root, Brand shell, Navigation shell, Navigation
left/location inner shell, and Navigation utility/quick-navigation inner shell.
Named empty mounts/direct-child constraints only; no real child components.

### Phase 11 — Responsive shell behaviour proof
Prove the empty shell in Component Manager at 1440, 1024, 767 and Fluid with
64px Header, 64px square Brand, remaining-width Navigation, approved two-level
gutters, no deep gutter accumulation, responsive location mount boundary, and
light/dark/accessibility evidence.

### Phase 12 — Promote and close pre-composition Header
Promote exact accepted shell, verify hosted behaviour, remove topic branch, and
close ready for separately authorised child composition.

## Hard stop

After Phase 12, stop. Do not begin Brand, LocationLabel, SidebarTrigger, Search,
PrimaryNavigation, MainAction, NavigationItem, icon/profile controls, or Admin
Station fitting without a new Reviewer-authorised phase.
