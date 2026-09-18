# Button System Work Cycle

Status: ACCEPTED  
Phase: Button shared foundation accepted — consumer runtime integration deferred

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `6be2adc7214ec1c22dada90c5e94852c6bf9bef9`.

Relative to prior main `d56338bdd0d3575a570b38f63aa0675ddb65df45`, the promotion adds only `docs/decisions/0008-button-runtime-invocation-authority.md`. ADR 0008 is therefore accepted authority on `main`.

## Accepted Button Foundation

The Button program now has accepted authority and verified implementation for:

- closed variants `primary | neutral | subtle | warning | danger`;
- default/hover/pressed/disabled/focus presentation;
- Small/Default/Large geometry and Navigation typography;
- action-bound serializable `ButtonDefinition`;
- `SemanticAction` as the sole action/label/identity source for the first use case;
- platform-neutral shared Button presentation;
- runtime invocation authority: consuming application click integration → semantic-action executor → registered domain owner;
- domain revalidation at execution time;
- no callbacks, payloads, permission authority, browser runtime, or domain behavior inside schema/shared UI/WEX.

Current `main` source remains the implementation authority.

## Deferred Consumer Integration

No concrete application-owned domain handler currently exists in this repository for a Button invocation. ADR 0008 explicitly requires such a concrete consumer before browser/runtime executor wiring is implemented.

Therefore runtime dispatcher/registry, native browser rendering, catalogue/Pages demonstration, and product-specific command handlers are **deferred until a real consuming integration forces them**. They are not missing work in the accepted shared Button foundation and must not be pre-built speculatively.

Historical composition examples containing executable callbacks remain superseded evidence and may be cleaned up in a separately authorised documentation phase.

## Closure

No further Builder action is authorised in this work area. Reopen this same file only if a concrete Button integration or defect requires additional Button work.

The Button work area is accepted and no longer blocks opening a separate project workstream.
