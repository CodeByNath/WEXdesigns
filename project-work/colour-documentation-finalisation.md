# Colour Documentation Finalisation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Bring Colour Code Map up to current accepted chromatic authority and implementation

## Reviewer Verdict

**Proceed**

The WEX colour implementation is accepted and closed on `main` at
`04ae6d849094bff75a1266911c0380af64949e10`.

The remaining colour gap is documentation/navigation freshness only.

Current `docs/code-map/colour.md` is stale:

- last verified against `main` `b701a9d497442cf714c7ecbd39ee8660635d6f11`;
- does not reference ADR 0011;
- does not reference the accepted derivation utility;
- does not reference the generated chromatic token artifact;
- does not reference the generator/stale-check path;
- does not describe the current safe-change route where Base is authored and Dark/Light are generated.

## Builder instruction

Update only the colour documentation/navigation needed to reflect current accepted authority.

Required scope:

1. Update `docs/code-map/colour.md` verification metadata against current `origin/main`.
2. Add ADR 0011 to governing authority.
3. Add links to:
   - `packages/wex/src/foundations/chromatic-tone-derivation.mjs`;
   - `packages/wex/src/foundations/chromatic-tokens.generated.css`;
   - `packages/wex/scripts/generate-chromatic-tokens.mjs`;
   - existing colour tests and foundation audit.
4. Update the dependency/source path so it accurately reflects:
   `authored Base -> accepted derivation -> generated primitive delivery tokens -> semantic colour foundation -> consumers`.
5. Update safe-change routing to state that:
   - Accent / Warning / Success / Error Base values are the authored chromatic inputs;
   - Dark/Light are generated and must not be independently authored;
   - generated CSS must stay in sync via the deterministic generator/check;
   - registered contrast contracts must be revalidated for future Base changes.
6. Keep the Code Map as navigation evidence only. Do not restate calibration tables, token inventories, or implementation algorithms already owned by ADR/source.
7. Verify whether `docs/code-map/README.md` or another existing navigation index needs only a freshness/link correction. Change it only if required; do not widen scope.
8. Do not change ADRs, WEX source, generated CSS, tests, runtime, presentation, typography, schemas, or any other foundation.

## Required evidence

- exact pushed branch/SHA;
- changed-file list;
- diff showing documentation-only scope;
- link/path verification against current `main`;
- confirmation no product/source/runtime files changed.

After completion, update this same work file to `Status: AWAITING REVIEWER REVIEW` and stop.

Typography presentation is explicitly next, but is not authorised until this colour documentation phase is accepted and closed.
