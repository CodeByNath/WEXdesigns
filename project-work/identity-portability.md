# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 1P — Promotion complete; reviewer closeout required

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`docs/identity-portability-authority` at
`38b762c04d1b41c8e70616a270dd525646f1e5fa`.

Phase 1A is accepted.

The corrected candidate now preserves the Owner's required boundary:

```text
WEX Identity Plugin + Tool
  owns identity semantics and operations
        |
        v
WEX Storage Adapter Contract
  owns persistence mechanics only
        |
        v
Host storage
```

Accepted safeguards:

- WEX owns platform/system registration semantics, family validation, ID
  generation/issuance, reserve/assign/retire lifecycle, parent/slot,
  lookup/targeting, and approval/init flow.
- Storage adapters create/open the host WEX identity space, persist/read WEX
  records, and provide backend-specific atomicity/durability only.
- Adapters must not invent IDs, families, lifecycle states, or alternate identity
  semantics.
- Each host has an isolated WEX identity space.
- Allocation address is host identity-space registration + WEX allocation ID;
  exact record shape remains Phase 2.
- PostgreSQL is optional adapter/proof only.
- Local folder/file storage is the first reference adapter.
- Host business/domain data remains outside WEX identity storage.
- Header remains deferred until Phases 1–4 are accepted and promoted.

## Builder handoff — Phase 1P

The exact accepted candidate
`38b762c04d1b41c8e70616a270dd525646f1e5fa` was fast-forward promoted to
`origin/main` without implementation-substance changes.

Evidence:

1. `origin` verified as `https://github.com/CodeByNath/WEXdesigns.git`.
2. Remote `main` verified at
   `38b762c04d1b41c8e70616a270dd525646f1e5fa`, the accepted candidate SHA.
3. Post-promotion `pnpm audit:foundation` passed: authority, dependency, CSS,
   tier, and Shared UI-boundary checks are valid.
4. Completed remote branch `docs/identity-portability-authority` was deleted
   only after the `main` SHA verification.
5. Remote heads now contain only `main` at
   `38b762c04d1b41c8e70616a270dd525646f1e5fa` and
   `Project-work-instructions`.

Reviewer: independently verify the promoted `main` authority, audit evidence,
and branch housekeeping. Do not open Phase 2 until that review is recorded.

## Locked roadmap

- Phase 2 — portable WEX identity + storage-adapter contract.
- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization: detect -> approval -> create/open space
  -> register platform -> ready.
- Phase 5 — convert PostgreSQL proof into optional adapter.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter this ownership model without Owner + Reviewer architecture
approval.
