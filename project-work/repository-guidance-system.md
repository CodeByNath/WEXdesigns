# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — Root authority routing correction

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/guidance-minimum-structure` at `109eb054a6cab14cb49a1235ef2f5dbccd6ef4f6` against accepted ADR 0009 and current `main`.

The candidate is correctly limited to four documentation/routing files. The Foundation entrypoint, Code Map entrypoint, Button map, mapped source paths, focused tests, package dependencies, and Button authority links are consistent with current `main`.

One authority-routing sentence in root `AGENTS.md` is now stale:

> Product and system authority remains the repository architecture, accepted ADRs, historical WEX source, and verified implementation.

ADR 0009 now establishes Foundation as a real durable repository-wide rule/invariant layer within its scope. Leaving the old sentence unchanged makes the root entrypoint contradict its own new Foundation routing.

## Builder Handoff

- Remote branch/SHA: `docs/guidance-minimum-structure` at `5b558bf3c06576660c5dc7cf8cbbfb70e0536845`
- Changed file in this correction: `AGENTS.md`
- Evidence: `git diff --check` passed before commit; the remote topic ref was verified at the SHA above.
- Correction coverage: the root router now identifies Foundation, architecture/ADRs, historical WEX source, and verified implementation as scoped authority/evidence, while explicitly remaining a router rather than a universal precedence rule.
- Limitations/deviations: none. The Foundation entrypoint, Code Map entrypoint, Button map, and all product/source files remain unchanged.
- Unresolved issues: Reviewer must verify the corrected root router before accepting the minimum guidance structure.

## Preserve

Do not change:
- `docs/foundation/README.md`;
- `docs/code-map/README.md`;
- `docs/code-map/button-system.md`;
- any source, tests, packages, runtime, CI, Skills, or external repository.
