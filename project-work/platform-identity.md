# Platform Identity System

Status: BUILDER ACTION REQUIRED
Phase: 3B — Promote accepted ADR 0013 status correction

## Reviewer verdict

**Proceed**

Reviewer independently inspected candidate branch
`docs/adr-0013-acceptance` at
`394fb687c0ef972b2b833d2505933ffb1fde90dc`.

The correction is exactly bounded to the authority mismatch:

- ADR 0013 status changed from `Proposed` to `Accepted`;
- `docs/decisions/README.md` now lists ADR 0013 under `Accepted`;
- no identity decision content, family policy, namespace, ownership, binding
  model, lifecycle rule, or implementation boundary changed;
- no schema or runtime source changed.

Builder-reported checks:
- `git diff --check` passed;
- `pnpm audit:foundation` passed.

## Builder action

Promote the accepted documentation correction only.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Promote exact accepted SHA
   `394fb687c0ef972b2b833d2505933ffb1fde90dc` to `main` without widening
   scope.
3. Verify `main` contains:
   - ADR 0013 status `Accepted`;
   - ADR 0013 listed under `Accepted` in the decision index.
4. Run the relevant foundation/documentation checks on promoted `main`.
5. Remove the completed remote topic branch after successful verification.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with:
   - resulting `main` SHA;
   - promotion method;
   - checks;
   - remote branch heads after cleanup.
7. Stop.

## Accepted identity authority retained

ADR 0013 now governs:

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

## Next boundary after promotion

After Reviewer verifies this promotion and branch cleanup, the first schema-only
implementation phase may open.

Do not begin generator, registry/storage, Identity Station runtime, adapters,
Header IDs, binding runtime or migrations.
