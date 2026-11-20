import assert from 'node:assert/strict';
import test from 'node:test';
import '../src/admin-station-shell.js';
import { createProductInfo } from '../src/admin-station-product-info.js';
import { comboInfoGroups } from '../src/admin-station-product-info-combo.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const product = { included: ['Original inclusion'], notIncluded: ['Original exclusion'], bring: ['Original item'], details: [['Safety', ['Original safety']], ['Why Book Direct', ['Best price guaranteed\nFree cancellation']]], groups: comboInfoGroups };
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('Info preserves Single content and switches only two combo activities while retaining shared benefits', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const section = createProductInfo(shell, { ...product, isCombo });
      assert.equal(flatten(section).some((node) => node.tagName === 'NAV'), false);
      assert.equal(section.children[1].children.length, 5);
      for (const value of ['Original inclusion', 'Original safety', 'Free cancellation']) {
        assert.equal(flatten(section).some((node) => node.textContent === value), true);
      }
    }
    const section = createProductInfo(shell, { ...product, isCombo: true });
    const [, nav, panel, shared] = section.children;
    assert.deepEqual(nav.children.map((button) => button.textContent), ['Natural Bridge Tour', 'Hot Air Balloon Flight']);
    assert.equal(panel.children[0].children.length, 9);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Original inclusion'), false);
    nav.children[1].events.click();
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    assert.equal(panel.attributes['aria-label'], 'Hot Air Balloon Flight');
    assert.equal(flatten(panel).some((node) => node.textContent === 'Hot air balloon flight'), true);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Expert tour guide'), false);
    assert.equal(panel.children[0].children.length, 9);
    assert.equal(flatten(shared).some((node) => node.textContent === 'Free cancellation'), true);
    assert.equal(flatten(shared).filter((node) => node.tagName === 'LI').length, 2);
    assert.equal(panel.children[0].children[8].children[1].children[0].children.length, 0);
  } finally { globalThis.HTMLElement = previous; }
});
