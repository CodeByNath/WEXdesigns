import { requestHeaderResultsShell } from './admin-station-header-results.js';

const NOTIFICATIONS_OWNER = 'notifications';

/**
 * @typedef {{
 *   id: string,
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
    title: 'New order received',
    description: '#ORD-2048 · Olivia Bennett',
    time: '2m',
    unread: true,
    actionRequired: false,
  },
  {
    id: 'booking',
    title: 'Booking requires confirmation',
    description: 'Consultation · Liam Parker',
    time: '12m',
    unread: true,
    actionRequired: true,
    actionLabel: 'Review booking',
  },
  {
    id: 'booking-confirmed',
    title: 'Booking confirmed',
    description: 'Discovery call · Ethan Roberts',
    time: 'Yesterday',
    unread: false,
    actionRequired: false,
  },
  {
    id: 'payment',
    title: 'Payment received · $550.00',
    description: 'Invoice #INV-1082 · Stripe',
    time: '38m',
    unread: true,
    actionRequired: false,
  },
  {
    id: 'renewal',
    title: 'Domain renewal approaching',
    description: 'Your domain renews in 7 days',
    time: '1h',
    unread: true,
    actionRequired: true,
    actionLabel: 'Resolve now',
  },
  {
    id: 'enquiry',
    title: 'New customer enquiry',
    description: 'Sophia Williams · Website support',
    time: '2h',
    unread: false,
    actionRequired: true,
    actionLabel: 'View enquiry',
  },
  {
    id: 'proposal',
    title: 'Proposal review due tomorrow',
    description: 'Gym Website project',
    time: 'Yesterday',
    unread: false,
    actionRequired: true,
    actionLabel: 'View task',
  },
]);

/** @param {Document} document @param {string} text @param {string} className */
function element(document, text, className) {
  const node = document.createElement('span');
  node.className = className;
  node.textContent = text;
  return node;
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
  title.className = 'wex-type-title-small-regular';
  title.textContent = 'Notifications';
  const count = element(document, '', 'wex-admin-notifications__count wex-type-navigation-small-semibold');
  heading.append(title, count);
  const markAllRead = document.createElement('button');
  markAllRead.type = 'button';
  markAllRead.className = 'wex-button wex-button--small wex-button--subtle';
  markAllRead.textContent = 'Mark all read';
  header.append(heading, markAllRead);

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

  panel.append(header, filters, list, footer);
  results.replaceChildren(panel);

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
        action.textContent = notification.actionLabel;
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
    render();
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
