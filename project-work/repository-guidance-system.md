# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Accept and promote ADR 0009 only

## Reviewer Verdict

**Proceed**

Reviewer independently inspected corrected candidate `docs/repository-guidance-architecture` at `0aadf5c1476033e322b6b43b1704752f93beff28` against `main`.

The correction satisfies the prior safeguards:

- Foundation is now a real durable repository-wide rule/invariant layer within its scope.
- `docs/architecture/` remains distinct WEX technical/system architecture.
- Source is implementation truth; tests/checks are verification evidence only.
- root `AGENTS.md` is explicitly an index/router, not an architecture manual.
- Code Map entries require created date, last-verified date, and verified ref/SHA.
- Code Maps remain demonstrated-only; Button is the first concrete subject.
- No Foundation, Code Map, root routing, Skill, product/source, or external-repository work was added.

The candidate is two commits ahead of `main`, zero behind, and the net diff is only `docs/decisions/0009-repository-guidance-architecture.md`.

## Builder Action

Promote **ADR 0009 only**.

1. On the existing candidate branch, change the ADR status from `Proposed` to `Accepted`. Do not alter the accepted decision content except wording strictly required to remove proposal-only status language.
2. Run `git diff --check`.
3. Commit and push the final candidate.
4. Promote that exact candidate to `main` using the repository's normal non-destructive workflow. Do not force-push or include unrelated commits/files.
5. Verify `origin/main` contains the accepted ADR and record the exact main SHA.
6. Update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with:
   - final candidate SHA;
   - promoted `main` SHA;
   - changed-file list;
   - verification evidence.
7. Stop.

## Exclusions

Do **not** yet create or modify:

- `docs/foundation/`;
- `docs/code-map/`;
- root `AGENTS.md`;
- Skills;
- Button implementation;
- schemas, UI, WEX CSS, adapters, catalogue, runtime, CI/tooling;
- any external repository.

The next implementation phase will be separately authorised only after Reviewer verifies the accepted ADR on `main`.
