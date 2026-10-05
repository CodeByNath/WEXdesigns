# 0021: Header Shell and Logo Component Authority

## Status

Accepted — supersedes the reusable-Header decision in ADR 0020.

## Decision

The Admin Station Header is an identified application shell, not a reusable
Shared UI component or Component Manager specimen. Its concrete allocation is
`WEXAMH`, a direct child of the Admin Manager `WEXAM` root in the parent-owned
`header` slot. This records identity semantics only; it does not authorise
Phase 7 host registration, identity issuance, storage, or fitting.

Header owns composition and placement of its direct Brand and Navigation
compartments. WEX retains the approved 64px Header block and 64px × 64px Brand
allocation. Header does not own its children’s internals, presentation,
behaviour, identity, or domain meaning.

Logo is the first reusable Header child component. Its serializable definition
contains only its supplied label; it has no route, callback, host identity,
business identity, or domain behaviour. Component Manager validates Logo in a
controlled Header-owned Brand allocation, but does not render a Header
component, register Logo globally, or fit it into Admin Station.

## Supersession

ADR 0020's reusable Header family, Header schema, Shared UI Header resolver,
Header Component Manager fixture, navigation child mechanics, and responsive
location replacement are superseded. The accepted identity distinction remains:
`WEXAMH` is an allocation, never a reusable capability identifier.

## Consequences

Header remains an Admin Station shell boundary. Future Location, Search,
Navigation System, and Main Action components require their own authority and
must not be inferred from this decision. Admin Station fitting and Phase 7
identity integration remain separate authorised work.
