const root = document.documentElement;
/** @type {HTMLElement | null} */
const layout = document.querySelector('.wex-layout');
/** @type {HTMLOutputElement | null} */
const state = document.querySelector('#component-manager-preview-layout-state');
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
