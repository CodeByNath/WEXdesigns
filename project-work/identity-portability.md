# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 1D — Promote reviewed documentation-state correction

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently verified the Phase 1C candidate:

- its merge-base is exact remote `main`
  `38b762c04d1b41c8e70616a270dd525646f1e5fa`;
- candidate `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539` changes only the three
  authorised documentation records;
- ADR 0016 substance is unchanged; its status and index placement now match
  accepted authority, and the Code Map tracks the accepted SHA/status;
- independent `pnpm audit:foundation` and `git diff --check` passed;
- no implementation/runtime/Header scope drift occurred.

Phase 1C is accepted pending controlled promotion. Do not begin Phase 2.

### Completed corrections

1. `docs/decisions/0016-portable-wex-identity-spaces.md` was marked
   `Proposed`. Its status is now `Accepted` without changing its decision
   substance.

2. `docs/code-map/identity-station.md` was verified against the old `main` SHA
   `d065386...` and called ADR 0016 `Proposed`. It now tracks the promoted
   `main` SHA and accepted ADR state without changing runtime claims beyond
   accepted authority.

## Builder instruction — Phase 1D only

Do not create a new topic branch. Use only the reviewed candidate
`docs/identity-portability-authority-closeout`.

Before promotion, fetch and verify that `origin/main` remains
`38b762c04d1b41c8e70616a270dd525646f1e5fa`, the candidate remains
`0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`, and it is a direct descendant.
Fast-forward only that candidate to `main`, push, and verify the exact remote
`main` SHA. Then update this same file to `AWAITING REVIEWER REVIEW` with the
promotion evidence and stop. Do not delete the topic branch yet.

Forbidden:
- no candidate/source edits;
- no architecture, schema, runtime, storage, adapter, PostgreSQL, Header, or
  UI changes;
- do not begin Phase 2.

## Builder handoff

- Candidate branch: `docs/identity-portability-authority-closeout`
- Pushed candidate SHA:
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`
- Changed only: ADR 0016 status, Identity Station Code Map accepted-status/SHA
  bookkeeping, and the decision index placement.
- Evidence: `pnpm audit:foundation` passed; `git diff --check` passed.
- Limitation/deviation: documentation-only Phase 1C; no runtime, schema,
  storage, adapter, PostgreSQL, Header, or UI work was performed.
- Unresolved issues: none for this phase.

## Locked roadmap

- Phase 2 — portable WEX identity + storage-adapter contract.
- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization: detect -> approval -> create/open space
  -> register platform -> ready.
- Phase 5 — convert PostgreSQL proof into optional adapter.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
