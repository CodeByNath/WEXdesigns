import { initialiseAdminStation } from './admin-station-runtime.js';

const shellMarkup = `
  <a class="skip-link wex-type-navigation-default-semibold" href="#admin-station-main">Skip to main content</a>
  <!-- Navigation icons: adapted from Heroicons 24/outline, MIT License, Copyright (c) Tailwind Labs, Inc. -->
  <div class="wex-admin-shell" data-admin-station-layout data-sidebar="collapsed" data-sidebar-hovered="false" data-sidebar-drawer="closed">
    <header class="wex-admin-shell__header" data-admin-station-region="header">
      <div class="wex-admin-shell__navigation">
        <button type="button" class="wex-admin-shell__primary-navigation-action" data-sidebar-control="open" aria-label="Expand navigation" aria-controls="admin-station-sidebar" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><rect x="3.75" y="4.5" width="16.5" height="15" rx="2" /><path stroke-linecap="round" d="M9.75 5.5v13" /></svg>
        </button>
        <label class="wex-admin-shell__navigation-search">
          <span class="wex-admin-shell__visually-hidden">Search</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.25" /><path stroke-linecap="round" d="m16 16 4.25 4.25" /></svg>
          <input type="search" name="admin-station-search" placeholder="Search" autocomplete="off" />
        </label>
        <div class="wex-admin-shell__sub-navigation" aria-label="Utility navigation">
          <button type="button" class="wex-admin-shell__sub-navigation-action" data-theme-toggle aria-pressed="false" aria-label="Switch to dark theme">
            <svg data-theme-toggle-icon="dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.8A8.5 8.5 0 0 1 11.2 3a8.5 8.5 0 1 0 9.8 9.8Z" /></svg>
            <svg data-theme-toggle-icon="light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" /><path stroke-linecap="round" d="M12 3v2M12 19v2M21 12h-2M5 12H3M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42M18.36 18.36l-1.42-1.42M7.06 7.06 5.64 5.64" /></svg>
          </button>
        </div>
      </div>
    </header>
    <aside id="admin-station-sidebar" class="wex-admin-shell__sidebar" aria-label="Admin Station sidebar" data-admin-station-region="sidebar">
      <div class="wex-admin-shell__sidebar-controls">
        <span class="wex-admin-shell__sidebar-label wex-type-navigation-small-semibold">Menu</span>
        <button type="button" class="wex-admin-shell__control wex-admin-shell__sidebar-toggle" data-sidebar-control="toggle" aria-label="Expand sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><rect x="3.75" y="4.5" width="16.5" height="15" rx="2" /><path stroke-linecap="round" d="M9.75 5.5v13" /></svg>
        </button>
        <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-close" data-sidebar-control="close" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><rect x="3.75" y="4.5" width="16.5" height="15" rx="2" /><path stroke-linecap="round" d="M9.75 5.5v13" /></svg>
        </button>
      </div>
      <nav class="wex-admin-shell__sidebar-navigation" aria-label="Admin navigation" data-sidebar-navigation></nav>
    </aside>
    <main id="admin-station-main" class="wex-admin-shell__main" tabindex="-1" data-admin-station-region="main"><div class="wex-admin-shell__page"></div></main>
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
