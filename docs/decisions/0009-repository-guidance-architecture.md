# 0009: Repository Guidance Architecture

## Status

Proposed — documentation and workflow architecture only; implementation of the proposed Foundation, Code Map, root routing, or Skills navigation requires separate Reviewer authorisation.

## Context

This repository has durable product authority in accepted architecture decisions, architecture documents, historical WEX source, and verified implementation. It also has a lightweight root `AGENTS.md` cycle entrypoint and a separate `Project-work-instructions` branch for current work control. These layers serve different purposes, but there is no accepted repository-wide navigation architecture that explains their boundaries, preserves their authority, or keeps guidance current without duplicating code and decisions.

The existing `docs/architecture` documents remain authoritative for the product and system concerns they already define. The current Button foundation is the first demonstrated cross-package area: its authority is distributed across accepted Button ADRs, WEX foundations, schemas, shared UI, and focused tests. It needs a maintained navigation record, not a restatement of that implementation.

## Decision

Repository guidance has the following distinct layers:

```text
AGENTS.md        entry point and routing
docs/foundation  durable repository rules and scope
docs/code-map    maintained navigation to verified authority and code
docs/decisions   accepted architectural decisions
source and tests implementation truth
project-work     current change control only
Skills           repeatable operating procedures
```

### Authority and precedence

Each layer is authoritative only for its defined concern. A later layer must not silently replace an earlier layer outside that concern.

| Layer | Authority | Must not do |
| --- | --- | --- |
| Source and tests | Actual current implementation, contracts, and verification behaviour | Claim unimplemented architecture is accepted merely because it is present in code. |
| Accepted ADRs | Explicit architectural decisions within their stated boundary | Duplicate implementation detail or override a later accepted ADR. |
| `docs/architecture` | Durable existing product and system architecture in its stated scope | Be silently superseded by Foundation or Code Map text. |
| Foundation | Repository-wide durable rules, scope, and guidance conventions | Restate product architecture, source detail, active work, or a Skill procedure. |
| Code Map | Verified navigation from a demonstrated subject to authority, source, tests, dependencies, and safe change routing | Become a second specification or invent implementation behaviour. |
| Root `AGENTS.md` | Concise entrypoint that selects the applicable workflow and downstream authority | Become an architecture manual, work tracker, or complete procedure catalogue. |
| Skills | Repeatable procedures for defined tasks, using the authority routed by `AGENTS.md` and Code Map | Define product architecture, bypass change control, or replace source inspection. |
| `project-work` on `Project-work-instructions` | Active work status, phase, actor, scope, and review handoff | Define or amend product architecture or implementation authority. |

When sources disagree, an agent must resolve the conflict by the scopes above: follow accepted decisions and architecture for the rules they explicitly own; inspect verified current source and tests for what is actually implemented; and treat Foundation, Code Map, root routing, Skills, and project-work as guidance within their limited roles. A conflict that changes architecture is an authority decision to be recorded and accepted, not a Code Map or Foundation edit.

### Root routing and Skills

The root `AGENTS.md` remains short. It identifies the repository, protects repository scope, directs workflow triggers such as `run the cycle` to the `Project-work-instructions` procedure, and points agents to Foundation, Code Map, ADRs, source, and relevant Skills as appropriate. It does not restate those materials.

Future Skills are operating procedures, not a parallel authority hierarchy. A Skill starts from root routing, identifies applicable Foundation and Code Map entries, reads the linked ADRs and current source, and respects active `project-work` when the task is controlled work. If no subject map exists, the Skill follows authoritative architecture and source directly; it does not create a speculative map as a prerequisite.

### Foundation and existing architecture

Foundation defines repository-wide rules that must remain true: the scope and responsibility of the guidance layers, how authority is located, and maintenance expectations. It links to `docs/architecture` and accepted ADRs for existing product/system authority instead of copying them. Existing architecture documents remain in place and retain their own stated authority. A future Foundation rule that would alter an accepted architecture decision requires a new ADR; it cannot overwrite it.

### Code Map maintenance

Each Code Map subject describes a demonstrated repository area and records only enough stable navigation to reach its authority and implementation:

- purpose and scope;
- relevant accepted ADRs, architecture, and Foundation references;
- actual source and focused test locations;
- dependency path and boundary;
- safe change routing and related documents; and
- created and last-verified dates.

Map entries link to their sources instead of reproducing contracts, tokens, APIs, or test assertions. The person changing a mapped subject updates its map when paths, dependency boundaries, governing authority, or safe routing change, and refreshes `last-verified` after checking the linked implementation. A review or scheduled maintenance pass may identify stale maps; it repairs the navigation or defers it through normal change control. A Code Map entry never certifies a fact it has not verified and never overrides linked authority.

The Button system is the initial demonstrated Code Map subject because current `main` contains accepted Button ADRs, WEX Button foundations, Button schemas, platform-neutral shared UI, and focused tests. Its future map must link to those locations and describe the dependency flow without restating their Button contract.

### Minimum post-approval structure

After this decision is accepted, the minimum implementation is:

```text
AGENTS.md                         concise routing updates only
docs/foundation/README.md         Foundation scope, authority, and maintenance entrypoint
docs/code-map/README.md           Code Map format and maintenance rules
docs/code-map/button-system.md    first verified subject map
docs/decisions/0009-...md         accepted decision record
```

The exact Foundation documents beyond its entrypoint, additional subject maps, and Skills are created only when a demonstrated need and authorised work phase require them.

## Consequences and boundaries

This decision gives agents one discoverable route to existing authority while retaining the distinction between rules, decisions, implementation, navigation, active work, and procedures. It makes freshness an explicit responsibility attached to relevant change and review work, rather than relying on a separate narrative specification.

This proposal authorises no Foundation or Code Map directory, root `AGENTS.md` change, Skill creation or installation, product/source change, Button change, schema/UI/WEX/adapters/catalogue/runtime work, CI/tooling change, or cross-repository inspection.
