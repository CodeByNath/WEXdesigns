# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 4A — Define platform-registration identity generation + bootstrap authority

## Reviewer verdict

**Proceed with safeguards**

Phase 3 is fully accepted, promoted, and closed.

Reviewer independently verified:

- remote `main` is exactly
  `fa66bf6ce3c24d8d83c373f3025f429d1533d847`;
- the accepted local-folder adapter is present on `main`;
- the completed Phase 3 topic branch is deleted;
- remote heads are exactly `main` and `Project-work-instructions`;
- Phase 3 ownership and persistence safeguards remain intact.

A minor authority bookkeeping inconsistency also exists:
`docs/architecture/repository-map.md` still says the local-folder adapter and
storage contract are deferred even though both are now accepted/promoted.
Correct that wording in this phase without changing architecture substance.

## Phase 4 objective

Implement the WEX Identity Plugin + Tool initialization/bootstrap flow:

```text
detect
  -> absent
  -> approval-required
  -> explicit approval
  -> WEX creates platform-registration identity
  -> adapter creates isolated WEX space
  -> persist registration
  -> ready
```

For an existing valid space:

```text
detect present
  -> read registration
  -> validate same WEX registration identity
  -> ready
```

But executable bootstrap cannot begin until the concrete generation contract for
`wexPlatformRegistrationId` is authorised.

## Phase 4A architecture gate

The accepted authority says:

- the WEX Plugin + Tool creates/validates the registration identity;
- adapters and hosts do not generate it;
- it is immutable, durable and non-reusable for that identity space;
- its concrete format is deliberately unresolved.

Therefore the Builder must **not** silently choose UUID, random string, host ID,
Admin Manager ID, or a new WEX prefix in runtime code.

## Builder instruction — Phase 4A only

Create one topic branch from current `main`.

Docs/architecture/schema work only as necessary to resolve and record:

1. the concrete WEX platform-registration identifier format/generation rule;
2. uniqueness scope and collision behavior;
3. validation rule;
4. whether it has its own closed family/prefix or another explicitly authorised
   WEX-owned opaque format;
5. proof that it is separate from:
   - `platformKey`;
   - Admin Manager `WEXAM...`;
   - component/allocation IDs;
   - host/domain IDs;
6. initialization state-machine contract:
   - absent -> approval-required;
   - no persistent mutation before explicit approval;
   - approval -> generate registration ID -> create space -> persist;
   - present valid space -> read/validate -> ready;
   - damaged/inconsistent space -> fail closed, never recreate automatically;
7. repeat-safe/idempotent bootstrap behavior;
8. what happens when creation partially fails after approval but before ready;
9. no credentials/secrets in persisted registration records.

Do not implement the Plugin/Tool runtime yet unless the identifier generation
authority is already explicitly present in accepted repository authority. If it
is not, record the proposed decision and stop for Reviewer.

Also update the stale repository-map defer wording to reflect the already
accepted/promoted storage contract and local-folder adapter.

### Explicit exclusions

Do not:
- modify the local-folder adapter semantics;
- modify PostgreSQL Station;
- add WordPress/MySQL/API adapters;
- mint real Admin/Header/component allocations;
- resume Header work;
- add approval UI;
- add host business/domain records;
- invent product permissions or authentication.

Run applicable checks including `pnpm audit:foundation`, schema checks if
schemas change, and `git diff --check`.

Push the candidate, update this same file to
`AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, evidence, and
any unresolved architecture decision, then stop.

## Locked roadmap

- Phase 4B — implement Plugin/Tool bootstrap against the accepted registration
  identity rule and local-folder adapter.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until all Phase 4 bootstrap work is accepted and
promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
