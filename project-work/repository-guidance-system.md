# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Minimum guidance structure — routing, Foundation entrypoint, Code Map entrypoint, Button map

## Reviewer Verdict

**Proceed**

Reviewer verified `origin/main` at `af72a2f5f645786665e84b87b7c5490bb7481a88`. ADR 0009 is present on `main` with `Status: Accepted`. The promotion changed only `docs/decisions/0009-repository-guidance-architecture.md`.

## Builder Action

Implement only ADR 0009's minimum post-approval structure:

1. Update root `AGENTS.md` as a concise index/router. Preserve the existing cycle bootstrap. Add clear routing to:
   - `docs/foundation/README.md`;
   - `docs/code-map/README.md`;
   - `docs/architecture/` and `docs/decisions/`;
   - `Project-work-instructions` for controlled work;
   - the WeeraX Project Cycle Skill for defined cycle triggers when available.
   Do not duplicate downstream architecture or procedures.

2. Create `docs/foundation/README.md`.
   It must define Foundation's authority, scope, relationship to WEX technical architecture/ADRs/source, change rule, and maintenance responsibility. This phase does **not** yet author the Studio operating model or AI-operability rules.

3. Create `docs/code-map/README.md`.
   Define the subject-map format and freshness rules from ADR 0009, including required created date, last-verified date, and verified branch/ref or SHA.

4. Create `docs/code-map/button-system.md` as the first demonstrated map.
   Verify against current `main`. Link to the actual Button ADRs, source, focused tests/checks, dependency path, and safe change routing. Do not restate the Button specification or invent implementation.

## Evidence

- Inspect actual current `main` paths before writing the Button map.
- `git diff --check`.
- Show changed-file list.
- No code/runtime validation is required unless an existing repository check directly validates these documentation files.
- Push the topic branch and verify its exact remote SHA.
- Update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA/evidence, push the coordination update, and stop.

## Exclusions

Do not create additional Foundation subjects, additional Code Maps, Skills, product/source code, Button changes, schemas/UI/WEX CSS/adapters/catalogue/runtime/CI changes, or inspect any external repository.

The Studio operating model and wider Foundation rules remain a separate later phase after this navigation structure is accepted.
