const ICON_STROKE_WIDTH = '1.75';

/** @typedef {'primary' | 'theme' | 'search'} HeaderActionIconName */

/** @type {Record<HeaderActionIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const iconShapes = {
  primary: [
    ['path', { d: 'M12 5.25v13.5M5.25 12h13.5' }],
  ],
  theme: [
    ['path', { d: 'M20.25 14.25A8.25 8.25 0 0 1 9.75 3.75 8.25 8.25 0 1 0 20.25 14.25Z' }],
  ],
  search: [
    ['circle', { cx: '10.75', cy: '10.75', r: '5.5' }],
    ['path', { d: 'm15 15 4.25 4.25' }],
  ],
};

/** @param {Document} document @param {HeaderActionIconName} name */
function createIcon(document, name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', ICON_STROKE_WIDTH);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  iconShapes[name].forEach(([shape, attributes]) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', shape);
    Object.entries(attributes).forEach(([attribute, value]) => node.setAttribute(attribute, value));
    svg.append(node);
  });
  return svg;
}

/** @param {Document} document */
function createPrimaryAction(document) {
  const action = document.createElement('button');
  action.type = 'button';
  action.className = 'wex-button wex-button--primary wex-admin-shell__nav-primary-action';
  action.dataset.headerPrimaryAction = '';
  action.setAttribute('aria-label', 'Primary action');
  action.append(createIcon(document, 'primary'));
  return action;
}

/** @param {Document} document */
function createSubActions(document) {
  const navigation = document.createElement('nav');
  navigation.className = 'wex-admin-shell__nav-sub-actions';
  navigation.setAttribute('aria-label', 'Header actions');

  const theme = document.createElement('button');
  theme.type = 'button';
  theme.className = 'wex-admin-shell__control wex-admin-shell__nav-sub-action';
  theme.dataset.themeToggle = '';
  theme.setAttribute('aria-pressed', 'false');
  theme.setAttribute('aria-label', 'Switch to dark theme');
  theme.append(createIcon(document, 'theme'));
  navigation.append(theme);
  return navigation;
}

/** @param {Document} document */
function createSearch(document) {
  const search = document.createElement('label');
  search.className = 'wex-admin-shell__nav-search';
  search.dataset.headerSearch = '';
  search.setAttribute('aria-label', 'Search');
  search.append(createIcon(document, 'search'));

  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search';
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Search');
  search.append(input);
  return search;
}

/**
 * Shows the Search region only while all Header action regions fit. The sub-navigation
 * retains its own horizontal overflow so the primary action never leaves the Header.
 * @param {HTMLElement} navigation
 * @param {HTMLElement} actions
 * @param {HTMLElement} search
 */
function observeSearchAvailability(navigation, actions, search) {
  const sync = () => {
    search.hidden = false;
    const navigationBounds = navigation.getBoundingClientRect();
    const searchBounds = search.getBoundingClientRect();
    search.hidden = actions.scrollWidth > actions.clientWidth
      || searchBounds.right > navigationBounds.right;
  };

  sync();
  const ResizeObserverConstructor = navigation.ownerDocument.defaultView?.ResizeObserver;
  if (ResizeObserverConstructor) {
    const observer = new ResizeObserverConstructor(sync);
    observer.observe(navigation);
    observer.observe(actions);
  }
}

/**
 * Mounts the Header's right-side navigation actions as one three-region component:
 * Search, scrollable sidebar-scale sub-actions, and a logo-scale primary action.
 * @param {HTMLElement} shell
 */
export function mountHeaderNavActions(shell) {
  const actions = shell.querySelector('[data-header-nav-actions]');
  const navigation = shell.querySelector('.wex-admin-shell__navigation');
  if (!(actions instanceof HTMLElement) || !(navigation instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  const primary = createPrimaryAction(document);
  const subActions = createSubActions(document);
  const search = createSearch(document);
  actions.replaceChildren(search, subActions, primary);
  observeSearchAvailability(navigation, actions, search);
}
