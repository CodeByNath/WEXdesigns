import { createLogoRenderDescription } from '@weerax/ui';
import { initSidebar } from './admin-station-sidebar.js';
import { materializeRenderDescription } from './render-description.js';

const root = document.documentElement;
const savedTheme = window.localStorage.getItem('wex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

root.dataset.wexTheme = savedTheme ? (savedTheme === 'dark' ? 'dark' : 'light') : (prefersDark ? 'dark' : 'light');

/** @type {HTMLElement | null} */
const header = document.querySelector('[data-admin-station-region="header"]');

/** @type {import('@weerax/schemas').LogoDefinitionInput} */
const logoFixture = { label: 'Logo' };

function renderHeaderLogo() {
  if (!header) return;
  const brand = document.createElement('div');
  brand.className = 'wex-admin-shell__brand';
  brand.dataset.headerCompartment = 'brand';
  brand.append(materializeRenderDescription(createLogoRenderDescription(logoFixture)));
  header.prepend(brand);
}

renderHeaderLogo();

const shell = document.querySelector('[data-admin-station-layout]');
if (shell instanceof HTMLElement) initSidebar(shell);
