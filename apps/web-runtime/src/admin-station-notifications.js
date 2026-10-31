import { closeHeaderResultsShell, requestHeaderResultsShell } from './admin-station-header-results.js';
import { createMoreActionIcon } from './admin-station-system-icons.js';

const NOTIFICATIONS_OWNER = 'notifications';

/** @typedef {'booking' | 'enquiry' | 'order' | 'payment' | 'proposal' | 'warning'} NotificationIconName */

/**
 * @typedef {{
 *   id: string,
 *   icon: NotificationIconName,
 *   title: string,
 *   description: string,
 *   time: string,
 *   sortIndex: number,
 *   unread: boolean,
 *   actionRequired: boolean,
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
    sortIndex: 7,
    unread: true,
    actionRequired: false,
  },
  {
    id: 'booking',
    icon: 'booking',
    title: 'Booking requires confirmation',
    description: 'Consultation · Liam Parker',
    time: '12m',
    sortIndex: 6,
    unread: true,
    actionRequired: true,
  },
  {
    id: 'booking-confirmed',
    icon: 'booking',
    title: 'Booking confirmed',
    description: 'Discovery call · Ethan Roberts',
    time: 'Yesterday',
    sortIndex: 2,
    unread: false,
    actionRequired: false,
  },
  {
    id: 'payment',
    icon: 'payment',
    title: 'Payment received · $550.00',
    description: 'Invoice #INV-1082 · Stripe',
    time: '38m',
    sortIndex: 5,
    unread: true,
    actionRequired: false,
  },
  {
    id: 'renewal',
    icon: 'warning',
    title: 'Domain renewal approaching',
    description: 'Your domain renews in 7 days',
    time: '1h',
    sortIndex: 4,
    unread: true,
    actionRequired: true,
  },
  {
    id: 'enquiry',
    icon: 'enquiry',
    title: 'New customer enquiry',
    description: 'Sophia Williams · Website support',
    time: '2h',
    sortIndex: 3,
    unread: false,
    actionRequired: true,
  },
  {
    id: 'proposal',
    icon: 'proposal',
    title: 'Proposal review due tomorrow',
    description: 'Gym Website project',
    time: 'Yesterday',
    sortIndex: 1,
    unread: false,
    actionRequired: true,
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
  svg.classList.add('wex-admin-notifications__icon-svg');
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

/** @param {Document} document @param {string} label */
function createNotificationOption(document, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wex-admin-notifications__tab wex-admin-notifications__tab--small-dropdown wex-admin-notifications__option';
  button.textContent = label;
  return button;
}

/** @param {Document} document @param {string} label */
function createNotificationTab(document, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wex-admin-notifications__tab';
  button.setAttribute('aria-pressed', 'false');
  button.textContent = label;
  return button;
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
  let sort = 'newest';
  /** @type {string | null} */
  let openItemMenuId = null;
  /** @type {'up' | 'down' | null} */
  let openItemMenuDirection = null;

  const panel = document.createElement('section');
  panel.className = 'wex-admin-notifications';
  panel.setAttribute('aria-labelledby', 'wex-admin-notifications-title');

  const header = document.createElement('header');
  header.className = 'wex-admin-notifications__header';
  const heading = document.createElement('div');
  heading.className = 'wex-admin-notifications__heading';
  const title = document.createElement('h2');
  title.id = 'wex-admin-notifications-title';
  title.className = 'wex-type-navigation-large-semibold';
  title.textContent = 'Notifications';
  const count = element(document, '', 'wex-admin-notifications__count wex-type-navigation-small-semibold');
  heading.append(title, count);

  const headerActions = document.createElement('div');
  headerActions.className = 'wex-admin-notifications__header-actions';
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'wex-button wex-button--small wex-button--subtle wex-admin-notifications__more';
  more.setAttribute('aria-label', 'Notification options');
  more.setAttribute('aria-expanded', 'false');
  more.append(createMoreActionIcon(document, 'small'));
  const options = document.createElement('div');
  options.className = 'wex-admin-notifications__options';
  options.hidden = true;
  const newestFirst = createNotificationTab(document, 'Newest first');
  newestFirst.dataset.notificationSort = 'newest';
  const oldestFirst = createNotificationTab(document, 'Oldest first');
  oldestFirst.dataset.notificationSort = 'oldest';
  const priorityFirst = createNotificationTab(document, 'Priority first');
  priorityFirst.dataset.notificationSort = 'priority';
  [newestFirst, oldestFirst, priorityFirst].forEach((button) => button.classList.add('wex-admin-notifications__tab--small-dropdown'));
  const sortButtons = [newestFirst, oldestFirst, priorityFirst];
  options.append(newestFirst, oldestFirst, priorityFirst);
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
    button.className = 'wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal';
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
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'wex-button wex-button--small wex-button--neutral';
  close.textContent = 'Close';
  const markAllRead = document.createElement('button');
  markAllRead.type = 'button';
  markAllRead.className = 'wex-button wex-button--small wex-button--primary';
  markAllRead.textContent = 'Mark all as read';
  footer.append(close, markAllRead);

  panel.append(header, list, footer);
  const wrapper = document.createElement('div');
  wrapper.className = 'wex-admin-notifications__wrapper';
  wrapper.append(panel);
  results.replaceChildren(wrapper);

  const closeOptions = () => {
    options.hidden = true;
    more.setAttribute('aria-expanded', 'false');
  };

  /** @param {Notification} notification */
  const matchesFilter = (notification) => filter === 'all'
    || (filter === 'unread' && notification.unread)
    || (filter === 'action-required' && notification.actionRequired);

  /** @param {Notification} left @param {Notification} right */
  const compareNotifications = (left, right) => {
    if (left.unread !== right.unread) return Number(right.unread) - Number(left.unread);
    if (sort === 'oldest') return left.sortIndex - right.sortIndex;
    if (sort === 'priority' && left.actionRequired !== right.actionRequired) {
      return Number(right.actionRequired) - Number(left.actionRequired);
    }
    return right.sortIndex - left.sortIndex;
  };

  const render = () => {
    const unreadCount = notifications.filter((notification) => notification.unread).length;
    count.textContent = `${unreadCount} new`;
    count.classList.toggle('wex-admin-notifications__count--empty', unreadCount === 0);
    markAllRead.disabled = unreadCount === 0;
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.notificationFilter === filter));
    });
    sortButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.notificationSort === sort));
    });

    const filtered = notifications.filter(matchesFilter).sort(compareNotifications);
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
      item.dataset.notificationItemMenuOpen = String(openItemMenuId === notification.id);
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

      const meta = document.createElement('div');
      meta.className = 'wex-admin-notifications__meta';
      const timeRow = document.createElement('div');
      timeRow.className = 'wex-admin-notifications__time-row';
      timeRow.append(element(document, notification.time, 'wex-admin-notifications__time wex-type-body-small-regular'));
      /** @type {HTMLSpanElement | null} */
      let unreadIndicator = null;
      if (notification.unread) {
        const indicator = document.createElement('span');
        indicator.className = 'wex-admin-notifications__unread-indicator';
        indicator.setAttribute('aria-label', 'Unread');
        unreadIndicator = indicator;
        notificationTitle.prepend(unreadIndicator);
      }
      content.append(timeRow);
      const itemMenu = document.createElement('div');
      itemMenu.className = 'wex-admin-notifications__item-menu';
      itemMenu.dataset.notificationItemMenuDirection = openItemMenuId === notification.id
        ? openItemMenuDirection ?? 'down'
        : '';
      const itemMenuToggle = document.createElement('button');
      itemMenuToggle.type = 'button';
      itemMenuToggle.className = 'wex-button wex-button--small wex-button--subtle wex-admin-notifications__item-menu-toggle';
      itemMenuToggle.dataset.notificationItemMenuToggle = notification.id;
      itemMenuToggle.setAttribute('aria-label', `Notification actions for ${notification.title}`);
      itemMenuToggle.setAttribute('aria-expanded', String(openItemMenuId === notification.id));
      itemMenuToggle.append(createMoreActionIcon(document, 'small'));
      const itemMenuOptions = document.createElement('div');
      itemMenuOptions.className = 'wex-admin-notifications__item-menu-options';
      itemMenuOptions.dataset.notificationItemMenu = notification.id;
      itemMenuOptions.hidden = openItemMenuId !== notification.id;
      const view = createNotificationOption(document, 'View');
      view.dataset.notificationItemAction = 'view';
      view.dataset.notificationId = notification.id;
      const readState = createNotificationOption(document, notification.unread ? 'Read' : 'Unread');
      readState.dataset.notificationItemAction = notification.unread ? 'read' : 'unread';
      readState.dataset.notificationId = notification.id;
      itemMenuOptions.append(view, readState);
      itemMenu.append(itemMenuToggle, itemMenuOptions);
      meta.append(itemMenu);

      item.append(content, meta);
      list.append(item);
    });
  };

  markAllRead.addEventListener('click', () => {
    notifications.forEach((notification) => { notification.unread = false; });
    closeOptions();
    render();
  });
  more.addEventListener('click', () => {
    options.hidden = !options.hidden;
    more.setAttribute('aria-expanded', String(!options.hidden));
  });
  options.addEventListener('click', (event) => {
    const button = event.target instanceof Element
      ? event.target.closest('[data-notification-sort]')
      : null;
    if (!(button instanceof HTMLButtonElement)) return;
    sort = button.dataset.notificationSort ?? 'newest';
    closeOptions();
    render();
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !headerActions.contains(event.target)) closeOptions();
    const target = event.target instanceof Element ? event.target : null;
    if (openItemMenuId !== null && !target?.closest('[data-notification-item-menu]')) {
      openItemMenuId = null;
      openItemMenuDirection = null;
      render();
    }
  });
  list.addEventListener('scroll', () => {
    header.classList.toggle('wex-admin-notifications__header--scrolled', list.scrollTop > 0);
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
    event.stopPropagation();
    const target = event.target instanceof Element ? event.target : null;
    if (openItemMenuId !== null && !target?.closest('[data-notification-item-menu]')) {
      openItemMenuId = null;
      render();
      return;
    }
    const button = target
      ? target.closest('button')
      : null;
    if (!(button instanceof HTMLButtonElement)) return;
    const menuId = button.dataset.notificationItemMenuToggle;
    if (menuId) {
      if (openItemMenuId === menuId) {
        openItemMenuId = null;
        openItemMenuDirection = null;
      } else {
        const item = button.closest('.wex-admin-notifications__item');
        const itemBounds = item?.getBoundingClientRect();
        const listBounds = list.getBoundingClientRect();
        openItemMenuId = menuId;
        openItemMenuDirection = itemBounds && listBounds.bottom - itemBounds.bottom >= itemBounds.height
          ? 'down'
          : 'up';
      }
      render();
      return;
    }
    const action = button.dataset.notificationItemAction;
    if (!action) return;
    const notification = notifications.find((entry) => entry.id === button.dataset.notificationId);
    if (!notification) return;
    notification.unread = action === 'unread';
    openItemMenuId = null;
    openItemMenuDirection = null;
    render();
  });
  close.addEventListener('click', () => { closeHeaderResultsShell(shell); });
  trigger.addEventListener('click', () => {
    if (results.dataset.headerResultsOwner !== NOTIFICATIONS_OWNER) results.replaceChildren(wrapper);
    requestHeaderResultsShell(shell, {
      owner: NOTIFICATIONS_OWNER,
      inlineSize: 'min(calc(var(--wex-space-64) * 7), 100%)',
      blockSize: 'min(calc(var(--wex-space-64) * 8), calc(100dvh - var(--wex-admin-shell-header-size)))',
    }, trigger);
  });
  render();
}
