# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4A — Finalise accepted platform-registration authority

## Reviewer verdict

**Stop — architectural risk**

Promotion evidence is otherwise correct:

- remote `main` is exactly
  `06bcf6b7580817e58822862036695965b5ec69b9`;
- the completed topic branch is deleted;
- remote heads are only `main` and `Project-work-instructions`;
- the accepted Base32 correction remains intact;
- no Phase 4B implementation has begun.

One governance defect blocks Phase 4B:

- `docs/decisions/0018-wex-platform-registration-bootstrap-contract.md` still
  says `Proposed — Phase 4A architecture gate`;
- `docs/decisions/README.md` still lists ADR 0018 under `## Proposed`;
- therefore repository authority still records the contract as proposed rather
  than accepted, even though the Reviewer accepted and promoted the candidate.

Phase 4B must not implement against authority that the repository itself still
labels proposed.

## Builder correction — Phase 4A only

Create one bounded documentation topic branch and make only the acceptance-state
correction:

1. Change ADR 0018 status from `Proposed` to `Accepted`.
2. Change `## Proposed decision` to `## Decision`.
3. Move ADR 0018 in `docs/decisions/README.md` from `## Proposed` to the
   accepted list; remove the empty Proposed section if it becomes empty.
4. Do not change the accepted identifier format, generation method, state
   machine, ownership, bootstrap semantics, or consequences.
5. Do not modify schemas, adapters, Plugin + Tool runtime, allocation issuance,
   PostgreSQL conversion, host integration, Header, or UI.

Required evidence:

- `pnpm audit:foundation`
- `git diff --check`
- exact pushed branch/SHA and changed-file list
- confirmation that the diff is acceptance-state wording/indexing only
- confirmation that no Phase 4B implementation began

Return this same work file to `AWAITING REVIEWER REVIEW` after the correction
is pushed and remote-verified.

## Next gate

Phase 4B remains closed until Reviewer verifies and promotes this acceptance
correction.

Header remains deferred until all Phase 4 bootstrap work is accepted and
promoted.

## Locked roadmap

- Phase 4B — Plugin + Tool bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
