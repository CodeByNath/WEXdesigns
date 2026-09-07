const views = ['elements', 'guidelines', 'components'];
const elementOrder = [
  'grid',
  'color',
  'icons',
  'pictograms',
  'motion',
  'spacing',
  'themes',
  'typography',
];
const root = document.documentElement;
/** @type {HTMLInputElement | null} */
const themeToggle = document.querySelector('#theme-toggle');
/** @type {NodeListOf<HTMLElement>} */
const viewElements = document.querySelectorAll('[data-view]');
/** @type {NodeListOf<HTMLAnchorElement>} */
const viewLinks = document.querySelectorAll('[data-view-link]');

/** @param {string} value */
function isView(value) {
  return views.includes(value);
}

function currentView() {
  const value = window.location.hash.slice(1);
  return isView(value) ? value : 'elements';
}

function orderElements() {
  const elementsView = document.querySelector('[data-view="elements"]');
  if (!elementsView) return;

  for (const id of elementOrder) {
    const section = document.getElementById(id);
    if (section) elementsView.append(section);
  }
}

/** @param {string} view */
function showView(view) {
  for (const element of viewElements) {
    element.hidden = element.dataset.view !== view;
  }

  for (const link of viewLinks) {
    if (link.dataset.viewLink === view) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

/** @param {boolean} dark */
function applyTheme(dark) {
  root.dataset.wexTheme = dark ? 'dark' : 'light';
  if (themeToggle) themeToggle.checked = dark;
  window.localStorage.setItem('wex-theme', dark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked));
}
window.addEventListener('hashchange', () => showView(currentView()));

const savedTheme = window.localStorage.getItem('wex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
orderElements();
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
showView(currentView());
