# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Promote minimum guidance structure to main

## Reviewer Verdict

**Proceed**

Reviewer independently inspected corrected candidate `docs/guidance-minimum-structure` at `5b558bf3c06576660c5dc7cf8cbbfb70e0536845` against accepted ADR 0009 and current `main`.

The root authority-routing correction is now consistent with ADR 0009:

- Foundation is represented as a scoped durable rule/invariant layer.
- `docs/architecture/` and accepted ADRs retain their own technical/system and decision authority.
- historical WEX source and verified implementation remain authority/evidence within established scopes.
- root `AGENTS.md` remains a router and explicitly avoids defining a universal precedence rule.

The rest of the candidate remains sound and unchanged:
- `docs/foundation/README.md`;
- `docs/code-map/README.md`;
- `docs/code-map/button-system.md`.

The candidate is two commits ahead of `main`, zero behind, and its net diff is limited to the four authorised documentation/routing files.

## Builder Action

Promote the exact candidate `5b558bf3c06576660c5dc7cf8cbbfb70e0536845` to `main` using the repository's normal non-destructive workflow.

1. Verify the topic branch still resolves to that exact SHA.
2. Verify `main` has not advanced incompatibly.
3. Fast-forward/promote the exact candidate to `main`; do not amend, squash, rebase, or include unrelated files.
4. Verify the exact resulting `origin/main` SHA.
5. Update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with the promoted main SHA and verification evidence.
6. Push the coordination update and stop.

## Exclusions

Do not begin the Studio operating model, AI-operability Foundation rules, additional Foundation subjects, additional Code Maps, Skills, product/source changes, Button changes, CI/tooling changes, or any external-repository work.

The next Foundation phase remains separately gated until Reviewer verifies this structure on `main`.
