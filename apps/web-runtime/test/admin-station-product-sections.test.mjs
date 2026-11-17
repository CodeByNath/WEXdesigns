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
  assert.match(css, /--wex-admin-shell-drawer-full-navigation-max-inline-size: calc\(var\(--wex-space-64\) \* 3 \+ var\(--wex-space-24\) \+ var\(--wex-space-4\)\);/);
  assert.match(css, /grid-template-columns: var\(--wex-space-16\) min\(calc\(var\(--wex-admin-shell-drawer-full-part\) \* 2\), var\(--wex-admin-shell-drawer-full-navigation-max-inline-size\)\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 5\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 3\) minmax\(var\(--wex-space-16\), 1fr\);/);
});

test('Full shells run the Drawer height and the Footer sits under main content with its borders, with no extra offsets', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(min-width: 768px\) \{[\s\S]*\.wex-admin-product-summary,\n  \.wex-admin-shell\[data-admin-drawer-mode="full"\]:has\(\[data-admin-drawer-section="presentation"\]\) \.wex-admin-shell__drawer-footer \{\n    grid-column: 4;\n    border-inline: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.doesNotMatch(css, /::before|margin-block: calc\(-1|drawer-footer-actions|margin-inline-start/);
  assert.doesNotMatch(css, /\.wex-admin-product-sections \{[^}]*border/);
  assert.match(css, /grid-row: 3 \/ span 2;/);
  assert.match(css, /drawer-footer \{\n    grid-row: 4;/);
});

test('Full navigation, main content and connections scroll on their own on desktop', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /drawer-body\[data-admin-drawer-section="presentation"\] \{\n    grid-row: 3 \/ span 2;\n    grid-template-rows: minmax\(0, 1fr\);\n    padding-block: 0;\n    overflow: hidden;/);
  assert.match(css, /:is\(\.wex-admin-product-sections, \.wex-admin-product-summary, \.wex-admin-drawer-connections\) \{\n    align-self: stretch;\n    min-block-size: 0;\n    overflow: auto;\n    overscroll-behavior: contain;/);
  const sections = readFileSync(new URL('../src/admin-station-add-new-sections.js', import.meta.url), 'utf8');
  assert.match(sections, /connectionsShell\(document, \[\s*sectionUnit\(document, 'promotions'[\s\S]*sectionUnit\(document, 'activity'/);
  const base = readFileSync(new URL('../src/admin-station-add-new-sections.css', import.meta.url), 'utf8');
  assert.match(base, /\.wex-admin-drawer-connections \{\n  display: contents;/);
});

test('Full Promotions line stretches across the connections shell on desktop only', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(min-width: 768px\) \{[\s\S]*\.wex-admin-drawer-connections \{\n    display: grid;\n    grid-column: 5 \/ 8;/);
  assert.match(css, /\.wex-admin-drawer-connections > \.wex-admin-drawer-section \{\n    margin-inline: 0;\n    padding-inline: var\(--wex-space-24\) var\(--wex-space-16\);/);
});
