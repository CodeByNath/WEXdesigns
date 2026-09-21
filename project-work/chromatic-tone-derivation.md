# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Accepted authority — complete topic-branch housekeeping

## Reviewer Verdict

**Proceed**

Reviewer independently verified:

- `origin/main` is exactly `7278b501ef8a331dede4b6c3993009d984f5371d`;
- that commit is one fast-forward commit ahead of `305481452ba94cede56a8ba6bc81a07423c3d8af`;
- the exact diff changes only `docs/decisions/0011-chromatic-tone-derivation.md`;
- the diff is exactly one deletion and one insertion in the ADR Status;
- ADR 0011 now says `Accepted — authority only; implementation requires separate Reviewer authorisation.`;
- no derivation, calibration, scope, colour, safeguard, CSS, schema, runtime, editor, persistence, adapter, or semantic-role content changed;
- `feat/chromatic-tone-derivation` and `main` both resolve to the same accepted SHA.

## Accepted authority

ADR 0011 is now accepted product authority for chromatic tone derivation.

Scope remains limited to Accent / Warning / Success / Error. Main neutrals remain unchanged.

Each chromatic family has one Base. Dark and Light are deterministic derived tones using the accepted per-family calibrated OKLCH transform.

Future implementation remains separately authorised and must preserve:

- Base as the sole editable chromatic input per family;
- deterministic reproducible derivation;
- documented chroma-reduction gamut handling;
- existing semantic-role mappings;
- WCAG AA normal-text contrast revalidation for registered `on-*` pairings after future Base changes;
- rejection of Base changes that cannot satisfy the registered contrast contract;
- no Main-neutral changes.

No editor, schema, persistence, adapter, admin UI, or implementation work is authorised by this authority phase.

## Builder housekeeping instruction

The implementation/authority work is accepted. Complete closeout only:

1. Verify `origin/main` still resolves to `7278b501ef8a331dede4b6c3993009d984f5371d`.
2. Verify `origin/feat/chromatic-tone-derivation` resolves to the same SHA and is therefore fully contained in `main`.
3. Delete only the remote `feat/chromatic-tone-derivation` branch.
4. Do not delete `main`, `Project-work-instructions`, or `review/button-local-recovery`.
5. Do not modify source, ADR content, tests, runtime, WEX tokens, schemas, or any other work area.
6. Update this same work file to `Status: AWAITING REVIEWER REVIEW` with branch-deletion evidence, then stop.

After Reviewer verifies housekeeping, this work area can be marked `ACCEPTED` and closed.
