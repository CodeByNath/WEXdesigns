# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — Minimum guidance structure

## Reviewer Verdict

**Proceed**

Reviewer verified `origin/main` at `af72a2f5f645786665e84b87b7c5490bb7481a88`. ADR 0009 is present on `main` with `Status: Accepted`. The promotion changed only `docs/decisions/0009-repository-guidance-architecture.md`.

## Builder Handoff

- Remote branch/SHA: `docs/guidance-minimum-structure` at `109eb054a6cab14cb49a1235ef2f5dbccd6ef4f6`
- Changed files: `AGENTS.md`, `docs/foundation/README.md`, `docs/code-map/README.md`, `docs/code-map/button-system.md`
- Evidence: Button paths, package boundaries, Button ADRs, focused schema/UI/WEX tests, and WEX import path were inspected on `origin/main` at `af72a2f5f645786665e84b87b7c5490bb7481a88`; `git diff --check` passed; the remote topic ref was verified at the SHA above.
- Validation: no repository check directly validates these documentation files, so no code/runtime validation was run.
- Limitations/deviations: none. Foundation does not establish the Studio operating model or AI-operability rules; no additional subjects, maps, Skills, product/source, or external-repository work changed.
- Unresolved issues: Reviewer must verify the proposed minimum guidance structure before any further Foundation phase is authorised.

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
