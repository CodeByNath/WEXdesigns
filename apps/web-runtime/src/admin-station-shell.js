import { initialiseAdminStation } from './admin-station-runtime.js';

const shellMarkup = `
  <a class="skip-link wex-type-navigation-default-semibold" href="#admin-station-main">Skip to main content</a>
  <!-- Shell-control icons: Heroicons 24/outline (view-columns), MIT License, Copyright (c) Tailwind Labs, Inc. -->
  <div class="wex-admin-shell" data-admin-station-layout data-sidebar="collapsed" data-sidebar-hovered="false" data-sidebar-drawer="closed">
    <header class="wex-admin-shell__header" data-admin-station-region="header">
      <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-trigger" data-sidebar-control="open" aria-label="Open sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5h16.5v15H3.75v-15ZM9.75 4.5v15" /></svg>
      </button>
    </header>
    <aside id="admin-station-sidebar" class="wex-admin-shell__sidebar" aria-label="Admin Station sidebar" data-admin-station-region="sidebar">
      <div class="wex-admin-shell__sidebar-controls">
        <span class="wex-admin-shell__sidebar-label wex-type-navigation-small-semibold">Menu</span>
        <button type="button" class="wex-admin-shell__control wex-admin-shell__sidebar-toggle" data-sidebar-control="toggle" aria-label="Expand sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5h16.5v15H3.75v-15ZM9.75 4.5v15" /></svg>
        </button>
        <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-close" data-sidebar-control="close" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5h16.5v15H3.75v-15ZM9.75 4.5v15" /></svg>
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
