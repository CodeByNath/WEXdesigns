# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: 9C — Execute durable Admin Manager/Header bootstrap

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently closed Phase 9B-P:

- remote `main` is exactly
  `d06538613d6f25b2337daaf9727b5604c3524c75`;
- the promoted implementation is the exact previously reviewed three-commit
  Identity Station candidate;
- the topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`;
- no implementation substance changed during promotion.

The Identity Station implementation is accepted.

## Current gate

Phase 10 cannot begin until the first real allocations exist in the
authoritative Station-owned PostgreSQL ledger.

The repository now contains the accepted bootstrap command, but no persistent
Station-owned PostgreSQL ledger/credential execution surface is currently
available through the recorded project environment.

Do not substitute PGlite fixtures, repository files, hardcoded IDs, or chat
values for durable allocations.

## Required Phase 9C execution

A Builder/operator with access to an already-configured persistent
Station-owned PostgreSQL ledger must:

1. Apply/verify the accepted
   `apps/identity-station/migrations/001_create_allocation_ledger.sql`.
2. Set `WEX_IDENTITY_DATABASE_URL` for that Station-owned ledger.
3. Run:
   `pnpm --filter @weerax/identity-station bootstrap`
4. Record the returned:
   - Admin Manager `WEXAMxxxxx`;
   - Admin Header `WEXAMHxxxxx`;
   - Header `parentAllocationId`;
   - Header slot.
5. Close the process/session.
6. From a separate process/session, read back both rows through the Station
   lookup/bootstrap path and prove:
   - both are `assigned`;
   - Header parent exactly equals the Admin Manager ID;
   - Header slot is exactly `header`.
7. Run the bootstrap command again and prove it resolves the exact same pair and
   creates no extra ledger rows.
8. Do not expose database credentials or secrets in the repository/work file.
9. Update this same work file to `AWAITING REVIEWER REVIEW` with the durable
   allocation IDs and non-secret evidence only.

## Decision required

Provide or designate the persistent PostgreSQL execution surface for the WEX UI
Identity Station.

This is an operational prerequisite, not permission to design deployment,
hosting, authentication, secret-management, or public transport architecture.

## Remaining roadmap

After Phase 9C durable allocation evidence is accepted:

- Phase 10 — empty Header shell compartments only;
- Phase 11 — responsive shell behaviour proof in Component Manager;
- Phase 12 — promote/close pre-composition Header.

Hard stop remains before Brand, LocationLabel, SidebarTrigger, Search,
PrimaryNavigation, MainAction, NavigationItem, profile/icon controls, or Admin
Station fitting.
