/**
 * Resolves the reusable Admin Shell's fixed landmark structure. Applications
 * own mounting content into its named regions.
 */
export function createAdminShellMarkup(): string {
  return `<div class="wex-admin-shell" data-wex-admin-shell>
  <header class="wex-admin-shell__header" data-admin-shell-region="header"></header>
  <aside class="wex-admin-shell__sidebar" aria-label="Admin Shell sidebar" data-admin-shell-region="sidebar"></aside>
  <main class="wex-admin-shell__main" tabindex="-1" data-admin-shell-region="main"></main>
  <footer class="wex-admin-shell__footer" data-admin-shell-region="footer"></footer>
</div>`;
}
