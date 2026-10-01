# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 8A — Promote accepted Identity Bootstrap authority

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`feat/header-identity-bootstrap-authority` at
`4a5e38910cff7b8454d6f6d1ea0476001e59e1f3`.

Verified:

- candidate is exactly one commit ahead of current `main`, zero behind;
- changed files are limited to proposed ADR 0014 and the decision index;
- the ADR preserves ADR 0013 ownership: only the WEX UI Identity Authority /
  Station may issue/reserve durable allocation IDs;
- durable allocation evidence is Station-owned, not app/config/schema/UI/domain
  state;
- `allocationId`, family and placement become immutable at reservation;
- atomic uniqueness, reserve-before-assignment, collision rejection and
  permanent non-reuse are explicit;
- first bootstrap shapes are limited to Admin Manager root `WEXAMxxxxx` and
  direct Admin Header child `WEXAMHxxxxx` at parent-owned `header` slot;
- no allocation, issuer implementation, storage implementation, Header source,
  schema, adapter, binding, or component composition was introduced.

### Safeguard

ADR 0014's phrase "failed, abandoned, or retired reservation remains evidence"
must be read as applying only to an allocation ID whose reservation write
successfully committed. A rejected atomic collision attempt does not create a
new reservation record. Do not implement failure semantics that consume or
persist an uncommitted candidate ID.

## Builder instruction — Phase 8A only

Promote the exact accepted authority candidate
`4a5e38910cff7b8454d6f6d1ea0476001e59e1f3` to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward `main` to the exact accepted candidate; do not alter the ADR.
3. Run `pnpm audit:foundation` and `git diff --check`.
4. Push and verify remote `main` equals the accepted SHA.
5. Remove `feat/header-identity-bootstrap-authority` only after promotion is
   proven safe.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with exact
   promotion/check/remote-head evidence.
7. Stop for Reviewer.

Do not begin Phase 9 issuance/allocation work until Reviewer independently
closes this promotion.

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
