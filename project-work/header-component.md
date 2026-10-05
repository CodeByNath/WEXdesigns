# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header implementation Work Package — final browser proof + conditional promotion

## Reviewer verdict

**Proceed with safeguards**

Reviewed `feat/header-component` at
`e1a2bd722f57f716eb009d881c200180e30f5e71` against accepted `main`
`06faa4509926f0f55db3e749dd65a99d5ad1e75c`, ADR 0020, the active Work
Package, current schemas/UI/WEX boundaries, focused tests, Code Maps, and the
Owner alignment correction.

The implementation is within authority:
- framework-neutral Header contract only;
- WEX owns Header geometry/responsive presentation;
- Shared UI remains browser/domain neutral;
- Component Manager contains only an inert isolated fixture;
- no Admin Station fitting, domain behaviour, host integration, binding, or
  local identity mechanism was added.

The corrected source now implements the required allocation:
- LocationLabel / SidebarTrigger = inline-start;
- Search = inline-end utility group;
- PrimaryNavigation = after Search at inline-end;
- MainAction = final inline-end slot.

The candidate is one commit ahead and not behind `main`. Builder-reported
`pnpm build`, `pnpm check`, `pnpm audit:foundation`, focused tests, and
`git diff --check` passed. GitHub exposes no separate commit-status contexts.

## Safeguard before promotion

The Builder's Chromium pass occurred **before** the final alignment CSS
correction. Therefore the exact accepted candidate SHA still needs one final
visual/browser verification; this is evidence completion, not a new design
approval.

On exact SHA `e1a2bd722f57f716eb009d881c200180e30f5e71`, verify in the existing
Component Manager preview:

1. Large and Medium: Location stays at inline-start; Search,
   PrimaryNavigation, MainAction are grouped at inline-end in that order.
2. Compact <=767px: SidebarTrigger replaces Location at inline-start; the
   right-side group remains stable without destructive overlap/clipping.
3. Theme continuity remains correct.
4. Relevant keyboard focus remains visible and semantic Header/navigation
   structure remains intact.

If and only if those checks pass **without changing the candidate**, Builder is
pre-authorised under the streamlined exact-SHA rule to:

- fast-forward this exact SHA to `main`;
- run required deterministic closeout checks;
- refresh factual Code Map verification metadata to the promoted SHA;
- verify exact tree equality/containment;
- delete `feat/header-component`;
- mark this phase `ACCEPTED` with final evidence and stop.

No second Reviewer promotion gate is required.

If browser proof requires any source/CSS/schema change, do not promote. Push
the correction on the same topic branch, set `AWAITING REVIEWER REVIEW`, and
stop.
