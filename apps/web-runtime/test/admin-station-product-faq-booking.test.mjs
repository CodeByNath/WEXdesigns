import assert from 'node:assert/strict';
import test from 'node:test';
import '../src/admin-station-shell.js';
import { createProductFaqBooking } from '../src/admin-station-product-faq-booking.js';
import { comboFaqGroups } from '../src/admin-station-product-faq-booking-combo.js';

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.attributes = {}; this.events = {}; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
}
const shell = { ownerDocument: { createElement: (tag) => new Element(tag) } };
const product = {
  faqs: [{ question: 'Original question', answer: 'Original answer' }], groups: comboFaqGroups,
  reviews: '[reviews]', bookingSystem: 'Rezdy', primaryCode: 'PBASBR', altCode: 'ALT',
  destinations: ['Tour page'], relatedTours: [{ name: 'Natural Bridge', id: '806' }],
};
const flatten = (element) => [element, ...element.children.flatMap(flatten)];

test('FAQ keeps Single content and booking metadata while combo selection replaces only activity Q&As', () => {
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    for (const isCombo of [undefined, false]) {
      const section = createProductFaqBooking(shell, { ...product, isCombo });
      assert.equal(flatten(section).some((node) => node.tagName === 'NAV'), false);
      assert.equal(flatten(section).some((node) => node.textContent === 'Original answer'), true);
      assert.equal(section.children[2].children[1].children.length, 6);
    }
    const section = createProductFaqBooking(shell, { ...product, isCombo: true });
    const [, nav, panel, booking] = section.children;
    assert.deepEqual(nav.children.map((button) => button.textContent), ['Natural Bridge Tour', 'Hot Air Balloon Flight']);
    assert.equal(panel.children.length, 4);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Original answer'), false);
    const bookingBefore = JSON.stringify(booking);
    nav.children[1].events.click();
    assert.equal(panel.children.length, 5);
    assert.equal(panel.attributes['aria-label'], 'Hot Air Balloon Flight');
    assert.deepEqual(nav.children.map((button) => button.attributes['aria-pressed']), ['false', 'true']);
    assert.equal(flatten(panel).some((node) => node.textContent === 'Is breakfast included?'), true);
    assert.equal(flatten(panel).some((node) => node.textContent === 'How many waterfalls will we visit?'), false);
    assert.equal(JSON.stringify(booking), bookingBefore);
    for (const value of ['Rezdy', 'PBASBR', 'ALT', '[reviews]', 'Tour page', 'Natural Bridge · ID: 806']) {
      assert.equal(flatten(booking).some((node) => node.textContent === value), true);
    }
    nav.children[0].events.click();
    assert.equal(panel.children.length, 4);
  } finally { globalThis.HTMLElement = previous; }
});
