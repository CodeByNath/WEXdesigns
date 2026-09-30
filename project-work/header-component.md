# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: 2 — Resolve Header presentation and action gates

## Reviewer verdict

**Proceed with safeguards**

Phase 1 is accepted. The revised contract now correctly preserves the Owner's
two-level gutter rule:

- Large/Medium: outer 16px + immediate inner 8px = 24px effective inset;
- Compact <=767px: outer 8px + immediate inner 8px = 16px effective inset;
- no deeper Header gutter padding is inherited or repeated;
- no margin-based gutter recreation;
- Brand, Navigation, Location, Utility, and future nested controls own no
  automatic Header gutter merely because they are nested.

The Builder also correctly stopped before source implementation.

## Accepted structural contract

Header is reusable Shared UI structure proved in Component Manager before Admin
Station integration.

Direct structure:

- Header
  - Brand
  - Navigation
    - Location
    - Utility

Brand exposes semantic Home/Dashboard navigation intent. Location is supplied
text. Utility is an ordered slot for future accepted controls; Header does not
pre-build those controls.

Header owns reusable structure, allocation mechanics, accessibility mechanics,
and accepted WEX presentation. It does not own product routes, search logic,
notifications, account/domain state, permissions, persistence, validation,
credentials, callbacks, or speculative control families.

## Decisions still required before implementation

Repository authority does not currently determine these Header-specific values
or behaviours. Owner decision is required:

1. **Header height / block size**
   - choose the intended Header height or token-based sizing rule.

2. **Brand allocation**
   - define whether Brand is intrinsic, fixed/token-based, or bounded by a
     min/max allocation.

3. **Navigation / Utility behaviour**
   - define Location vs Utility alignment;
   - define what Utility does as content grows: remain single-line, wrap,
     horizontal-scroll, truncate/reduce, or another explicit accessible rule;
   - define Compact reallocation/collapse behaviour if different.

4. **Surface treatment**
   - decide whether Header itself owns background/border/separation treatment,
     or remains presentation-neutral inside the Admin Station Header region.

5. **Brand Home/Dashboard action authority**
   - existing `SemanticAction` requires `recordId`;
   - no accepted application-shell navigation record/executor exists;
   - decide whether Brand navigation gets a bounded shell-navigation semantic
     contract or is supplied by an existing authoritative record owner.

## Stop boundary

Do not create Header schema, Shared UI source, WEX Header CSS, Component Manager
fixture/mount, topic branch, or Admin Station integration until these decisions
are resolved and recorded here.

The reference image may guide composition, but it does not supply missing WEX
values by itself.
