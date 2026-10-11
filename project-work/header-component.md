# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Complete existing Admin Dashboard shell (Owner supersedes Header-only package)

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

## Evidence and handoff
Test desktop, 1024px, 768px, <=767px and narrow mobile; light/dark; exact Header height; Logo preserved; Sidebar collapsed/expanded/drawer; body reflow/scroll; Footer fit; keyboard/focus/Escape/backdrop and no submenus. Run focused tests, `pnpm check`, `pnpm audit:foundation`, `git diff --check` and browser proof. Verify origin and branch capacity. Implement and push one bounded topic branch; update this file to `AWAITING REVIEWER REVIEW` with pushed SHA, checks, screenshots/observations and unresolved items. Stop; no self-approval.
