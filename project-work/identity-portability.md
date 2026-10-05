# WEX Identity Portability

Status: DEFERRED
Phase: 7 — Real-host integration proof deferred pending explicit host authorisation

## Reviewer verdict

**Proceed**

Phase 6 promotion and closeout are independently verified.

Remote `main` is exactly
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d`, identical to the accepted
Phase 6 candidate. The completed topic branch is gone; remote heads are only
`main` and `Project-work-instructions`.

Identity portability is accepted through Phase 6:
- portable host-local WEX identity spaces;
- framework-neutral storage contract;
- local-folder reference adapter;
- portable `@weerax/identity` bootstrap;
- optional PostgreSQL adapter;
- portable allocation lifecycle and exact identity-address targeting proof.

Phase 7 is not rejected; it is deferred because it requires a separately
authorised real consuming host and adapter/integration boundary. No host is
selected by this work file. Do not infer CompuZign, WordPress, or another
product automatically.

The Header resume gate is satisfied. Header work may return to
`project-work/header-component.md`.

Do not perform host integration under this file until the Owner explicitly
authorises the target host and that host's repository/domain authority is read.
