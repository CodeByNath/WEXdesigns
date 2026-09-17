# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1 — Correct Button authority proposal submitted

## Reviewer Verdict

**Stop — architectural risk**

Bootstrap is accepted. Reviewer then inspected preserved candidate `review/button-local-recovery` at `19795644f033f43a7ebb99617d748fdce2c7e1ea` against its base `39c22593fb0041a80ffd76ff9f33af3ee3261ef5`.

The candidate cannot be accepted as Button authority or moved to `main` yet.

## Blocking Findings

1. Builder crossed the authority gate and implemented the full Button stack before Reviewer approval. The preserved branch changes 19 files, including schema, WEX CSS, shared UI, runtime preview, tests, docs, and validation tooling.
2. `docs/decisions/0005-button-foundation.md` marks itself **Accepted** even though only Reviewer may approve authority changes.
3. The candidate closes the variant language as `Primary`, `Secondary`, `Ghost`, `Danger`; the active authority task required resolution of `Primary`, `Neutral`, `Subtle`, `Warning`, and `Danger`. The schema likewise serializes only `primary | secondary | ghost | danger`.
4. Therefore implementation is currently downstream of an unapproved and materially different component contract.

The preserved work is evidence, not waste. Do not delete or rewrite the recovery branch.

## Authorised Builder Correction

Perform **authority-resolution only**. Do not alter Button implementation files yet.

Prepare a corrected Button ADR proposal on a dedicated topic branch from current `main` that:

- is `Proposed`/`Draft`, not `Accepted`;
- resolves the five original decisions: Hover; Pressed; exact Light/Dark mappings for Primary/Neutral/Subtle/Warning/Danger; final component-token names; scoped audit transition;
- cites existing WEX primitives/semantic authority and identifies only genuinely new Button decisions;
- explicitly compares the proposed contract against preserved recovery implementation and identifies what could be retained, renamed, corrected, or removed later;
- does not change schemas, WEX CSS, UI resolver, runtime, tests, catalogue, or historical `WEX-SOURCE.md`.

## Handoff

Push the authority-proposal branch to `origin`, verify its remote SHA, then update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA, changed files, authority inspected, and unresolved questions. Stop for Reviewer.

Do not merge any Button implementation to `main` until Reviewer approves the Button authority proposal.

## Builder Handoff

- Candidate branch: `docs/button-authority-proposal`
- Pushed commit: `610b1abcd9e383d7e747315561fb26a9ee5c5aa4`
- Remote verification: `origin/docs/button-authority-proposal` resolves to that exact commit.
- Changed file: `docs/decisions/0005-button-authority-proposal.md` only.
- Authority inspected: historical WEX Interaction and Button foundations; accepted decisions 0002 and 0004; verified `main` colour and interaction foundations; repository authority and composition documentation.
- Unresolved for Reviewer: approval of the five-variant contract; third chromatic swatch as transient pressed treatment; new Button-scoped neutral/subtle pressed tokens. Geometry, icons, and toggle behaviour remain intentionally out of scope.
- WEX source confirmation: `WEX-SOURCE.md` SHA-256 remains `03499256dfcd54f445929520c1603b5f7ddf7cdf89bb29446944d59f76195ae9`.
