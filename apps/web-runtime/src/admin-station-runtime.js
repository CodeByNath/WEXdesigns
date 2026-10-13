import { createLogoRenderDescription } from '@weerax/ui';

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
  if (view) {
    const savedTheme = view.localStorage.getItem('wex-theme');
    const prefersDark = view.matchMedia('(prefers-color-scheme: dark)').matches;
    documentRoot.dataset.wexTheme = savedTheme ? (savedTheme === 'dark' ? 'dark' : 'light') : (prefersDark ? 'dark' : 'light');
  }

  const header = shell.querySelector('[data-admin-station-region="header"]');
  if (header instanceof HTMLElement) {
    const brand = shell.ownerDocument.createElement('div');
    brand.className = 'wex-admin-shell__brand';
    brand.dataset.headerCompartment = 'brand';
    brand.append(materializeRenderDescription(createLogoRenderDescription(logoFixture, options.logoProperties)));
    header.prepend(brand);
  }

  initSidebar(shell);
}
