import { createSystemIcon } from './admin-station-system-icons.js';

/**
 * The Quick actions unit (connections shell, editor view only): the label, then the action cards below
 * it, one unit like Promotions and Activity (`.wex-admin-drawer-section`, so it takes the same spacing).
 * @param {Document} document
 */
export function createQuickActions(document) {
  const unit = document.createElement('section');
  unit.className = 'wex-admin-drawer-section';
  unit.dataset.adminDrawerUnit = 'quick-actions';
  unit.setAttribute('aria-label', 'Quick actions');
  const heading = document.createElement('h2');
  heading.className = 'wex-admin-quick-actions__heading wex-type-navigation-small-semibold';
  heading.textContent = 'Quick actions';
  unit.append(heading, createFormBuilderCard(document));
  return unit;
}

/**
 * The Form Builder action card (connections shell, editor view only): an icon tile, a title and a
 * short description, the whole card being the action. Clicking it toggles the builder: the whole form
 * and the product navigation drop to the disabled opacity and the element the pointer is over returns
 * to full opacity (`admin-station-form-builder.css`). `aria-pressed` carries the mode and the
 * stylesheet reads it, so the state lives in one place.
 * Built only from existing tokens; it is not a registered Global Component.
 * @param {Document} document
 */
function createFormBuilderCard(document) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'wex-admin-form-builder';
  card.dataset.adminFormBuilder = '';
  card.setAttribute('aria-pressed', 'false');
  const tile = document.createElement('span');
  tile.className = 'wex-admin-form-builder__tile';
  tile.append(createSystemIcon(document, 'columns'));
  const text = document.createElement('span');
  text.className = 'wex-admin-form-builder__text';
  const title = document.createElement('span');
  title.className = 'wex-admin-form-builder__title wex-type-navigation-small-semibold';
  title.textContent = 'Form Builder';
  const description = document.createElement('span');
  description.className = 'wex-admin-form-builder__description wex-type-body-small-regular';
  description.textContent = 'Choose a field or section to build.';
  text.append(title, description);
  card.append(tile, text);
  card.addEventListener('click', () => card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true')));
  return card;
}

/** The builder is off whenever the editor is left. @param {HTMLElement} drawer */
export function resetFormBuilder(drawer) {
  for (const card of drawer.querySelectorAll('[data-admin-form-builder]')) card.setAttribute('aria-pressed', 'false');
}
