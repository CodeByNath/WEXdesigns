import assert from 'node:assert/strict';
import test from 'node:test';
// Match the application's established entry order for its existing module graph.
import '../src/admin-station-shell.js';
import { createProductDescription } from '../src/admin-station-product-description.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const content = { description: 'Single description', highlights: ['Single highlight'] };
const groups = [
  { label: 'First activity', description: 'First description', highlights: ['First highlight'] },
  { label: 'Second activity', description: 'Second description', highlights: ['Second highlight'] },
];
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('single products never construct combo tabs or content, even if groups are supplied', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const tree = flatten(createProductDescription(shell, { ...content, isCombo, groups }));
      assert.equal(tree.some((node) => node.tagName === 'NAV'), false);
      assert.equal(tree.some((node) => node.textContent === 'First description'), false);
      assert.equal(tree.some((node) => node.textContent === content.description), true);
    }
  } finally { globalThis.HTMLElement = previous; }
});

test('combo selection replaces a single named panel and selects exactly one activity', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    const section = createProductDescription(shell, { ...content, isCombo: true, groups });
    const [, nav, panel] = section.children;
    assert.deepEqual(nav.children.map((button) => button.textContent), groups.map((group) => group.label));
    assert.equal(panel.attributes['aria-label'], 'First activity');
    nav.children[1].events.click();
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    assert.equal(panel.attributes['aria-label'], 'Second activity');
    assert.equal(flatten(panel).some((node) => node.textContent === 'First description'), false);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Second description'), true);
    assert.equal(section.children.length, 3);
  } finally { globalThis.HTMLElement = previous; }
});
