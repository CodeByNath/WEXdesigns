# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Promote reviewed Admin Dashboard shell candidate with safeguards

## Owner direction and authority
One bounded work package: finish the existing WEX Admin Station dashboard shell so later approved components can be fitted without redesigning layout. This **supersedes the unimplemented Header-only correction**, incorporating its grid-row fix. Use the Owner's standalone HTML only as UI/behaviour reference, not code or design authority. First read `project-work/AGENTS.md`, `PROJECT-RULES.md`, relevant Code Maps, ADR 0021/0022 and current `main` source.

Verified `main` baseline `046b9bf3dae1f645565019d01ac32e15df54b7d0`: `packages/wex/src/foundations/layout.css` already owns `.wex-admin-shell` with Header/Sidebar/Main/Footer; `header.css` owns real 64px Header/Brand geometry. Root grid lacks explicit rows and currently stacks Sidebar/Main at <=1024px. Preserve existing runtime at `apps/web-runtime/admin-station/`, existing Logo fitting/connection, and WEX theme.

## Single Builder work package
1. **Root shell:** fix stretched Header grid row; make full-viewport, correctly tracked dashboard layout with Header above Sidebar + Main, existing Footer below, no unnecessary gaps. Preserve stable Body space and independent scrolling, including empty content.
2. **Header shell:** preserve existing 64px Header, 64×64 Brand/Logo allocation and its working connection. No Header components or content added.
3. **Sidebar shell:** layout-only shell, 80px collapsed and 264px expanded *reference targets*, subject to approved WEX sizing authority. Implement TypeScript/JS interaction using existing runtime conventions: toggle open/close; desktop pin/unpin if supported; width reflow to Main; focus/keyboard semantics. Do not create navigation menus/items or submenus.
4. **Compact <=767px:** Sidebar closed initially; accessible trigger placement in Header shell; open as overlay drawer under Header without pushing Main; Escape, backdrop, focus return, scroll containment. Use established WEX drawer semantics where applicable.
5. **Main/Body shell:** correctly sized responsive empty composition region; no sample data, editor or contents. **Footer:** preserve existing structural shell, avoid unwanted occupied height and viewport overflow.
6. **Icons:** Owner selects **Heroicons SVG (called “WEX Heroic” by Owner)** as the shell-control icon source if no approved existing WEX icon system exists. Verify repository icon authority and dependency rules first. Use SVG for Sidebar/drawer controls only, with WEX-controlled size/colour/states; do not create a new icon component family or parallel visual-token system. If adopting Heroicons needs a new architectural/dependency decision, stop at that gate and report options.

## Hard boundaries
Shells only; **no new components**, placeholder or real data, API routes, platform adapters, ID changes, WordPress/PHP, TAG CSS, navigation items, business rules, Body editor, inline style or arbitrary hardcoded visual values. Use existing WEX foundation tokens and presentation ownership. No speculative abstraction.

## Builder handoff
Remote candidate: `origin/feat/admin-dashboard-shell` @ `2e7e1333fb9c39c5782df2795f898dea5bdd12f3` (one commit on `main` `046b9bf`). Origin verified as `CodeByNath/WEXdesigns`; remote heads were 2 before the push (now 3, at capacity).

Changed: `layout.css` (shell grid/Sidebar/Main/Footer/drawer), `admin-station/index.html`, `admin-station.js`, new `admin-station-sidebar.js`, `catalogue.test.mjs`, `docs/code-map/admin-shell.md`. `header.css` unchanged.

Checks: `pnpm check` (45/45 tasks), `pnpm audit:foundation`, `git diff --check` pass.

Chrome (headless, DevTools protocol, local dev server): 176/176 assertions at 1440, 1024, 768, 767, 375 and 320px, light and dark. Header 64px, Brand 64×64 with Logo, rail 80↔264px with Main reflow, empty Footer 0px, Body scrolls independently with no page overflow. Compact: closed initially, trigger beside Brand, drawer under Header without moving Main, focus moves to close, Tab wraps, Escape/backdrop/close return focus, rest of page inert, resize past 768px closes. 2px focus-visible outline; Enter/Space operate controls; AX tree shows banner, sidebar, main, footer, named buttons. Screenshots/script are local scratch only.

## Deviations / items for Reviewer
- **Icons:** no WEX icon system found. Vendored three Heroicons 2.2.0 outline SVGs (MIT notice in HTML) inline; **no new dependency**. Say if a package dependency is preferred.
- **Sidebar widths:** no WEX sizing authority exists. 80px and 264px are composed from spacing tokens as shell-local properties; confirm or ratify.
- **No scrim or motion tokens exist:** backdrop is a transparent click-catcher; no transitions.
- **Pin/unpin not implemented** (no specified behaviour); no persistence added.
- Removed the ≤1024px Sidebar/Main stacking, which contradicted this package; updated its test and the old `Drawer` guard.
- Code Map verification metadata refreshes on promotion. Not yet validated: live GitHub Pages (main-only).

## Reviewer verdict — Proceed with safeguards (2026-10-11)

Independently inspected pushed diff `main...2e7e1333fb9c39c5782df2795f898dea5bdd12f3` (6 files), especially shell CSS, DOM, Sidebar JS, existing Logo hook and tests. Candidate meets the bounded shell-only scope, with no data/menu items/components. **Builder-reported** checks and 176 browser assertions are not independently rerun; screenshot/script artifacts were not pushed. Heroicons are inline SVG shell controls with MIT attribution, not a package/icon-family implementation. Reference widths are composed from existing WEX spacing tokens; pin persistence/interaction was not implemented and is deferred, not represented as complete.

**Next Builder action — promotion only, no feature expansion:** confirm origin, current source SHA, branch limits and checks; promote exactly the reviewed candidate through repository-approved main workflow, refresh Code Map verification metadata, verify pushed `main` SHA/CI/Pages; record any divergences and stop. Do not add pin behaviour, components, data, APIs or local styling. After deployment, Reviewer must independently verify hosted responsive/sidebar/focus behaviour before final acceptance; if runtime differs, return bounded correction. Existing separate work branch must be cleaned up only when safely verified under repository housekeeping rules.
