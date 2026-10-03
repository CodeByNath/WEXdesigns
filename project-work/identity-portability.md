# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 1C — Close promoted authority state

## Reviewer verdict

**Proceed with safeguards**

Promotion is structurally accepted:

- remote `main` is exactly
  `38b762c04d1b41c8e70616a270dd525646f1e5fa`;
- the accepted portability diff is present on `main`;
- the topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`;
- no implementation/runtime/Header scope drift occurred.

Two documentation-state corrections remain before Phase 2 can open.

### Required corrections

1. `docs/decisions/0016-portable-wex-identity-spaces.md` is still marked
   `Proposed`. The Reviewer has accepted and promoted this decision, so change
   its status to `Accepted` without altering its decision substance.

2. `docs/code-map/identity-station.md` still says it is verified against the
   old `main` SHA `d065386...` and still calls ADR 0016 `Proposed`.
   Update the Code Map to the promoted `main` SHA and accepted ADR state.
   Do not change runtime claims beyond what the accepted authority supports.

## Builder instruction — Phase 1C only

Create one documentation-only topic branch from current `main`.

Allowed changes:
- ADR 0016 status only;
- Identity Station Code Map accepted-status/SHA bookkeeping;
- decision index wording only if needed to move ADR 0016 from Proposed to
  Accepted.

Forbidden:
- no architecture substance changes;
- no schemas, runtime, storage, adapters, PostgreSQL, Header, or UI changes;
- do not begin Phase 2.

Run `pnpm audit:foundation` and `git diff --check`, push, update this same
file to `AWAITING REVIEWER REVIEW`, and stop.

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
