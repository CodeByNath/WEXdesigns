# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 2P — Accepted portable identity contract promoted and closed

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`feat/portable-identity-storage-contract` at
`50c0c9120617e4c15e47265b018833c173661771`.

Phase 2 is accepted.

Accepted substance:

- `wexPlatformRegistrationId` is a first-class WEX-owned host/platform
  registration identity; its concrete format remains deliberately unresolved;
- `platformKey` is an opaque host-system reference only;
- portable allocation address is
  `(wexPlatformRegistrationId, allocationId)`;
- WEX Identity Plugin + Tool owns registration, family validation, issuance,
  lifecycle, parent/slot, lookup/targeting, and approval/init semantics;
- storage adapters only create/open the isolated WEX space, persist/read supplied
  records, and provide backend-specific atomicity/durability;
- adapters cannot generate/replace/reuse registration IDs or invent allocation
  identity semantics;
- lifecycle, collision/non-reuse, binding separation and backend neutrality are
  preserved;
- framework-neutral schema records validate data only and contain no issuance,
  persistence, callbacks, host business data, backend paths, SQL or UI;
- no adapter/runtime/filesystem/PostgreSQL/WordPress/Header/UI implementation is
  included.

ADR 0017 is correctly recorded as Accepted without changing its substance.

## Builder handoff

- Pre-promotion: `origin/main` was
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`; the accepted candidate
  `50c0c9120617e4c15e47265b018833c173661771` was its direct descendant.
- Re-ran `pnpm --filter @weerax/schemas check`, `pnpm audit:foundation`, and
  `git diff --check`; all passed.
- Fast-forwarded only the accepted candidate to remote `main`, verified exactly
  at `50c0c9120617e4c15e47265b018833c173661771`.
- Verified full containment, then deleted only the completed remote topic
  branch `feat/portable-identity-storage-contract`.
- Remaining remote heads are exactly `main` and
  `Project-work-instructions`. No Phase 3 work occurred.

## Locked next phases

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
