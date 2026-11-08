import { closeAdminDrawerDropdown, mountAdminDrawerNotifications } from './admin-station-drawer-notifications.js';
import { isAdminDrawerHeaderContent, mountAdminDrawerHeader, resetAdminDrawerHeader, setAdminDrawerHeader } from './admin-station-drawer-header.js';

/** @typedef {'default' | 'half' | 'full'} AdminDrawerMode */
/** @typedef {import('./admin-station-drawer-header.js').AdminDrawerHeaderContent} AdminDrawerHeaderContent */
/** @typedef {{ owner: string, mode?: AdminDrawerMode, header?: AdminDrawerHeaderContent }} AdminDrawerRequest */

export { setAdminDrawerHeader };

const ADMIN_DRAWER_REQUEST_EVENT = 'wex:admin-drawer-request';
const drawerModes = new Set(['default', 'half', 'full']);
/** Pointer travel (px) that jumps the Drawer one mode, either way, whatever the screen size. Capped at the gap between the two edges on small screens. */
const MODE_TRAVEL = 96;
/** Most the Drawer stretches (px) while the pointer pulls toward a jump. */
const STRETCH_MAX = 40;
/** Time (ms) the Drawer takes to spring back when released short of a jump. */
const SPRING_BACK = 200;

/** @param {unknown} request @returns {request is AdminDrawerRequest} */
function isAdminDrawerRequest(request) {
  if (typeof request !== 'object' || request === null) return false;
  const candidate = /** @type {Record<string, unknown>} */ (request);
  return typeof candidate.owner === 'string'
    && candidate.owner.length > 0
    && (candidate.mode === undefined || (typeof candidate.mode === 'string' && drawerModes.has(candidate.mode)))
    && (candidate.header === undefined || isAdminDrawerHeaderContent(candidate.header));
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

/**
 * The modes that exist at this width. Half exists only when it is wider than
 * default, and when default already fills the available width only full exists.
 * @param {HTMLElement} shell
 */
function availableModeWidths(shell) {
  const widths = drawerModeWidths(shell);
  const width = (/** @type {AdminDrawerMode} */ mode) => widths.find((entry) => entry.mode === mode)?.width ?? 0;
  if (width('default') >= width('full') - 1) return widths.filter((entry) => entry.mode === 'full');
  return widths.filter((entry) => entry.mode !== 'half' || entry.width > width('default') + 1);
}

/** The requested mode, or the nearest wider one that exists at this width. @param {HTMLElement} shell @param {AdminDrawerMode} mode @returns {AdminDrawerMode} */
function fitMode(shell, mode) {
  const available = availableModeWidths(shell).map((entry) => entry.mode);
  /** @type {AdminDrawerMode[]} */
  const preference = [mode, 'default', 'full'];
  return preference.find((candidate) => available.includes(candidate)) ?? 'full';
}

/** @param {HTMLElement} shell @param {AdminDrawerMode} mode @param {'decrease' | 'increase'} direction @returns {AdminDrawerMode} */
function drawerModeAfter(shell, mode, direction) {
  const width = drawerModeWidths(shell).find((entry) => entry.mode === mode)?.width ?? 0;
  const candidates = availableModeWidths(shell)
    .filter((entry) => (direction === 'decrease' ? entry.width > width : entry.width < width))
    .sort((a, b) => (direction === 'decrease' ? a.width - b.width : b.width - a.width));
  return candidates[0]?.mode ?? mode;
}

/**
 * The Drawer shares its edge with the Sidebar when its mode fills the whole
 * width beside it. The handle then sits on that seam, centred between the two.
 * @param {HTMLElement} shell
 */
function syncHandleSeam(shell) {
  const handle = drawerShell(shell)?.querySelector('[data-admin-drawer-mode-control]');
  if (!(handle instanceof HTMLElement)) return;
  const widths = drawerModeWidths(shell);
  const width = (/** @type {string} */ mode) => widths.find((entry) => entry.mode === mode)?.width ?? 0;
  handle.toggleAttribute('data-admin-drawer-mode-control-seam', width(shell.dataset.adminDrawerMode ?? 'default') >= width('full') - 1);
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
  resetAdminDrawerHeader(shell);
  closeAdminDrawerDropdown(shell);
  if (request.header) setAdminDrawerHeader(shell, request.header);
  shell.dataset.adminDrawerMode = fitMode(shell, request.mode ?? 'default');
  syncHandleSeam(shell);
  return true;
}

/** @param {HTMLElement} shell */
export function closeAdminDrawer(shell) {
  const drawer = drawerShell(shell);
  if (!drawer) return false;

  delete drawer.dataset.adminDrawerOwner;
  closeAdminDrawerDropdown(shell);
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
  if (handle instanceof HTMLButtonElement) {
    /** One step toward wider (`decrease`) or narrower (`increase`). Narrower than the narrowest mode closes the Drawer. @param {'decrease' | 'increase'} direction */
    const changeMode = (direction) => {
      const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
      const next = drawerModeAfter(shell, mode, direction);
      if (next === mode && direction === 'increase') closeAdminDrawer(shell);
      else shell.dataset.adminDrawerMode = next;
      syncHandleSeam(shell);
    };
    /** @type {{ pointerId: number, anchorX: number, closing: boolean } | null} */
    let drag = null;
    // The elastic pull is a Web Animations width on the Drawer, not inline CSS.
    // restWidth is the Drawer width in its current mode.
    let restWidth = 0;
    /** @type {Animation | null} */
    let pullAnimation = null;
    let pullDelta = 0;
    const reduceMotion = () => shell.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
    /** Stretch the Drawer by `delta` px (wider when positive). @param {number} delta */
    const setPull = (delta) => {
      if (reduceMotion()) return;
      pullAnimation?.cancel();
      pullDelta = delta;
      pullAnimation = drawer.animate({ inlineSize: `${restWidth + delta}px` }, { duration: 0, fill: 'forwards' });
    };
    /** Drop the pull; spring back to the mode width unless the Drawer is jumping or closing. @param {boolean} spring */
    const releasePull = (spring) => {
      const held = pullAnimation;
      pullAnimation = null;
      if (!held) return;
      if (spring) drawer.animate({ inlineSize: [`${restWidth + pullDelta}px`, `${restWidth}px`] }, { duration: SPRING_BACK, easing: 'ease-out' });
      held.cancel();
    };
    /** Elastic stretch for a pull of `travel` px toward a jump at `limit` px: eases out so it resists. @param {number} travel @param {number} limit */
    const stretchFor = (travel, limit) => {
      const t = Math.min(Math.abs(travel) / limit, 1);
      return STRETCH_MAX * (1 - (1 - t) * (1 - t));
    };
    const stopDrag = (spring = true) => {
      releasePull(spring);
      drag = null;
      delete handle.dataset.adminDrawerModeControlDragging;
    };
    handle.addEventListener('pointerdown', (event) => {
      if (drawer.hidden || event.button !== 0) return;
      drag = { pointerId: event.pointerId, anchorX: event.clientX, closing: false };
      restWidth = drawer.getBoundingClientRect().width;
      handle.setPointerCapture(event.pointerId);
      handle.dataset.adminDrawerModeControlDragging = '';
    });
    /** Width gap between two modes. @param {AdminDrawerMode} a @param {AdminDrawerMode} b */
    const widthGap = (a, b) => {
      const widths = drawerModeWidths(shell);
      return Math.abs((widths.find((entry) => entry.mode === a)?.width ?? 0) - (widths.find((entry) => entry.mode === b)?.width ?? 0));
    };
    // Every mode switches only after a fixed MODE_TRAVEL of pointer travel from
    // where the pointer stood when that mode began (the grab or the last jump),
    // so the drag length never grows with the screen. One mode per move. Left
    // stretches the Drawer, right collapses it. The same travel to the right
    // from the narrowest mode arms the close, which happens on release, never
    // while the handle is still held.
    handle.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      // A move with no button held is a hover, never a drag. It clears a drag
      // whose release was lost, for example when the Drawer closed under it.
      if (event.buttons === 0) {
        stopDrag();
        return;
      }
      const travel = event.clientX - drag.anchorX;
      if (travel === 0) return;
      const direction = travel < 0 ? 'decrease' : 'increase';
      const mode = /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default');
      // Mode widths are measured from the real mode rules, so the pull is lifted first.
      pullAnimation?.cancel();
      const next = drawerModeAfter(shell, mode, direction);
      drag.closing = false;
      if (next === mode) {
        drag.closing = direction === 'increase' && travel >= MODE_TRAVEL;
        setPull(direction === 'increase' ? -stretchFor(travel, MODE_TRAVEL) : 0);
        return;
      }
      const limit = Math.min(MODE_TRAVEL, widthGap(mode, next));
      if (Math.abs(travel) < limit) {
        setPull((direction === 'decrease' ? 1 : -1) * stretchFor(travel, limit));
        return;
      }
      releasePull(false);
      shell.dataset.adminDrawerMode = next;
      syncHandleSeam(shell);
      restWidth = drawer.getBoundingClientRect().width;
      drag.anchorX = event.clientX;
    });
    // A close armed by the drag happens on release. Nothing else happens on
    // release: a jump needs its full MODE_TRAVEL while the handle is held.
    const endDrag = (/** @type {PointerEvent} */ event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const closing = event.type === 'pointerup' && drag.closing;
      if (closing) closeAdminDrawer(shell);
      stopDrag(!closing);
    };
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
    handle.addEventListener('keydown', (event) => {
      if (drawer.hidden || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      changeMode(event.key === 'ArrowLeft' ? 'decrease' : 'increase');
    });
    // A resized window keeps only the modes that exist at the new width.
    shell.ownerDocument.defaultView?.addEventListener('resize', () => {
      if (drawer.hidden) return;
      shell.dataset.adminDrawerMode = fitMode(shell, /** @type {AdminDrawerMode} */ (shell.dataset.adminDrawerMode ?? 'default'));
      syncHandleSeam(shell);
    });
    handle.addEventListener('click', (event) => event.stopPropagation());
  }

  mountAdminDrawerHeader(shell);
  mountAdminDrawerNotifications(shell);
  drawer.querySelector('[data-admin-drawer-close]')?.addEventListener('click', () => closeAdminDrawer(shell));

  shell.addEventListener(ADMIN_DRAWER_REQUEST_EVENT, (event) => {
    if (event instanceof CustomEvent) openAdminDrawer(shell, event.detail);
  });

  // A drag or flick that began on the handle ends in a click that can land
  // outside the Drawer, because the handle moves out from under the pointer. That
  // click is part of the gesture, never an outside click.
  let pressedHandle = false;
  shell.ownerDocument.addEventListener('pointerdown', (event) => {
    pressedHandle = handle instanceof HTMLElement && event.target instanceof Node && handle.contains(event.target);
  }, true);

  shell.ownerDocument.addEventListener('click', (event) => {
    if (pressedHandle) {
      pressedHandle = false;
      return;
    }
    // Drawer content may re-render on a click, which detaches its target; the path still names the Drawer.
    if (drawer.hidden || !(event.target instanceof Node) || event.composedPath().includes(drawer)) return;
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
