# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 4A — Platform-registration authority proposal submitted

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

## Builder handoff — Phase 4A

Candidate: `docs/platform-registration-bootstrap-authority` at
`b68b691da4548a6509a43c0f79eb328338d68a8b` (pushed and remote-verified).

Changed only:

- `docs/decisions/0018-wex-platform-registration-bootstrap-contract.md`
- `docs/decisions/README.md`
- `docs/architecture/repository-map.md`

Proposed ADR 0018 defines a distinct `WEXPR-` registration form, 130-bit
CSPRNG generation, strict validation, collision boundary, approval-gated
bootstrap state machine, idempotent reopen, partial-failure readback, and the
no-secrets/no-host-domain-data boundary. The repository map now records that
the accepted storage contract and local-folder adapter are implemented.

Evidence passed: `pnpm audit:foundation` and `git diff --check`. No schema
check applies because no schema changed. No runtime or browser validation
applies because this is documentation-only.

Unresolved architecture decision: ADR 0018 is **Proposed**, not accepted.
Reviewer acceptance is required before any strict schema or Plugin + Tool
bootstrap implementation. No Phase 4B work has begun.

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
