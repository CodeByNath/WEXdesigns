import { initialiseAdminStation } from './admin-station-runtime.js';

const shellMarkup = `
  <a class="skip-link wex-type-navigation-default-semibold" href="#admin-station-main">Skip to main content</a>
  <!-- Shell-control icons: adapted from Heroicons 24/outline (view-columns), MIT License, Copyright (c) Tailwind Labs, Inc. -->
  <div class="wex-admin-shell" data-admin-station-layout data-sidebar="collapsed" data-sidebar-hovered="false" data-sidebar-drawer="closed" data-admin-drawer="closed" data-admin-drawer-mode="default">
    <header class="wex-admin-shell__header" data-admin-station-region="header">
      <div class="wex-admin-shell__navigation">
        <div class="wex-admin-shell__location wex-type-navigation-large-semibold" data-admin-station-location></div>
        <div class="wex-admin-shell__nav-actions" data-header-nav-actions></div>
      </div>
      <section class="wex-admin-shell__header-results" data-header-compartment="results" data-header-results-shell aria-label="Header results" hidden></section>
      <button type="button" class="wex-admin-shell__control wex-admin-shell__drawer-trigger" data-sidebar-control="open" aria-label="Open sidebar" aria-controls="admin-station-sidebar" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><rect x="3.75" y="4.5" width="16.5" height="15" rx="2" /><path stroke-linecap="round" d="M9.75 5.5v13" /></svg>
      </button>
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
    <section class="wex-admin-shell__body" data-admin-body-shell aria-label="Admin body" hidden></section>
    <aside id="admin-station-drawer" class="wex-admin-shell__drawer" data-admin-drawer-shell aria-label="Admin drawer" hidden>
      <div class="wex-admin-shell__drawer-frame">
        <header class="wex-admin-shell__drawer-header" data-admin-drawer-compartment="header">
          <div class="wex-admin-shell__drawer-header-start" data-admin-drawer-header-shell="start">
            <span class="wex-admin-shell__drawer-header-icon" data-admin-drawer-header-icon aria-hidden="true"></span>
            <span class="wex-admin-shell__drawer-header-label wex-component-title" data-admin-drawer-header-label></span>
          </div>
          <div class="wex-admin-shell__drawer-header-actions" data-admin-drawer-header-shell="actions">
            <span class="wex-pill-notification-status" data-admin-drawer-header-status></span>
            <button type="button" class="wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small-menu" aria-label="Edit options" aria-expanded="false" aria-haspopup="menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6.75 9 5.25 5.25L17.25 9" /></svg>
            </button>
            <button type="button" class="wex-button wex-button--small wex-button--borderless wex-action-button-icon-only--small" data-admin-drawer-close aria-label="Close drawer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>
        <div class="wex-admin-shell__drawer-sidebar" data-admin-drawer-compartment="sidebar"></div>
        <div class="wex-admin-shell__drawer-body" data-admin-drawer-compartment="body"></div>
        <footer class="wex-admin-shell__drawer-footer" data-admin-drawer-compartment="footer"></footer>
      </div>
      <button type="button" class="wex-button wex-button--small wex-button--subtle wex-admin-shell__drawer-mode-control" data-admin-drawer-mode-control aria-label="Drag to resize drawer" aria-controls="admin-station-drawer"></button>
    </aside>
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
