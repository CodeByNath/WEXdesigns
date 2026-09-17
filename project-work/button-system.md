# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1A — Button contract and WEX presentation foundation

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` at `fd3c6e791ae1bb77a00ca1eb6130df788d9c7e4d` contains the accepted `docs/decisions/0005-button-authority.md` exactly as reviewed. The move from prior `main` changes only that ADR.

Button authority is therefore established on `main`.

## Authorised Builder Scope

Create one topic branch from current `origin/main` and implement only the first technical Button slice:

- serializable Button schema using the closed variants `primary | neutral | subtle | warning | danger`;
- ordinary Button state contract only: default, hover, transient pressed, disabled, focus;
- WEX-owned Button component-semantic colour/state tokens and presentation rules matching ADR 0005;
- platform-neutral shared UI presentation/resolution needed to consume that Button contract;
- focused tests for schema, WEX Button presentation, shared UI boundary, and accessibility-state mechanics;
- minimum foundation-audit change required to allow **Button only** while continuing to reject unauthorised component families.

The preserved `review/button-local-recovery` branch may be used as implementation evidence, but do not cherry-pick it wholesale. Retain only code that conforms to accepted authority.

## Required Safeguards

- Do not serialize `secondary` or `ghost`; use `neutral` and `subtle` only.
- Add `warning`.
- Do not use `aria-pressed` or persistent selected behaviour for ordinary Button.
- Shared/UI consumer code must consume Button semantic tokens; no raw primitives or theme selectors there.
- Do not invent Button geometry in this slice: no new padding, radius, dimensions, tier-to-size mappings, or typography values beyond already-authorised generic mechanics.
- No runtime preview, catalogue work, GitHub Pages integration, adapters, domain behaviour, icons, toggle Button, Link Button, Dropdown Button, Button Group, or other component family.
- Do not modify `WEX-SOURCE.md`.

## Verification / Handoff

Run the deterministic checks required by the touched packages plus repository `pnpm check` under the repository-supported Node version. If the local runtime is below the declared Node requirement, obtain valid Node 24 verification before handoff.

Push the topic branch to `origin`, verify the remote SHA, then update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA, exact changed files, tests/checks, Node version, and any unresolved issue. Stop for Reviewer.

No runtime or Pages deployment is authorised in this slice.
