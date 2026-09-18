# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1F — Resolve Button runtime invocation authority

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `d56338bdd0d3575a570b38f63aa0675ddb65df45`. Relative to prior main `e565749bfbbfbc7957d4f6c23db96dc3080dd643`, the promotion contains exactly the five reviewed Slice 1E files. The action-bound Button schema/presentation migration is accepted on `main`.

## Authority Gate

The Button definition can now carry semantic intent, but the repository has no accepted concrete runtime invocation contract. Current architecture says:

- definitions carry serializable semantic commands, never callbacks;
- runtime resolves command + record identity back to the owning handler;
- domain owns authorization, validation, lifecycle, persistence, and command legality;
- apps may consume reusable packages, while reusable packages must not depend on app/domain owners;
- `@weerax/web-runtime` currently owns browser assembly only and contains no action dispatcher/registry.

Do **not** invent runtime execution directly in code.

## Authorised Builder Action

Prepare an authority-only ADR proposal for the first concrete Button invocation path.

The proposal must resolve, without implementation:

1. **Invocation boundary** — what the browser/runtime receives from the Button definition/presentation and where native click handling lives.
2. **Execution API shape** — whether runtime accepts the whole `SemanticAction` or only `command + recordId`; keep the schema serializable and avoid duplicate contracts.
3. **Handler ownership/registration** — how an application/runtime maps a semantic command to the authoritative domain handler without moving domain logic into WEX/shared UI.
4. **Revalidation** — runtime/domain must re-check authorization, record state, and validation at execution time; `disabled` remains only an authored UI availability hint.
5. **Failure/result boundary** — define only the minimum deterministic success/failure responsibility needed for the first use case; do not invent a generalized event bus, payload system, permission framework, orchestration layer, or AI-specific execution path.
6. **Package placement/dependency direction** — preserve `schemas` and `wex` as dependency roots, keep shared UI platform-neutral, and keep application-specific execution in the consuming runtime/integration layer.
7. **Existing architecture inconsistency** — explicitly note that older illustrative composition examples containing executable `run: () => ...` callbacks are historical examples superseded by the serializable semantic-action rule; do not edit `composition-architecture.md` in this phase unless Reviewer later authorises that cleanup separately.

Use a new proposed ADR under `docs/decisions/`. No source implementation.

## Exclusions

No runtime dispatcher/registry code, no browser Button renderer, no catalogue/Pages demo, no schema/UI/CSS change, no adapters/domain handlers, no icons/toggle/link/dropdown/group variants, no new component families, no AI/Studio work, and no `WEX-SOURCE.md`.

Push the proposal branch, verify remote SHA, update this SAME file to `Status: AWAITING REVIEWER REVIEW` with exact branch/SHA and changed files, and stop.
