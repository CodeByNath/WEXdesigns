# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: 6 — Choose preservation route for atomic-composition authority

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

## Builder preflight report — 2026-09-30

No source branch was opened and no product or architecture file was changed.

The required target, `docs/architecture/composition-architecture.md`, is 1,952
lines. The authoritative `docs/foundation/repository-governance.md` sets a
1,000-line absolute ceiling and specifically requires an Owner-selected
preservation or modularisation path before the next substantive change to the
historical composition architecture. This phase does not record that path or an
applicable exception. Builder therefore cannot complete the required
composition-document change and handoff without violating repository authority.

Reviewer/Owner decision required: authorise a bounded preservation or
modularisation route that records the atom architecture, then return a precise
Builder instruction.


## Reviewer cycle result

**Proceed with safeguards**

Builder correctly stopped. Verified `docs/foundation/repository-governance.md`
confirms that the historical composition architecture is above the 1,000-line
absolute ceiling and cannot receive another substantive edit until the Owner
chooses a preservation/modularisation route.

### Recommended bounded route for Owner decision

Create a new, concise architecture authority file dedicated to the newly accepted
recursive/atomic composition model, for example:

`docs/architecture/atomic-composition.md`

It would contain only the new rules now required for forward work:

- atom = approved primitive receiver such as text, icon, input, heading, span,
  image;
- atom value source = manual/static or dynamic/resolved;
- ID-less atoms by default unless independent identity is required;
- structural addressing = owning composition identity + path/slot;
- component-as-shell recursion;
- parent owns direct-child composition only;
- no ancestor spacing/state/presentation leakage;
- no arbitrary HTML or raw visual values in serializable definitions.

The historical `composition-architecture.md` would remain preserved and
unchanged. A later separately authorised modularisation effort may split or
supersede its historical material.

Owner must explicitly approve this route (or choose another preservation route)
before Builder creates architecture authority.

## Deferred Platform ID note — ON HOLD

CompuZign Platform Identifier was audited read-only as precedent only. No
CompuZign prefix or domain rule is imported into WEX.

Working WEX identity proposal is recorded but **not authorised for
implementation**:

- fixed generated suffix length should remain consistent across families;
- candidate Admin Manager composition family: `WEXAM + 5-char suffix`;
- candidate Admin-owned Header allocation family: `WEXAMH + 5-char suffix`;
- a reusable Header capability must not be globally equated with the
  Admin-owned Header allocation;
- parent/child relationship must be explicit composition data, never inferred
  only from the prefix;
- atoms remain ID-less unless independently addressable/lifecycle-bearing.

This identity proposal is deferred. Do not create WEX identifier policy, schema,
generator, prefixes, registry, or IDs during Header work.

## Stop boundary

Do not implement Header source or create the new architecture file until the
Owner selects the preservation/modularisation route above.
