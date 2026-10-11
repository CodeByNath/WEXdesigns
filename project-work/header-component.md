# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Exact-SHA promotion and closeout — Logo render boundary

## Reviewer verdict

**Proceed**

Accepted candidate:
`feat/logo-header-fitting` at
`2266dc8c8a38a80b5567fdecaa8c0c65b05513d5`.

Reviewer verified against `main`
`f438b0002ecac86d113639fba4464992052a673e`:

- ADR 0022 records the narrow Logo render-description boundary;
- Logo internal wrapper/label structure is authored once in `@weerax/ui`;
- Component Manager and Admin Station both consume that same Logo description;
- the web materializer knows only generic element/text descriptions and has no
  Logo, Header, CompuZign, or business semantics;
- Header remains the existing `.wex-admin-shell__header` shell;
- Header/WEX retain ownership of the 64px × 64px Brand allocation;
- Logo schema remains unchanged and serializable;
- no DOM/browser API was introduced into `@weerax/ui`;
- no Location, Search, Navigation System, Main Action, Identity Phase 7,
  CompuZign integration, Global Components registration, or new WEX values
  were introduced;
- Code Maps now reflect the actual Logo fitting boundary;
- candidate is three commits ahead and zero behind `main`;
- GitHub exposes no commit-status contexts, so CI is not claimed.

This is the proven first shell -> compartment -> component rendering path.

## Standing sequence

```text
Header Shell
-> Logo Component
-> fit Logo into Header
-> record the proven shell/compartment/component pattern
-> only then move to the next Header child
```

## Builder closeout instruction

Promote **only**
`2266dc8c8a38a80b5567fdecaa8c0c65b05513d5`
to `main` by fast-forward.

Then:

1. verify remote `main` contains the exact accepted candidate tree;
2. run `pnpm --filter @weerax/ui test`,
   `pnpm --filter @weerax/web-runtime check`, `pnpm check`,
   `pnpm audit:foundation`, and `git diff --check`;
3. refresh only factual Code Map verification metadata if needed;
4. prove the topic branch is fully contained, then delete
   `feat/logo-header-fitting` locally and remotely;
5. update this same work file to `ACCEPTED` with final `main` SHA,
   checks, remote-head evidence, and branch deletion evidence;
6. stop.

Do **not** begin the next Header child, CompuZign adapter/API integration, or
Identity Phase 7 in this promotion cycle.
