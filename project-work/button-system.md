# Button System Work Cycle

Status: ACCEPTED
Phase: Slice 1D semantic-action authority accepted — implementation remains unauthorised

## Reviewer Verdict

**Proceed**

Reviewer independently verified remote branch `docs/button-semantic-action-authority` at `8c49e121141848192f335f2c3c4d030c65e3fcde` with `git ls-remote`.

Verified scope: the branch adds only `docs/decisions/0007-button-semantic-action-authority.md`; `git diff --check` passes.

The decision is consistent with the verified `main` composition architecture, current `SemanticActionSchema`, Button presentation boundary, and ADRs 0005/0006:

1. The serializable embedded action retains the `command + recordId → owner runtime` boundary; it admits no callbacks, payload, or permission data.
2. `action.id` is the sole action-bound Button/composition identity, while `recordId` remains the domain identity; a new independent-Button identity needs a new authority decision.
3. The future migration replaces—not permanently parallels—the current Button contract; `action.label` prevents duplicate labels.
4. `disabled` is only an authored availability hint; runtime/domain execution must revalidate authorization, record state, and validation.

No schema, UI, runtime, CSS, catalogue, Pages, adapter, domain, icon, or historical-source change is accepted or authorised by this decision. A separate Reviewer-authorised implementation phase is required before Builder source work can begin.
