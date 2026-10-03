# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 2 — Portable identity contract candidate submitted

## Reviewer verdict

**Proceed**

Phase 1 is closed.

Reviewer independently verified:

- remote `main` remains
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`;
- the completed closeout topic branch is deleted;
- remote heads are exactly `main` and `Project-work-instructions`;
- no Phase 2 source work has started.

## Phase 2 objective

Define the portable WEX Identity contract that every storage backend must obey
before any adapter implementation begins.

This phase is **contract/architecture only**.

### Locked ownership

WEX Identity Plugin + Tool owns:
- platform/system registration semantics;
- family validation;
- ID generation/issuance;
- reserve / assign / retire lifecycle rules;
- parent/slot semantics;
- lookup/targeting semantics;
- initialization/approval semantics.

Storage Adapter owns only:
- create/open isolated host WEX identity space;
- persist/read WEX-directed records;
- atomic compare/write or equivalent collision protection;
- durable non-reuse evidence;
- backend-specific filesystem/DB/API mechanics.

Adapters must never invent IDs, families, lifecycle states, or identity meaning.

## Builder handoff

- Candidate branch: `feat/portable-identity-storage-contract`
- Pushed SHA: `ea7eb0704d6748f701e23676c4b5a4320e0cfc4d`
- Defines proposed ADR 0017 and a portable operation/record contract; updates
  platform-identity and Identity Station navigation.
- Adds strict `@weerax/schemas` registration, initialization-state, lifecycle
  record, and lookup-key validation with focused tests and public exports.
- No adapter, Plugin + Tool runtime, PostgreSQL change, filesystem/WordPress
  integration, ID allocation, Header work, product record, or UI was added.
- Checks passed: `pnpm --filter @weerax/schemas check`,
  `pnpm audit:foundation`, and `git diff --check`.
- Unresolved decision: ADR 0017 remains Proposed pending Reviewer acceptance;
  runtime interface and local-folder implementation remain deferred.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization: detect -> approval -> create/open space
  -> register platform -> ready.
- Phase 5 — convert PostgreSQL proof into optional adapter.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
