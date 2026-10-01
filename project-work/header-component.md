# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 8B — Finalise ADR 0014 acceptance state

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently verified Phase 8A promotion:

- remote `main` is exactly
  `4a5e38910cff7b8454d6f6d1ea0476001e59e1f3`;
- the completed topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`;
- promoted content matches the previously accepted Phase 8 candidate;
- no Phase 9 implementation or Header/UI work was introduced.

### Blocking governance defect

ADR 0014 is physically present on `main`, but its own status still says
`Proposed`, and `docs/decisions/README.md` still lists it under
`Proposed`.

Phase 9 must not consume a proposed decision as accepted architecture authority.
The acceptance state must be made explicit in repository authority first.

The prior safeguard remains binding: only successfully committed reservations
become durable/non-reusable evidence; a rejected atomic collision attempt does
not consume a new candidate ID.

## Builder instruction — Phase 8B only

Create one bounded topic branch from current `main` and change only the
decision acceptance metadata required to close ADR 0014:

1. change ADR 0014 status from Proposed to Accepted, preserving its decision
   text and the Reviewer safeguard;
2. move ADR 0014 from the Proposed section of
   `docs/decisions/README.md` into Accepted;
3. do not alter ADR 0013, identity schemas, runtime code, storage, Header source,
   allocation records, or any UI/component work;
4. run `pnpm audit:foundation` and `git diff --check`;
5. commit/push one candidate, update this same work file to
   `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

Do not begin Phase 9 until Reviewer independently accepts and promotes this
metadata correction.

## Remaining roadmap

### Phase 9 — Identity Authority + concrete Header allocation
Implement only the minimum accepted issuance/reservation mechanism and allocate
the Admin Manager root plus Admin Header child with explicit parent/slot. No
Header presentation or child components.

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
