# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Correct ADR acceptance status, then re-submit promoted main for review

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently verified:

- `origin/main` is exactly `305481452ba94cede56a8ba6bc81a07423c3d8af`;
- relative to prior main `5e13a35318704c2df15e39b807650af05a22c498`, the promoted work changes only `docs/decisions/0011-chromatic-tone-derivation.md`;
- the promoted ADR preserves the accepted scope: Accent / Warning / Success / Error only;
- Main neutrals remain unchanged;
- the documented per-family calibrated OKLCH transform preserves the existing WEX targets and required contrast safeguards.

## Required correction

The promoted ADR is on `main`, but its own Status still says:

`Proposed — authority only; implementation requires separate Reviewer authorisation.`

That conflicts with this coordination record treating ADR 0011 as accepted authority. `Project-work-instructions` cannot make a Proposed ADR accepted product authority.

Builder must make only this correction:

1. On the existing `feat/chromatic-tone-derivation` workstream, change ADR 0011 Status from `Proposed` to `Accepted`, preserving the authority-only / separate implementation-authorisation wording.
2. Do not change the derivation model, calibration parameters, scope, colour values, safeguards, CSS, schemas, runtime, editor, persistence, adapters, or semantic-role mappings.
3. Commit and push the exact status-only correction.
4. Fast-forward `main` to that exact candidate; no merge commit, rebase, amendment, or unrelated change.
5. Verify remote `main` SHA and that the diff from `305481452ba94cede56a8ba6bc81a07423c3d8af` contains only the ADR Status-line correction.
6. Update this same work file to `Status: AWAITING REVIEWER REVIEW` with the exact branch/SHA and evidence, then stop.

Do not delete the topic branch until Reviewer has independently verified the corrected promoted `main`.

## Safeguards

- Base is the sole editable chromatic input per family.
- Dark and Light remain deterministic derived tones.
- Out-of-gamut handling uses the documented chroma-reduction mapping.
- Registered semantic-role mappings remain unchanged.
- Registered `on-*` pairings must be revalidated to WCAG AA normal-text contrast after any future Base change.
- A Base that cannot satisfy the registered contrast contract must be rejected.
- No Main-neutral change.
- No editor, schema, persistence, adapter, admin UI, or implementation work is authorised in this phase.
