# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Candidate accepted — promote exact WEX-core derivation implementation

## Reviewer Verdict

**Proceed**

Reviewer independently verified candidate `feat/chromatic-tone-derivation` at `04ae6d849094bff75a1266911c0380af64949e10` against `main` `7278b501ef8a331dede4b6c3993009d984f5371d`.

The candidate is exactly one commit ahead and changes only six WEX files:

- `packages/wex/package.json`
- `packages/wex/scripts/generate-chromatic-tokens.mjs`
- `packages/wex/src/foundations/chromatic-tokens.generated.css`
- `packages/wex/src/foundations/chromatic-tone-derivation.mjs`
- `packages/wex/src/foundations/colour.css`
- `packages/wex/test/colour-tokens.test.mjs`

## Accepted implementation

The candidate now makes ADR 0011 true in the WEX core:

- each chromatic family has one authored Base in `CHROMATIC_FAMILIES`;
- Dark/Light are produced by the accepted deterministic per-family OKLCH transform;
- out-of-gamut handling uses 16-step chroma reduction;
- generated CSS is a checked delivery artifact, not a second authored palette;
- `colour.css` imports generated chromatic tokens and no longer authors chromatic primitive hex values;
- existing semantic mappings and CSS variable names remain compatible;
- current Base values reproduce all eight established Dark/Light targets exactly;
- registered `on-*` foreground contracts are validated at WCAG AA normal-text contrast and invalid Base proposals are rejected;
- the exported derivation utility is browser-independent and reusable by a later admin/server layer;
- the existing System Settings surface consumes WEX tokens through the normal `index.css -> colour.css -> generated tokens` path, with no presentation-only palette.

No CI checks are attached to the candidate SHA; Builder-reported deterministic checks are therefore local evidence only. The implementation itself and checked generated artifact were independently inspected.

## Builder promotion instruction

Promote only this exact accepted candidate:

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify `origin/main` is still `7278b501ef8a331dede4b6c3993009d984f5371d`.
3. Verify `origin/feat/chromatic-tone-derivation` is exactly `04ae6d849094bff75a1266911c0380af64949e10`.
4. Fast-forward `main` to that exact SHA only; no merge commit, rebase, amendment, regeneration change, or unrelated edit.
5. Re-run/record the required deterministic checks against the promoted revision:
   - `pnpm --filter @weerax/wex test`
   - generated-token stale check
   - `pnpm audit:foundation`
   - `pnpm check`
6. Verify remote `main` equals the accepted candidate SHA.
7. Update this same file to `Status: AWAITING REVIEWER REVIEW` with exact promotion/check evidence and stop.
8. Do not delete the topic branch until Reviewer independently verifies promoted `main`.

No admin editing, persistence, schemas, adapters, product/domain logic, new theming framework, Main-neutral change, semantic-role change, or unrelated presentation work is authorised.
