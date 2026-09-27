# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 2 — Replace Page Heading DNA with typography-aligned Global Tokens

## Reviewer verdict

**Stop — architectural risk**

Current `main`: `21d41fd209621b6e107e964563a7f9f964e407b5`.

Owner correction: the current `Page Heading DNA` abstraction duplicates an
already-authoritative Typography system and must not become the component-facing
model.

## Existing authority confirmed

WEX Typography already owns the canonical text vocabulary:

- `Heading`
- `Title`
- `Navigation`
- `Body`

Each uses the existing global tiers:

- `Small`
- `Default`
- `Large`

The existing tier rule is binding: tier peers pair together. A Small component
composition uses Small typography roles; Default uses Default; Large uses Large.
Do not cross-pair tiers inside one composition.

## Owner-approved Global Tokens model

Global Tokens / WEX DNA **augment the existing typography vocabulary**. They do
not create `Page Heading`, `Page Title`, or another semantic text hierarchy.

For every existing canonical typography role/tier, preserve its current name,
size/rhythm, primary weight, and usage authority, then bind:

- Default colour -> `--wex-color-text-primary` (theme-aware)
- Colour / Light -> `--wex-color-light` (persistent light override)
- Colour / Accent -> `--wex-color-text-accent`
- Weight / Bold -> existing Semibold authority
- Weight / Thin -> existing Light-weight authority
- Style / Italic -> existing Italic authority

Size is **not** a DNA attribute. Size remains the existing Typography tier.

The intended component-facing direction is:

```text
existing typography token/class
+ optional registered Global Token attributes
= component-ready presentation
```

Components must not invent or locally assign colour/weight/style values when a
registered token exists. Do not invent final API/class names without repository
authority; use the smallest existing-compatible mechanism and stop on a naming
gate if none exists.

## Required correction

On one topic branch:

1. supersede/replace ADR 0012's `Page Heading DNA` model while preserving its
   useful token-reference and sparse-override rules;
2. retire Page-Heading-specific test/map authority and route the subject through
   Typography + Global Tokens authority instead;
3. keep the existing Typography source values and canonical classes intact;
4. update Global Tokens presentation to show the actual Typography vocabulary,
   not `Page Heading`;
5. present all three tiers explicitly, including the currently omitted
   **Heading Default**;
6. include Heading, Title, Navigation, and Body at Small / Default / Large;
7. show registered attributes as additions to those existing type tokens, not
   as replacement typography roles;
8. preserve the current `/global-tokens/` route unless current repository
   authority requires otherwise.

## Exclusions

No component implementation, page-builder, new type family, new size tier,
cross-tier pairing, raw visual values, brand customisation, or speculative DNA
families.

## Verification / handoff

Update focused authority/runtime tests, run `git diff --check` and `pnpm check`,
Chrome-validate desktop + compact + light/dark + keyboard/focus, push, then
update this SAME file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence and
stop.
