import { closeHeaderResultsShell, requestHeaderResultsShell } from './admin-station-header-results.js';

const PROFILE_OWNER = 'profile';

/** @typedef {'account' | 'language' | 'settings' | 'sign-out' | 'support'} ProfileActionIconName */

/** @type {Record<ProfileActionIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const profileActionIconShapes = {
  account: [
    ['circle', { cx: '12', cy: '8.25', r: '3.25' }],
    ['path', { d: 'M5.25 20.25a6.75 6.75 0 0 1 13.5 0' }],
  ],
  settings: [
    ['circle', { cx: '12', cy: '12', r: '3' }],
    ['path', { d: 'M12 3.75v1.5m0 13.5v1.5m8.25-8.25h-1.5m-13.5 0h-1.5m14.08-5.83-1.06 1.06M6.72 17.78l-1.06 1.06m13.67 0-1.06-1.06M6.72 6.22 5.66 5.16' }],
  ],
  support: [
    ['circle', { cx: '12', cy: '12', r: '8.25' }],
    ['path', { d: 'M12 10.5v5.25m0-8.25h.01' }],
  ],
  language: [
    ['circle', { cx: '12', cy: '12', r: '8.25' }],
    ['path', { d: 'M3.75 12h16.5M12 3.75c2.1 2.25 3.15 5 3.15 8.25S14.1 18 12 20.25C9.9 18 8.85 15.25 8.85 12S9.9 6 12 3.75Z' }],
  ],
  'sign-out': [
    ['path', { d: 'M9.75 4.5h-4.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h4.5' }],
    ['path', { d: 'm14.25 8.25 3.75 3.75-3.75 3.75m3.75-3.75H8.25' }],
  ],
};

/** @param {Document} document @param {ProfileActionIconName} name */
function createProfileIcon(document, name = 'account') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  profileActionIconShapes[name].forEach(([shape, attributes]) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', shape);
    Object.entries(attributes).forEach(([attribute, value]) => node.setAttribute(attribute, value));
    svg.append(node);
  });
  return svg;
}

/** @param {Document} document @param {ProfileActionIconName} icon @param {string} label @param {string} [detail] @param {boolean} [includeIcon] */
function createUnavailableAction(document, icon, label, detail = '', includeIcon = true) {
  const action = document.createElement('button');
  action.type = 'button';
  action.disabled = true;
  action.className = 'wex-button wex-button--small wex-button--subtle wex-admin-profile__action';
  const copy = document.createElement('span');
  copy.className = 'wex-admin-profile__action-copy';
  const actionLabel = document.createElement('span');
  actionLabel.className = 'wex-type-navigation-small-semibold';
  actionLabel.textContent = label;
  copy.append(actionLabel);
  if (detail) {
    const actionDetail = document.createElement('span');
    actionDetail.className = 'wex-admin-profile__action-detail wex-type-body-small-regular';
    actionDetail.textContent = detail;
    copy.append(actionDetail);
  }
  if (includeIcon) {
    const visual = document.createElement('span');
    visual.className = 'wex-admin-profile__action-icon';
    visual.setAttribute('aria-hidden', 'true');
    visual.append(createProfileIcon(document, icon));
    action.append(visual);
  }
  action.append(copy);
  return action;
}

/**
 * Mounts the Profile Results component. The Admin Station currently has no
 * authorised profile-data or account-action binding, so its honest missing
 * state is mounted until the host supplies that separate contract.
 * @param {HTMLElement} shell
 * @param {HTMLButtonElement} trigger
 */
export function mountHeaderProfile(shell, trigger) {
  const results = shell.querySelector('[data-header-results-shell]');
  if (!(results instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  const wrapper = document.createElement('div');
  wrapper.className = 'wex-admin-profile__wrapper';

  const panel = document.createElement('section');
  panel.id = 'wex-admin-profile';
  panel.className = 'wex-admin-profile';
  panel.setAttribute('aria-label', 'Profile menu');

  const content = document.createElement('div');
  content.className = 'wex-admin-profile__content';
  const identity = document.createElement('div');
  identity.className = 'wex-admin-profile__identity';
  const visual = document.createElement('span');
  visual.className = 'wex-admin-profile__identity-icon';
  visual.setAttribute('aria-hidden', 'true');
  visual.append(createProfileIcon(document));
  const copy = document.createElement('div');
  copy.className = 'wex-admin-profile__identity-copy';
  const heading = document.createElement('p');
  heading.className = 'wex-type-navigation-small-semibold';
  heading.textContent = 'Profile unavailable';
  const description = document.createElement('p');
  description.className = 'wex-type-body-small-regular';
  description.textContent = 'This host has not supplied profile information or account actions.';
  copy.append(heading, description);
  identity.append(visual, copy);
  content.append(identity);

  const actions = document.createElement('div');
  actions.className = 'wex-admin-profile__actions';
  actions.setAttribute('aria-label', 'Profile actions unavailable');
  actions.append(
    createUnavailableAction(document, 'account', 'Edit profile'),
    createUnavailableAction(document, 'settings', 'Account settings'),
    createUnavailableAction(document, 'support', 'Support'),
    createUnavailableAction(document, 'language', 'Language', 'Unavailable'),
  );
  const signOutActions = document.createElement('div');
  signOutActions.className = 'wex-admin-profile__actions wex-admin-profile__actions--separated';
  const signOut = createUnavailableAction(document, 'sign-out', 'Sign out', '', false);
  signOut.className = 'wex-button wex-button--small wex-button--neutral wex-admin-profile__sign-out';
  signOutActions.append(signOut);
  content.append(actions, signOutActions);

  panel.append(content);
  wrapper.append(panel);

  trigger.dataset.profileAction = '';
  trigger.setAttribute('aria-label', 'Toggle profile menu');
  trigger.setAttribute('aria-controls', panel.id);
  trigger.setAttribute('aria-expanded', 'false');

  const isOpen = () => !results.hidden && results.dataset.headerResultsOwner === PROFILE_OWNER;
  const syncTrigger = () => trigger.setAttribute('aria-expanded', String(isOpen()));
  const closeProfile = (restoreFocus = false) => {
    if (isOpen()) closeHeaderResultsShell(shell);
    syncTrigger();
    if (restoreFocus) trigger.focus();
  };

  trigger.addEventListener('click', () => {
    if (!isOpen()) results.replaceChildren(wrapper);
    requestHeaderResultsShell(shell, {
      owner: PROFILE_OWNER,
      inlineSize: 'min(calc(var(--wex-space-64) * 6), 100%)',
    }, trigger);
    syncTrigger();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    event.preventDefault();
    closeProfile(true);
  });
  document.addEventListener('click', () => { syncTrigger(); });
}
