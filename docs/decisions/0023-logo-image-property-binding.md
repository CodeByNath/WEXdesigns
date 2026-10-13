# 0023: Logo Image Property Binding

## Status

Accepted — Owner-authorised Logo-first property-binding boundary.

## Context

ADR 0021 reserves the Admin Station Header Brand compartment as a layout
allocation, and ADR 0022 makes Shared UI the sole author of Logo structure.
The existing Logo definition is intentionally label-only. A consuming host now
needs to supply an external Profile Logo image without making Header aware of
Logo internals or importing host-domain behaviour into WEX.

## Decision

The existing `LogoDefinition` remains `{ label }` and remains valid unchanged.
Its label is the presentation fallback and image alternative text.

A separate, serializable `LogoImagePropertyBinding` may map one opaque
application source key to Logo's closed `imageUrl` target property. It contains
only `source` and the literal target; it contains no platform identity,
callback, transport, permission, record, CSS, or host-specific name.

The consuming application/domain adapter owns resolving that source key from
its authorised record and passes only a value to the WEX runtime boundary. The
runtime accepts an HTTPS URL as a typed Logo image property. Missing, null,
malformed, or non-HTTPS values resolve to no image property and preserve the
label-only Logo. WEX does not fetch, persist, identify, or otherwise interpret
the external record.

For the portable Studio bundle, that runtime boundary is one optional,
serializable `globalThis.wexStudioHostOptions` value read once as the bundle
initialises. It carries only the approved binding and already-resolved source
values. It is not a host API, callback, event channel, global registry, or
general connector mechanism; the host must resolve and authorise its record
before assigning it.

Shared UI consumes the resolved typed property, not the binding or source
record. For a safe image URL it emits the existing Logo wrapper with a generic
image render description using the Logo label as `alt` text. Otherwise it emits
the existing label child. The generic web materializer may materialize this
narrow `image` description but remains unaware of Logo, Header, QSD, and
domain data. Native image alternative text is the rendering fallback for a
network image failure.

WEX adds only image containment behaviour inside the existing parent-owned
Brand allocation; it introduces no visual token, dimensions, spacing,
breakpoint, variant, or inline style.

## Consequences

- Header continues to own only the Brand compartment, not Logo internals or
  external data.
- QSD and any other host retain API, record, authorisation, and media
  ownership. No QSD code is part of this decision.
- This does not initialise identity, define a general connector framework, or
  authorise collections, grids, carousels, repeaters, or further dynamic
  properties.
- A later property target, URL policy change, render-description expansion, or
  host integration requires separately authorised authority and evidence.
