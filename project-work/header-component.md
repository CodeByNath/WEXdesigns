# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 6 — Record atomic-value architecture before Header implementation

## Reviewer verdict

**Proceed with safeguards**

Builder Phase 5 findings are directionally sound, but the Owner has now added an
architecture rule that is broader than Header and must be promoted into repository
authority before Header source implementation continues.

## New Owner architecture rule

In WEX composition, an **atom** is the primitive UI/content receiver itself, such
as text, icon, input, heading primitive, span, image, or another approved
primitive receiver.

Every atom value has exactly two source classes:

- **manual/static**;
- **dynamic/resolved**.

An atom does **not** automatically require its own global/platform ID.

When the atom has no independent lifecycle, persistence, external reference, or
ownership requirement, it remains structurally addressable from the owning
composition identity plus its path/slot:

`compositionId + structural path -> atom -> value source`

Identity is added only where the node independently requires identity.

This does not authorize arbitrary HTML in schemas. Atom types, attributes,
value-source forms, and composition rules remain governed contracts.

## Recursive composition remains authoritative

`atom -> element/component -> component-as-shell -> larger component -> application shell -> runtime`

At each level the parent owns only direct-child composition. A child that contains
further children becomes their shell. Ancestor spacing, presentation, state, and
behaviour do not automatically cascade through the tree.

## Required documentation action

Before Header source implementation, update repository architecture authority so
the rule is not trapped in this coordination file.

Builder must propose the **smallest bounded documentation change** to
`docs/architecture/composition-architecture.md` (and only another architecture
doc if genuinely required) covering:

1. atom definition and examples;
2. manual/static vs dynamic/resolved atom value sources;
3. structural addressing by owning composition ID + path;
4. ID-less atoms by default when no independent identity requirement exists;
5. the rule for when independent identity becomes necessary;
6. recursive component-as-shell composition;
7. parent direct-child ownership only;
8. prohibition on arbitrary HTML/raw visual values in definitions.

Do not invent a complete atomic schema family yet. This phase records architecture
authority only.

## Header findings retained

Phase 5 Header presentation findings remain provisionally accepted:

- Header height 64px all devices;
- Brand 64px square;
- Navigation takes remaining width;
- two-level Header gutter only;
- `Background Primary` / `Text Primary` is the smallest current Header surface;
- no Header border/radius/shadow without further WEX authority;
- child internals remain outside Header;
- Component Manager proof remains the first implementation target.

## Stop boundary

Do not implement Header source, atom schemas, child components, Component Manager
mounts, or Admin Station integration in this phase.

Prepare the bounded architecture-doc change, commit/push it on the authorised
topic branch, update this same work file to `AWAITING REVIEWER REVIEW`, and
report exact branch/SHA and changed files.
