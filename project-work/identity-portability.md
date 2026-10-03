# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 2P — Promote accepted portable identity contract

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

## Builder instruction — Phase 2P only

Promote the exact accepted candidate
`50c0c9120617e4c15e47265b018833c173661771` to `main` using the normal
non-destructive promotion workflow.

Required evidence:

1. verify `origin` is `CodeByNath/WEXdesigns`;
2. verify current `origin/main` is
   `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`;
3. fast-forward only the accepted candidate to `main`;
4. verify remote `main` equals the exact accepted candidate SHA;
5. run/verify `pnpm --filter @weerax/schemas check`,
   `pnpm audit:foundation`, and `git diff --check`;
6. remove the completed topic branch only after `main` is verified;
7. verify remote heads return to only `main` and
   `Project-work-instructions`;
8. update this same file to `AWAITING REVIEWER REVIEW` with exact evidence;
9. stop.

Do not begin Phase 3 during promotion.

## Locked next phases

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
