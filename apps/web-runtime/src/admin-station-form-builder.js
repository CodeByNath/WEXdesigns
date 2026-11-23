import { createSystemIcon } from './admin-station-system-icons.js';

/** The accordion sections of the General tab; they hold no content yet. */
const generalSections = ['Layout', 'Label'];

/**
 * The Quick actions unit (connections shell, editor view only): the label, then the action card below
 * it, one unit like Promotions and Activity (`.wex-admin-drawer-section`, so it takes the same spacing).
 * Once a form field is selected the unit becomes the Editor: the label reads Editor, the card hides and
 * the two Editor tabs show with the panel of the selected tab.
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
  const general = createGeneralPanel(document);
  const global = document.createElement('div');
  global.className = 'wex-admin-form-tab-panel';
  global.dataset.formTab = 'global';
  global.hidden = true;
  const panels = document.createElement('div');
  panels.className = 'wex-admin-form-tab-panels';
  panels.hidden = true;
  panels.append(general, global);
  unit.append(heading, createFormBuilderCard(document), createEditorTabs(document, panels), panels);
  return unit;
}

/**
 * The two Editor tabs (General and Global), shown right below the Editor label once a field is
 * selected. They are the existing Tab Navigation Toggle in its Stretched mode (the Notifications filter
 * look and its classes: the track spans its container, the tabs keep their position), one selected at a
 * time; each shows its own panel.
 * @param {Document} document @param {HTMLElement} panels
 */
function createEditorTabs(document, panels) {
  const tabs = document.createElement('nav');
  tabs.className = 'wex-admin-notifications__filters wex-admin-notifications__filters--toggle wex-admin-notifications__filters--toggle-stretched wex-admin-form-tabs';
  tabs.setAttribute('aria-label', 'Editor tabs');
  tabs.hidden = true;
  for (const [index, label] of ['General', 'Global'].entries()) {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal';
    tab.dataset.formTabFor = label.toLowerCase();
    tab.setAttribute('aria-pressed', String(index === 0));
    tab.textContent = label;
    tab.addEventListener('click', () => {
      for (const other of tabs.querySelectorAll('button')) other.setAttribute('aria-pressed', String(other === tab));
      for (const panel of panels.querySelectorAll('[data-form-tab]')) {
        if (panel instanceof HTMLElement) panel.hidden = panel.dataset.formTab !== tab.dataset.formTabFor;
      }
    });
    tabs.append(tab);
  }
  return tabs;
}

/**
 * The General tab: accordion sections (a header with a chevron and a title, a panel below it), one
 * line under each section. Each header opens and closes its own section.
 * @param {Document} document
 */
function createGeneralPanel(document) {
  const panel = document.createElement('div');
  panel.className = 'wex-admin-form-tab-panel';
  panel.dataset.formTab = 'general';
  for (const title of generalSections) {
    const section = document.createElement('div');
    section.className = 'wex-admin-accordion';
    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'wex-admin-accordion__header wex-type-navigation-small-semibold';
    header.setAttribute('aria-expanded', 'false');
    const body = document.createElement('div');
    body.className = 'wex-admin-accordion__panel';
    body.hidden = true;
    const label = document.createElement('span');
    label.textContent = title;
    const draw = () => header.replaceChildren(createSystemIcon(document, header.getAttribute('aria-expanded') === 'true' ? 'chevron-down' : 'chevron-right'), label);
    draw();
    header.addEventListener('click', () => {
      const open = header.getAttribute('aria-expanded') !== 'true';
      header.setAttribute('aria-expanded', String(open));
      body.hidden = !open;
      draw();
    });
    section.append(header, body);
    panel.append(section);
  }
  return panel;
}

/**
 * The Form Editor action card (connections shell, editor view only): an icon tile, a title and a
 * short description, the whole card being the action. Clicking it activates the builder: the whole form,
 * the product navigation and the footer drop to the disabled opacity, every value is locked and the field
 * the pointer is over returns to full opacity (`admin-station-form-builder.css`). `aria-pressed` carries
 * the mode and the stylesheet reads it, so the state lives in one place. Selecting a field then opens the
 * Editor in the same unit.
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
  title.textContent = 'Form Editor';
  const description = document.createElement('span');
  description.className = 'wex-admin-form-builder__description wex-type-body-small-regular';
  description.textContent = 'Choose a field or section to edit.';
  text.append(title, description);
  card.append(tile, text);
  card.addEventListener('click', () => setFormBuilder(card, card.getAttribute('aria-pressed') !== 'true'));
  return card;
}

/** @type {WeakSet<Element>} */
const listening = new WeakSet();

/** @param {Element} drawer */
function clearSelection(drawer) {
  for (const field of drawer.querySelectorAll('[data-form-builder-selected]')) field.removeAttribute('data-form-builder-selected');
}

/**
 * The Editor is open only while a field is selected: then the label reads Editor, the card hides and
 * the tabs and their panels show; otherwise the unit shows Quick actions and the card.
 * @param {Element} drawer
 */
function syncEditor(drawer) {
  const unit = drawer.querySelector('[data-admin-drawer-unit="quick-actions"]');
  if (!unit) return;
  const open = drawer.querySelector('[data-form-builder-selected]') !== null;
  const label = open ? 'Editor' : 'Quick actions';
  unit.setAttribute('aria-label', label);
  unit.toggleAttribute('data-editor-active', open);
  const heading = unit.querySelector('.wex-admin-quick-actions__heading');
  if (heading) heading.textContent = label;
  for (const part of unit.querySelectorAll('.wex-admin-form-tabs, .wex-admin-form-tab-panels')) {
    if (part instanceof HTMLElement) part.hidden = !open;
  }
}

/** While the builder is active a click on a field selects it (one at a time); the stylesheet draws it. @param {Element} drawer */
function listenForSelection(drawer) {
  if (listening.has(drawer)) return;
  listening.add(drawer);
  drawer.addEventListener('click', (event) => {
    if (!drawer.querySelector('[data-admin-form-builder][aria-pressed="true"]')) return;
    const field = event.target instanceof Element ? event.target.closest('.wex-admin-product-editor > .wex-admin-outlined-field') : null;
    if (!field) return;
    clearSelection(drawer);
    field.setAttribute('data-form-builder-selected', '');
    syncEditor(drawer);
  });
}

/**
 * Turns the builder on or off. The builder edits the form, not its values: while on, every value is
 * disabled, so it cannot be focused, typed into or reached through its label, and stays locked whether
 * hovered or selected. The value keeps its text. The footer is inert while on.
 * @param {HTMLElement} card @param {boolean} active
 */
function setFormBuilder(card, active) {
  card.setAttribute('aria-pressed', String(active));
  const drawer = card.closest('[data-admin-drawer-shell]');
  if (!drawer) return;
  listenForSelection(drawer);
  if (!active) clearSelection(drawer);
  syncEditor(drawer);
  const footer = drawer.querySelector('[data-admin-drawer-compartment="footer"]');
  if (footer instanceof HTMLElement) footer.inert = active;
  for (const input of drawer.querySelectorAll('.wex-admin-product-editor textarea')) {
    if (!(input instanceof HTMLTextAreaElement)) continue;
    if (active) input.blur();
    input.disabled = active;
  }
}

/** The builder is off whenever the editor is left. @param {HTMLElement} drawer */
export function resetFormBuilder(drawer) {
  for (const card of drawer.querySelectorAll('[data-admin-form-builder]')) {
    if (card instanceof HTMLElement) setFormBuilder(card, false);
  }
}
