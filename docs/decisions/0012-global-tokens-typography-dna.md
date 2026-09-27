# 0012: Global Tokens / Typography DNA

## Status

Accepted — the former Page Heading DNA v1 is superseded. This is an authority definition;
it creates no new typography values or component API.

## Context and authority inspected

Historical WEX authority already owns four canonical type roles: `Heading`,
`Title`, `Navigation`, and `Body`. Each role has the existing `Small`,
`Default`, and `Large` tiers. Tier peers pair together: a composition uses one
tier across its roles and does not cross-pair tiers.

The colour foundation owns theme-aware primary and accent text roles, and the
theme-independent light override. Typography owns every role's family,
size/rhythm, primary weight, and style. Global Tokens augment these existing
roles; they do not create a page-specific text hierarchy or a new semantic
role.

## Decision

Every existing canonical Typography role/tier is a Global Tokens base:

```text
existing Typography role + tier
  -> existing primary presentation
  -> optional sparse Global Token attributes
  -> component-ready presentation
```

`Size` is not a Global Token attribute. Size and rhythm remain the existing
Typography tier. A component first selects an existing canonical Typography
token/class, then may apply only a registered attribute that changes its named
concern. It must not locally assign a colour, weight, or style where the
registered mapping exists.

### Binding token-reference rule

Global Tokens record relationships to existing WEX foundations rather than
resolved values. They must not copy or hardcode colours, font sizes, weights,
line heights, spacing, borders, motion, or aliases. A changed foundation token
therefore flows to every consumer through its existing reference.

No new token storage, naming convention, selector, schema, or final component
API is authorised here. If an existing Typography role/tier or registered
attribute does not fit a need, it is an architecture gap requiring an Owner
decision; it must not be invented or approximated.

### Base presentation and registered attributes

Each base preserves its existing role/tier name, family, size/rhythm, primary
weight, normal style, and usage authority. Its default colour is
`--wex-color-text-primary`.

| Attribute | Sole delta | Existing WEX mapping |
| --- | --- | --- |
| `Colour / Light` | Colour | `--wex-color-light`, a persistent light override. |
| `Colour / Accent` | Colour | `--wex-color-text-accent`, with theme resolution owned by Colour. |
| `Weight / Bold` | Weight | Existing Semibold authority, `--wex-type-weight-semibold`. |
| `Weight / Thin` | Weight | Existing Light-weight authority, `--wex-type-weight-light`. |
| `Style / Italic` | Style | Existing Italic authority, `--wex-type-style-italic`; text emphasis only. |

An attribute changes only its stated concern and inherits the chosen canonical
Typography role/tier otherwise. It can be used only where the existing
Typography source supplies that canonical selection; this decision does not
authorise unsupported role/weight combinations.

## Consequences and boundaries

The former page-specific role and attributes are retired. Contextual uses
continue to map to their existing Typography roles without creating a competing
text system. Global Tokens do not establish HTML heading semantics,
layout, responsive behaviour, interaction, loading, brand customisation, or
new typography families.

Future consumers use the existing Typography selection plus the registered
Global Token attributes. They must not create parallel visual values.
