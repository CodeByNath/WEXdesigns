import { HeaderPrimaryActionPresentationPropertiesSchema } from '@weerax/schemas';

import { mountHeaderNotifications } from './admin-station-notifications.js';
import { mountHeaderProfile } from './admin-station-profile.js';

const ICON_STROKE_WIDTH = '1.75';

/** @typedef {'primary' | 'notification' | 'moon' | 'search' | 'sun'} HeaderActionIconName */

/** @type {Record<HeaderActionIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const iconShapes = {
  primary: [
    ['circle', { cx: '12', cy: '8.25', r: '3.25' }],
    ['path', { d: 'M5.25 20.25a6.75 6.75 0 0 1 13.5 0' }],
  ],
  notification: [
    ['path', { d: 'M18 8.25a6 6 0 0 0-12 0c0 7-3 7-3 9.75h18C21 15.25 18 15.25 18 8.25Z' }],
    ['path', { d: 'M14.25 21a2.5 2.5 0 0 1-4.5 0' }],
  ],
  moon: [
    ['path', { d: 'M20.25 14.25A8.25 8.25 0 0 1 9.75 3.75 8.25 8.25 0 1 0 20.25 14.25Z' }],
  ],
  sun: [
    ['circle', { cx: '12', cy: '12', r: '4' }],
    ['path', { d: 'M12 2.25v1.5M12 20.25v1.5M21.75 12h-1.5M3.75 12h-1.5M18.894 5.106l-1.06 1.06M6.166 17.834l-1.06 1.06M18.894 18.894l-1.06-1.06M6.166 6.166l-1.06-1.06' }],
  ],
  search: [
    ['circle', { cx: '10.75', cy: '10.75', r: '5.5' }],
    ['path', { d: 'm15 15 4.25 4.25' }],
  ],
};

/** @param {Document} document @param {HeaderActionIconName} name @param {{ sidebarTab?: boolean, className?: string }} [options] */
function createIcon(document, name, options = {}) {
  const icon = options.sidebarTab ? document.createElement('span') : null;
  if (icon) {
    icon.className = 'wex-admin-shell__sidebar-tab-icon';
    if (options.className) icon.classList.add(options.className);
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (icon) svg.classList.add('wex-admin-shell__sidebar-tab-icon-svg');
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
  if (icon) {
    icon.append(svg);
    return icon;
  }

  return svg;
}

/** @param {Document} document @param {unknown} [properties] */
function createPrimaryAction(document, properties = {}) {
  const action = document.createElement('button');
  action.type = 'button';
  action.className = 'wex-button wex-button--primary wex-admin-shell__nav-primary-action';
  action.dataset.headerPrimaryAction = '';
  action.setAttribute('aria-label', 'Primary action');
  const presentation = HeaderPrimaryActionPresentationPropertiesSchema.safeParse(properties);
  const imageUrl = presentation.success ? presentation.data.imageUrl : undefined;
  const icon = presentation.success ? presentation.data.icon ?? 'primary' : 'primary';
  if (imageUrl) {
    const image = document.createElement('img');
    image.className = 'wex-admin-shell__nav-primary-action-image';
    image.src = imageUrl;
    image.alt = 'Primary action';
    action.append(image);
  } else {
    action.append(createIcon(document, icon));
  }
  return action;
}

/** @param {Document} document */
function createSubActions(document) {
  const navigation = document.createElement('nav');
  navigation.className = 'wex-admin-shell__nav-sub-actions';
  navigation.setAttribute('aria-label', 'Header actions');

  /** @param {HeaderActionIconName} name @param {string} label @param {string} dataset */
  const createSubAction = (name, label, dataset) => {
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'wex-admin-shell__sidebar-tab wex-admin-shell__nav-sub-action';
    action.dataset[dataset] = '';
    action.setAttribute('aria-label', label);
    action.append(createIcon(document, name, { sidebarTab: true }));
    return action;
  };

  const theme = document.createElement('button');
  theme.type = 'button';
  theme.className = 'wex-admin-shell__sidebar-tab wex-admin-shell__nav-sub-action';
  theme.dataset.themeToggle = '';
  theme.setAttribute('aria-pressed', 'false');
  theme.setAttribute('aria-label', 'Switch to dark theme');
  theme.append(
    createIcon(document, 'moon', { sidebarTab: true, className: 'wex-admin-shell__theme-icon--moon' }),
    createIcon(document, 'sun', { sidebarTab: true, className: 'wex-admin-shell__theme-icon--sun' }),
  );
  navigation.append(
    theme,
    createSubAction('notification', 'Notifications', 'notificationsAction'),
  );
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
 * @param {HTMLElement} location
 * @param {HTMLElement} search
 */
function observeSearchAvailability(navigation, actions, location, search) {
  const sync = () => {
    search.hidden = false;
    const navigationBounds = navigation.getBoundingClientRect();
    const searchBounds = search.getBoundingClientRect();
    search.hidden = actions.scrollWidth > actions.clientWidth
      || searchBounds.right > navigationBounds.right
      || location.scrollWidth > location.clientWidth;
  };

  sync();
  const ResizeObserverConstructor = navigation.ownerDocument.defaultView?.ResizeObserver;
  if (ResizeObserverConstructor) {
    const observer = new ResizeObserverConstructor(sync);
    observer.observe(navigation);
    observer.observe(actions);
    observer.observe(location);
  }
  const MutationObserverConstructor = navigation.ownerDocument.defaultView?.MutationObserver;
  if (MutationObserverConstructor) {
    const observer = new MutationObserverConstructor(sync);
    observer.observe(location, { childList: true, characterData: true, subtree: true });
  }
}

/**
 * Mounts the Header's right-side navigation actions as one three-region component:
 * Search, scrollable sidebar-scale sub-actions, and a logo-scale primary action.
 * @param {HTMLElement} shell
 * @param {{ primaryActionProperties?: import('@weerax/schemas').HeaderPrimaryActionPresentationPropertiesInput }} [options]
 */
export function mountHeaderNavActions(shell, options = {}) {
  const actions = shell.querySelector('[data-header-nav-actions]');
  const navigation = shell.querySelector('.wex-admin-shell__navigation');
  const location = shell.querySelector('[data-admin-station-location]');
  if (!(actions instanceof HTMLElement) || !(navigation instanceof HTMLElement) || !(location instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  const primary = createPrimaryAction(document, options.primaryActionProperties);
  const subActions = createSubActions(document);
  const search = createSearch(document);
  actions.replaceChildren(search, subActions, primary);
  const notificationsAction = subActions.querySelector('[data-notifications-action]');
  if (notificationsAction instanceof HTMLButtonElement) mountHeaderNotifications(shell, notificationsAction);
  mountHeaderProfile(shell, primary);
  observeSearchAvailability(navigation, actions, location, search);
}
