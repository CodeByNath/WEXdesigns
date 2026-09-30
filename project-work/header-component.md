# Header Component

Status: DEFERRED
Phase: 7 — Atomic-composition authority promoted and verified

## Reviewer verdict

**Proceed**

Reviewer independently verified:

- `main` is exactly `d1657a49785df63dbf566497a57c4873ba97569b`;
- `docs/architecture/atomic-composition.md` on `main` matches the accepted
  candidate;
- `docs/architecture/README.md` routes the new authority;
- the completed topic branch has been removed;
- remote heads are only `main` and `Project-work-instructions`.

Atomic-composition authority is therefore promoted and accepted.

## Header state

Header implementation remains intentionally unfinished. The Owner has chosen to
establish the WEX Platform Identity system before returning to Header so UI
composition/allocation identity is available before Header allocation is
formalised.

Retained Header direction:

- Header 64px all devices;
- Brand 64px square;
- Navigation takes remaining width;
- two-level Header gutter only;
- Header owns its WEX shell presentation, not child internals;
- LocationLabel >=768px / SidebarTrigger <=767px is component selection;
- nested components own their own direct-child contracts;
- Component Manager proof precedes Admin Station integration.

Resume this same work file after the Platform Identity work reaches its accepted
boundary. Do not duplicate or restart Header planning elsewhere.

## Deferred dependency

Platform Identity is now the active prerequisite work area.

The Header work must not invent its own identity, allocation, binding, prefix, or
persistence rules while that system is unresolved.
