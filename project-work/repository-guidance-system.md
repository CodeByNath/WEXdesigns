# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer verification — ADR 0009 accepted and promoted to main

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

## Builder Handoff

- Final candidate branch/SHA: `docs/repository-guidance-architecture` at `af72a2f5f645786665e84b87b7c5490bb7481a88`
- Promoted `main` SHA: `af72a2f5f645786665e84b87b7c5490bb7481a88`
- Changed files: `docs/decisions/0009-repository-guidance-architecture.md`
- Verification evidence: `git diff --check` passed before the final candidate commit; candidate was verified ahead of `main` with no `main` commits ahead; `HEAD -> main` fast-forward push advanced `origin/main` from `6be2adc` to the exact candidate SHA; the remote `main` ref was verified at the SHA above.
- Limitations/deviations: none. The acceptance change was status-only; no Foundation, Code Map, root routing, Skill, product/source, or external-repository work changed.
- Unresolved issues: Reviewer must verify the accepted ADR on `main` before separately authorising any implementation phase.

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
