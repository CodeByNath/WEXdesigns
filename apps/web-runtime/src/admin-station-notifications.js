import { requestHeaderResultsShell } from './admin-station-header-results.js';

const NOTIFICATIONS_OWNER = 'notifications';

/** @typedef {'booking' | 'enquiry' | 'order' | 'payment' | 'proposal' | 'warning'} NotificationIconName */

/**
 * @typedef {{
 *   id: string,
 *   icon: NotificationIconName,
 *   title: string,
 *   description: string,
 *   time: string,
 *   unread: boolean,
 *   actionRequired: boolean,
 *   actionLabel?: string,
 * }} Notification
 */

/** @type {ReadonlyArray<Notification>} */
const notificationFixture = Object.freeze([
  {
    id: 'order',
    icon: 'order',
    title: 'New order received',
    description: '#ORD-2048 · Olivia Bennett',
    time: '2m',
    unread: true,
    actionRequired: false,
  },
  {
    id: 'booking',
    icon: 'booking',
    title: 'Booking requires confirmation',
    description: 'Consultation · Liam Parker',
    time: '12m',
    unread: true,
    actionRequired: true,
    actionLabel: 'Review booking',
  },
  {
    id: 'booking-confirmed',
    icon: 'booking',
    title: 'Booking confirmed',
    description: 'Discovery call · Ethan Roberts',
    time: 'Yesterday',
    unread: false,
    actionRequired: false,
  },
  {
    id: 'payment',
    icon: 'payment',
    title: 'Payment received · $550.00',
    description: 'Invoice #INV-1082 · Stripe',
    time: '38m',
    unread: true,
    actionRequired: false,
  },
  {
    id: 'renewal',
    icon: 'warning',
    title: 'Domain renewal approaching',
    description: 'Your domain renews in 7 days',
    time: '1h',
    unread: true,
    actionRequired: true,
    actionLabel: 'Resolve now',
  },
  {
    id: 'enquiry',
    icon: 'enquiry',
    title: 'New customer enquiry',
    description: 'Sophia Williams · Website support',
    time: '2h',
    unread: false,
    actionRequired: true,
    actionLabel: 'View enquiry',
  },
  {
    id: 'proposal',
    icon: 'proposal',
    title: 'Proposal review due tomorrow',
    description: 'Gym Website project',
    time: 'Yesterday',
    unread: false,
    actionRequired: true,
    actionLabel: 'View task',
  },
]);

/** @type {Record<NotificationIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const notificationIconShapes = {
  order: [
    ['path', { d: 'M5.25 7.5h13.5l-.75 12H6z' }],
    ['path', { d: 'M8.25 8V6a3.75 3.75 0 0 1 7.5 0v2' }],
  ],
  booking: [
    ['rect', { x: '4.5', y: '5.25', width: '15', height: '14.25', rx: '1.5' }],
    ['path', { d: 'M8.25 3.75v3M15.75 3.75v3M4.5 9.75h15M8.25 13.5h.01M12 13.5h.01M15.75 13.5h.01M8.25 16.5h.01M12 16.5h.01' }],
  ],
  payment: [
    ['path', { d: 'M14.75 8.5c-.55-.75-1.55-1.25-2.75-1.25-1.8 0-3.25 1.12-3.25 2.5 0 1.35 1.25 2.08 3.25 2.5 2 .42 3.25 1.15 3.25 2.5 0 1.38-1.45 2.5-3.25 2.5-1.2 0-2.2-.5-2.75-1.25' }],
    ['path', { d: 'M12 5.25v13.5' }],
  ],
  warning: [
    ['path', { d: 'm12 4.5 8.25 14.25H3.75L12 4.5Z' }],
    ['path', { d: 'M12 9.25v4.5M12 16.5h.01' }],
  ],
  enquiry: [
    ['path', { d: 'M5.25 6.75h13.5v9H10.5l-4.5 3v-3H5.25z' }],
    ['path', { d: 'M8.25 10.5h7.5M8.25 13.5h4.5' }],
  ],
  proposal: [
    ['path', { d: 'M7.5 3.75h6l3 3v13.5h-9z' }],
    ['path', { d: 'M13.5 3.75v3h3M9.75 11.25h4.5M9.75 14.25h4.5' }],
  ],
};

/** @param {Document} document @param {string} text @param {string} className */
function element(document, text, className) {
  const node = document.createElement('span');
  node.className = className;
  node.textContent = text;
  return node;
}

/** @param {Document} document @param {NotificationIconName} name */
function createNotificationIcon(document, name) {
  const visual = document.createElement('span');
  visual.className = 'wex-admin-notifications__icon';
  visual.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  notificationIconShapes[name].forEach(([shape, attributes]) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', shape);
    Object.entries(attributes).forEach(([attribute, value]) => node.setAttribute(attribute, value));
    svg.append(node);
  });
  visual.append(svg);
  return visual;
}

/** @param {Document} document */
function createMoreIcon(document) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  ['6', '12', '18'].forEach((cx) => {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', '12');
    dot.setAttribute('r', '1.5');
    svg.append(dot);
  });
  return svg;
}

/**
 * Mounts the local Notifications Results component. Its fixture and transient
 * read/filter state stay within this component; Header Results owns only its
 * anchored surface.
 * @param {HTMLElement} shell
 * @param {HTMLButtonElement} trigger
 */
export function mountHeaderNotifications(shell, trigger) {
  const results = shell.querySelector('[data-header-results-shell]');
  if (!(results instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  const notifications = notificationFixture.map((notification) => ({ ...notification }));
  let filter = 'all';

  const panel = document.createElement('section');
  panel.className = 'wex-admin-notifications';
  panel.setAttribute('aria-labelledby', 'wex-admin-notifications-title');

  const header = document.createElement('header');
  header.className = 'wex-admin-notifications__header';
  const heading = document.createElement('div');
  heading.className = 'wex-admin-notifications__heading';
  const title = document.createElement('h2');
  title.id = 'wex-admin-notifications-title';
  title.className = 'wex-type-title-default-semibold';
  title.textContent = 'Notifications';
  const count = element(document, '', 'wex-admin-notifications__count wex-type-navigation-default-semibold');
  heading.append(title, count);

  const headerActions = document.createElement('div');
  headerActions.className = 'wex-admin-notifications__header-actions';
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'wex-button wex-button--small wex-button--neutral wex-admin-notifications__more';
  more.setAttribute('aria-label', 'Notification options');
  more.setAttribute('aria-expanded', 'false');
  more.append(createMoreIcon(document));
  const options = document.createElement('div');
  options.className = 'wex-admin-notifications__options';
  options.hidden = true;
  const markAllRead = document.createElement('button');
  markAllRead.type = 'button';
  markAllRead.className = 'wex-button wex-button--small wex-button--subtle';
  markAllRead.textContent = 'Mark all read';
  options.append(markAllRead);
  headerActions.append(more, options);

  const filters = document.createElement('nav');
  filters.className = 'wex-admin-notifications__filters';
  filters.setAttribute('aria-label', 'Notification filters');
  /** @type {ReadonlyArray<readonly [string, string]>} */
  const filterInputs = [
    ['all', 'All'],
    ['unread', 'Unread'],
    ['action-required', 'Action required'],
  ];
  const filterButtons = filterInputs.map(([value, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wex-button wex-button--small wex-button--subtle wex-admin-notifications__filter';
    button.dataset.notificationFilter = value;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = label;
    return button;
  });
  filters.append(...filterButtons);
  header.append(heading, headerActions, filters);

  const list = document.createElement('div');
  list.className = 'wex-admin-notifications__list';
  list.setAttribute('aria-live', 'polite');

  const footer = document.createElement('footer');
  footer.className = 'wex-admin-notifications__footer';
  const viewAll = document.createElement('button');
  viewAll.type = 'button';
  viewAll.className = 'wex-button wex-button--default wex-button--subtle';
  viewAll.textContent = 'View all notifications';
  footer.append(viewAll);

  panel.append(header, list, footer);
  const wrapper = document.createElement('div');
  wrapper.className = 'wex-admin-notifications__wrapper';
  wrapper.append(panel);
  results.replaceChildren(wrapper);

  /** @param {Notification} notification */
  const matchesFilter = (notification) => filter === 'all'
    || (filter === 'unread' && notification.unread)
    || (filter === 'action-required' && notification.actionRequired);

  const render = () => {
    const unreadCount = notifications.filter((notification) => notification.unread).length;
    count.textContent = `${unreadCount} new`;
    markAllRead.disabled = unreadCount === 0;
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.notificationFilter === filter));
    });

    const filtered = notifications.filter(matchesFilter);
    list.replaceChildren();
    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'wex-admin-notifications__empty wex-type-body-default-regular';
      empty.textContent = 'You’re all caught up.';
      list.append(empty);
      return;
    }

    const group = document.createElement('p');
    group.className = 'wex-admin-notifications__group wex-type-navigation-small-semibold';
    group.textContent = filter === 'action-required' ? 'Needs your attention' : 'Recent activity';
    list.append(group);

    filtered.forEach((notification) => {
      const item = document.createElement('article');
      item.className = 'wex-admin-notifications__item';
      item.dataset.unread = String(notification.unread);
      item.append(createNotificationIcon(document, notification.icon));

      const content = document.createElement('div');
      content.className = 'wex-admin-notifications__content';
      const notificationTitle = document.createElement('h3');
      notificationTitle.className = 'wex-type-navigation-small-semibold';
      notificationTitle.textContent = notification.title;
      const description = document.createElement('p');
      description.className = 'wex-admin-notifications__description wex-type-body-small-regular';
      description.textContent = notification.description;
      content.append(notificationTitle, description);

      if (notification.actionLabel) {
        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'wex-button wex-button--small wex-button--neutral';
        action.dataset.notificationAction = notification.id;
        action.textContent = `${notification.actionLabel} →`;
        content.append(action);
      }

      const meta = document.createElement('div');
      meta.className = 'wex-admin-notifications__meta';
      meta.append(element(document, notification.time, 'wex-admin-notifications__time wex-type-body-small-regular'));
      if (notification.unread) {
        const indicator = document.createElement('span');
        indicator.className = 'wex-admin-notifications__unread-indicator';
        indicator.setAttribute('aria-label', 'Unread');
        meta.append(indicator);
      }

      item.append(content, meta);
      list.append(item);
    });
  };

  markAllRead.addEventListener('click', () => {
    notifications.forEach((notification) => { notification.unread = false; });
    options.hidden = true;
    more.setAttribute('aria-expanded', 'false');
    render();
  });
  more.addEventListener('click', () => {
    options.hidden = !options.hidden;
    more.setAttribute('aria-expanded', String(!options.hidden));
  });
  filters.addEventListener('click', (event) => {
    const button = event.target instanceof Element
      ? event.target.closest('[data-notification-filter]')
      : null;
    if (!(button instanceof HTMLButtonElement)) return;
    filter = button.dataset.notificationFilter ?? 'all';
    render();
  });
  list.addEventListener('click', (event) => {
    const button = event.target instanceof Element
      ? event.target.closest('[data-notification-action]')
      : null;
    if (!(button instanceof HTMLButtonElement)) return;
    const notification = notifications.find((entry) => entry.id === button.dataset.notificationAction);
    if (!notification) return;
    notification.unread = false;
    render();
  });
  viewAll.addEventListener('click', () => {
    filter = 'all';
    list.scrollTop = 0;
    render();
  });
  trigger.addEventListener('click', () => {
    requestHeaderResultsShell(shell, {
      owner: NOTIFICATIONS_OWNER,
      inlineSize: 'min(calc(var(--wex-space-64) * 7), 100%)',
      blockSize: 'min(calc(var(--wex-space-64) * 8), calc(100dvh - var(--wex-admin-shell-header-size)))',
    }, trigger);
  });
  render();
}
