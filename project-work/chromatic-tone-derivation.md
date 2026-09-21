# Chromatic Tone Derivation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: WEX-core implementation submitted

## Reviewer Verdict

**Stop — architectural risk**

The authority-only phase was valid, but closing this work area while core WEX still independently authors Dark/Light values leaves implementation inconsistent with accepted ADR 0011.

Current `packages/wex/src/foundations/colour.css` still hardcodes:

- Accent Base / Dark / Light;
- Warning Base / Dark / Light;
- Success Base / Dark / Light;
- Error Base / Dark / Light.

ADR 0011 now says each family has exactly one Base and Dark/Light are deterministic derived tones. At the core-system stage, Dark/Light must therefore not remain independent authoring inputs.

## Builder Handoff

- Candidate branch/SHA: `feat/chromatic-tone-derivation` at `04ae6d849094bff75a1266911c0380af64949e10`.
- Base `origin/main`: `7278b501ef8a331dede4b6c3993009d984f5371d`. The fetched remote candidate resolves to the stated SHA and is its descendant.
- `git diff --check origin/main..origin/feat/chromatic-tone-derivation` passed. The candidate changes exactly six WEX files: package manifest, generator, pure derivation utility, generated CSS, colour foundation, and colour tests.
- The browser-independent exported utility owns four Base inputs, ADR 0011 calibrated OKLCH transforms, 16-step chroma-reduction gamut mapping, ties-up 8-bit quantisation, and registered `on-*` contrast validation/rejection.
- The checked generated CSS artifact produces compatible Base/Dark/Light primitive tokens. `colour.css` imports it and retains existing semantic mappings; it no longer authors chromatic primitive hex values.
- Calibration tests reproduce all eight targets exactly: Accent `#0043CE / #78A9FF`, Warning `#B28600 / #FDDC69`, Success `#198038 / #6FDC8C`, Error `#A2191F / #FA4D56`.
- All 12 registered `on-*` pairings validate at WCAG AA normal-text contrast; a proposed invalid Base is rejected by the core assertion.
- Passed: `pnpm --filter @weerax/wex test`, WEX generated-token check, `pnpm audit:foundation`, and `pnpm check` (35 tasks).
- Chrome local candidate `http://localhost:5173/WEXdesigns/` showed the exact twelve values through the existing System Settings token readout in both dark and light themes. The accessible Dark theme checkbox toggled correctly; keyboard Tab reached visible Primary Small Button focus.
- No admin editing, persistence, schemas, adapters, product/domain logic, theme framework, Main-neutral, semantic-role, or presentation-only palette source was added.

Await independent Reviewer inspection of the pushed candidate and evidence.
