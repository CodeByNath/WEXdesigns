# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header authority acceptance, promotion, and closeout

## Reviewer verdict

**Proceed**

Reviewed corrected candidate `docs/header-component-authority` at
`bbe2bfdde220e2bc17d7d7929a37b4125461c395` against `main`
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.

The governance correction is complete. ADR 0020 is now proposed rather than
self-accepted; the decisions index and affected Code Maps describe it as a
candidate; verification metadata points to the correct current `main`
baseline.

The substantive Header authority is accepted. It preserves the Owner-approved
plan without widening architecture: reusable Header family; recursive
direct-child ownership; 64px Header and Brand allocation; 16px/8px
Large/Medium gutters; 8px/8px compact gutters; existing <=767px responsive
replacement boundary; child-owned Search and PrimaryNavigation modes; one
MainAction slot; schema/WEX/Shared UI/application separation; and reusable
Header capability separate from concrete `WEXAMH` allocation identity.

Existing WEX source confirms the referenced spacing tokens and compact
breakpoint. No new global spacing scale, breakpoint, host/domain authority, or
identity mechanism is introduced.

## Builder instruction

Complete the acceptance and promotion as one bounded closeout transaction.

1. On the same `docs/header-component-authority` branch, change only acceptance
   metadata/evidence:
   - ADR 0020 status -> `Accepted`;
   - move ADR 0020 from Proposed to Accepted in the decisions index;
   - update affected Code Map wording from submitted/proposed candidate to
     accepted Header authority;
   - refresh verification metadata to the final accepted candidate/main
     relationship as appropriate.
2. Do not change Header architecture, values, slots, ownership, schema design
   boundary, identity separation, or exclusions.
3. Run `pnpm audit:foundation` and `git diff --check`.
4. Push the acceptance-metadata commit and verify the remote branch SHA.
5. Fast-forward `main` to that exact final candidate SHA.
6. Verify remote `main` exactly matches the final accepted candidate and the
   promoted diff contains only the already-reviewed authority plus acceptance
   metadata.
7. Prove containment, then delete `docs/header-component-authority`.
8. Confirm remote heads return to only `main` and
   `Project-work-instructions`.
9. Update this same file to `AWAITING REVIEWER REVIEW` with the exact final
   SHA, checks, promotion/diff evidence, and branch-deletion evidence.
10. Stop.

Do not begin Header schema/source implementation, WEX CSS, child components,
Component Manager mount, Global Components registration, Admin Station fitting,
or host integration during this closeout.
