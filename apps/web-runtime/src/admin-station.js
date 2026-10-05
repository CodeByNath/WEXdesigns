import { createLogoPresentation } from '@weerax/ui';

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
  const logo = createLogoPresentation(logoFixture);
  const brand = document.createElement('div');
  brand.className = 'wex-admin-shell__brand';
  brand.dataset.headerCompartment = 'brand';

  const element = document.createElement('span');
  element.className = `${logo.className} wex-type-navigation-default-semibold`;
  element.dataset.logoCapability = 'logo';

  const label = document.createElement('span');
  label.className = 'wex-logo__label';
  label.textContent = logo.label;
  element.append(label);
  brand.append(element);
  header.replaceChildren(brand);
}

renderHeaderLogo();
