/**
 * Mounts the Dashboard-owned body content. The Admin Body shell retains
 * ownership of placement, sizing, and scrolling only.
 * @param {HTMLElement} shell
 */
export function mountDashboardBody(shell) {
  const body = shell.querySelector('[data-admin-body-shell]');
  if (!(body instanceof HTMLElement)) return;

  const view = shell.ownerDocument.createElement('button');
  view.type = 'button';
  view.className = 'wex-button wex-button--small wex-button--neutral';
  view.textContent = 'View';
  body.replaceChildren(view);
}
