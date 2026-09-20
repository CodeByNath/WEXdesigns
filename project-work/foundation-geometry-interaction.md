# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Complete System Settings outer-state presentation before final closeout

## Reviewer Verdict

**Proceed with safeguards**

The promoted Button geometry is correct on `main` at
`94c4a99521015b17a253e695b29ba56d9cc6df2f`:

- ordinary Button boundary = WEX Default structural border `1px`;
- ordinary Button radius = Default `8px` across Small / Default / Large;
- Focused geometry = independent `2px` outer ring + `2px` gap;
- ordinary command Button remains non-selectable.

The remaining live issue is presentation coverage, not foundation authority.

## Verified showcase gap

`apps/web-runtime/index.html` renders only ordinary Button size/variant samples plus Disabled.

- Focus exists only through native `:focus-visible`, so the ring is visible only while keyboard focus is actually on a Button.
- No persistent Focused specimen is rendered.
- No Selected specimen is rendered anywhere.
- Selected must NOT be fabricated on ordinary command Button because ADR 0005 keeps ordinary Button non-selectable.

Therefore System Settings does not visibly communicate the accepted outer-state geometry as a design-system reference.

## Builder correction

Complete this in the existing System Settings showcase only as needed:

1. Add a visible **Focused** presentation specimen that demonstrates:
   - existing 1px component boundary;
   - independent 2px outer ring;
   - 2px gap;
   - no layout shift.
2. Add a visible **Selected** foundation/state specimen demonstrating the same reusable outer-ring geometry.
   - Do not add Selected state to ordinary command Button.
   - Present it as reusable WEX state geometry or another clearly non-ordinary-Button specimen already supported by authority.
   - Do not invent a Toggle Button implementation or schema in this phase.
3. The showcase must consume existing WEX geometry/colour tokens; it must not create a second presentation authority or hard-code replacement visual values.
4. Preserve native keyboard `:focus-visible` behavior on the actual Button examples.
5. Add/update deterministic runtime tests so the showcase cannot silently lose the Focused/Selected specimens.
6. Validate light/dark, compact/200% zoom, keyboard focus, and no layout shift.
7. Push the correction on the same topic branch and hand back this same work file as `AWAITING REVIEWER REVIEW` with exact SHA/evidence.

Do not alter Button authority, schemas, shared UI contracts, ordinary Button state semantics, or begin another component family.

After this presentation correction is reviewed, promoted, deployed, and visually confirmed, this work area can close and the topic branch can be deleted.
