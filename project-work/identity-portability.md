# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4B — Work Package correction: portable identity bootstrap

## Reviewer verdict

**Stop — architectural risk**

Candidate reviewed:
`feat/identity-bootstrap` at
`c470b11bf59f8e33c42996b72d6bf54cdc7503fc`.

The package is structurally sound and stays inside the approved
`@weerax/identity` boundary, but three identity-safety defects must be fixed
before promotion.

## Required corrections

### 1. Existing-space platform mismatch must fail closed

On `detectSpace() === 'present'`, bootstrap currently validates only the
persisted record shape and returns `ready`.

The invocation already supplies `platformKey`. If the durable registration
belongs to a different `platformKey`, that is an observed registration
mismatch and must fail closed rather than silently returning another host's WEX
identity space.

Add deterministic proof for:
- present + matching platformKey -> ready;
- present + different platformKey -> failure;
- no mutation or ID generation in either reopen path.

### 2. Production callers must not be able to downgrade CSPRNG guarantees

ADR 0018 requires the Plugin + Tool to obtain independent uniform five-bit
values from a cryptographically secure random source.

The public exported API currently exposes `randomBytes` injection through
`WexIdentityBootstrapOptions` and through
`generateWexPlatformRegistrationId(randomBytes)`, allowing a production caller
to supply an insecure deterministic source.

Keep deterministic testability without making insecure entropy selection part
of the public production contract. Use an internal/test-only seam or another
bounded mechanism that preserves ADR 0018's mandatory CSPRNG guarantee.

### 3. Remove stale authority contradiction

`docs/architecture/portable-identity-storage-contract.md` still states that
the concrete `wexPlatformRegistrationId` format is deliberately unresolved.

ADR 0018 has already resolved it. Update that architecture text to route to the
accepted WEXPR format without changing the semantics.

## Preserve

Do not widen the package. Keep:

- `@weerax/identity` depending internally only on `@weerax/schemas`;
- concrete local-folder adapter usage in tests only;
- adapters persistence/atomicity-only;
- one-ID-per-invocation behavior;
- exact readback/create-failure semantics;
- all Phase 4B hard exclusions.

## Required evidence

Push the correction on the same topic branch and report:

- exact new SHA and changed-file list;
- `pnpm audit:foundation`;
- `pnpm --filter @weerax/identity check`;
- relevant schema/adapter tests;
- `pnpm check`;
- `git diff --check`;
- explicit tests for matching/mismatched present-space `platformKey`;
- evidence the public production API cannot select a non-CSPRNG entropy source.

Return this file to `AWAITING REVIEWER REVIEW` after remote verification.

No Owner decision is required. This remains the same Phase 4B Work Package.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.
