import { createAdminShellMarkup } from '@weerax/ui';

const root = document.documentElement;
/** @type {HTMLElement | null} */
const layout = document.querySelector('.wex-layout');
/** @type {HTMLOutputElement | null} */
const state = document.querySelector('#component-manager-preview-layout-state');
/** @type {HTMLElement | null} */
const shellMount = document.querySelector('#component-manager-preview-shell');

if (shellMount) {
  shellMount.innerHTML = createAdminShellMarkup();
  [
    { region: 'header', tag: 'p', className: 'wex-type-navigation-default-semibold', text: 'Header slot' },
    { region: 'sidebar', tag: 'p', className: 'wex-type-body-default-regular', text: 'Sidebar slot' },
    { region: 'main', tag: 'h2', className: 'wex-type-title-default-semibold', text: 'Body / Main slot' },
    { region: 'footer', tag: 'p', className: 'wex-type-body-small-regular', text: 'Footer slot' },
  ].forEach((fixture) => {
    const mountRegion = shellMount.querySelector(`[data-admin-shell-region="${fixture.region}"]`);
    if (!mountRegion) return;
    const content = document.createElement(fixture.tag);
    content.className = fixture.className;
    content.textContent = fixture.text;
    mountRegion.append(content);
  });
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
