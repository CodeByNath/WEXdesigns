import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { exitAdminDrawerEditor, drawerActionChoices, mountAdminDrawerFooter, refreshAdminDrawerFooter, setAdminDrawerActionState, setAdminDrawerDirty, setAdminDrawerViewEdit } from '../src/admin-station-drawer-footer.js';

// The footer only needs this narrow DOM surface; commands remain real events.
class Element extends EventTarget {
  constructor(document) { super(); this.ownerDocument = document; this.children = []; this.attributes = new Map(); this.hidden = false; this.dataset = {}; }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  toggleAttribute(name, value) { if (value) this.setAttribute(name, ''); else this.attributes.delete(name); }
  contains(target) { return this === target || this.children.some((child) => child.contains(target)); }
  querySelector(selector) { return this.children.find((child) => selector.startsWith('[') && child.hasAttribute(selector.slice(1, -1))) ?? this.children.map((child) => child.querySelector(selector)).find(Boolean) ?? null; }
  querySelectorAll(selector) { return this.children.flatMap((child) => [...(selector === 'button' && child instanceof Button ? [child] : []), ...child.querySelectorAll(selector)]); }
  focus() { this.ownerDocument.activeElement = this; }
}
class Button extends Element { disabled = false; }
Object.assign(globalThis, { HTMLElement: Element, HTMLButtonElement: Button, Node: Element });
const ACTIONS = ['view', 'edit', 'publish', 'save', 'discard'];
function fixture() {
  const document = new EventTarget();
  document.createElementNS = () => new Element(document);
  const element = (attribute, button = false) => { const node = button ? new Button(document) : new Element(document); node.setAttribute(attribute, ''); return node; };
  const shell = new Element(document), drawer = element('data-admin-drawer-shell'), root = element('data-admin-drawer-action-menu');
  const toggle = element('data-admin-drawer-action-toggle', true), label = element('data-admin-drawer-action-label'), menu = element('data-admin-drawer-action-choices');
  const buttons = Object.fromEntries(ACTIONS.map((action) => [action, element(`data-admin-drawer-${action}`, true)]));
  const close = element('data-admin-drawer-footer-close', true); close.textContent = 'Close';
  toggle.append(label); menu.append(...Object.values(buttons)); root.append(toggle, menu); drawer.append(close, root); shell.append(drawer);
  mountAdminDrawerFooter(shell);
  return { shell, drawer, root, toggle, label, menu, buttons, document, close };
}
const visible = (f) => ACTIONS.filter((action) => !f.buttons[action].hidden);
function key(target, value) {
  const event = new Event('keydown', { cancelable: true });
  Object.defineProperty(event, 'key', { value }); target.dispatchEvent(event);
  return event;
}

test('offers only what applies: Save and Discard need something to save, View needs room to stretch', () => {
  const names = (state) => drawerActionChoices(state).map(({ action }) => action);
  for (const dirty of [true, false]) for (const publishable of [true, false]) {
    assert.deepEqual(names({ dirty, publishable }), [...(publishable ? ['publish'] : []), ...(dirty ? ['save', 'discard'] : [])]);
  }
  assert.deepEqual(names({ dirty: true, publishable: true, viewEdit: true, editing: false, stretch: true }), ['view', 'edit']);
  assert.deepEqual(names({ dirty: false, publishable: false, viewEdit: true, editing: false, stretch: false }), ['edit']);
  assert.deepEqual(names({ dirty: true, publishable: false, viewEdit: true, editing: true, stretch: true }), ['save', 'discard']);
  assert.deepEqual(names({ dirty: false, publishable: false, viewEdit: true, editing: true, stretch: true }), []);
});

test('clean, dirty and publish-ready states show and hide the matching actions; nothing to do hides the button', () => {
  const f = fixture();
  assert.equal(f.root.hidden, true); assert.deepEqual(visible(f), []);
  setAdminDrawerDirty(f.shell, true);
  assert.equal(f.root.hidden, false); assert.deepEqual(visible(f), ['save', 'discard']); assert.equal(f.label.textContent, 'Save');
    setAdminDrawerActionState(f.shell, { dirty: false, publishable: true });
  assert.deepEqual(visible(f), ['publish']); assert.equal(f.label.textContent, 'Publish');
  setAdminDrawerDirty(f.shell, true);
  assert.deepEqual(visible(f), ['publish', 'save', 'discard']); assert.equal(f.label.textContent, 'Publish');
  setAdminDrawerActionState(f.shell, { dirty: false, publishable: false });
  assert.equal(f.root.hidden, true);
});

test('keyboard opening and menu traversal; Escape restores trigger focus', () => {
  const f = fixture();
  key(f.toggle, 'ArrowDown'); assert.equal(f.menu.hidden, true);
  setAdminDrawerActionState(f.shell, { dirty: true, publishable: true });
  key(f.toggle, 'ArrowDown'); assert.equal(f.document.activeElement, f.buttons.publish);
  assert.equal(f.toggle.attributes.get('aria-expanded'), 'true');
  key(f.root, 'ArrowDown'); assert.equal(f.document.activeElement, f.buttons.save);
  key(f.root, 'End'); assert.equal(f.document.activeElement, f.buttons.discard);
  key(f.root, 'ArrowDown'); assert.equal(f.document.activeElement, f.buttons.publish);
  key(f.root, 'ArrowUp'); assert.equal(f.document.activeElement, f.buttons.discard);
  key(f.root, 'Home'); assert.equal(f.document.activeElement, f.buttons.publish);
  key(f.root, 'Escape'); assert.equal(f.menu.hidden, true);
  assert.equal(f.document.activeElement, f.toggle);
  key(f.toggle, 'ArrowUp'); key(f.root, 'Tab'); assert.equal(f.menu.hidden, true);
});

test('hidden commands cannot fire; menu commands emit once without pretending completion', () => {
  const f = fixture(); const commands = [];
  for (const action of ['save', 'publish', 'discard']) f.shell.addEventListener(`wex:admin-drawer-${action}`, () => commands.push(action));
  for (const button of Object.values(f.buttons)) button.dispatchEvent(new Event('click'));
  assert.deepEqual(commands, []);
  setAdminDrawerActionState(f.shell, { dirty: true, publishable: true });
  for (const action of ['save', 'publish', 'discard']) {
    f.toggle.dispatchEvent(new Event('click')); f.buttons[action].dispatchEvent(new Event('click'));
    assert.equal(f.menu.hidden, true); assert.equal(f.document.activeElement, f.toggle);
  }
  assert.deepEqual(commands, ['save', 'publish', 'discard']);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-dirty'), true);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-publishable'), true);
});

test('one action is still the same label + chevron button: it opens its menu and the item runs the command', () => {
  const f = fixture(); const commands = [];
  f.shell.addEventListener('wex:admin-drawer-publish', () => commands.push('publish'));
  setAdminDrawerActionState(f.shell, { dirty: false, publishable: true });
  f.toggle.dispatchEvent(new Event('click')); assert.equal(f.menu.hidden, false);
  assert.deepEqual(commands, []);
  f.buttons.publish.dispatchEvent(new Event('click'));
  assert.deepEqual(commands, ['publish']); assert.equal(f.menu.hidden, true);
});

test('outside click, focus leaving and state refresh close the menu', () => {
  const f = fixture(); setAdminDrawerDirty(f.shell, true);
  f.toggle.dispatchEvent(new Event('click')); assert.equal(f.menu.hidden, false);
  f.document.dispatchEvent(new Event('click')); assert.equal(f.menu.hidden, true);
  f.toggle.dispatchEvent(new Event('click')); f.root.dispatchEvent(new Event('focusout'));
  assert.equal(f.menu.hidden, true);
  f.toggle.dispatchEvent(new Event('click')); setAdminDrawerDirty(f.shell, true);
  assert.equal(f.menu.hidden, true); assert.equal(f.toggle.attributes.get('aria-expanded'), 'false');
});

test('presentation footer: View and Edit while the Drawer can stretch, Edit alone once Full or single column, Edit then offers Save only when dirty', () => {
  const f = fixture(); const events = [];
  f.shell.addEventListener('wex:admin-drawer-edit', () => events.push('edit'));
  f.drawer.dataset.adminDrawerColumns = '2'; f.shell.dataset.adminDrawerMode = 'default';
  setAdminDrawerViewEdit(f.shell, true);
  assert.deepEqual(visible(f), ['view', 'edit']); assert.equal(f.label.textContent, 'View');
  f.shell.dataset.adminDrawerMode = 'full'; refreshAdminDrawerFooter(f.shell);
  assert.deepEqual(visible(f), ['edit']);
  f.drawer.dataset.adminDrawerColumns = '1'; f.shell.dataset.adminDrawerMode = 'default'; refreshAdminDrawerFooter(f.shell);
  assert.deepEqual(visible(f), ['edit']);
  f.toggle.dispatchEvent(new Event('click')); f.buttons.edit.dispatchEvent(new Event('click'));
  assert.deepEqual(events, ['edit']); assert.equal(f.drawer.hasAttribute('data-admin-drawer-editing'), true);
  assert.equal(f.root.hidden, true); assert.deepEqual(visible(f), []);
  setAdminDrawerDirty(f.shell, true); assert.deepEqual(visible(f), ['save', 'discard']);
  setAdminDrawerViewEdit(f.shell, true);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-editing'), false);
  setAdminDrawerViewEdit(f.shell, false);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-view-edit'), false);
});

test('the View menu item emits no command (the Drawer opens Full); Edit from the menu enters editing', () => {
  const f = fixture(); const events = [];
  f.shell.addEventListener('wex:admin-drawer-edit', () => events.push('edit'));
  f.drawer.dataset.adminDrawerColumns = '2';
  setAdminDrawerViewEdit(f.shell, true);
  f.toggle.dispatchEvent(new Event('click')); f.buttons.view.dispatchEvent(new Event('click'));
  assert.equal(f.menu.hidden, true); assert.deepEqual(events, []);
  f.toggle.dispatchEvent(new Event('click')); f.buttons.edit.dispatchEvent(new Event('click'));
  assert.deepEqual(events, ['edit']); assert.equal(f.drawer.hasAttribute('data-admin-drawer-editing'), true);
});

test('the footer stylesheet gives Edit no special size and uses no raw values', async () => {
  const css = await readFile(new URL('../../../packages/wex/src/foundations/drawer-footer.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /action-fill|action-single|> svg/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+px/i);
});

test('the footer close button reads Cancel while the editor is active and Close in every other mode', () => {
  const f = fixture();
  assert.equal(f.close.textContent, 'Close');
  f.drawer.dataset.adminDrawerColumns = '2';
  setAdminDrawerViewEdit(f.shell, true);
  assert.equal(f.close.textContent, 'Close');
  f.toggle.dispatchEvent(new Event('click')); f.buttons.edit.dispatchEvent(new Event('click'));
  assert.equal(f.close.textContent, 'Cancel');
  setAdminDrawerViewEdit(f.shell, true);
  assert.equal(f.close.textContent, 'Close');
  f.toggle.dispatchEvent(new Event('click')); f.buttons.edit.dispatchEvent(new Event('click'));
  setAdminDrawerViewEdit(f.shell, false);
  assert.equal(f.close.textContent, 'Close');
});

test('Cancel leaves the editor for the view with the action state reset', () => {
  const f = fixture();
  f.drawer.dataset.adminDrawerColumns = '2';
  setAdminDrawerViewEdit(f.shell, true);
  f.toggle.dispatchEvent(new Event('click')); f.buttons.edit.dispatchEvent(new Event('click'));
  setAdminDrawerActionState(f.shell, { dirty: true, publishable: true });
  assert.equal(f.close.textContent, 'Cancel');
  exitAdminDrawerEditor(f.shell);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-editing'), false);
  assert.equal(f.drawer.hasAttribute('data-admin-drawer-view-edit'), true);
  assert.equal(f.close.textContent, 'Close');
  assert.deepEqual(visible(f), ['view', 'edit']);
});

test('the main action is marked for the hover look and a pointer open focuses nothing', async () => {
  const f = fixture();
  setAdminDrawerActionState(f.shell, { dirty: true, publishable: true });
  assert.equal(f.buttons.publish.hasAttribute('data-admin-drawer-action-main'), true);
  assert.equal(f.buttons.save.hasAttribute('data-admin-drawer-action-main'), false);
  setAdminDrawerActionState(f.shell, { dirty: true, publishable: false });
  assert.equal(f.buttons.publish.hasAttribute('data-admin-drawer-action-main'), false);
  assert.equal(f.buttons.save.hasAttribute('data-admin-drawer-action-main'), true);
  f.document.activeElement = null;
  f.toggle.dispatchEvent(new Event('click'));
  assert.equal(f.menu.hidden, false); assert.equal(f.document.activeElement, null);
  const css = await readFile(new URL('../../../packages/wex/src/foundations/drawer-footer.css', import.meta.url), 'utf8');
  assert.match(css, /action-choices:not\(:hover\):not\(:has\(> :not\(\[data-admin-drawer-action-main\]\):focus\)\) > \[data-admin-drawer-action-main\] \{\s*background: var\(--wex-tab-navigation-small-dropdown-hover-background\);\s*border-color: var\(--wex-tab-navigation-small-dropdown-hover-border-color\);\s*color: var\(--wex-tab-navigation-small-dropdown-hover-foreground\);/);
});
