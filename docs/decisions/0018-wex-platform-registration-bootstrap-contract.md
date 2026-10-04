# 0018: WEX Platform Registration Bootstrap Contract

## Status

Accepted — Phase 4A architecture authority. It changes no schema, adapter, Plugin +
Tool runtime, host integration, allocation, Header, or UI.

## Context

Accepted ADR 0016 assigns platform-registration and initialization authority to
the portable WEX Identity Plugin + Tool. Accepted ADR 0017 makes one durable
`wexPlatformRegistrationId` the first part of every portable allocation
address, but deliberately leaves its format unresolved. The local-folder
adapter is now an accepted persistence-only reference implementation; it must
continue to receive, not generate, the registration record.

Bootstrap implementation cannot safely choose a UUID, host identifier, or new
prefix implicitly. This proposal supplies the missing concrete contract without
making `platformKey`, an Admin Manager allocation, a component ID, or a host
domain ID into WEX registration identity.

## Decision

### Registration identifier

The WEX Identity Plugin + Tool generates a registration identifier only after
explicit approval, in this exact form:

```text
WEXPR-<26 uppercase unambiguous Base32 characters>
```

The suffix alphabet is the existing allocation alphabet:

```text
ABCDEFGHJKLMNPQRSTUVWXYZ23456789
```

It contains exactly 32 symbols: 24 permitted uppercase letters and the eight
digits `2`–`9`. No symbol is added, removed, or substituted for registration
generation.

The exact validation rule is:

```text
^WEXPR-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{26}$
```

`WEXPR-` is a closed registration prefix, not an allocation family. It is
therefore distinct from `WEXAM...`, `WEXAMH...`, `platformKey`, component IDs,
and every host/domain identifier. Registration validation remains strict and
serializable; it must reject wrong prefixes, case, length, alphabet, and
undeclared fields.

### Generation, uniqueness, and collision boundary

For a new approved identity space, the Plugin + Tool obtains 26 independent,
uniform five-bit values from a cryptographically secure random source. Each
value from `0` through `31` maps one-to-one, in alphabet order, to the 32
symbols above. This produces an unbiased uniform suffix over exactly `32^26`
possible values (130 bits of entropy). The resulting suffix is opaque: it
carries no host, user, domain, timestamp, placement, allocation-family, or
lifecycle meaning.

Its scope is portable across WEX identity spaces. No global registry or
mandatory backend is introduced; the CSPRNG value provides collision resistance
across isolated hosts. The adapter's create-if-absent boundary still prevents a
second registration in the target identity space. If that space is already
present, the Plugin + Tool reads and validates its durable registration instead
of generating, replacing, or retrying a registration ID. An observed
registration mismatch or damaged space fails closed; it is not repaired by
generating another ID.

### Bootstrap state machine

```text
detect absent -> approval-required -> explicit approval
  -> generate WEXPR identifier in memory
  -> adapter create space with supplied registration
  -> read back and validate that exact registration
  -> ready

detect present -> read and validate durable registration -> ready
detect damaged/inconsistent -> fail closed
```

Detection and `approval-required` cause no persistent mutation. The generated
identifier, `platformKey`, and `registeredAt` form the sole supplied
registration record; the adapter persists that strict record and never creates
or replaces it.

One bootstrap invocation generates at most one identifier. If creation reports
failure after approval, it may perform a non-mutating readback only: the exact
generated registration read back is `ready`; an absent space reports failure
and requires a new explicit approval; a damaged, mismatched, or unreadable
space fails closed. It must not silently recreate, overwrite, or mint a second
identifier during that invocation. Repeated bootstrap against a valid present
space is idempotent: it reads the same registration and returns `ready`.

The registration record contains no credential, token, secret, host business
record, permission, callback, resolver, or executable payload.

## Consequences and next boundary

If accepted, the next authorised implementation may add the matching strict
schema validation and Plugin + Tool bootstrap proof against the accepted
local-folder adapter. It must demonstrate approval gating, no mutation before
approval, exact readback, repeat-safe ready behavior, collision/failure
handling, and fail-closed damaged-space behavior. This proposal does not
authorise allocation issuance, PostgreSQL conversion, WordPress, approval UI,
Header work, or host-domain integration.
