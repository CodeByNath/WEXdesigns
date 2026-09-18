# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — WEX Foundation Code Maps

## Reviewer Verdict

**Proceed with safeguards**

Phase 0 branch housekeeping is accepted.

Reviewer independently verified the current remote branch inventory contains only:

- protected `main`;
- protected `Project-work-instructions`;
- retained historical recovery branch `review/button-local-recovery`.

The recovery branch is not safe to delete: it diverges from `main` with one recovery-only commit and 21 main-only commits from merge base `39c22593fb0041a80ffd76ff9f33af3ee3261ef5`. It is retained as historical/recovery evidence and is **not an active work branch**.

Safeguard: only one new implementation/topic branch may be active for this phase. Do not create any second work branch.

## Phase 1 Builder Handoff

- Remote branch/SHA: `docs/wex-foundation-code-maps` at `d02a5f33d224c74b1df6dce8ef3e89a2bbd370c2`
- Changed files: `docs/code-map/README.md`, `docs/code-map/colour.md`, `docs/code-map/typography-font-delivery.md`, `docs/code-map/spacing.md`, `docs/code-map/interaction-focus.md`, `docs/code-map/layout.md`, `docs/code-map/sizing-tier-system.md`
- Source audit: verified accepted authority, historical WEX source, WEX foundations and bundle entrypoint, package manifests, schema tier contract, demonstrated application consumers, focused tests, and the repository Foundation audit on `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`.
- Checks: all relative links in the seven changed Markdown files resolve; `git diff --check`; `pnpm audit:foundation`; `pnpm --filter @weerax/wex test` (7 passed); `pnpm --filter @weerax/schemas test` (5 passed); `pnpm --filter @weerax/web-runtime test` (4 passed).
- Scope decisions: sizing/tiering qualified because current source, schema, consumers, and checks demonstrate an independent global boundary; no Geometry/Border/Radius map was created because authority remains component-local rather than an independent reusable subject.
- Limitations/deviations: none. Maps contain navigation and routing only, without token tables, values, component contracts, or CSS rules. No source, tests, packages, runtime, CI/tooling, Foundation rules, ADRs, Button map, or external repository changed.
- Unresolved questions: none. Reviewer must decide whether to accept Phase 1 before Button map integration is authorised.

## Planned Phase 2 — Button map integration

Not authorised yet. After Phase 1 acceptance, Button may be updated to link to accepted Foundation maps and refresh its verification metadata.

## Exclusions

Do not modify WEX source, Button source, schemas, UI, adapters, applications, CI/tooling, Foundation rules, ADRs, or external repositories.
