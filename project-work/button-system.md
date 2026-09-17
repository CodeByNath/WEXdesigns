# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1C — Implement accepted Button geometry

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `ced2d01029f531f3acc6fba370f765ecf0a6bbe9`. Compared with prior `main` `46bdaf04ac1e90d49b908417321d9363888e6970`, the promotion changes only `docs/decisions/0006-button-geometry-authority.md` and contains the reviewed accepted geometry contract.

ADR 0006 is therefore established on `main`.

## Authorised Builder Scope

Create one topic branch from current `origin/main` and implement only the accepted Button geometry:

- WEX Button geometry for Small / Default / Large exactly as ADR 0006;
- existing Navigation Small / Default / Large typography mappings;
- 1px stable border, radius 0, existing 2px focus width, 2px focus offset;
- content-sized inline width and accepted minimum block sizes/padding;
- identical geometry across all five Button variants;
- minimal shared-UI tier class/presentation mapping required to let the existing serializable `tier` select the WEX geometry;
- focused tests for all three tier mappings and geometry values;
- minimum audit adjustment only if required to enforce this already-authorised Button geometry boundary.

Use existing WEX spacing, typography, focus, and Button semantic tokens. Do not introduce new numeric primitives where an accepted token exists.

## Safeguards / Exclusions

- Do not change the Button schema or add new serializable fields.
- Do not change colour/state authority from ADR 0005.
- Do not add runtime rendering, catalogue/demo work, GitHub Pages integration, adapters, domain behaviour, actions, icons, icon-only Button, toggle/link/dropdown/group variants, or other component families.
- Do not modify `WEX-SOURCE.md`.
- Do not use the preserved recovery branch as authority or cherry-pick it wholesale.
- Do not add variant-specific geometry.
- Keep transient hover/pressed/focus state out of serializable definitions and shared presentation inputs.

## Verification / Handoff

Run touched-package tests, foundation audit, and repository `pnpm check` under Node 24. Push the topic branch, verify its remote SHA, and update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA, exact changed files, checks, Node/pnpm versions, and unresolved issues. Stop for Reviewer.

No runtime or Pages deployment is authorised in this slice.
