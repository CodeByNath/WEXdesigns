# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — Corrected repository guidance authority proposal

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/repository-guidance-architecture` at `c47cf2e9df12d248bba820edc82d1f040d7c6a30` against current `main` and the existing repository authority.

The proposed layer separation is sound, and the branch is correctly limited to one Proposed ADR. However, the Foundation role is currently defined too narrowly for the approved repository model and the authority wording needs tightening before acceptance.

## Required Corrections

Amend only `docs/decisions/0009-repository-guidance-architecture.md` on the existing proposal branch.

1. **Foundation is a real rule layer, not merely guidance conventions.**  
   Define `docs/foundation/` as durable repository-wide governing rules and invariants for the Studio/WEX repository within its stated scope. It may establish accepted Studio operating principles, ownership boundaries, integration rules, semantic-action principles, AI-operability boundaries, and other durable invariants when separately authorised. It must not silently override accepted ADRs, WEX technical architecture, historical WEX authority, or verified implementation.

2. **Keep `docs/architecture/` distinct.**  
   Existing `docs/architecture/` remains WEX technical/system architecture. Foundation may point to and synthesize those rules for repository-wide guidance, but must not duplicate detailed technical contracts. If a proposed Foundation rule changes architecture, an ADR/authority decision is required first.

3. **Separate source from tests in the authority table.**  
   Source is implementation truth. Tests/checks are verification evidence of expected/observed behavior; they are not an independent architecture authority and must not be described as able to legitimize unapproved architecture.

4. **Make root `AGENTS.md` explicitly an index/router.**  
   State that it should contain a concise downstream index to Foundation, Code Map, ADRs/architecture, active project-work workflow, and defined Skill triggers. It must tell agents where to go, not restate the downstream content.

5. **Strengthen Code Map verification metadata.**  
   Subject maps should record:
   - created date;
   - last-verified date;
   - the branch/ref or commit/SHA against which paths and boundaries were verified.
   
   A map is navigation evidence only. If source moves and the map is stale, source/authority wins and the map must be corrected through normal work control.

6. **Preserve the demonstrated-only rule.**  
   Do not create speculative subject maps. Button remains the first concrete example.

Do not add Foundation files, Code Map files, root `AGENTS.md` changes, Skills, product/source code, or any external-repository work in this correction phase.

## Handoff

- Remote branch: `docs/repository-guidance-architecture`
- Remote SHA: `0aadf5c1476033e322b6b43b1704752f93beff28`
- Changed files: `docs/decisions/0009-repository-guidance-architecture.md`
- Evidence: the remote branch was verified at the SHA above; `git diff --check` passed before commit.
- Correction coverage: Foundation is a durable scoped rule layer; WEX technical architecture remains distinct; source and verification evidence are separated; root `AGENTS.md` is an index/router; Code Map verification records dates plus branch/ref or SHA; demonstrated-only mapping remains explicit.
- Limitations/deviations: none. No Foundation or Code Map files, root `AGENTS.md`, Skills, product/source code, or external-repository work changed.
- Unresolved issues: Reviewer must decide whether the corrected proposal is acceptable before any implementation phase is authorised.
