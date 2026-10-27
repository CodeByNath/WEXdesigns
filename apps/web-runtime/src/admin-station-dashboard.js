import { requestAdminBodyShell } from './admin-station-body.js';
import { requestAdminDrawer } from './admin-station-drawer.js';

const DASHBOARD_OWNER = 'dashboard';

/**
 * Mounts the Dashboard action. The Admin Body and Drawer shells retain
 * ownership of their placement, sizing, and scrolling only.
 * @param {HTMLElement} shell
 */
export function mountDashboardBody(shell) {
  const main = shell.querySelector('[data-admin-station-region="main"]');
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  if (!(main instanceof HTMLElement) || !(drawer instanceof HTMLElement)) return;

  const view = shell.ownerDocument.createElement('button');
  view.type = 'button';
  view.className = 'wex-button wex-button--small wex-button--neutral';
  view.textContent = 'View';
  view.addEventListener('click', () => {
    const drawerLabel = shell.ownerDocument.createElement('span');
    drawerLabel.className = 'wex-type-body-small-regular';
    drawerLabel.textContent = "I'm the Drawer";
    drawer.replaceChildren(drawerLabel);
    requestAdminBodyShell(shell, { owner: DASHBOARD_OWNER }, view);
    requestAdminDrawer(shell, { owner: DASHBOARD_OWNER }, view);
  });

  const dashboard = shell.ownerDocument.createElement('section');
  dashboard.className = 'wex-admin-dashboard';
  dashboard.append(view);
  main.replaceChildren(dashboard);
}
