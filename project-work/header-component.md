# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 9B — Identity Station candidate submitted

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

## Builder handoff

Candidate: `feat/identity-station-bootstrap` at
`50aea1fb9ffefa38ca5f1974911f4d5ec4afc983` (remote head verified).

- Adds standalone `apps/identity-station`, its PostgreSQL transaction adapter,
  and `wex_identity.allocation_ledger` migration. The ledger has a unique
  allocation key, lifecycle/placement evidence, immutable identity/placement
  trigger, and no-delete trigger.
- Adds deterministic local PostgreSQL proof only; disposable test databases
  leave no repository ledger artifact. It proves collision retry, non-reuse,
  invalid assignment, immutable ledger evidence, strict input, and root-before-
  child ordering.
- The two assigned test allocations are Admin Manager `WEXAMABCDE` and Admin
  Header `WEXAMHFGHJK`; Header lookup returns parent `WEXAMABCDE` and slot
  `header`.
- Changes are the Station app/migration/tests, `pnpm-lock.yaml`, foundation
  audit, repository/root maps, and the new Identity Station Code Map.
- Passed `pnpm --filter @weerax/schemas check`, focused Station check,
  `pnpm audit:foundation`, `pnpm check`, and `git diff --check`.

No deployment, hosted database, secret/auth/public API architecture, binding,
reverse lookup, retirement/bulk issuance, domain record, Header source, fixture,
or child composition was added. Reviewer must independently inspect the pushed
candidate before Phase 10.

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
