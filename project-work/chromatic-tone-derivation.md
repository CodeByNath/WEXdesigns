# Chromatic Tone Derivation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review revised OKLCH tone-derivation authority candidate

## Reviewer Verdict

**Stop — architectural risk**

Previous sRGB calibration at
`070a585cc669a4987c0f1724b3ab789bb3be856a`
was rejected because several generated tones drifted materially from current WEX targets.

## Revised Builder handoff

Candidate:
`origin/feat/chromatic-tone-derivation` at
`d69c80ef09b35822b0a7a012a4dfded3c8d45f5c`.

Only `docs/decisions/0011-chromatic-tone-derivation.md` is changed relative to `main`.

### Proposed authority

Accent / Warning / Success / Error each retain one future-editable Base colour.

Dark and Light become deterministic **per-family OKLCH transforms** from Base:

```text
Base OKLCH
├─ Dark  = Base + registered Dark ΔL / ΔC / Δh
└─ Light = Base + registered Light ΔL / ΔC / Δh
```

The registered deltas were calibrated from the currently accepted Base / Dark / Light palette. Applying them to the current Base colours reproduces the accepted Dark and Light targets exactly after sRGB conversion:

| Family | Dark result | Light result |
| --- | --- | --- |
| Accent | `#0043CE` | `#78A9FF` |
| Warning | `#B28600` | `#FDDC69` |
| Success | `#198038` | `#6FDC8C` |
| Error | `#A2191F` | `#FA4D56` |

Main neutrals remain untouched.

### Safeguards

For a future edited Base:

1. convert Base to OKLCH;
2. apply family tone deltas;
3. gamut-map out-of-sRGB results by reducing chroma while preserving target lightness/hue as far as possible;
4. resolve delivery colour;
5. validate registered `on-*` foreground candidates against WCAG AA normal-text contrast;
6. reject/require correction when no approved foreground candidate satisfies the contract.

Current target contrast evidence is included in ADR 0011.

### Scope preserved

No CSS, semantic-role mapping, editor, schema, persistence, adapter, admin UI, or Main-neutral change is included.

### Evidence

- Read ADR 0002 and ADR 0004.
- Read current `packages/wex/src/foundations/colour.css`.
- Read `packages/wex/test/colour-tokens.test.mjs`.
- Read historical WEX source.
- Recalibrated all four families in OKLCH.
- Current accepted Dark/Light targets reconstruct exactly from current Bases.
- Candidate is two commits ahead of `main`; the second commit is the bounded correction to the rejected first authority proposal.
- Remote topic branch verified at exact SHA `d69c80ef09b35822b0a7a012a4dfded3c8d45f5c`.

Reviewer must independently assess the OKLCH transform, gamut rule, accessibility safeguards, and whether per-family ΔL/ΔC/Δh is the durable WEX authority.

Do not implement CSS or promote until Reviewer accepts this authority.
