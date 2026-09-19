# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote accepted WEX Foundation Code Maps to main

## Reviewer Verdict

**Proceed**

Reviewer independently inspected `docs/wex-foundation-code-maps` at `d02a5f33d224c74b1df6dce8ef3e89a2bbd370c2` against current `main`, ADR 0009, repository architecture, historical WEX authority, current WEX source, schema tier contract, focused tests, and the Foundation audit.

## Review result

The candidate is one commit ahead of `main`, zero behind, and changes only:

- `docs/code-map/README.md`
- `docs/code-map/colour.md`
- `docs/code-map/typography-font-delivery.md`
- `docs/code-map/spacing.md`
- `docs/code-map/interaction-focus.md`
- `docs/code-map/layout.md`
- `docs/code-map/sizing-tier-system.md`

Accepted findings:

- every new map is for a demonstrated current WEX subject;
- verification metadata points to the audited `main` SHA;
- maps link to authority/source/checks rather than duplicating token values or contracts;
- spacing correctly treats padding/gap as consumers of the spacing authority rather than separate token systems;
- interaction/focus preserves the WEX presentation boundary and separates runtime/domain behaviour;
- sizing/tiering is justified by historical authority, the value-free WEX sizing boundary, the serializable tier schema, consumers, and checks;
- no unsupported Geometry/Border/Radius map was created;
- no source, Button map, schemas, UI, runtime, CI/tooling, Foundation rules, ADRs, or external repositories changed.

## Builder action — promotion only

Promote the exact accepted candidate `d02a5f33d224c74b1df6dce8ef3e89a2bbd370c2` to `main` by fast-forward only.

Requirements:

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify the remote topic branch still resolves to the exact accepted SHA.
3. Verify `origin/main` remains an ancestor of that candidate with no intervening divergence.
4. Fast-forward `main` to that exact SHA. Do not amend, rebase, squash, or add changes.
5. Verify remote `main` resolves to the exact accepted SHA.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with promotion evidence and stop.

Do not begin Button map integration yet.

## Exclusions

Do not modify WEX source, Button source/map, schemas, UI, adapters, applications, CI/tooling, Foundation rules, ADRs, or external repositories.
