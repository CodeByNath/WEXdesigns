/** @typedef {'default' | 'half' | 'full'} AdminDrawerMode */
/** @typedef {{ owner: string, mode?: AdminDrawerMode }} AdminDrawerRequest */

const ADMIN_DRAWER_REQUEST_EVENT = 'wex:admin-drawer-request';
const drawerModes = new Set(['default', 'half', 'full']);

/** @param {unknown} request @returns {request is AdminDrawerRequest} */
function isAdminDrawerRequest(request) {
  if (typeof request !== 'object' || request === null) return false;
  const candidate = /** @type {Record<string, unknown>} */ (request);
  return typeof candidate.owner === 'string'
    && candidate.owner.length > 0
    && (candidate.mode === undefined || (typeof candidate.mode === 'string' && drawerModes.has(candidate.mode)));
}

/** @param {HTMLElement} shell */
function drawerShell(shell) {
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  return drawer instanceof HTMLElement ? drawer : null;
}

/**
 * Opens the Admin-owned empty drawer frame for one requesting component.
 * Mounted content remains responsible for its own structure and state.
 * @param {HTMLElement} shell
 * @param {unknown} request
 */
export function openAdminDrawer(shell, request) {
  const drawer = drawerShell(shell);
  if (!drawer || !isAdminDrawerRequest(request)) return false;

  drawer.dataset.adminDrawerOwner = request.owner;
  shell.dataset.adminDrawerMode = request.mode ?? 'default';
  drawer.hidden = false;
  shell.dataset.adminDrawer = 'open';
  return true;
}

/** @param {HTMLElement} shell */
export function closeAdminDrawer(shell) {
  const drawer = drawerShell(shell);
  if (!drawer) return false;

  delete drawer.dataset.adminDrawerOwner;
  drawer.hidden = true;
  shell.dataset.adminDrawer = 'closed';
  return true;
}

/**
 * Mounts the Admin Drawer shell boundary. A requesting component supplies its
 * identity and allocation mode; this shell never supplies drawer content,
 * content state, or element-level behaviour.
 * @param {HTMLElement} shell
 */
export function mountAdminDrawerShell(shell) {
  const drawer = drawerShell(shell);
  if (!drawer) return;

  shell.addEventListener(ADMIN_DRAWER_REQUEST_EVENT, (event) => {
    if (event instanceof CustomEvent) openAdminDrawer(shell, event.detail);
  });

  shell.ownerDocument.addEventListener('click', (event) => {
    if (drawer.hidden || !(event.target instanceof Node) || drawer.contains(event.target)) return;
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest('[data-admin-drawer-trigger]');
    const sidebarControl = target?.closest('[data-sidebar-control]');
    const sidebarDisclosure = target?.closest('.wex-admin-shell__sidebar-tab--group');
    if (
      (trigger instanceof HTMLElement && shell.contains(trigger))
      || (sidebarControl instanceof HTMLElement && shell.contains(sidebarControl))
      || (sidebarDisclosure instanceof HTMLElement && shell.contains(sidebarDisclosure))
    ) return;
    closeAdminDrawer(shell);
  });
}

/**
 * Requests the Admin Drawer allocation without coupling a component to its
 * DOM. An action without a Drawer surface simply does not call this function.
 * @param {HTMLElement} shell
 * @param {AdminDrawerRequest} request
 * @param {HTMLElement} [trigger]
 */
export function requestAdminDrawer(shell, request, trigger) {
  const drawer = drawerShell(shell);
  if (!drawer || !isAdminDrawerRequest(request)) return false;
  if (trigger && shell.contains(trigger)) trigger.dataset.adminDrawerTrigger = '';
  if (!drawer.hidden && drawer.dataset.adminDrawerOwner === request.owner) {
    return closeAdminDrawer(shell);
  }
  shell.dispatchEvent(new CustomEvent(ADMIN_DRAWER_REQUEST_EVENT, { detail: request }));
  return true;
}
