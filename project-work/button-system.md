# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1 — Prepare accepted Button authority candidate

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `docs/button-authority-proposal` at `610b1abcd9e383d7e747315561fb26a9ee5c5aa4` against current `main` `0af842c66028f48659d74c870186a74deff4031c` and repository authority.

The proposal is correctly limited to one ADR file and resolves the five required decisions without modifying implementation.

Reviewer accepts the proposed Button contract direction:

- serialized variants: `primary | neutral | subtle | warning | danger`;
- states: default, hover, transient pressed, disabled, focus;
- `aria-pressed` is excluded from ordinary Button and reserved for a future toggle contract;
- exact Light/Dark mappings are defined;
- component-semantic Button tokens are required;
- audit expansion remains Button-only and separately authorised;
- preserved recovery implementation remains evidence only.

## Safeguards

1. The accepted ADR supersedes historical `Secondary`/`Ghost` Button naming with `Neutral`/`Subtle` and adds `Warning`; implementation must not retain both serialized vocabularies.
2. The chromatic Light values used for pressed may match values previously used by global `Selected`, but Button implementation must expose **pressed semantics**. Do not make ordinary Button depend on `aria-pressed` or treat pressed as persistent selected state.
3. Button component tokens may resolve to approved WEX primitive values, but consumer/shared rendering code must consume Button semantic tokens rather than raw primitives or theme selectors.
4. This approval is authority-only. It does not approve the preserved schema/CSS/UI/runtime implementation.
5. Geometry, icons, toggle behaviour, catalogue work, and runtime integration remain outside this authority acceptance unless separately authorised.

## Authorised Builder Action

Prepare the minimum accepted-authority candidate from the reviewed proposal only:

- change ADR status from `Proposed` to `Accepted`;
- rename the ADR to the durable decision name `docs/decisions/0005-button-authority.md` if needed for repository convention;
- preserve the reviewed decision content and safeguards; do not introduce new Button decisions;
- do not change schemas, WEX CSS, UI, runtime, catalogue, tests, audit tooling, or `WEX-SOURCE.md`;
- push the authority branch to `origin`;
- verify the remote SHA;
- update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA and exact changed files;
- stop for Reviewer.

After the accepted ADR candidate is independently verified, Reviewer will decide whether Slice 1 implementation may begin and which portions of `review/button-local-recovery` can be reused.
