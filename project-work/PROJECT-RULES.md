# Project Work Rules

This file defines workflow-layer separation. It does not define WEX product architecture.

## Authority Layers

```text
WEX historical source
+ accepted ADRs
+ architecture documents
+ verified main implementation
= product/system authority

Project-work-instructions
= work coordination only
```

- This branch may coordinate work but must not invent or redefine WEX architecture.
- If an architectural decision is required, record the requirement in the active work file and stop until the appropriate ADR or authority decision is accepted.
- `main` source remains authoritative for implementation state.
- Do not assume local work, pushed commits, CI state, and runtime state are identical.
- Reviewer verdicts are `Proceed`, `Proceed with safeguards`, and `Stop — architectural risk`.

## Operating governance

The authoritative `main` Foundation repository-governance rule controls
authored-file limits, remote-branch capacity, and Code Map operating standards.
This coordination branch enforces those limits for a controlled phase; it does
not redefine them.

- Before a topic branch is created, inspect remote heads and preserve the
  three-branch maximum including `main` and `Project-work-instructions`.
- An Owner-only file-length exception must identify the file, reason, and
  removal or review point in the active work file. An exception never permits a
  file above the absolute ceiling.
- For a demonstrated subject, begin source investigation at its Code Map, then
  use the linked authority and verified source to make decisions.

## Builder Responsibilities

- Obey the current phase and scope.
- Implement only authorised work.
- Run required checks.
- Commit logically and push the work.
- Provide commit, diff, and test evidence.
- Stop at the phase boundary.

## Reviewer Responsibilities

- Inspect the actual pushed source and diff.
- Compare the work against repository authority.
- Inspect the supplied verification evidence.
- Identify architecture, compatibility, accessibility, dependency, regression, and authority risks.
- Issue one defined verdict and prepare the precise next action.
- Never implement the Builder's correction.
