# 0022: Logo Render Description Boundary

## Status

Accepted — builds on ADR 0021.

## Decision

Shared UI owns the platform-neutral render description for Logo. The
description includes Logo's wrapper, label child, WEX classes, structural
attributes, and text value; it contains no DOM node, callback, component
constructor, application function, host identity, or business data.

The web runtime owns one generic, platform-facing materializer that turns this
description into DOM nodes. The materializer recognises only generic element
and text description kinds. It does not know Logo, Header, CompuZign, or any
business data.

Component Manager and Admin Station both request the same Logo render
description and pass it to that materializer. Neither runtime may re-author
Logo's wrapper or label DOM. Header continues to own the Brand compartment and
its WEX-owned 64px × 64px allocation.

## Consequences

This is a narrow rendering boundary for the Logo component, not a page builder
or a general application rendering framework. Additional component render
descriptions require their own authority before they expand this contract.

Logo's serializable schema remains unchanged and continues to contain only its
label. WEX remains the authority for the classes and presentation values used
by the shared description and Header allocation.
