import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createProductSections } from '../src/admin-station-product-sections.js';

// Minimal DOM surface keeps navigation behaviour independent of a browser library.
function element(tagName) {
  return {
    tagName, children: [], attributes: {}, events: {},
    append(...children) { this.children.push(...children); },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { this.events[name] = callback; },
  };
}

test('product navigation follows the reference, defaults to Overview and selects exactly one section', () => {
  const body = { dataset: {}, ownerDocument: { createElement: element } };
  const nav = createProductSections(body);
  const buttons = nav.children[0].children.map((item) => item.children[0]);
  assert.equal(nav.attributes['aria-label'], 'Product sections');
  assert.deepEqual(buttons.map((button) => button.textContent), [
    '1. Overview', '2. Pricing', '3. Description', '4. Media', '5. Snapshot',
    '6. Meeting', '7. Itinerary', '8. Info', '9. Product Keywords', '10. FAQ / Booking',
  ]);
  const selected = () => buttons.filter((button) => button.attributes['aria-pressed'] === 'true');
  assert.equal(body.dataset.adminProductSection, 'overview');
  assert.deepEqual(selected(), [buttons[0]]);
  buttons[9].events.click();
  assert.equal(body.dataset.adminProductSection, 'faq-booking');
  assert.deepEqual(selected(), [buttons[9]]);
  buttons[0].events.click();
  assert.equal(body.dataset.adminProductSection, 'overview');
  assert.deepEqual(selected(), [buttons[0]]);
});

test('Full Drawer shares navigation, main content and connections 2 : 5 : 3', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /--wex-admin-shell-drawer-column-max-inline-size: calc\(var\(--wex-space-64\) \* 11 \+ var\(--wex-space-16\)\);/);
  assert.match(css, /--wex-admin-shell-drawer-full-part: min\(calc\(var\(--wex-admin-shell-drawer-column-max-inline-size\) \/ 5\), /);
  assert.match(css, /grid-template-columns: var\(--wex-space-16\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 2\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 5\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 3\) minmax\(var\(--wex-space-16\), 1fr\);/);
});
