# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Minimum guidance structure correction — root authority routing only

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/guidance-minimum-structure` at `109eb054a6cab14cb49a1235ef2f5dbccd6ef4f6` against accepted ADR 0009 and current `main`.

The candidate is correctly limited to four documentation/routing files. The Foundation entrypoint, Code Map entrypoint, Button map, mapped source paths, focused tests, package dependencies, and Button authority links are consistent with current `main`.

One authority-routing sentence in root `AGENTS.md` is now stale:

> Product and system authority remains the repository architecture, accepted ADRs, historical WEX source, and verified implementation.

ADR 0009 now establishes Foundation as a real durable repository-wide rule/invariant layer within its scope. Leaving the old sentence unchanged makes the root entrypoint contradict its own new Foundation routing.

## Required Correction

Amend **only `AGENTS.md`** on the existing candidate branch.

Replace/rework that stale authority sentence so the root router accurately reflects scoped authority after ADR 0009:

- Foundation owns durable repository-wide rules/invariants within each Foundation document's stated scope.
- `docs/architecture/` and accepted ADRs retain WEX technical/system and decision authority within their scopes.
- historical WEX source and verified implementation remain authority/evidence within their established scopes.
- root `AGENTS.md` remains routing only and must not attempt to define a universal precedence rule.

Keep the new Authority routing section concise. Do not expand it into architecture prose.

## Preserve

Do not change:
- `docs/foundation/README.md`;
- `docs/code-map/README.md`;
- `docs/code-map/button-system.md`;
- any source, tests, packages, runtime, CI, Skills, or external repository.

Run `git diff --check`, push the corrected existing topic branch, verify its exact remote SHA, update this SAME work file to `Status: AWAITING REVIEWER REVIEW`, push the coordination update, and stop.
