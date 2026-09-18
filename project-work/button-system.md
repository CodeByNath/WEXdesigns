# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1E — Implement accepted Button action-bound schema/presentation migration

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `e565749bfbbfbc7957d4f6c23db96dc3080dd643`. Relative to prior main `f514db3d9894ad277aacdea9fcbcc2704c6618c0`, the promotion adds only `docs/decisions/0007-button-semantic-action-authority.md`. ADR 0007 is therefore accepted authority on `main`.

## Authorised Builder Scope

Implement only the schema/shared-presentation migration required by ADR 0007.

### Schema

Evolve the existing ordinary `ButtonDefinitionSchema`; do **not** create a parallel actionable Button schema.

Required shape:

- remove top-level Button `id`;
- remove top-level Button `label`;
- require one embedded `SemanticActionSchema` as `action`;
- preserve existing `variant`, `tier`, and `disabled` defaults/contracts;
- keep the schema strict and serializable;
- add no payload, callback, handler, permission, transient state, or domain data.

For this slice, `action.id` is the Button/composition + semantic-action identity, `action.label` is the sole displayed label, and `action.recordId` remains domain identity.

### Shared UI

Update the existing platform-neutral Button presentation resolver to consume the migrated definition.

- presentation `id` must derive from `action.id`;
- presentation `label` must derive from `action.label`;
- preserve variant/tier class resolution and native disabled boundary;
- do not add browser/framework dependencies or execute the semantic action;
- do not introduce callbacks or runtime/domain ownership.

### Verification

Update only focused schema/UI/foundation audit tests necessary to prove:

- embedded action is required;
- old top-level `id`/`label` shape is rejected;
- presentation identity/label derive from the action;
- variant/tier/disabled behaviour is unchanged;
- no callback/payload/permission/transient-state fields enter the contract.

Run relevant schema/UI tests, foundation audit, and full `pnpm check` under Node 24.

## Exclusions

No runtime execution/binding yet. No CSS/WEX presentation changes, catalogue, Pages/demo, adapters, domain commands, icons, toggle/link/dropdown/group variants, new component families, or `WEX-SOURCE.md`.

Push a topic branch, verify the remote SHA, update this SAME file to `Status: AWAITING REVIEWER REVIEW` with exact changed files/check evidence, and stop.
