# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 1P — Promote accepted identity portability authority

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

## Builder instruction — Phase 1P only

Promote the exact accepted candidate
`38b762c04d1b41c8e70616a270dd525646f1e5fa` to `main` using the repository's
normal non-destructive promotion workflow.

Required evidence:

1. verify `origin` is `CodeByNath/WEXdesigns`;
2. promote without modifying implementation substance;
3. verify remote `main` contains the exact accepted authority diff;
4. run/verify the required foundation checks after promotion;
5. remove the completed remote topic branch only after `main` is verified;
6. prove remote heads return to only `main` and
   `Project-work-instructions`;
7. update this same file to `AWAITING REVIEWER REVIEW` with exact promoted
   `main` SHA and non-secret evidence;
8. stop.

Do not begin Phase 2 during promotion.

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
