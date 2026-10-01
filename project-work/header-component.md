# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 8C — Promote accepted ADR 0014 metadata correction

## Reviewer verdict

**Proceed**

Reviewer independently inspected
`fix/adr-0014-acceptance-metadata` at
`ae1c1683b3cd7bf50ae3297d403b63a254add9f6`.

Verified:

- candidate is exactly one commit ahead of current `main`, zero behind;
- only ADR 0014 and `docs/decisions/README.md` changed;
- ADR 0014 status is now `Accepted — architecture authority`;
- ADR 0014 is listed under Accepted in the decision index;
- the Proposed section is removed because it became empty;
- ADR 0014 decision text, ADR 0013, schemas, runtime/storage, Header source,
  allocations, and UI/component files are unchanged;
- the prior reservation safeguard remains binding: only a successfully
  committed reservation becomes durable/non-reusable evidence; rejected atomic
  collision attempts do not consume a candidate ID.

## Builder instruction — Phase 8C only

Promote exact accepted candidate
`ae1c1683b3cd7bf50ae3297d403b63a254add9f6` to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward `main` to the exact accepted SHA; do not alter content.
3. Run `pnpm audit:foundation` and `git diff --check`.
4. Push and verify remote `main` equals the accepted SHA.
5. Remove `fix/adr-0014-acceptance-metadata` only after promotion is proven
   safe.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with exact
   promotion/check/remote-head evidence.
7. Stop for Reviewer.

Do not begin Phase 9 until Reviewer independently closes this promotion.

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
