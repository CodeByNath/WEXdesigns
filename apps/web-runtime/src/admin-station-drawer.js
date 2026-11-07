/** @typedef {'default' | 'half' | 'full'} AdminDrawerMode */
/** @typedef {{ owner: string, mode?: AdminDrawerMode }} AdminDrawerRequest */

import { createSystemIcon } from './admin-station-system-icons.js';

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
 * Rendered Drawer width per mode, measured from the existing mode rules. Modes
 * are ordered by real width, so dragging the handle left (`decrease`) always
 * stretches the Drawer to the left (wider) and dragging right (`increase`)
 * always collapses it to the right (narrower), whatever the viewport size.
 * @param {HTMLElement} shell
 * @returns {Array<{ mode: AdminDrawerMode, width: number }>}
 */
function drawerModeWidths(shell) {
  const drawer = drawerShell(shell);
  if (!drawer) return [];
  const current = shell.dataset.adminDrawerMode;
  const widths = [...drawerModes].map((mode) => {
    shell.dataset.adminDrawerMode = mode;
    return { mode: /** @type {AdminDrawerMode} */ (mode), width: drawer.getBoundingClientRect().width };
  });
  if (current === undefined) delete shell.dataset.adminDrawerMode;
  else shell.dataset.adminDrawerMode = current;
  return widths;
}

/** @param {HTMLElement} shell @param {AdminDrawerMode} mode @param {'decrease' | 'increase'} direction @returns {AdminDrawerMode} */
function drawerModeAfter(shell, mode, direction) {
  const widths = drawerModeWidths(shell);
  const width = widths.find((entry) => entry.mode === mode)?.width ?? 0;
  const candidates = widths
    .filter((entry) => (direction === 'decrease' ? entry.width > width : entry.width < width))
    .sort((a, b) => (direction === 'decrease' ? a.width - b.width : b.width - a.width));
  return candidates[0]?.mode ?? mode;
}

/**
 * Moves the handle fully inside the Drawer, with its notch, when its outer part
 * would otherwise touch the Admin sidebar (a Drawer as wide as its column).
 * @param {HTMLElement} shell
 */
function syncDrawerHandleClearance(shell) {
  const drawer = drawerShell(shell);
  const handle = shell.querySelector('[data-admin-drawer-mode-control]');
  const sidebar = shell.querySelector('.wex-admin-shell__sidebar');
  if (!drawer || drawer.hidden || !(handle instanceof HTMLElement) || !(sidebar instanceof HTMLElement)) return;
  delete shell.dataset.adminDrawerHandleInset;
  if (handle.getBoundingClientRect().left < sidebar.getBoundingClientRect().right) {
    shell.dataset.adminDrawerHandleInset = '';
  }
}

/** @param {HTMLElement} shell */
function syncDrawerModeControl(shell) {
  const handle = shell.querySelector('[data-admin-drawer-mode-control]');
  if (handle instanceof HTMLButtonElement) {
    handle.replaceChildren(createSystemIcon(shell.ownerDocument, 'grip-vertical'));
  }
  syncDrawerHandleClearance(shell);
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
  drawer.hidden = false;
  shell.dataset.adminDrawer = 'open';
  syncDrawerModeControl(shell);
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

  const handle = drawer.querySelector('[data-admin-drawer-mode-control]');
  syncDrawerModeControl(shell);
  if (handle instanceof HTMLButtonElement) {
    /** @param {AdminDrawerMode} mode */
    const setMode = (mode) => {
      shell.dataset.adminDrawerMode = mode;
      syncDrawerHandleClearance(shell);
    };
    /** @param {'decrease' | 'increase'} direction */
    const changeMode = (direction) => {
      const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
      setMode(drawerModeAfter(shell, mode, direction));
    };
    const handleCentre = () => {
      const box = handle.getBoundingClientRect();
      return box.left + box.width / 2;
    };
    /** @type {{ pointerId: number, grabOffset: number } | null} */
    let drag = null;
    handle.addEventListener('pointerdown', (event) => {
      if (drawer.hidden || event.button !== 0) return;
      drag = { pointerId: event.pointerId, grabOffset: event.clientX - handleCentre() };
      handle.setPointerCapture(event.pointerId);
      handle.dataset.adminDrawerModeControlDragging = '';
    });
    // The handle snaps to the adjacent mode edge once the pointer is nearer to
    // it than to the current edge, one mode per move and never past the pointer.
    // Left stretches the Drawer, right collapses it.
    handle.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const target = event.clientX - drag.grabOffset;
      const centre = handleCentre();
      if (target === centre) return;
      const direction = target < centre ? 'decrease' : 'increase';
      const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
      const next = drawerModeAfter(shell, mode, direction);
      if (next === mode) return;
      const widths = drawerModeWidths(shell);
      const currentWidth = widths.find((entry) => entry.mode === mode)?.width ?? 0;
      const nextWidth = widths.find((entry) => entry.mode === next)?.width ?? 0;
      const nextCentre = centre + (currentWidth - nextWidth);
      if (Math.abs(target - nextCentre) < Math.abs(target - centre)) setMode(next);
    });
    const endDrag = (/** @type {PointerEvent} */ event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag = null;
      delete handle.dataset.adminDrawerModeControlDragging;
    };
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
    handle.addEventListener('keydown', (event) => {
      if (drawer.hidden || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      changeMode(event.key === 'ArrowLeft' ? 'decrease' : 'increase');
    });
    handle.addEventListener('click', (event) => event.stopPropagation());
  }

  shell.ownerDocument.defaultView?.addEventListener('resize', () => {
    if (!drawer.hidden) syncDrawerModeControl(shell);
  });

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
