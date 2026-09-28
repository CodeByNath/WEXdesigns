import { createAdminShellMarkup } from '@weerax/ui';

const root = document.documentElement;
/** @type {HTMLElement | null} */
const layout = document.querySelector('.wex-layout');
/** @type {HTMLOutputElement | null} */
const state = document.querySelector('#component-manager-preview-layout-state');
/** @type {HTMLElement | null} */
const shellMount = document.querySelector('#component-manager-preview-shell');

if (shellMount) {
  shellMount.innerHTML = createAdminShellMarkup({
    header: '<p class="wex-type-navigation-default-semibold">Header slot</p>',
    sidebar: '<p class="wex-type-body-default-regular">Sidebar slot</p>',
    main: '<h2 class="wex-type-title-default-semibold">Body / Main slot</h2>',
    footer: '<p class="wex-type-body-small-regular">Footer slot</p>',
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
