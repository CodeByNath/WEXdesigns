import { createHeaderPresentation } from '@weerax/ui';

const root = document.documentElement;
/** @type {HTMLElement | null} */
const layout = document.querySelector('.wex-layout');
/** @type {HTMLOutputElement | null} */
const state = document.querySelector('#component-manager-preview-layout-state');
/** @type {HTMLElement | null} */
const headerMount = document.querySelector('#component-manager-header-mount');

/** @type {import('@weerax/schemas').HeaderDefinitionInput} */
const headerFixture = {
  brand: { capability: 'brand' },
  navigation: {
    location: {
      locationLabel: 'location-label',
      sidebarTrigger: 'sidebar-trigger',
    },
    search: { capability: 'search' },
    primaryNavigation: { capability: 'primary-navigation' },
    mainAction: { capability: 'main-action' },
  },
};

function renderHeaderFixture() {
  if (!headerMount) return;
  const header = createHeaderPresentation(headerFixture);
  const element = document.createElement('header');
  element.className = header.className;
  element.dataset.headerCapability = 'header';

  const brand = document.createElement('div');
  brand.className = `${header.brand.className} wex-type-navigation-default-semibold`;
  brand.dataset.headerCapability = header.brand.capability;
  brand.textContent = header.brand.label;

  const navigation = document.createElement('nav');
  navigation.className = header.navigation.className;
  navigation.setAttribute('aria-label', 'Header navigation');

  const locationLabel = document.createElement('span');
  locationLabel.className = `${header.navigation.locationLabel.className} wex-type-navigation-default-semibold`;
  locationLabel.dataset.headerCapability = header.navigation.locationLabel.capability;
  locationLabel.textContent = header.navigation.locationLabel.label;

  const sidebarTrigger = document.createElement('a');
  sidebarTrigger.className = `${header.navigation.sidebarTrigger.className} wex-type-navigation-default-semibold`;
  sidebarTrigger.dataset.headerCapability = header.navigation.sidebarTrigger.capability;
  sidebarTrigger.href = '#component-manager-header-title';
  sidebarTrigger.textContent = header.navigation.sidebarTrigger.label;

  const search = document.createElement('a');
  search.className = `${header.navigation.search.className} wex-type-navigation-default-semibold`;
  search.dataset.headerCapability = header.navigation.search.capability;
  search.href = '#component-manager-header-title';
  search.textContent = header.navigation.search.label;

  const primaryNavigation = document.createElement('span');
  primaryNavigation.className = `${header.navigation.primaryNavigation.className} wex-type-navigation-default-semibold`;
  primaryNavigation.dataset.headerCapability = header.navigation.primaryNavigation.capability;
  primaryNavigation.textContent = header.navigation.primaryNavigation.label;

  const mainAction = document.createElement('a');
  mainAction.className = `${header.navigation.mainAction.className} wex-button wex-button--primary wex-button--default`;
  mainAction.dataset.headerCapability = header.navigation.mainAction.capability;
  mainAction.href = '#component-manager-header-title';
  mainAction.textContent = header.navigation.mainAction.label;

  navigation.append(locationLabel, sidebarTrigger, search, primaryNavigation, mainAction);
  element.append(brand, navigation);
  headerMount.replaceChildren(element);
}
function resolveWexLayoutResponse() {
  if (!layout || !state) return;
  const computedStyle = window.getComputedStyle(layout);
  state.textContent = `Viewport ${window.innerWidth}px · layout maximum ${computedStyle.maxWidth} · inline padding ${computedStyle.paddingInlineStart}`;
}

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin || event.data?.type !== 'wex-theme') return;
  root.dataset.wexTheme = event.data.dark ? 'dark' : 'light';
  resolveWexLayoutResponse();
});

window.addEventListener('resize', resolveWexLayoutResponse);
resolveWexLayoutResponse();
renderHeaderFixture();
