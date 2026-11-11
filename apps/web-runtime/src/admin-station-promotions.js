import { createMoreActionIcon, createSystemIcon } from './admin-station-system-icons.js';

/** @typedef {{ id: string, title: string, owner: string, period: string, audience: string }} Promotion */

/** @type {ReadonlyArray<Promotion>} */
const promotionFixture = Object.freeze([
  { id: 'custom-quote', title: 'Custom Quote', owner: 'Jake Harper', period: 'Jan 10, 2024 – Jan 31, 2024', audience: 'Enterprise Customers' },
  { id: 'confirm-quote', title: 'Confirm Quote', owner: 'Amanda Collins', period: 'Feb 1, 2024 – Feb 29, 2024', audience: 'Existing Customers' },
]);

/** @param {Document} document @param {keyof HTMLElementTagNameMap} tag @param {string} className @param {string} [text] */
function node(document, tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export const PROMOTION_ACTION_EVENT = 'wex:admin-promotion-action';

/** @type {WeakSet<Document>} */
const listening = new WeakSet();

/** Closes every open promotion options menu. @param {Document} document */
function closePromotionMenus(document) {
  document.querySelectorAll('.wex-admin-promotion__menu-list').forEach((list) => {
    if (!(list instanceof HTMLElement) || list.hidden) return;
    list.hidden = true;
    list.parentElement?.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false');
  });
}

/** Closes the menus on an outside click or Escape, once per document. @param {Document} document */
function listenForMenuDismissal(document) {
  if (listening.has(document)) return;
  listening.add(document);
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.wex-admin-promotion__menu')) closePromotionMenus(document);
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePromotionMenus(document); });
}

/**
 * One running promotion or campaign: its name, owner, period and audience, with
 * a Small Option Button at the top right, inline with the name. The button opens
 * a small menu with View and Edit; choosing one announces
 * `wex:admin-promotion-action` (`{ id, action }`) from the card.
 * @param {Document} document @param {Promotion} promotion
 */
function createPromotion(document, promotion) {
  listenForMenuDismissal(document);
  const card = node(document, 'article', 'wex-admin-promotion');
  const header = node(document, 'header', 'wex-admin-promotion__header');
  const tag = node(document, 'span', 'wex-admin-promotion__icon');
  tag.append(createSystemIcon(document, 'tag'));
  header.append(tag, node(document, 'h3', 'wex-admin-promotion__title wex-type-navigation-small-semibold', promotion.title));
  const details = node(document, 'ul', 'wex-admin-promotion__details');
  /** @type {ReadonlyArray<readonly ['user' | 'calendar' | 'layers', string]>} */
  const rows = [['user', promotion.owner], ['calendar', promotion.period], ['layers', promotion.audience]];
  rows.forEach(([icon, text]) => {
    const row = node(document, 'li', 'wex-admin-promotion__detail');
    const glyph = node(document, 'span', 'wex-admin-promotion__icon wex-type-body-small-regular');
    glyph.append(createSystemIcon(document, icon));
    row.append(glyph, node(document, 'span', 'wex-type-body-small-regular', text));
    details.append(row);
  });
  const more = node(document, 'button', 'wex-button wex-button--small wex-button--subtle wex-option-button--small wex-admin-promotion__more');
  more.setAttribute('type', 'button');
  more.setAttribute('aria-label', `${promotion.title} options`);
  more.setAttribute('aria-haspopup', 'menu');
  more.setAttribute('aria-expanded', 'false');
  more.append(createMoreActionIcon(document, 'small'));
  const list = node(document, 'div', 'wex-dropdown-menu--small wex-admin-promotion__menu-list');
  list.setAttribute('role', 'menu');
  list.hidden = true;
  [['view', 'View'], ['edit', 'Edit']].forEach(([action, label]) => {
    const item = node(document, 'button', 'wex-dropdown-menu__item--small', label);
    item.setAttribute('type', 'button');
    item.setAttribute('role', 'menuitem');
    item.addEventListener('click', () => {
      closePromotionMenus(document);
      card.dispatchEvent(new CustomEvent(PROMOTION_ACTION_EVENT, { bubbles: true, detail: { id: promotion.id, action } }));
    });
    list.append(item);
  });
  more.addEventListener('click', () => {
    const open = list.hidden;
    closePromotionMenus(document);
    list.hidden = !open;
    more.setAttribute('aria-expanded', String(open));
  });
  const menu = node(document, 'div', 'wex-admin-promotion__menu');
  menu.append(more, list);
  header.append(menu);
  card.append(header, details);
  return card;
}

/**
 * The running promotions as cards, two to a row.
 * @param {Document} document
 * @param {ReadonlyArray<Promotion>} [promotions]
 * @returns {HTMLElement}
 */
export function createPromotionCards(document, promotions = promotionFixture) {
  const list = node(document, 'div', 'wex-admin-promotions__list');
  list.append(...promotions.map((promotion) => createPromotion(document, promotion)));
  return list;
}

/**
 * Promotions: what promotions and campaigns are running, with the active count
 * and a See All control.
 * @param {HTMLElement} shell
 * @param {{ promotions?: ReadonlyArray<Promotion>, titleId?: string }} [config]
 * @returns {HTMLElement}
 */
export function createPromotionsModule(shell, config = {}) {
  const document = shell.ownerDocument;
  const promotions = config.promotions ?? promotionFixture;
  const titleId = config.titleId ?? 'wex-admin-promotions-title';
  const section = node(document, 'section', 'wex-admin-promotions');
  section.setAttribute('aria-labelledby', titleId);
  const header = node(document, 'header', 'wex-admin-promotions__header');
  const heading = node(document, 'div', 'wex-admin-promotions__heading');
  const title = node(document, 'h2', 'wex-component-title', 'Promotions');
  title.id = titleId;
  heading.append(title, node(document, 'span', 'wex-admin-promotions__count wex-type-navigation-small-semibold', `${promotions.length} active`));
  const seeAll = node(document, 'button', 'wex-button wex-button--small wex-button--subtle', 'See All');
  seeAll.setAttribute('type', 'button');
  header.append(heading, seeAll);
  section.append(header, createPromotionCards(document, promotions));
  return section;
}

/** How many promotions are running in the preview data. */
export const activePromotionCount = promotionFixture.length;

/**
 * The Promotions label row: the label, how many promotions are active (a green
 * Active pill with the count in a small circle on its top right corner, or
 * "No active promotions"), and a subtle See all
 * button at the end of the row, disabled when nothing is active.
 * @param {Document} document
 * @param {number} activeCount
 * @returns {HTMLElement}
 */
export function createPromotionsHeading(document, activeCount) {
  const row = node(document, 'div', 'wex-admin-promotions-heading');
  const start = node(document, 'div', 'wex-admin-promotions-heading__start');
  start.append(node(document, 'h2', 'wex-type-navigation-small-semibold', 'Promotions'));
  if (activeCount > 0) {
    const status = node(document, 'span', 'wex-admin-promotions-heading__status');
    status.append(
      node(document, 'span', 'wex-pill-notification-status wex-pill-notification-status--active', 'Active'),
      node(document, 'span', 'wex-admin-promotions-heading__count wex-type-body-small-regular', String(activeCount)),
    );
    start.append(status);
  } else {
    start.append(node(document, 'span', 'wex-type-body-small-regular', 'No active promotions'));
  }
  const seeAll = node(document, 'button', 'wex-button wex-button--small wex-button--subtle', 'See all');
  seeAll.setAttribute('type', 'button');
  if (activeCount <= 0) seeAll.setAttribute('disabled', '');
  row.append(start, seeAll);
  return row;
}
