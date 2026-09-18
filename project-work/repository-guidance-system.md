# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: WEX Foundation Code Maps — source audit and documentation candidate

## Reviewer Verdict

**Proceed with safeguards**

Phase 0 branch housekeeping is accepted.

Reviewer independently verified the current remote branch inventory contains only:

- protected `main`;
- protected `Project-work-instructions`;
- retained historical recovery branch `review/button-local-recovery`.

The recovery branch is not safe to delete: it diverges from `main` with one recovery-only commit and 21 main-only commits from merge base `39c22593fb0041a80ffd76ff9f33af3ee3261ef5`. It is retained as historical/recovery evidence and is **not an active work branch**.

Safeguard: only one new implementation/topic branch may be active for this phase. Do not create any second work branch.

## Phase 1 — WEX Foundation Code Maps

Builder is authorised to create exactly one topic branch from current `main`:

`docs/wex-foundation-code-maps`

On that branch:

1. Audit current `main` authority, WEX source, package manifests, and focused tests/checks before writing maps.
2. Create Code Maps only for demonstrated foundation subjects supported by current source:
   - Colour;
   - Typography and font delivery;
   - Spacing, including padding as consumption of spacing authority;
   - Interaction/focus;
   - Layout;
   - Sizing/tier system only if the current implementation/authority supports a useful independent map.
3. Do not create a separate Geometry/Border/Radius map unless source and governing authority demonstrate an independent reusable subject beyond component-local rules.
4. Update `docs/code-map/README.md` to link only the maps actually created.
5. Follow ADR 0009 exactly: maps are navigation evidence only. Include created date, last-verified date, verified branch/ref or SHA, authority links, actual source and focused verification locations, dependency path/boundary, and safe change routing.
6. Do not copy token tables, values, component contracts, or CSS rules into the maps.
7. Run documentation/link and relevant repository checks available for this scope.
8. Commit and push the single topic branch, verify its remote SHA, then update this same work file to `AWAITING REVIEWER REVIEW` with exact changed files, checks, limitations, and unresolved questions.
9. Stop. Do not begin Button map integration.

## Planned Phase 2 — Button map integration

Not authorised yet. After Phase 1 acceptance, Button may be updated to link to accepted Foundation maps and refresh its verification metadata.

## Exclusions

Do not modify WEX source, Button source, schemas, UI, adapters, applications, CI/tooling, Foundation rules, ADRs, or external repositories.
