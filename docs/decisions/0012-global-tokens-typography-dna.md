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

Every existing canonical Typography role/tier remains owned by Typography. Each
role's existing Default selection is its Design Token base:

```text
<Role> Default
  -> existing Default presentation
  -> optional sparse role-valid Colour, Weight, Style, and Size attributes
  -> component-ready presentation
```

A component first selects an existing canonical Typography token/class, then
may apply only a registered, role-valid attribute that changes its named
concern. Size attributes reference the existing Large or Small selection of
the same role for size/rhythm only; Typography continues to own those values
and classes. A component must not locally assign a colour, weight, style, or
size where the registered mapping exists.

### Binding token-reference rule

Global Tokens record relationships to existing WEX foundations rather than
resolved values. They must not copy or hardcode colours, font sizes, weights,
line heights, spacing, borders, motion, or aliases. A changed foundation token
therefore flows to every consumer through its existing reference.

No new token storage, naming convention, selector, schema, or final component
API is authorised here. If an existing Typography role/tier or registered
attribute does not fit a need, it is an architecture gap requiring an Owner
decision; it must not be invented or approximated.

### Base presentations and registered attributes

Every Default base preserves its existing family, Default size/rhythm, primary
weight, normal style, usage authority, and default colour
`--wex-color-text-primary`. Attributes are sparse: each changes only the named
concern and inherits the remainder of that role's Default base.

| Role Default base | Primary weight | Role-valid attributes |
| --- | --- | --- |
| `Heading Default` | Regular | Colour, Semibold/Bold, Light/Thin, Italic, Large, Small |
| `Title Default` | Regular | Colour, Semibold/Bold, Light/Thin, Italic, Large, Small |
| `Navigation Default` | Semibold | Colour, Italic, Large, Small |
| `Body Default` | Regular | Colour, Light/Thin, Italic, Large, Small |

| Attribute | Sole delta | Existing WEX mapping |
| --- | --- | --- |
| `Colour / Light` | Colour | `--wex-color-white`, a persistent light override. |
| `Colour / Accent` | Colour | `--wex-color-text-accent`, with theme resolution owned by Colour. |
| `Weight / Bold` | Weight | Existing Heading or Title Semibold authority, `--wex-type-weight-semibold`. |
| `Weight / Thin` | Weight | Existing Heading, Title, or Body Light authority, `--wex-type-weight-light`. |
| `Style / Italic` | Style | Existing Italic authority, `--wex-type-style-italic`; text emphasis only. |
| `Size / Large` | Size/rhythm | Existing same-role Large Typography class/tokens; Default colour, weight, and style remain inherited. |
| `Size / Small` | Size/rhythm | Existing same-role Small Typography class/tokens; Default colour, weight, and style remain inherited. |

An attribute can be used only where the existing Typography source supplies
that canonical selection; this decision does not authorise unsupported
role/weight combinations, duplicate resolved values, or a Navigation Weight
attribute.

## Consequences and boundaries

The former page-specific role and attributes are retired. Contextual uses
continue to map to their existing Typography roles without creating a competing
text system. Global Tokens do not establish HTML heading semantics,
layout, responsive behaviour, interaction, loading, brand customisation, or
new typography families.

Future consumers use the existing Typography selection plus the registered
Global Token attributes. They must not create parallel visual values.
