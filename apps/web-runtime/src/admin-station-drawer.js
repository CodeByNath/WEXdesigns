/** @typedef {'default' | 'half' | 'full'} AdminDrawerMode */
/** @typedef {{ owner: string, mode?: AdminDrawerMode }} AdminDrawerRequest */

import { createSystemIcon } from './admin-station-system-icons.js';

const ADMIN_DRAWER_REQUEST_EVENT = 'wex:admin-drawer-request';
const drawerModes = new Set(['default', 'half', 'full']);
/** @type {Array<'decrease' | 'increase'>} */
const drawerModeDirections = ['decrease', 'increase'];

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

/** @param {AdminDrawerMode} mode @param {'decrease' | 'increase'} direction @returns {AdminDrawerMode} */
function drawerModeAfter(mode, direction) {
  if (direction === 'decrease') {
    if (mode === 'full') return 'half';
    if (mode === 'half') return 'default';
    return mode;
  }
  if (mode === 'default') return 'half';
  if (mode === 'half') return 'full';
  return mode;
}

/** @param {HTMLElement} shell */
function syncDrawerModeControl(shell) {
  const control = shell.querySelector('[data-admin-drawer-mode-control]');
  if (!(control instanceof HTMLElement)) return;
  const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
  for (const direction of drawerModeDirections) {
    const step = control.querySelector(`[data-admin-drawer-mode-control-step="${direction}"]`);
    if (!(step instanceof HTMLButtonElement)) continue;
    const nextMode = drawerModeAfter(mode, direction);
    const isAvailable = nextMode !== mode;
    step.disabled = !isAvailable;
    step.setAttribute('aria-label', direction === 'decrease'
      ? mode === 'full' ? 'Reduce drawer to half width' : mode === 'half' ? 'Reduce drawer to default width' : 'Drawer is at default width'
      : mode === 'default' ? 'Expand drawer to half width' : mode === 'half' ? 'Expand drawer to full width' : 'Drawer is at full width');
    step.replaceChildren(createSystemIcon(shell.ownerDocument, direction === 'decrease' ? 'chevron-left' : 'chevron-right'));
  }
}

/** @param {HTMLElement} control @param {MouseEvent} event */
function isDrawerModeControlHit(control, event) {
  const bounds = control.getBoundingClientRect();
  return event.clientX >= bounds.left
    && event.clientX <= bounds.right
    && event.clientY >= bounds.top
    && event.clientY <= bounds.bottom;
}

/** @param {HTMLElement} control @param {MouseEvent} event @returns {'decrease' | 'increase'} */
function drawerModeControlDirection(control, event) {
  const bounds = control.getBoundingClientRect();
  return event.clientX < bounds.left + (bounds.width / 2) ? 'decrease' : 'increase';
}

/** @typedef {'header' | 'sidebar' | 'body' | 'footer'} AdminDrawerCompartmentName */

/**
 * Returns one of the four Admin Drawer compartments so a requester can mount
 * its own content there. The compartments themselves stay content-empty.
 * @param {HTMLElement} shell
 * @param {AdminDrawerCompartmentName} name
 */
export function adminDrawerCompartment(shell, name) {
  const compartment = drawerShell(shell)?.querySelector(`[data-admin-drawer-compartment="${name}"]`);
  return compartment instanceof HTMLElement ? compartment : null;
}

/**
 * Opens the Admin-owned drawer frame for one requesting component.
 * Mounted content remains responsible for its own structure and state.
 * @param {HTMLElement} shell
 * @param {unknown} request
 */
export function openAdminDrawer(shell, request) {
  const drawer = drawerShell(shell);
  if (!drawer || !isAdminDrawerRequest(request)) return false;

  drawer.dataset.adminDrawerOwner = request.owner;
  shell.dataset.adminDrawerMode = request.mode ?? 'default';
  syncDrawerModeControl(shell);
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

  const modeControl = drawer.querySelector('[data-admin-drawer-mode-control]');
  syncDrawerModeControl(shell);
  if (modeControl instanceof HTMLElement) {
    /** @param {'decrease' | 'increase'} direction */
    const changeMode = (direction) => {
      const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
      shell.dataset.adminDrawerMode = drawerModeAfter(mode, direction);
      syncDrawerModeControl(shell);
    };
    modeControl.querySelectorAll('[data-admin-drawer-mode-control-step]').forEach((step) => {
      if (!(step instanceof HTMLButtonElement)) return;
      step.addEventListener('click', (event) => {
        event.stopPropagation();
        if (drawer.hidden || step.disabled) return;
        const direction = step.dataset.adminDrawerModeControlStep;
        if (direction === 'decrease' || direction === 'increase') changeMode(direction);
      });
    });
    shell.ownerDocument.addEventListener('click', (event) => {
      if (drawer.hidden || !(event instanceof MouseEvent) || !(event.target instanceof Node) || modeControl.contains(event.target)) return;
      if (!isDrawerModeControlHit(modeControl, event)) return;
      event.preventDefault();
      event.stopPropagation();
      changeMode(drawerModeControlDirection(modeControl, event));
    }, { capture: true });
  }

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
