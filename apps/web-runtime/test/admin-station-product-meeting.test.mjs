import assert from 'node:assert/strict';
import test from 'node:test';
import '../src/admin-station-shell.js';
import { createProductMeeting } from '../src/admin-station-product-meeting.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const point = { time: '8:45 am', label: 'First pickup', address: 'First address', mapUrl: '' };
const groups = [
  { label: 'First activity', point },
  { label: 'Second activity', point: { ...point, label: 'Second pickup', address: 'Second address' } },
];
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('Meeting excludes combo tabs for Single products and switches one meeting point per activity', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const section = createProductMeeting(shell, [point, point], { isCombo, groups });
      assert.equal(flatten(section).some((node) => node.tagName === 'NAV'), false);
      assert.equal(flatten(section).some((node) => node.textContent === 'Second pickup'), false);
      assert.equal(section.children.length, 3);
    }
    const section = createProductMeeting(shell, [point, point, point, point], { isCombo: true, groups });
    const [, nav, panel] = section.children;
    assert.equal(panel.children[0].attributes['aria-label'], 'Meeting point 1');
    assert.equal(flatten(panel).some((node) => node.textContent === 'First pickup'), true);
    assert.deepEqual(nav.children.map((button) => button.textContent), ['First activity', 'Second activity']);
    assert.equal(panel.children.length, 4);
    nav.children[1].events.click();
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    assert.equal(panel.attributes['aria-label'], 'Second activity');
    assert.equal(panel.children.length, 1);
    assert.equal(panel.children[0].children[1].children.length, 3);
    assert.equal(flatten(panel).some((node) => node.textContent === 'First pickup'), false);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Second pickup'), true);
    nav.children[0].events.click();
    assert.equal(panel.children.length, 4);
  } finally { globalThis.HTMLElement = previous; }
});
