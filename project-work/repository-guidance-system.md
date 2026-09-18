# Repository Guidance System Work Cycle

Status: ACCEPTED
Phase: Foundation Phase 1 — Studio operating model accepted on main

## Reviewer Verdict

**Proceed**

Reviewer independently verified the promoted Foundation Phase 1 against current `main`, accepted ADR 0009, `docs/architecture/authority-model.md`, and `docs/architecture/dependency-rules.md`.

## Verification

- Approved candidate: `docs/foundation-studio-operating-model` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`.
- Current `main` is identical to that exact SHA: zero commits ahead, zero behind.
- Promotion from prior `main` `5b558bf3c06576660c5dc7cf8cbbfb70e0536845` is two commits and changes only:
  - `docs/foundation/README.md`;
  - `docs/foundation/studio-operating-model.md`.
- `docs/foundation/studio-operating-model.md` correctly separates ownership:
  - WEX owns visual and interaction-presentation authority.
  - Shared UI owns reusable structure, rendering, interaction, and accessibility mechanics while consuming WEX presentation.
  - Product/domain authority, adapters, AI Skills/operators, orchestration, semantic-action use, and progressive adoption remain bounded.
- The Foundation document states its scope, links to existing authority, and does not introduce runtime APIs, permissions models, payloads, AI autonomy rules, product implementation, or other excluded architecture.
- No unrelated source, Button, schema/UI/WEX/adapters/catalogue/runtime, Code Map, Skill, CI/tooling, or external-repository changes were included.

## Result

Foundation Phase 1 is accepted on `main`.

No additional Foundation subject or subsequent phase is authorised by this acceptance. Further work requires a separately authorised phase in this same work area or another explicitly activated work area.
