import { initialiseAdminStation } from './admin-station-runtime.js';

const shellMarkup = `
  <a class="skip-link wex-type-navigation-default-semibold" href="#admin-station-main">Skip to main content</a>
  <!-- Shell-control icons: Heroicons 24/outline (bars-3, x-mark, chevron-double-right), MIT License, Copyright (c) Tailwind Labs, Inc. -->
  <div class="wex-admin-shell" data-admin-station-layout data-sidebar="collapsed" data-sidebar-drawer="closed">
    <header class="wex-admin-shell__header" data-admin-station-region="header">
      <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-trigger" data-sidebar-control="open" aria-label="Open sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
    </header>
    <aside id="admin-station-sidebar" class="wex-admin-shell__sidebar" aria-label="Admin Station sidebar" data-admin-station-region="sidebar">
      <div class="wex-admin-shell__sidebar-controls">
        <button type="button" class="wex-admin-shell__control wex-admin-shell__sidebar-toggle" data-sidebar-control="toggle" aria-label="Expand sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" /></svg>
        </button>
        <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-close" data-sidebar-control="close" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </aside>
    <main id="admin-station-main" class="wex-admin-shell__main" tabindex="-1" data-admin-station-region="main"></main>
    <footer class="wex-admin-shell__footer" data-admin-station-region="footer"></footer>
    <div class="wex-admin-shell__backdrop" data-sidebar-control="backdrop" aria-hidden="true"></div>
  </div>`;

/**
 * Mounts the existing empty WEX Admin Station shell into a host-provided node.
 * @param {HTMLElement} mount
 * @param {object} [options]
 */
export function mountAdminStation(mount, options = {}) {
  const template = mount.ownerDocument.createElement('template');
  template.innerHTML = shellMarkup;
  mount.replaceChildren(template.content.cloneNode(true));
  const shell = mount.querySelector('[data-admin-station-layout]');
  if (!(shell instanceof HTMLElement)) throw new Error('WEX Admin Station shell could not mount');
  initialiseAdminStation(shell, options);
  return shell;
}
