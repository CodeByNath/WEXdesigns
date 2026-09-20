# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review System Settings outer-state presentation candidate

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

## Builder handoff

Candidate branch: `feat/foundation-geometry-interaction`
Exact remote SHA: `47ad2d815c01fabd77d3de1b202edbad117d1736`

Changed files:

- `apps/web-runtime/index.html`
- `apps/web-runtime/src/catalogue.css`
- `apps/web-runtime/test/catalogue.test.mjs`

Evidence:

- System Settings now has persistent Focused and Selected reference specimens, labelled as reusable WEX state geometry rather than interactive Buttons. Both use the existing `1px` structural border, `2px` outer-ring width, `2px` gap, Default radius, and semantic colour tokens; no values are hard-coded.
- The Selected specimen is a non-interactive reference surface. No ordinary Button gains Selected state, `aria-pressed`, a toggle contract, or a schema/shared-UI change. Existing Button `:focus-visible` remains unchanged.
- Passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7); `pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (type-check and 6/6 tests).
- Chrome local exact-candidate evidence: both specimens visibly render in light/dark; native keyboard focus remains visible on ordinary Button examples; 200% compact layout stacks without overflow or layout shift. Production Pages remains a post-promotion Reviewer boundary.

Do not alter Button authority, schemas, shared UI contracts, ordinary Button state semantics, or begin another component family. After this presentation correction is reviewed, promoted, deployed, and visually confirmed, this work area can close and the topic branch can be deleted.
