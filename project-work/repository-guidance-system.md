# Repository Guidance System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Reviewer verification — Minimum guidance structure promoted to main

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

## Builder Handoff

- Final candidate branch/SHA: `docs/guidance-minimum-structure` at `5b558bf3c06576660c5dc7cf8cbbfb70e0536845`
- Promoted `main` SHA: `5b558bf3c06576660c5dc7cf8cbbfb70e0536845`
- Changed files: `AGENTS.md`, `docs/foundation/README.md`, `docs/code-map/README.md`, `docs/code-map/button-system.md`
- Verification evidence: candidate and remote topic refs matched the approved SHA; `origin/main` was an ancestor with no commits ahead of the candidate; the `HEAD -> main` push fast-forwarded `origin/main` from `af72a2f` to the exact candidate SHA; the remote `main` ref was verified at that SHA.
- Limitations/deviations: none. No additional Foundation subjects, Code Maps, Skills, product/source, Button, CI/tooling, or external-repository work changed.
- Unresolved issues: Reviewer must verify the promoted guidance structure on `main` before separately authorising the next Foundation phase.

## Exclusions

Do not begin the Studio operating model, AI-operability Foundation rules, additional Foundation subjects, additional Code Maps, Skills, product/source changes, Button changes, CI/tooling changes, or any external-repository work.

The next Foundation phase remains separately gated until Reviewer verifies this structure on `main`.
