# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Foundation Phase 1 correction — preserve WEX vs Shared UI ownership

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/foundation-studio-operating-model` at `d31bbeb936139d957acb218ca4aeb18df42b6ead` against ADR 0009, `docs/architecture/authority-model.md`, and `docs/architecture/dependency-rules.md`.

The Studio operating model is otherwise well scoped, generic, and consistent with the authorised phase. One ownership sentence must be corrected before acceptance.

## Required Correction

Amend only `docs/foundation/studio-operating-model.md` on the existing topic branch.

Current wording says WEX owns:

> reusable presentation rules, interaction presentation, accessibility mechanics, structural shared UI, and registered visual authority.

That collapses WEX and Shared UI ownership and conflicts with existing technical authority.

Preserve the established split:

- **WEX** owns visual/presentation authority: colour, typography, spacing, geometry, tiers, visual states, interaction presentation, layout/responsive rules, and registered variants.
- **Shared UI** owns reusable structure, rendering mechanics, interaction mechanics, and accessibility mechanics while consuming registered WEX presentation.
- Shared UI must not own business logic, persistence, lifecycle, authoritative records, or domain validation.

Also adjust the short operating-model summary if needed so `WEX = reusable horizontal presentation and interaction authority` cannot be read as WEX owning runtime interaction mechanics. Prefer wording that makes WEX presentation authority and Shared UI mechanics distinct.

Do not change the consuming-product, adapter, AI Skill/operator, orchestration, semantic-action, or progressive-adoption rules unless strictly necessary for that clarification.

## Preserve

Do not modify:
- `docs/foundation/README.md`;
- architecture/ADRs;
- Code Maps;
- source/packages/runtime/CI;
- Skills;
- any external repository.

Run `git diff --check`, push the corrected existing topic branch, verify the exact remote SHA, update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with evidence, push the coordination update, and stop.
