/** @typedef {'default' | 'half' | 'full'} AdminDrawerMode */

const drawerModes = new Set(['default', 'half', 'full']);

/** @param {HTMLElement} shell */
function drawerShell(shell) {
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  return drawer instanceof HTMLElement ? drawer : null;
}

/**
 * Opens the Admin-owned empty drawer frame in one approved allocation mode.
 * Mounted content remains responsible for its own structure and state.
 * @param {HTMLElement} shell
 * @param {AdminDrawerMode} [mode]
 */
export function openAdminDrawer(shell, mode = 'default') {
  const drawer = drawerShell(shell);
  if (!drawer || !drawerModes.has(mode)) return false;

  shell.dataset.adminDrawerMode = mode;
  drawer.hidden = false;
  shell.dataset.adminDrawer = 'open';
  return true;
}

/** @param {HTMLElement} shell */
export function closeAdminDrawer(shell) {
  const drawer = drawerShell(shell);
  if (!drawer) return false;

  drawer.hidden = true;
  shell.dataset.adminDrawer = 'closed';
  return true;
}
