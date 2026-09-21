# Chromatic Tone Derivation Work Cycle

Status: ACCEPTED
Phase: WEX-core chromatic derivation implemented, deployed, verified, and closed

## Reviewer Verdict

**Proceed**

Reviewer independently verified final closeout.

- `origin/main` remains exactly `04ae6d849094bff75a1266911c0380af64949e10`.
- The completed remote `feat/chromatic-tone-derivation` branch is absent.
- Current remote branches are `main`, `Project-work-instructions`, and retained historical `review/button-local-recovery` at `19795644f033f43a7ebb99617d748fdce2c7e1ea`.
- No source, generated output, main history, or unrelated coordination state changed during housekeeping.

## Accepted implementation

ADR 0011 is now implemented in the WEX core.

- Accent, Warning, Success, and Error each have one authored Base.
- Dark/Light are deterministic outputs of the registered per-family OKLCH transform.
- Out-of-gamut handling uses the documented 16-step chroma-reduction mapping.
- Quantisation and registered contrast validation are implemented in the shared browser-independent derivation utility.
- `colour.css` no longer independently authors chromatic primitive hex values.
- `chromatic-tokens.generated.css` is a checked generated delivery artifact and preserves the existing CSS variable contract.
- Current Bases reproduce the established Dark/Light values exactly.
- Registered `on-*` foreground pairings satisfy WCAG AA normal-text contrast; invalid future Base proposals are rejected.
- Main neutrals and semantic-role mappings remain unchanged.
- No admin editing, persistence, schemas, adapters, product/domain logic, or speculative theming framework was added.

## Verification

- WEX tests passed (10 tests).
- Generated-token stale check passed.
- Foundation audit passed.
- Full `pnpm check` passed (35 tasks).
- `git diff --check` passed.
- GitHub Pages workflow run `35596017065` for the accepted SHA completed successfully.
- Live System Settings verification confirmed the established Base/Dark/Light values, working light/dark theme switching, intact Button presentation, no missing custom properties, and no presentation-only duplicate palette.

## Closure

This work area is accepted and closed.

No further Builder action is authorised here. Any future editable brand-colour/admin work must open as a separate authorised workstream and reuse this accepted core derivation rather than reimplementing it.
