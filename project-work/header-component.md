# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 6 — Record atomic composition authority, then return to Header

## Reviewer verdict

**Proceed with safeguards**

Owner has resolved the documentation gate. Do not edit the oversized historical
`docs/architecture/composition-architecture.md`.

Create a concise current architecture entry/index for the new recursive atomic
model. If the subject later needs more detail, split it into bounded child
documents/maps. No special Owner file-size exception is required while normal
repository limits are respected.

## Atomic composition authority to record

The new authority must state:

- an atom is an approved primitive receiver such as text, icon, input, heading,
  span, image, or equivalent governed primitive;
- atom values have two source classes only: manual/static or dynamic/resolved;
- atoms are ID-less by default unless independent lifecycle, persistence,
  external reference, ownership, or independent addressing requires identity;
- an ID-less atom is addressed through owning composition identity + structural
  path/slot;
- serializable definitions do not permit arbitrary HTML or raw visual values;
- composition is recursive:
  `atom -> element/component -> component-as-shell -> larger component -> application shell -> runtime`;
- every parent owns only its direct-child composition;
- a child containing further children becomes their shell;
- ancestor spacing, presentation, state, and behaviour do not automatically
  cascade through descendants;
- every composition contract may declare allowed direct-child types plus
  minimum/maximum direct-child count;
- child-count limits apply only at that direct composition boundary, not
  recursively to descendants.

Do not invent a complete atom schema family yet. This phase records architecture
authority only.

## Header state retained

After the architecture note is accepted, return to the interrupted Header work.
Retained Header direction:

- 64px Header on all devices;
- 64px square Brand;
- Navigation consumes remaining width;
- two-level Header gutter only;
- Header owns its own WEX surface, not child internals;
- LocationLabel >=768px / SidebarTrigger <=767px is slot selection;
- Search, PrimaryNavigation, MainAction and nested children own their own
  internal contracts;
- Component Manager remains the first Header proof target;
- Admin Station integration remains later.

## Platform ID — deferred to next work

The WEX Platform ID direction is recorded but intentionally **on hold** until
this atomic-composition documentation and Header declaration work reaches its
phase boundary.

Do not implement prefixes, generator, registry, schemas, IDs, or allocation
logic in this Header phase. The next dedicated identity work may revisit the
recorded `WEXAM` / `WEXAMH` proposal and CompuZign precedent independently.

## Builder action

1. Add the smallest bounded architecture index/note for the rules above.
2. Add child documentation only if required to keep the authority concise.
3. Update the relevant Code Map/navigation if the new authority needs routing.
4. Run documentation checks.
5. Commit/push the architecture-only change.
6. Update this file to `AWAITING REVIEWER REVIEW` with exact branch/SHA,
   changed files, and checks.
7. Stop.

No Header source, atom schemas, child components, Platform ID implementation,
Component Manager mount, or Admin Station integration in this phase.
