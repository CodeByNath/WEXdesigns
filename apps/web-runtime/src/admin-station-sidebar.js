const COMPACT_QUERY = '(max-width: 767px)';

/**
 * Wires Sidebar rail expansion and the compact overlay drawer for the Admin Station layout.
 * Layout only: it owns no navigation, items, or persistence.
 * @param {HTMLElement} shell
 */
export function initSidebar(shell) {
  const compact = window.matchMedia(COMPACT_QUERY);
  /** @param {string} name @returns {HTMLElement | null} */
  const control = (name) => shell.querySelector(\`[data-sidebar-control="\${name}"]\`);
  const toggle = control('toggle');
  const openTrigger = control('open');
  const closeButton = control('close');
  const backdrop = control('backdrop');
  const sidebar = shell.querySelector('[data-admin-station-region="sidebar"]');
  const inertRegions = ['main', 'footer']
    .map((name) => shell.querySelector(\`[data-admin-station-region="\${name}"]\`))
    .filter((region) => region instanceof HTMLElement);
  /** @type {HTMLElement | null} */
  let returnFocus = null;

  if (!toggle || !openTrigger || !closeButton || !backdrop || !(sidebar instanceof HTMLElement)) return;
  const ui = { toggle, openTrigger, closeButton, backdrop, panel: sidebar };

  const isDrawerOpen = () => shell.dataset.sidebarDrawer === 'open';

  function openCompactDrawer() {
    shell.dataset.sidebar = 'expanded';
    shell.dataset.sidebarHovered = 'false';
    ui.toggle.setAttribute('aria-expanded', 'true');
    ui.toggle.setAttribute('aria-label', 'Collapse sidebar');
    ui.openTrigger.setAttribute('aria-label', 'Close sidebar');
    openDrawer({ focus: false });
  }

  function toggleRail() {
    const next = shell.dataset.sidebar === 'expanded' ? 'collapsed' : 'expanded';
    shell.dataset.sidebar = next;
    shell.dataset.sidebarHovered = 'false';
    ui.toggle.setAttribute('aria-expanded', String(next === 'expanded'));
    ui.toggle.setAttribute('aria-label', next === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar');
  }

  /**
   * Temporarily expands the desktop rail without changing its persistent state.
   * @param {boolean} hovered
   */
  function setHoverRail(hovered) {
    if (compact.matches || shell.dataset.sidebar === 'expanded') return;
    shell.dataset.sidebarHovered = hovered ? 'true' : 'false';
  }

  function openDrawer({ focus = true } = {}) {
    if (isDrawerOpen()) return;
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : ui.openTrigger;
    shell.dataset.sidebarDrawer = 'open';
    ui.openTrigger.setAttribute('aria-expanded', 'true');
    inertRegions.forEach((region) => { region.inert = true; });
    if (focus) ui.closeButton.focus();
  }

  function closeDrawer({ restoreFocus = true } = {}) {
    if (!isDrawerOpen()) return;
    shell.dataset.sidebarDrawer = 'closed';
    if (compact.matches) {
      shell.dataset.sidebar = 'collapsed';
      ui.toggle.setAttribute('aria-expanded', 'false');
      ui.toggle.setAttribute('aria-label', 'Expand sidebar');
    }
    ui.openTrigger.setAttribute('aria-expanded', 'false');
    ui.openTrigger.setAttribute('aria-label', 'Open sidebar');
    inertRegions.forEach((region) => { region.inert = false; });
    if (restoreFocus) (returnFocus?.isConnected ? returnFocus : ui.openTrigger).focus();
    returnFocus = null;
  }

  /** Keeps Tab inside the open drawer; the rest of the page is inert while it is open. */
  /** @param {KeyboardEvent} event */
  function onKeydown(event) {
    if (!isDrawerOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = /** @type {HTMLElement[]} */ ([...ui.panel.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')])
      .filter((element) => !element.hasAttribute('disabled') && element.getClientRects().length > 0);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !ui.panel.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !ui.panel.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  ui.toggle.addEventListener('click', () => {
    if (compact.matches) {
      openCompactDrawer();
      return;
    }
    toggleRail();
  });
  ui.panel.addEventListener('pointerover', (event) => {
    if (event.target instanceof Element && event.target.closest('[data-sidebar-control="toggle"]')) return;
    setHoverRail(true);
  });
  ui.panel.addEventListener('pointerleave', () => setHoverRail(false));
  ui.openTrigger.addEventListener('click', () => {
    if (!compact.matches) {
      openDrawer();
      return;
    }
    if (isDrawerOpen()) {
      closeDrawer();
      return;
    }
    openCompactDrawer();
  });
  ui.closeButton.addEventListener('click', () => closeDrawer());
  ui.backdrop.addEventListener('click', () => closeDrawer());
  document.addEventListener('keydown', onKeydown);
  compact.addEventListener('change', () => {
    shell.dataset.sidebarHovered = 'false';
    if (compact.matches && shell.dataset.sidebar === 'expanded') {
      openDrawer({ focus: false });
      return;
    }
    closeDrawer({ restoreFocus: false });
  });
}
