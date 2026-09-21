# Chromatic Tone Derivation Work Cycle

Status: ACCEPTED
Phase: Chromatic tone derivation authority accepted and closed

## Reviewer Verdict

**Proceed**

Reviewer independently verified final closeout:

- `origin/main` remains exactly `7278b501ef8a331dede4b6c3993009d984f5371d`;
- ADR 0011 is accepted authority and remains unchanged after promotion;
- the completed remote `feat/chromatic-tone-derivation` branch has been deleted;
- current remote branches are `main`, `Project-work-instructions`, and retained historical `review/button-local-recovery` at `19795644f033f43a7ebb99617d748fdce2c7e1ea`;
- no source, ADR, test, runtime, WEX token, schema, adapter, editor, persistence, or unrelated work-area changes were introduced during housekeeping.

## Accepted authority

ADR 0011 defines chromatic tone derivation for Accent / Warning / Success / Error only.

Main neutrals remain unchanged.

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

## Closure

This work area is accepted and closed.

No further Builder action is authorised here. Open a separate workstream only when a concrete implementation phase for editable brand chromatic Bases is intentionally approved.
