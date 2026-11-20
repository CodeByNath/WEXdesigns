import assert from 'node:assert/strict';
import test from 'node:test';
import '../src/admin-station-shell.js';
import { createProductItinerary } from '../src/admin-station-product-itinerary.js';
import { comboItineraryGroups } from '../src/admin-station-product-itinerary-combo.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const steps = [{ number: 1, title: 'Existing title', description: 'Existing description', image: { src: '/existing.jpg', alt: 'Existing image' } }];
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('Itinerary preserves current steps and images, adds combo references, and excludes tabs for Single products', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const section = createProductItinerary(shell, steps, { isCombo, groups: comboItineraryGroups });
      assert.equal(flatten(section).some((node) => node.tagName === 'NAV'), false);
      assert.equal(flatten(section).some((node) => node.textContent === 'Existing title'), true);
      assert.equal(flatten(section).some((node) => node.src === '/existing.jpg'), true);
    }
    const section = createProductItinerary(shell, steps, { isCombo: true, groups: comboItineraryGroups });
    const [, nav, panel] = section.children;
    assert.deepEqual(nav.children.map((button) => button.textContent), ['Natural Bridge Tour', 'Hot Air Balloon Flight']);
    assert.equal(panel.children[0].children.length, 4);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Existing title'), false);
    nav.children[1].events.click();
    assert.equal(panel.children[0].children.length, 7);
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    nav.children[0].events.click();
    assert.equal(panel.children[0].children.length, 4);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Existing description'), false);
    assert.deepEqual(steps, [{ number: 1, title: 'Existing title', description: 'Existing description', image: { src: '/existing.jpg', alt: 'Existing image' } }]);
  } finally { globalThis.HTMLElement = previous; }
});
