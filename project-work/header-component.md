# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: Admin Station fitting gate — choose first real WEX Identity host

## Reviewer verdict

**Proceed with safeguards**

The Header implementation Work Package is accepted and closed.

Verified repository state:
- accepted Header implementation candidate:
  `e1a2bd722f57f716eb009d881c200180e30f5e71`;
- current `main` contains that candidate plus factual Code Map metadata refresh;
- exact browser proof passed for Large, Medium, and Compact alignment;
- `feat/header-component` is deleted;
- remote heads are only `main` and `Project-work-instructions`.

The next normal step is fitting the accepted Header into the Admin Station
Header region.

## Single architecture gate

A real Admin Station Header fit is no longer only a preview. Under accepted WEX
Identity authority, the concrete Admin Manager/Header placement is the first
real allocation shape:

- Admin Manager root = `WEXAM`;
- Admin Header child = `WEXAMH`;
- Header child placement = parent-owned `header` slot;
- root must be assigned before Header reservation;
- allocation must come through the portable WEX Identity Plugin + Tool, not an
  application-local ID.

`project-work/identity-portability.md` deliberately leaves Phase 7 real-host
integration deferred until the Owner explicitly authorises the host.

## Owner decision required

Authorise **WEXdesigns Admin Station / `apps/web-runtime`** as the first real
host for WEX Identity Phase 7.

If approved, the next Builder package will be one combined package, not several
micro-phases:

1. establish/open the Admin Station's approved WEX identity space through the
   portable local-folder reference adapter;
2. issue/assign the `WEXAM` root and `WEXAMH` Header child with explicit
   parent `header` placement;
3. wire only the minimum application integration needed for Admin Station to
   consume the accepted Header with that identity address;
4. fit the accepted Header into the Admin Station Header region;
5. validate responsive/theme/accessibility/runtime behaviour;
6. update Code Maps/evidence;
7. hand off once for Reviewer review, then use the streamlined exact-SHA
   promotion/closeout path.

Hard exclusions remain: no CompuZign/WordPress/domain rules, no business
navigation/search/account behaviour, no new identity semantics, no mandatory
PostgreSQL dependency, no speculative registry, and no Sidebar/Main/Footer
component work.

No Builder action is authorised until the Owner approves this host choice.
