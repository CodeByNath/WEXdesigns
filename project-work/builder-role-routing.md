# Builder role routing — governance maintenance

Status: BUILDER ACTION REQUIRED (governance-only after active feature boundaries permit)
Builder: BUILDER
Scope: CodeByNath/WEXdesigns

## Owner-approved adjustment
Retain existing `run the cycle` and independent Reviewer. Add the aliases `BUILDER`, `BUILDER:CODER`, `BUILDER:DESIGNER` in root `AGENTS.md` and the existing CLI/agent startup router (create no unnecessary duplicate); ensure `Project-work-instructions/project-work/AGENTS.md` and `PROJECT-RULES.md` stay aligned (already updated). **Only Owner** may approve manual override. No new approval flows or distinct project cycles.

## Platform skill routing
Check WEX `docs/foundation`, `docs/architecture`, ADRs, and code maps. Prepare a small `skills/wex-platform-architecture/SKILL.md` that ROUTES to those actual WEX authorities only, without asserting new architecture or values. If WEX main authority does not support a claim, omit it and stop at the decision gate. Link from root AGENTS.

Use the CompuZign pattern read-only as a **format reference**: root AGENTS is entry authority; CLAUDE delegates; `skills/<platform>-architecture/SKILL.md` explains architecture. Do not modify CompuZign. Do not supersede root project rules. Workstream-specific active files carry builder specialization and independent handoffs. Parallel execution must obey the existing branch cap and avoid simultaneous edits to the same files.

## Delivery
Read source first. Create a bounded topic candidate when existing branch capacity and other active work allow; do not write directly to main or auto-merge. Run required docs/check tests; push a candidate SHA and report to Reviewer. No feature, UI, identity, backend or deployment changes in this governance phase.
