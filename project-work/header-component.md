# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 7 — Promote accepted atomic-composition authority

## Reviewer verdict

**Proceed**

Reviewer independently inspected candidate branch
`docs/atomic-composition-authority` at
`d1657a49785df63dbf566497a57c4873ba97569b`.

The candidate matches the authorised Phase 6 scope.

Accepted files:

- `docs/architecture/atomic-composition.md` — 67 lines;
- `docs/architecture/README.md` — routes the new authority.

Verified content records:

- governed primitive atoms;
- manual/static vs dynamic/resolved value sources;
- ID-less atoms by default;
- composition identity + structural path/slot addressing;
- recursive component-as-shell composition;
- direct-child ownership only;
- no automatic ancestor spacing/presentation/state/behaviour cascade;
- allowed direct-child types plus minimum/maximum direct-child count;
- child-count limits apply only to the direct composition boundary;
- no arbitrary HTML or raw visual values;
- no atom schema, Header implementation, or Platform ID implementation.

The historical `composition-architecture.md` remains untouched.

Remote branch capacity is currently exactly three:
`main`, `Project-work-instructions`, and
`docs/atomic-composition-authority`.

## Builder action

Promote the accepted documentation candidate only.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward/sync as required.
3. Promote exact accepted SHA
   `d1657a49785df63dbf566497a57c4873ba97569b` to `main` without widening
   scope or altering the accepted files.
4. Verify `main` contains the exact accepted documentation.
5. Run the relevant documentation/foundation checks against promoted `main`.
6. Remove the completed remote topic branch after successful verification.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with:
   - resulting `main` SHA;
   - promotion method;
   - checks;
   - remote branch heads after cleanup.
8. Stop.

Do not begin Header source implementation in this phase.

## Next boundary after promotion

Once Reviewer verifies promotion and branch cleanup, work returns to the
interrupted Header declaration/Component Manager proof.

Retained Header direction:

- Header 64px all devices;
- Brand 64px square;
- Navigation takes remaining width;
- two-level Header gutter only;
- Header owns its WEX shell presentation, not child internals;
- LocationLabel >=768px / SidebarTrigger <=767px is component selection;
- nested components own their own direct-child contracts;
- Component Manager proof precedes Admin Station integration.

## Platform ID — still on hold

The recorded `WEXAM` / `WEXAMH` direction remains deferred to the next
dedicated identity work. Do not implement identifiers during Header work.
