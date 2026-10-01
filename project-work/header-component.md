# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 9A-P — Accepted Identity Station placement authority promoted

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`proposal/identity-station-placement` at
`1c4570e3e9a06fe5ebb78d26f920109832453c1a`.

Verified:

- candidate is exactly one commit ahead of current `main`, zero behind;
- changed files are limited to proposed ADR 0015 and the decision index;
- `apps/identity-station` is defined as a standalone WEX platform runtime,
  not a reusable package, browser app, adapter, Shared UI layer, or domain
  service;
- the Station may consume `@weerax/schemas` but schemas remain free of
  issuance/persistence/runtime code;
- durable ledger ownership is Station-only in PostgreSQL
  `wex_identity.allocation_ledger`;
- `allocationId` is the transactional uniqueness boundary;
- only committed reservations consume IDs;
- immutable family/placement and permanent non-reuse are explicit;
- first operations are bounded to `reserve`, `assign`, and `lookup`;
- caller-supplied IDs, platform bindings, reverse platform lookup, retirement
  operations, bulk allocation, Header source, and UI composition remain out of
  scope;
- the Admin Header reservation is correctly gated on an already-assigned Admin
  Manager root and persists the explicit parent ID + `header` slot.

## Safeguard

ADR 0015 defers deployment topology, database hosting, credentials, transport
authentication, and operational access details. Phase 9B must not widen into
production deployment/authentication architecture merely to prove the first
allocation lifecycle. Implement only what is necessary to prove the accepted
Station-owned durable ledger and operation invariants. Any permanent deployment,
secret-management, public transport, or caller-auth architecture requires its
own explicit authority if it becomes necessary.

## Builder instruction — promotion only

Promote exact accepted candidate
`1c4570e3e9a06fe5ebb78d26f920109832453c1a` to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Change ADR 0015 status to `Accepted — architecture authority` and move it
   from Proposed to Accepted in `docs/decisions/README.md` as part of the same
   bounded authority closeout; do not alter decision substance.
3. Run `pnpm audit:foundation` and `git diff --check`.
4. Commit/push the acceptance-metadata correction if required, then promote the
   exact resulting accepted authority to `main`.
5. Verify remote `main` and remove the completed topic branch only after the
   promotion is proven safe.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with exact final
   `main` SHA, checks, changed files, and remote-head evidence.
7. Stop for Reviewer.

Do not begin Phase 9B implementation until Reviewer independently closes this
promotion.

## Remaining roadmap

### Phase 9B — Identity Authority implementation + first allocations
Implement only the minimum accepted Station mechanism and issue/assign the
Admin Manager root plus Admin Header direct child with explicit parent/slot
persistence. No Header presentation or child components.

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

After Phase 12, stop before any real child-component composition or Admin
Station fitting.

## Builder handoff

Promoted the final accepted authority to `main` at
`27642f1d42facf310a061db52174a57df257e2de`. The acceptance-metadata commit
changed only `docs/decisions/0015-wex-ui-identity-station-placement.md` and
`docs/decisions/README.md`; no decision substance changed.

`pnpm audit:foundation` and `git diff --check` passed. The merged
`proposal/identity-station-placement` branch was deleted only after merge proof.
Remote heads: `main` at `27642f1d42facf310a061db52174a57df257e2de` and
`Project-work-instructions` at `94cfb4a3682c101fdf01466a694bba05609463eb`.

No Phase 9B implementation began. Reviewer must independently close promotion.
