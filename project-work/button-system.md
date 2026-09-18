# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1F submission — Button runtime invocation authority proposal

## Builder Handoff

Branch: `docs/button-runtime-invocation-authority`
Remote SHA: `1df4678807715b03275130c2ffa6824f6ea66715` (verified with `git ls-remote`)

Changed only `docs/decisions/0008-button-runtime-invocation-authority.md`; `git diff --check origin/main...HEAD` passes.

The proposed ADR resolves the first Button invocation path without implementation:

- native clicks live in the consuming application's browser integration, while shared Button presentation remains pure;
- the executor accepts the existing complete `SemanticAction` and routes it by command to an application-registered domain handler;
- handler wiring remains application-internal; revalidation of command legality, authorization, record state, and validation is mandatory;
- `Promise<void>` fulfillment/rejection is the minimal result boundary, with no event bus, payload protocol, permission framework, orchestration layer, or AI path;
- executable historical `run` examples are superseded by the serializable action rule and are left untouched in this authority-only phase.

No runtime dispatcher/registry, renderer, schema/UI/CSS, catalogue/Pages, adapter/domain, icon, component, AI/Studio, or `WEX-SOURCE.md` change was made. Awaiting Reviewer review.
