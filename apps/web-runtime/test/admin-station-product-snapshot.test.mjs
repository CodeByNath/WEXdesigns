import assert from 'node:assert/strict';
import test from 'node:test';
import '../src/admin-station-shell.js';
import { createProductSnapshot } from '../src/admin-station-product-snapshot.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const content = {
  duration: '5 hours', walking: '2.85km', departureTime: '8:45 am', returnTime: '1:45 pm',
  fitness: 'Easy', groupSize: 'Max 15', minAge: 'All ages', pickup: 'Included',
  operatedBy: 'First operator', languages: ['English'],
};
const groups = [
  { ...content, label: 'First activity' },
  { ...content, label: 'Second activity', duration: '4 hours', walking: '', returnTime: '', operatedBy: 'Second operator' },
];
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('Snapshot keeps combo content out of Single products and replaces exactly ten fields on activity selection', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const section = createProductSnapshot(shell, { ...content, isCombo, groups });
      assert.equal(flatten(section).some((node) => node.tagName === 'NAV'), false);
      assert.equal(flatten(section).some((node) => node.textContent === 'Second operator'), false);
      assert.equal(section.children[1].children.length, 10);
    }
    const section = createProductSnapshot(shell, { ...content, isCombo: true, groups });
    const [, nav, panel] = section.children;
    assert.deepEqual(nav.children.map((button) => button.textContent), ['First activity', 'Second activity']);
    nav.children[1].events.click();
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    assert.equal(panel.attributes['aria-label'], 'Second activity');
    const rows = panel.children[0].children;
    // Owner-directed (2026-11-20): a label with an empty value is not shown, so Walking and Return time drop out.
    assert.equal(rows.length, 8);
    const labels = rows.map((row) => row.children[0].textContent);
    assert.equal(labels.includes('Walking') || labels.includes('Return time'), false);
    assert.equal(flatten(panel).some((node) => node.textContent === 'First operator'), false);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Second operator'), true);
  } finally { globalThis.HTMLElement = previous; }
});
