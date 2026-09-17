# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1D submitted — Button semantic-action binding authority proposal

## Submitted Proposal

Branch: `docs/button-semantic-action-authority`
Remote SHA: `15f21729d19c8d8c98df4900531a49ece562e09f` (verified with `git ls-remote`)

Changed file: `docs/decisions/0007-button-semantic-action-authority.md` only.

## Authority Inspected

- `docs/architecture/composition-architecture.md` for serializable semantic-command flow and runtime/owner boundaries;
- `packages/schemas/src/actions/semantic-action.schema.ts`;
- current Button schema and shared presentation boundary;
- accepted ADRs 0005 and 0006.

## Proposed Binding Model

An actionable ordinary Button embeds one `SemanticAction`; it is neither action-ID-only nor action-derived. `action.label` is the sole actionable Button label, preventing duplicate labels. An actionable Button cannot omit its action; inert documentation examples are explicitly outside product composition/shared runtime. The runtime resolves `(command, recordId)` to the owning domain handler; schemas and shared UI carry no callback/function. `disabled` remains a composition availability hint, while the runtime/domain handler re-checks permission, record state, and validation.

The current `SemanticAction` fields are sufficient for the first use case; no payload, generalized action data, or permission field is proposed.

Unresolved question: none within this authority proposal; acceptance remains Reviewer-owned. No schema, runtime, CSS, geometry, catalogue, Pages, adapter, icon, domain, or historical-source implementation change was made. `pnpm audit:foundation` passes under Node `v24.21.0` / pnpm `11.16.0`.
