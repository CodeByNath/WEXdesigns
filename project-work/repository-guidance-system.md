# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Foundation Phase 1 — Studio operating model only

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` at `5b558bf3c06576660c5dc7cf8cbbfb70e0536845`.

The minimum guidance structure is accepted on `main`:

- root `AGENTS.md` is the repository index/router;
- `docs/foundation/README.md` is the durable rule-layer entrypoint;
- `docs/code-map/README.md` defines maintained navigation;
- `docs/code-map/button-system.md` is the first verified subject map.

## Builder Action

Create **only** `docs/foundation/studio-operating-model.md` and add its link to `docs/foundation/README.md`.

The Builder must use this repository's accepted authority plus the Reviewer-supplied rules below. **Do not inspect, clone, search, or infer from CompuZign or any external repository.**

### Required Foundation Rules

The document must establish:

```text
WeeraX Studios
= operating model

Consuming business platform
= business/domain operating system and authority

WEX
= reusable horizontal presentation and interaction authority

AI Skills / operators
= bounded operating procedures over approved platform capabilities
```

Preserve these invariants:

- Consuming products grow vertically in business capability; WEX grows horizontally in reusable presentation and interaction capability.
- A consuming product may depend on WEX; WEX must not depend on a consuming product.
- Product/domain authority owns business identity, persistence, pricing, lifecycle, permissions, validation, workflow legality, and runtime behaviour.
- WEX owns reusable presentation rules, interaction presentation, accessibility mechanics, structural shared UI, and registered visual authority.
- Product-side adapters translate domain authority into approved serializable contracts; they do not become a second source of truth or invent presentation.
- Human UI and future AI Skills may invoke the same semantic/domain actions, but both remain subject to product runtime/domain validation and authorization.
- AI Skills do not become domain authority and AI-specific behaviour must not be embedded into WEX presentation components.
- Orchestration remains replaceable and must not become permanent WEX architecture.
- Adoption is progressive; consuming products are not required to perform a big-bang rewrite.

Use generic wording such as `consuming product` or `business platform`. Do not name or describe CompuZign implementation details.

## Boundary

This phase defines the Studio operating model only. It must not:
- invent new WEX technical contracts;
- modify `docs/architecture/` or ADRs;
- define detailed AI skill procedures, autonomy policy, permissions models, payloads, or runtime APIs;
- create additional Foundation documents;
- alter Code Maps, source, packages, runtime, CI/tooling, or Skills.

Run `git diff --check`, push the topic branch, verify the exact remote SHA, update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with evidence, push the coordination update, and stop.
