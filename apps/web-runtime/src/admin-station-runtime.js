import { createLogoRenderDescription } from '@weerax/ui';

import { mountHeaderLocation } from './admin-station-location.js';
import { mountHeaderNavActions } from './admin-station-nav-actions.js';
import { mountSidebarNavigation } from './admin-station-navigation.js';
import { initSidebar } from './admin-station-sidebar.js';
import { materializeRenderDescription } from './render-description.js';

/** @type {import('@weerax/schemas').LogoDefinitionInput} */
const logoFixture = { label: 'Logo' };

/**
 * Applies the existing WEX Admin Station behaviour to one already-mounted
 * shell. It owns presentation mechanics only; it has no host, identity, or
 * persistence behaviour.
 * @param {HTMLElement} shell
 * @param {{ logoProperties?: import('@weerax/schemas').LogoPresentationPropertiesInput }} [options]
 */
export function initialiseAdminStation(shell, options = {}) {
  const documentRoot = shell.ownerDocument.documentElement;
  const view = shell.ownerDocument.defaultView;
  mountHeaderNavActions(shell);
  const themeToggle = shell.querySelector('[data-theme-toggle]');

  /** @param {'dark' | 'light'} theme */
  function applyTheme(theme) {
    const dark = theme === 'dark';
    documentRoot.dataset.wexTheme = theme;
    if (themeToggle instanceof HTMLButtonElement) {
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    }
    view?.localStorage.setItem('wex-theme', theme);
  }

  if (view) {
    const requestedTheme = new URL(view.location.href).searchParams.get('theme');
    const savedTheme = view.localStorage.getItem('wex-theme');
    const prefersDark = view.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(requestedTheme === 'dark' || requestedTheme === 'light'
      ? requestedTheme
      : savedTheme
        ? (savedTheme === 'dark' ? 'dark' : 'light')
        : (prefersDark ? 'dark' : 'light'));
  }

  if (themeToggle instanceof HTMLButtonElement) {
    themeToggle.addEventListener('click', () => {
      applyTheme(documentRoot.dataset.wexTheme === 'dark' ? 'light' : 'dark');
    });
  }

  const header = shell.querySelector('[data-admin-station-region="header"]');
  if (header instanceof HTMLElement) {
    const brand = shell.ownerDocument.createElement('div');
    brand.className = 'wex-admin-shell__brand';
    brand.dataset.headerCompartment = 'brand';
    brand.append(materializeRenderDescription(createLogoRenderDescription(logoFixture, options.logoProperties)));
    const title = shell.ownerDocument.createElement('span');
    title.className = 'wex-admin-shell__brand-title wex-type-navigation-default-semibold';
    title.textContent = 'VRAX Admin';
    brand.append(title);
    header.prepend(brand);
  }

  mountSidebarNavigation(shell);
  mountHeaderLocation(shell);
  initSidebar(shell);
}
