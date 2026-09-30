# Platform Identity System

Status: BUILDER ACTION REQUIRED
Phase: 3 — Promote accepted WEX UI identity architecture

## Reviewer verdict

**Proceed**

Reviewer independently inspected candidate branch
`docs/platform-identity-architecture` at
`b0c041f2a2155049bbfe6b8d97e49d2a170d9032`.

The Phase 2A correction resolves the issuer contradiction.

Accepted architecture now establishes:

- one authoritative WEX UI Identity Authority / Station owns the WEX UI
  allocation namespace;
- applications/products request and consume identities but do not mint
  disconnected local IDs;
- allocation IDs are immutable and globally unique within the namespace owned by
  that single authority;
- the authority alone owns family validation, minting, reservation, collision
  rejection, non-reuse, lookup, and required reverse lookup/tombstones;
- `@weerax/wex` remains presentation authority;
- `@weerax/schemas` owns serializable identity/parent/binding validation only;
- adapters map WEX allocations to opaque platform/domain references;
- platforms/domains retain business/data identity and lifecycle authority;
- reusable definition identity, WEX allocation identity, platform/domain
  identity, and binding/reference remain distinct;
- parent/child relationships and platform bindings are explicit data, never
  prefix-derived;
- primitive atoms remain ID-less unless independent identity is required.

Accepted family policy:

- closed WEX UI family vocabulary;
- fixed five-character suffix;
- uppercase unambiguous Base32 alphabet;
- initial Admin Manager family: `WEXAM + XXXXX`;
- initial Admin Header allocation family: `WEXAMH + XXXXX`;
- exact full-form family recognition is required.

The candidate changes only architecture/decision documentation. No schema,
generator, registry/storage, runtime service, adapter, Header ID, or migration
was introduced.

Builder-reported checks:
- `git diff --check` passed;
- `pnpm audit:foundation` passed.

## Builder action

Promote the accepted documentation candidate only.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Promote exact accepted SHA
   `b0c041f2a2155049bbfe6b8d97e49d2a170d9032` to `main` without widening
   scope.
3. Verify `main` contains the accepted architecture note, ADR 0013, and index
   routing.
4. Run the relevant foundation/documentation checks on promoted `main`.
5. Remove the completed remote topic branch after successful verification.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with:
   - resulting `main` SHA;
   - promotion method;
   - checks;
   - remote branch heads after cleanup.
7. Stop.

## Next boundary after promotion

After Reviewer verifies promotion, the next work phase may define the first
strict schema contracts/tests for WEX UI allocation IDs, explicit parent/slot
relationships, and serializable platform bindings.

Do not begin Identity Authority / Station runtime implementation, persistence,
generator/registry, adapters, Header IDs, or migrations until separately
authorised.
