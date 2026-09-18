# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer review — Repository guidance architecture authority proposal

## Objective

Establish the repository guidance architecture before creating the permanent Foundation or Code Map content.

This phase is **authority-only**. The Builder must inspect this WEX repository only and propose how agents are guided through repository authority without duplicating or weakening existing architecture.

## Required Direction

The proposal must preserve these distinct layers:

```text
AGENTS.md       = entry point / routing
docs/foundation = durable rules and scope
docs/code-map   = maintained navigation to actual code
docs/decisions  = accepted architectural decisions
source          = implementation truth
project-work    = current change control only
Skills          = repeatable operating procedures
```

The root `AGENTS.md` remains concise. It should eventually index downstream authority/navigation and tell an agent which Skill/workflow to invoke for defined triggers such as `run the cycle`; it must not become a duplicate architecture manual.

Foundation defines **what rules must remain true**. Code Map defines **where the verified implementation lives and how to navigate it**.

Each Code Map subject should be able to identify purpose, relevant authority, actual source/test locations, dependency path, safe change routing, related documents, created date, and last-verified date. Create subject maps only for demonstrated repository areas; do not pre-build speculative maps.

## Builder Authority Discovery

Inspect only this repository, including:

- root `AGENTS.md`;
- `docs/architecture/*`;
- accepted ADRs;
- current `packages/*` and `apps/*` boundaries;
- current Button implementation as the first concrete Code Map example;
- current project-work governance.

**Do not inspect, clone, search, or modify CompuZign or any other repository.** Cross-product strategic guidance will be supplied separately by the Reviewer when needed.

## Deliverable

Create a new **Proposed** ADR under `docs/decisions/` defining this repository guidance architecture.

## Builder Handoff

- Remote branch: `docs/repository-guidance-architecture`
- Remote SHA: `c47cf2e9df12d248bba820edc82d1f040d7c6a30`
- Changed files: `docs/decisions/0009-repository-guidance-architecture.md`
- Evidence: the branch is pushed and its remote ref was verified at the SHA above; `git diff --check` passed before commit.
- Limitations/deviations: none. The proposal creates no Foundation or Code Map files, changes no root `AGENTS.md`, and makes no product/source changes.
- Unresolved issues: Reviewer must decide whether to accept the proposed authority architecture before any implementation phase is authorised.

The ADR must resolve:

1. authority and precedence of each layer;
2. responsibilities and non-goals of root `AGENTS.md`, Foundation, Code Map, ADRs, source, project-work, and Skills;
3. how Code Map freshness is maintained without becoming a second source of truth;
4. how subject maps link to source/authority rather than restating implementation;
5. how future Skills navigate through `AGENTS.md` and Code Map;
6. how existing `docs/architecture` relates to the new Foundation layer without duplicating/conflicting authority;
7. the minimum initial file/folder structure to implement after approval.

Do not create `docs/foundation/`, `docs/code-map/`, or modify root `AGENTS.md` yet.

## Exclusions

No product/source implementation. No Button changes. No schemas, UI, WEX CSS, adapters, catalogue, runtime, CI/tooling, external-repository work, or Skills implementation.

Push the proposal branch, verify the remote SHA, update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA/changed files, and stop.
