import { createOptionsMenu } from './admin-station-promotions.js';
import { createSystemIcon } from './admin-station-system-icons.js';

/** @typedef {{ id: string, icon: 'tool' | 'cart' | 'user', title: string, time: string, description: string }} Activity */

/** Product activity in the preview data, most recent first. */
/** @type {ReadonlyArray<Activity>} */
const activityFixture = Object.freeze([
  { id: 'price-updated', icon: 'tool', title: 'Product price updated', time: 'Today, 10:24 AM', description: 'The price of PADI SCUBA Diver Course was updated.' },
  { id: 'order-created', icon: 'cart', title: 'New order created', time: 'Today, 9:41 AM', description: 'A new order was created for PADI SCUBA Diver Course.' },
  { id: 'new-review', icon: 'user', title: 'New review', time: 'Yesterday, 4:12 PM', description: 'A new review was left for PADI SCUBA Diver Course.' },
]);

/** How many recent activities the Drawer shows before See all. */
export const ACTIVITY_RECENT_COUNT = 2;

/** @param {Document} document @param {keyof HTMLElementTagNameMap} tag @param {string} className @param {string} [text] */
function node(document, tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/**
 * The Activity label row: the label and a subtle See all button at the end of
 * the row, disabled when nothing has been logged.
 * @param {Document} document
 * @param {number} [count]
 * @returns {HTMLElement}
 */
export function createActivityHeading(document, count = activityFixture.length) {
  const row = node(document, 'div', 'wex-admin-activity-heading');
  const title = node(document, 'h2', 'wex-type-navigation-small-semibold', 'Activity');
  const seeAll = node(document, 'button', 'wex-button wex-button--small wex-button--subtle', 'See all');
  seeAll.setAttribute('type', 'button');
  if (count <= 0) seeAll.setAttribute('disabled', '');
  row.append(title, seeAll);
  return row;
}

export const ACTIVITY_ACTION_EVENT = 'wex:admin-activity-action';

/**
 * One logged activity, in the Note card design: a header with an icon and the title at the
 * start and the time (calendar icon), a divider and a Small Option Button (View
 * and Edit, announcing `wex:admin-activity-action`) at the end, a line under
 * the header, then the description.
 * @param {Document} document @param {Activity} activity
 */
function createActivity(document, activity) {
  const card = node(document, 'article', 'wex-admin-activity');
  const header = node(document, 'header', 'wex-admin-activity__header');
  const heading = node(document, 'div', 'wex-admin-activity__heading');
  const mark = node(document, 'span', 'wex-admin-activity__icon wex-admin-activity__icon--title');
  mark.append(createSystemIcon(document, activity.icon));
  heading.append(mark, node(document, 'h3', 'wex-admin-activity__title wex-type-navigation-small-semibold', activity.title));
  header.append(heading);
  const end = node(document, 'div', 'wex-admin-activity__end');
  const time = node(document, 'p', 'wex-admin-activity__time wex-type-body-small-regular');
  const glyph = node(document, 'span', 'wex-admin-activity__icon');
  glyph.append(createSystemIcon(document, 'calendar'));
  time.append(glyph, node(document, 'span', '', activity.time));
  const menu = createOptionsMenu(document, card, { id: activity.id, label: activity.title, eventName: ACTIVITY_ACTION_EVENT });
  menu.classList.add('wex-admin-activity__menu');
  end.append(time, menu);
  header.append(end);
  card.append(header, node(document, 'p', 'wex-admin-activity__description wex-type-body-small-regular', activity.description));
  return card;
}

/**
 * The most recent activities as cards, one per row.
 * @param {Document} document
 * @param {ReadonlyArray<Activity>} [activities]
 * @returns {HTMLElement}
 */
export function createActivityCards(document, activities = activityFixture) {
  const list = node(document, 'div', 'wex-admin-activity__list');
  list.append(...activities.slice(0, ACTIVITY_RECENT_COUNT).map((activity) => createActivity(document, activity)));
  return list;
}

/** How many activities are logged in the preview data. */
export const activityCount = activityFixture.length;
