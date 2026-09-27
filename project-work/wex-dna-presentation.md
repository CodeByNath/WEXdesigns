# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 4 — Extend Design Token DNA to Title, Navigation, and Body

## Reviewer verdict

**Proceed**

Heading Global Tokens are accepted on `main` at
`21983ed56c442f41c4496e1677bdf6fa8c46189f`.
Owner browser validation passed the hosted page, including light/dark,
desktop/compact, keyboard focus, skip-link transfer, and the final simplified
Heading presentation.

The completed `feat/global-tokens-typography` branch is safe for Builder
housekeeping before opening the next topic branch.

## Owner rule

Apply the learned Design Token method in one implementation pass to the three
remaining Typography roles:

- Title
- Navigation
- Body

For **every role**, the first card is always its base atom:

```text
<Role> Default = base Design Token atom
```

After the base atom, show only the variation attributes that already exist for
that role. Do not force identical attribute inventories and do not invent
unsupported Typography capabilities.

## Shared attribute rules

Where supported by the role:

- Colour / Light -> existing `--wex-color-white`
- Colour / Accent -> existing `--wex-color-text-accent`
- Style / Italic -> existing italic authority
- Size / Large -> existing role Large Typography class/tokens
- Size / Small -> existing role Small Typography class/tokens
- Weight attributes -> only existing role-valid weight changes

Each attribute changes only its named concern and inherits the rest of that
role's Default atom.

Current weight authority:

- **Title**: Default Regular; supports Light, Regular, Semibold.
  Present Weight / Bold -> Semibold and Weight / Thin -> Light.
- **Navigation**: Default Semibold; Navigation supports Semibold only.
  Present no duplicate/non-variation Weight card.
- **Body**: Default Regular; supports Regular and Light.
  Present Weight / Thin -> Light. Do not invent Body Semibold/Bold.

## Builder instruction — one pass

1. Reconfirm `main` contains
   `21983ed56c442f41c4496e1677bdf6fa8c46189f`, then remove the completed
   remote `feat/global-tokens-typography` branch.
2. Verify remote heads are back within the two permanent branches, then create
   one new Phase 4 topic branch from current `main`.
3. Extend ADR 0012 and the Global Tokens Code Map so Heading, Title,
   Navigation, and Body all follow the Default-atom + sparse role-valid
   attributes model.
4. Extend `/global-tokens/` with three additional presentations using the
   same learned card structure:
   **base atom first, then only valid variations**.
5. Preserve each role's existing default/primary weight and use only existing
   WEX Typography classes/tokens.
6. Reuse the existing Global Tokens presentation CSS. Do not change WEX
   Typography foundation CSS, Colour foundation CSS, token definitions/storage,
   raw values, schemas, or component APIs.
7. If an attribute cannot be represented with an existing canonical class/token,
   omit it and record the authority reason; do not invent it.
8. Strengthen focused tests for all four roles: mandatory Default base atom,
   exact role-valid attribute order/mappings, White/Accent mapping, Size
   mappings, and absence of unsupported Weight attributes.
9. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
   desktop/compact + light/dark + keyboard/focus validation for the complete
   four-role presentation.
10. Commit/push one Phase 4 candidate, update this same work file to
    `AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, checks,
    browser evidence, and any limitation; stop.

## Scope boundary

This phase finishes the existing Typography Design Token roles. It does not
invent new role capabilities or expand into components.
