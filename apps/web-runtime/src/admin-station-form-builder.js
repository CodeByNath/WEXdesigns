import { createSystemIcon } from './admin-station-system-icons.js';
import { createFieldOptions } from './admin-station-field-options.js';
import { ADMIN_FIELD_HISTORY_EVENT } from './admin-station-field-history.js';
import { createFieldStatus, syncContentFieldStatus } from './admin-station-field-status.js';
import { activeProductEditor, showEditorFromTop } from './admin-station-product-editors.js';

/** Layout holds selected-field options; Advanced remains empty. */
const generalSections = ['Layout', 'Advanced'];

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
  /* The label row: the heading, and the selected field's status switch at its end. */
  const header = document.createElement('div');
  header.className = 'wex-admin-quick-actions__header';
  header.append(heading);
  const general = createGeneralPanel(document);
  const global = document.createElement('div');
  global.className = 'wex-admin-form-tab-panel';
  global.dataset.formTab = 'global';
  global.hidden = true;
  const panels = document.createElement('div');
  panels.className = 'wex-admin-form-tab-panels';
  panels.hidden = true;
  panels.append(general, global);
  unit.append(header, createFormBuilderCard(document), createEditorTabs(document, panels), panels);
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
  for (const [index, title] of generalSections.entries()) {
    const section = document.createElement('div');
    section.className = 'wex-admin-accordion';
    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'wex-admin-accordion__header wex-type-navigation-small-semibold';
    header.setAttribute('aria-expanded', String(index === 0));
    const body = document.createElement('div');
    body.className = 'wex-admin-accordion__panel';
    body.dataset.fieldOptionsSection = title.toLowerCase();
    body.hidden = index !== 0;
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
    /* The whole section row is the target: the space around the header (the section's own padding) toggles it too. */
    section.addEventListener('click', (event) => { if (event.target === section) header.click(); });
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
 * the mode and the stylesheet reads it, so the state lives in one place. Activating selects the first
 * field and opens the Editor on it (no hover step); selecting another field moves the Editor to it.
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
 * The Editor is open only while a field is selected: its heading names the field, the card hides and
 * the tabs and their panels show; otherwise the unit shows Quick actions and the card.
 * @param {Element} drawer
 */
function syncEditor(drawer) {
  const unit = drawer.querySelector('[data-admin-drawer-unit="quick-actions"]');
  if (!unit) return;
  const selected = drawer.querySelector('[data-form-builder-selected]');
  const open = selected !== null;
  const label = open ? 'Editor' : 'Quick actions';
  unit.setAttribute('aria-label', label);
  unit.toggleAttribute('data-editor-active', open);
  const main = unit.querySelector('[data-field-options-section="layout"]');
  if (main) {
    main.replaceChildren();
    if (selected) main.append(createFieldOptions(main.ownerDocument, selected));
  }
  const heading = unit.querySelector('.wex-admin-quick-actions__heading');
  if (heading) {
    heading.replaceChildren();
    if (selected) {
      const name = heading.ownerDocument.createElement('span');
      /* The form label name, never a value: a shown label may carry one, such as the currency "(A$)" (Owner rule). */
      name.textContent = `${selected.getAttribute('data-field-label') ?? ''} (Field)`;
      const icon = createSystemIcon(heading.ownerDocument, 'pencil-square');
      icon.setAttribute('aria-hidden', 'false');
      icon.setAttribute('role', 'img');
      icon.setAttribute('aria-label', 'Edit');
      heading.append(icon, name);
    } else heading.textContent = label;
    heading.parentElement?.querySelector('.wex-admin-field-status')?.remove();
    if (selected) heading.after(createFieldStatus(heading.ownerDocument, selected));
  }
  for (const part of unit.querySelectorAll('.wex-admin-form-tabs, .wex-admin-form-tab-panels')) {
    if (part instanceof HTMLElement) part.hidden = !open;
  }
  syncFieldOff(drawer);
}

/** A field switched off has its Editor tabs and panels disabled; its switch stays live. @param {Element} drawer */
function syncFieldOff(drawer) {
  const unit = drawer.querySelector('[data-admin-drawer-unit="quick-actions"]');
  if (!unit) return;
  const off = drawer.querySelector('[data-form-builder-selected]')?.getAttribute('data-field-status') === 'off';
  unit.toggleAttribute('data-field-off', off);
  for (const part of unit.querySelectorAll('.wex-admin-form-tabs, .wex-admin-form-tab-panels')) {
    if (part instanceof HTMLElement) part.inert = off;
  }
}

/** While the builder is active a click on a field selects it (one at a time); the stylesheet draws it. @param {Element} drawer */
function listenForSelection(drawer) {
  if (listening.has(drawer)) return;
  listening.add(drawer);
  /* Going back a step restores attributes and order, so the selected field's controls are rebuilt from them. */
  drawer.addEventListener(ADMIN_FIELD_HISTORY_EVENT, (event) => {
    if (event instanceof CustomEvent && event.detail?.restored) syncEditor(drawer);
    else syncFieldOff(drawer);
  });
  drawer.addEventListener('click', (event) => {
    if (!drawer.querySelector('[data-admin-form-builder][aria-pressed="true"]')) return;
    /* Another section selected: the Editor moves to the first field of that section's form. */
    if (event.target instanceof Element && event.target.closest('.wex-admin-product-sections__tab')) {
      clearSelection(drawer);
      firstField(drawer)?.setAttribute('data-form-builder-selected', '');
      syncEditor(drawer);
      return;
    }
    const field = event.target instanceof Element ? event.target.closest('.wex-admin-product-editor > [data-field-name]') : null;
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
  clearSelection(drawer);
  /* Activating skips the hover step: the first field is selected and the Editor opens on it. */
  if (active) firstField(drawer)?.setAttribute('data-form-builder-selected', '');
  /* Either way the editor opens from the top (Owner rule): the Form Editor on that first field, and the value
   * editor when the Form Editor closes. */
  showEditorFromTop(drawer);
  syncEditor(drawer);
  const footer = drawer.querySelector('[data-admin-drawer-compartment="footer"]');
  if (footer instanceof HTMLElement) footer.inert = active;
  for (const input of drawer.querySelectorAll('.wex-admin-product-editor textarea')) {
    if (!(input instanceof HTMLTextAreaElement)) continue;
    if (active) input.blur();
    input.disabled = active;
  }
  for (const editor of drawer.querySelectorAll('.wex-admin-product-editor')) syncContentFieldStatus(editor);
}

/** The first field of the selected section's form. @param {Element} drawer */
function firstField(drawer) {
  return activeProductEditor(drawer)?.querySelector(':scope > [data-field-name]') ?? null;
}

/** The builder is off whenever the editor is left. @param {HTMLElement} drawer */
export function resetFormBuilder(drawer) {
  for (const card of drawer.querySelectorAll('[data-admin-form-builder]')) {
    if (card instanceof HTMLElement) setFormBuilder(card, false);
  }
}
