# Platform Identity System

Status: AWAITING REVIEWER REVIEW
Phase: 3A — Finalise ADR 0013 acceptance state

## Reviewer verdict

**Stop — architectural risk**

The Phase 3 promotion itself is verified:

- `main` is exactly `b0c041f2a2155049bbfe6b8d97e49d2a170d9032`;
- `docs/architecture/platform-identity.md` is present on `main`;
- ADR 0013 is present on `main`;
- architecture and decision indexes route the new documents;
- the completed topic branch has been removed;
- remote heads are only `main` and `Project-work-instructions`.

However, repository authority is internally inconsistent after promotion.

## Blocking authority mismatch

`docs/decisions/0013-wex-ui-platform-identity.md` still says:

`Proposed — architecture authority only`

and `docs/decisions/README.md` still lists ADR 0013 under **Proposed**.

The Reviewer has accepted the architecture, so implementation must not begin
while repository authority still records the decision as proposed.

## Builder correction

Create one bounded documentation-only topic branch and:

1. change ADR 0013 status from Proposed to **Accepted**;
2. move ADR 0013 from **Proposed** to **Accepted** in
   `docs/decisions/README.md`;
3. do not alter the accepted identity decision text, family policy, ownership,
   namespace, binding model, or implementation boundary;
4. run `git diff --check` and `pnpm audit:foundation`;
5. commit/push the exact correction;
6. update this same work file to `AWAITING REVIEWER REVIEW` with branch/SHA,
   changed files and checks;
7. stop.

## Accepted identity authority retained

Once the status mismatch is corrected, ADR 0013 establishes:

- one centralized WEX UI Identity Authority / Station;
- closed WEX UI family vocabulary;
- fixed five-character uppercase unambiguous Base32 suffix;
- `WEXAM + XXXXX` for Admin Manager allocations;
- `WEXAMH + XXXXX` for Admin Header allocations;
- immutable reserved non-reused allocation IDs;
- explicit parent/slot relationships;
- explicit platform/domain bindings;
- WEX UI identity separate from platform/domain identity;
- schemas own serializable contracts only;
- primitive atoms remain ID-less unless independent identity is required.

## Stop boundary

Do not start schema implementation until ADR 0013 is explicitly Accepted in
repository authority.

No generator, registry/storage, Identity Station runtime, adapters, Header IDs,
bindings runtime or migrations are authorised.

## Builder handoff — 2026-10-01

Candidate: `docs/adr-0013-acceptance` at
`394fb687c0ef972b2b833d2505933ffb1fde90dc`.

Changed only `docs/decisions/0013-wex-ui-platform-identity.md` (status:
`Accepted`) and `docs/decisions/README.md` (ADR 0013 moved under `Accepted`).
No accepted decision content, family policy, ownership, namespace, binding
model, or implementation boundary changed. `git diff --check` and
`pnpm audit:foundation` passed. No schema or runtime source changed.
