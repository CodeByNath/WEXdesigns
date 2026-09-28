export interface AdminShellSlots {
  readonly header: string;
  readonly sidebar: string;
  readonly main: string;
  readonly footer: string;
}

/**
 * Resolves data-agnostic slot markup into the reusable Admin Shell landmark
 * structure. Applications own the trusted slot content and mounting boundary.
 */
export function createAdminShellMarkup(slots: AdminShellSlots): string {
  return `<div class="wex-admin-shell" data-wex-admin-shell>
  <header class="wex-admin-shell__header" data-admin-shell-region="header">${slots.header}</header>
  <aside class="wex-admin-shell__sidebar" aria-label="Admin Shell sidebar" data-admin-shell-region="sidebar">${slots.sidebar}</aside>
  <main class="wex-admin-shell__main" tabindex="-1" data-admin-shell-region="main">${slots.main}</main>
  <footer class="wex-admin-shell__footer" data-admin-shell-region="footer">${slots.footer}</footer>
</div>`;
}
