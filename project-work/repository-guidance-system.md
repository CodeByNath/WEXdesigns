# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Promote Foundation Phase 1 Studio operating model to main

## Reviewer Verdict

**Proceed**

Reviewer independently inspected corrected candidate `docs/foundation-studio-operating-model` at `b701a9d497442cf714c7ecbd39ee8660635d6f11` against current `main`, accepted ADR 0009, `docs/architecture/authority-model.md`, and `docs/architecture/dependency-rules.md`.

The ownership correction is now consistent with repository authority:

- WEX owns visual and interaction-presentation authority.
- Shared UI owns reusable structure, rendering, interaction, and accessibility mechanics while consuming WEX presentation.
- Shared UI's prohibited domain responsibilities are explicit.
- Consuming-product, adapter, AI Skill/operator, orchestration, semantic-action, and progressive-adoption rules remain correctly bounded.
- The candidate is two commits ahead of `main`, zero behind, and changes only:
  - `docs/foundation/README.md`;
  - `docs/foundation/studio-operating-model.md`.

## Builder Action

Promote the exact candidate `b701a9d497442cf714c7ecbd39ee8660635d6f11` to `main` using the repository's normal non-destructive workflow.

1. Verify the topic branch still resolves to that exact SHA.
2. Verify `main` has not advanced incompatibly.
3. Fast-forward/promote the exact candidate to `main`; do not amend, squash, rebase, or include unrelated files.
4. Verify the exact resulting `origin/main` SHA.
5. Update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with the promoted main SHA and verification evidence.
6. Push the coordination update and stop.

## Exclusions

Do not begin additional Foundation subjects, AI-operability detail, Code Maps, Skills, product/source changes, Button changes, CI/tooling changes, or any external-repository work.

The next Foundation phase remains separately gated until Reviewer verifies this document on `main`.
