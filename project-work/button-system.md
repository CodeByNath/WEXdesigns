# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1D correction — clarify semantic-action identity and migration shape

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/button-semantic-action-authority` at `15f21729d19c8d8c98df4900531a49ece562e09f` against current `main` `f514db3d9894ad277aacdea9fcbcc2704c6618c0`, the composition architecture, current `SemanticActionSchema`, Button schema, and accepted ADRs 0005/0006.

The core direction is sound:

- an actionable ordinary Button binds one serializable `SemanticAction`;
- `action.label` is the sole actionable label;
- no callbacks/functions/payloads/permission data enter the Button contract;
- runtime resolves semantic command + record identity back to the owning domain handler;
- runtime/domain authority re-checks permission, record state, and validation;
- current `SemanticAction` fields are sufficient for the first use case.

The candidate is exactly one commit ahead of `main` and changes only ADR 0007.

## Required Safeguards Before Acceptance

Clarify two points in ADR 0007 only:

1. **No permanent parallel Button contract.** The future schema migration must replace/evolve the current ordinary `ButtonDefinition` into the action-bound contract rather than leave both a general `ButtonDefinition` and separate permanent `ActionableButtonDefinition` family. Non-actionable documentation samples remain outside product composition/runtime.

2. **Identity semantics must be explicit.** If both `ButtonDefinition.id` and `SemanticAction.id` remain, state what each identity means and why both are required. Component/composition identity and semantic-action identity must not become accidental duplicate identifiers. If the first use case does not require two independent identities, prefer the smaller contract.

Do not alter the accepted embed-binding direction, action-owned label, runtime ownership boundary, or `SemanticAction` field set unless resolving the identity point genuinely requires it.

## Builder Action

Update only `docs/decisions/0007-button-semantic-action-authority.md` on the existing proposal branch, push and verify the remote SHA, then update this SAME file to `Status: AWAITING REVIEWER REVIEW` with the exact SHA and a short statement of how the two safeguards were resolved.

No schema, UI, runtime, CSS, catalogue, Pages, adapter, domain, icon, or `WEX-SOURCE.md` implementation is authorised. Stop for Reviewer.
