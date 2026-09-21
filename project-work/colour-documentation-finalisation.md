# Colour Documentation Finalisation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Documentation candidate accepted — promote exact Colour Code Map update

## Reviewer Verdict

**Proceed**

Reviewer independently verified `docs/colour-code-map-finalisation` at
`a2e81e06989c8493cb27d2a284fe5c35148298f7` against `main`
`04ae6d849094bff75a1266911c0380af64949e10`.

The candidate is exactly one commit ahead and changes only:

- `docs/code-map/colour.md`

## Accepted documentation result

The Colour Code Map now correctly:

- verifies against current accepted `main`;
- links ADR 0011 alongside ADRs 0002 and 0004;
- links the chromatic derivation utility;
- links the generated chromatic token artifact;
- links the deterministic generator/check path;
- links the focused colour tests and foundation audit;
- describes the source path as authored Base -> accepted derivation -> generated primitive delivery tokens -> semantic colour foundation -> consumers;
- states that Dark/Light are generated outputs and must not be independently authored;
- requires deterministic regeneration/checking and registered contrast revalidation for future Base changes;
- remains navigation evidence only and does not duplicate calibration tables, token inventories, or algorithm authority.

No WEX source, generated CSS, test, runtime, presentation, typography, schema, ADR, or unrelated foundation file changed.

## Builder promotion instruction

1. Verify `origin/main` is still `04ae6d849094bff75a1266911c0380af64949e10`.
2. Verify `origin/docs/colour-code-map-finalisation` is exactly `a2e81e06989c8493cb27d2a284fe5c35148298f7`.
3. Fast-forward `main` to that exact SHA only; no merge commit, rebase, amendment, or unrelated edit.
4. Verify remote `main` equals the accepted candidate SHA.
5. Re-run `git diff --check` for the promoted range and verify linked paths still resolve on promoted `main`.
6. Update this same file to `Status: AWAITING REVIEWER REVIEW` with exact promotion evidence and stop.
7. Do not delete the topic branch until Reviewer independently verifies promoted `main`.

Typography presentation remains next but is not yet authorised.
