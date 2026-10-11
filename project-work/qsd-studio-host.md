# QSD /studio WEX Host Integration

Status: BUILDER ACTION REQUIRED
Phase: 1 — WEX runtime mount and identity storage proof

## Owner authorization (11 October 2026)

Queensland Scuba Diving is explicitly selected as WEX's first real host. Expose the **existing new WEX Admin Dashboard shell** at QSD `/studio/`; preserve QSD `/station/` untouched and operational until separate retirement approval. Owner selects each business-data plug individually, later; **no QSD data plugs in Phase 1**. No legacy QSD UI, components, templates, CSS, drawers or presentation may be reused in WEX. Host-specific responsive/focus verification deferred from `header-component.md` is required during plugged-in runtime acceptance, not preclaimed now.

## Authority and first checks

Read `project-work/AGENTS.md`, `PROJECT-RULES.md`, Code Maps and actual `main` implementation first. WEX accepted `main` baseline: `2fd8c718c2044c8965f85194fd150b55303420e0`. Follow WEX `docs/code-map/admin-shell.md`, identity portability authority and `packages/adapters/README.md`. Inspect QSD read-only: `docs/code-map/admin-station.md`, `docs/code-map/platform-identifier-station.md`, host routes/auth/assets/deployment docs. QSD authority remains independent; **this work file authorizes WEX-side work only**. Any necessary QSD source changes must be routed to that repository's independent approved workflow, not silently written here.

## Bounded Builder work

1. Prepare WEX-owned host integration/mount assets so WEX existing Admin Station can run at a host-supplied `/studio/` URL without inheriting GitHub Pages paths, QSD legacy UI or CSS.
2. Reuse approved portable `@weerax/identity` bootstrap and local-folder storage contract; determine secure host writable location and an authorized, approval-gated initialization path. Do not claim filesystem persistence is possible purely from browser JS.
3. Define/test narrow host handshake for QSD-approved authentication/session/permissions and WEX isolated UI-identity space; no additional product adapter abstractions unless a demonstrated gap forces one. Do not mint QSD business identities or copy host data.
4. Keep WEX Dashboard Header/Sidebar/Main/Footer and empty Body unchanged, with existing design tokens. No speculative components or fake content.
5. Prove WEX-side build, asset paths, authorization failure handling and isolated storage readback with deterministic tests. Record precise QSD host integration requests, if any, for a separately authorized QSD Builder.

## Exclusions and architecture gates

No logo plug, Service/Category records, drawers, navigation data, old QSD UI/template/CSS, bulk API calls, retirement of `/station/`, QSD repository writes, production migration or premature deployment. Stop and return to Reviewer if persistent storage, bootstrap approval, auth seam or mounting needs a new unapproved ownership/dependency/host contract.

## Handoff evidence

Builder must provide exact WEX branch/SHA, changed paths, tests, independent auth/storage checks, route/asset contract, and host limitations. QSD live `/studio/` success cannot be claimed until separately authorised QSD integration/deployment and subsequent Reviewer runtime check (including responsive, keyboard and focus checks deferred from Dashboard review). Stop at Phase 1 boundary; no automatic next data plug.
