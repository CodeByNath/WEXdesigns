import assert from 'node:assert/strict';
import test from 'node:test';
import { drawerActionChoices, mountAdminDrawerFooter, setAdminDrawerActionState, setAdminDrawerDirty } from '../src/admin-station-drawer-footer.js';

// The footer only needs this narrow DOM surface; commands remain real events.
class Element extends EventTarget {
  constructor(document) { super(); this.ownerDocument = document; this.children = []; this.attributes = new Map(); this.hidden = false; }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  hasAttribute(name) { return this.attributes.has(name); }
  toggleAttribute(name, value) { if (value) this.setAttribute(name, ''); else this.attributes.delete(name); }
  contains(target) { return this === target || this.children.some((child) => child.contains(target)); }
  querySelector(selector) { return this.children.find((child) => selector.startsWith('[') && child.hasAttribute(selector.slice(1, -1))) ?? this.children.map((child) => child.querySelector(selector)).find(Boolean) ?? null; }
  querySelectorAll(selector) { return this.children.flatMap((child) => [...(selector === 'button' && child instanceof Button ? [child] : []), ...child.querySelectorAll(selector)]); }
  focus() { this.ownerDocument.activeElement = this; }
}
class Button extends Element { disabled = false; }
Object.assign(globalThis, { HTMLElement: Element, HTMLButtonElement: Button, Node: Element });
function fixture() {
  const document = new EventTarget();
  document.createElementNS = () => new Element(document);
  const element = (attribute, button = false) => { const node = button ? new Button(document) : new Element(document); node.setAttribute(attribute, ''); return node; };
  const shell = new Element(document), drawer = element('data-admin-drawer-shell'), root = element('data-admin-drawer-action-menu');
  const toggle = element('data-admin-drawer-action-toggle', true), label = element('data-admin-drawer-action-label'), menu = element('data-admin-drawer-action-choices');
  const buttons = Object.fromEntries(['publish', 'save', 'discard'].map((action) => [action, element(`data-admin-drawer-${action}`, true)]));
  toggle.append(label); menu.append(...Object.values(buttons)); root.append(toggle, menu); drawer.append(root); shell.append(drawer);
  mountAdminDrawerFooter(shell);
  return { shell, drawer, root, toggle, label, menu, buttons, document };
}
function key(target, value) {
  const event = new Event('keydown', { cancelable: true });
  Object.defineProperty(event, 'key', { value }); target.dispatchEvent(event);
  return event;
}

test('orders Publish, Save, Discard only when publishing is available', () => {
  for (const dirty of [true, false]) for (const publishable of [true, false]) {
    const choices = drawerActionChoices({ dirty, publishable });
    assert.deepEqual(choices.map(({ action }) => action), publishable ? ['publish', 'save', 'discard'] : ['save', 'discard']);
    assert.equal(choices.find(({ action }) => action === 'save').disabled, !dirty);
    assert.equal(choices.find(({ action }) => action === 'discard').disabled, !dirty);
    if (publishable) assert.equal(choices[0].disabled, false);
  }
});

test('clean, dirty and publish-ready states update label, visibility and native disabled flags', () => {
  const f = fixture();
  assert.equal(f.label.textContent, 'Save'); assert.equal(f.toggle.disabled, true);
  assert.equal(f.buttons.publish.hidden, true); assert.equal(f.buttons.discard.disabled, true);
  setAdminDrawerDirty(f.shell, true);
  assert.equal(f.toggle.disabled, false); assert.equal(f.buttons.save.disabled, false);
  assert.equal(f.buttons.discard.disabled, false); assert.equal(f.buttons.publish.hidden, true);
  setAdminDrawerActionState(f.shell, { dirty: false, publishable: true });
  assert.equal(f.label.textContent, 'Publish'); assert.equal(f.toggle.disabled, false);
  assert.equal(f.buttons.publish.hidden, false); assert.equal(f.buttons.publish.disabled, false);
  assert.equal(f.buttons.save.disabled, true); assert.equal(f.buttons.discard.disabled, true);
  setAdminDrawerDirty(f.shell, true);
  assert.equal(f.label.textContent, 'Publish');
  assert.equal(f.buttons.save.disabled, false);
});

test('keyboard opening and menu traversal skip disabled actions; Escape restores trigger focus', () => {
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
  setAdminDrawerActionState(f.shell, { dirty: false, publishable: true });
  key(f.toggle, 'ArrowUp'); key(f.root, 'ArrowDown');
  assert.equal(f.document.activeElement, f.buttons.publish);
  key(f.root, 'Tab'); assert.equal(f.menu.hidden, true);
});

test('disabled/hidden commands cannot fire; enabled commands emit once without pretending completion', () => {
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
  setAdminDrawerActionState(f.shell, { dirty: false, publishable: false });
  assert.equal(f.toggle.disabled, true); assert.equal(f.menu.hidden, true);
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
