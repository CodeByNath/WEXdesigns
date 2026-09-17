# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1D correction submitted — semantic-action identity and migration clarified

## Corrected Proposal

Branch: `docs/button-semantic-action-authority`
Remote SHA: `8c49e121141848192f335f2c3c4d030c65e3fcde` (verified with `git ls-remote`)

Exact changed file: `docs/decisions/0007-button-semantic-action-authority.md`.

Safeguard resolution:

1. The future migration explicitly evolves/replaces the ordinary `ButtonDefinition`; it prohibits a permanent parallel `ActionableButtonDefinition` family. Non-actionable samples remain outside product composition/runtime.
2. The first use case has one Button identity: `SemanticAction.id` is both the Button/composition and semantic-action identity, unique within the composition. `recordId` remains the distinct domain identity; the action-bound Button has no top-level `id`. A future demonstrated need for multiple independently identified Buttons for the same action/record requires a new authority decision.

The embed-binding direction, action-owned label, runtime ownership/revalidation boundary, and existing `SemanticAction` fields are unchanged. No schema, UI, runtime, CSS, catalogue, Pages, adapter, domain, icon, or historical-source implementation change was made. `pnpm audit:foundation` passes under Node `v24.21.0` / pnpm `11.16.0`.
