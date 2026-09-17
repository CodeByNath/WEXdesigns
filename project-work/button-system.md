# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1D — Button semantic-action binding authority resolution

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `f514db3d9894ad277aacdea9fcbcc2704c6618c0`. The promotion from prior `main` `ced2d01029f531f3acc6fba370f765ecf0a6bbe9` is the reviewed five-file geometry slice only.

Slice 1C is accepted on `main`: tier classes, Navigation typography, stable 1px border, radius 0, 2px focus offset, and shared Small/Default/Large geometry match ADR 0006 without schema or transient-state widening.

## Authorised Builder Action

Perform **authority-resolution only** for how an ordinary Button binds to executable product/domain behaviour. Do not implement the binding yet.

Create a dedicated topic branch from current `origin/main` and prepare a Proposed/Draft ADR. Read and cite:

- `docs/architecture/composition-architecture.md`, especially serializable definitions and semantic-command runtime flow;
- `packages/schemas/src/actions/semantic-action.schema.ts`;
- current `packages/schemas/src/components/button.schema.ts`;
- accepted ADRs 0005 and 0006;
- current shared Button presentation boundary on `main`.

The proposal must resolve the minimum contract for:

- whether Button owns/embeds a `SemanticAction`, references one by ID, or is derived from an action;
- the single source of truth for action label vs Button label so duplicate conflicting labels are impossible;
- whether an ordinary actionable Button may exist without an action binding, and any explicitly non-actionable/demo exception;
- the runtime boundary: semantic command + record identity must resolve through the owning runtime/domain handler; no callback/function may enter schema or shared UI;
- disabled/availability ownership vs domain permission/validation so `disabled` does not become domain authority;
- whether the current `SemanticAction` fields are sufficient for the first Button use case or expose a real architecture gap. Do not add speculative payload/generalised action machinery without a demonstrated need.

## Exclusions

No schema/source changes, runtime implementation, catalogue/demo/Pages work, CSS, geometry, adapters, domain command definitions, icons, toggle/link/dropdown/group variants, or `WEX-SOURCE.md` edits. Recovery-branch action code is evidence only.

## Handoff

Push the authority proposal branch to `origin`, verify the remote SHA, then update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA, exact changed files, authority inspected, proposed binding model, unresolved questions, and confirmation that implementation remains unchanged. Stop for Reviewer.
