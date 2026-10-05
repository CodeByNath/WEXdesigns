import { createLogoPresentation } from '@weerax/ui';

const root = document.documentElement;
/** @type {HTMLElement | null} */
const layout = document.querySelector('.wex-layout');
/** @type {HTMLOutputElement | null} */
const state = document.querySelector('#component-manager-preview-layout-state');
/** @type {HTMLElement | null} */
const logoMount = document.querySelector('#component-manager-logo-mount');

/** @type {import('@weerax/schemas').LogoDefinitionInput} */
const logoFixture = { label: 'Logo' };

function renderLogoFixture() {
  if (!logoMount) return;
  const logo = createLogoPresentation(logoFixture);
  const element = document.createElement('span');
  element.className = `${logo.className} wex-type-navigation-default-semibold`;
  element.dataset.logoCapability = 'logo';

  const label = document.createElement('span');
  label.className = 'wex-logo__label';
  label.textContent = logo.label;
  element.append(label);
  logoMount.replaceChildren(element);
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
renderLogoFixture();
