# Platform Identity System

Status: BUILDER ACTION REQUIRED
Phase: 4 — Implement WEX UI identity schema contracts

## Reviewer verdict

**Proceed**

Reviewer independently verified the Phase 3B promotion:

- `main` is exactly `394fb687c0ef972b2b833d2505933ffb1fde90dc`;
- ADR 0013 says `Accepted`;
- `docs/decisions/README.md` lists ADR 0013 under `Accepted`;
- the completed topic branch is removed;
- remote heads are only `main` and `Project-work-instructions`.

ADR 0013 is now usable implementation authority.

## Authorised schema-only scope

Implement the smallest strict, framework-neutral contracts in
`@weerax/schemas` for:

1. **WEX UI allocation ID**
   - closed families only: `WEXAM` and `WEXAMH`;
   - exactly five suffix characters;
   - alphabet: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`;
   - exact full-form recognition so the shared `WEXAM`/`WEXAMH` stem is
     unambiguous;
   - reject unknown families, lowercase, wrong lengths, and ambiguous/disallowed
     characters.

2. **Allocation parent/slot structure**
   - root allocation: no parent and no parent slot;
   - separately allocated direct child: both `parentAllocationId` and
     parent-owned `slot` are required together;
   - reject half-defined parent relationships;
   - relationships are explicit data, never inferred from prefixes.

3. **Platform binding**
   - strict serializable shape containing:
     `uiAllocationId`, `bindingSlot`, `platformKey`,
     `platformRecordRef`;
   - platform references remain opaque non-empty data;
   - reject callbacks, handlers, permissions, payloads, resolvers, and
     undeclared fields.

4. Public schema exports and focused deterministic tests.

## Required tests

Prove at minimum:

- valid `WEXAM + XXXXX` and `WEXAMH + XXXXX`;
- shared-prefix recognition does not misclassify `WEXAMH`;
- invalid family, length, case, `I`, `O`, `0`, `1` are rejected;
- root parent structure is valid;
- child parent+slot pair is valid;
- parent-only and slot-only structures are rejected;
- valid binding round-trips;
- binding unknown/executable fields are rejected;
- existing `EntityIdentifier`, `SemanticAction`, Button and tier contracts
  remain unchanged.

Run at least:
- `pnpm --filter @weerax/schemas check`;
- `pnpm audit:foundation`;
- `git diff --check`.

## Guardrails

Do not implement uniqueness, minting, reservation, collision handling, lookup,
reverse lookup, persistence, retirement/tombstones, Identity Station runtime,
adapters, dynamic resolution, Header IDs, migrations, or UI integration.

Do not modify `EntityIdentifier` or `SemanticAction` to absorb this identity
system.

## Handoff

Commit/push one bounded schema topic branch, then update this same file to
`AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, tests, and any
deviation. Stop for Reviewer.
