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
    focus() { this.focused = true; this.events.focus?.(); },
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

test('section arrows navigate both ways and disable only at their respective boundaries', () => {
  const body = { dataset: {}, ownerDocument: { createElement: element } };
  const next = element('button'), previous = element('button');
  const nav = createProductSections(body, next, previous);
  const buttons = nav.children[0].children.map((item) => item.children[0]);
  assert.equal(next.hidden, false);
  assert.equal(previous.hidden, false);
  assert.equal(previous.disabled, true);
  previous.onclick();
  assert.equal(body.dataset.adminProductSection, 'overview');
  for (let index = 1; index < buttons.length; index++) {
    next.onclick();
    assert.equal(buttons[index].attributes['aria-pressed'], 'true');
    assert.equal(buttons.filter((button) => button.attributes['aria-pressed'] === 'true').length, 1);
    assert.equal(buttons[index].focused, true);
    assert.equal(body.dataset.adminProductPreview, undefined);
    assert.equal(next.hidden, false);
    assert.equal(previous.disabled, false);
    assert.equal(next.disabled, index === buttons.length - 1);
  }
  next.onclick();
  assert.equal(body.dataset.adminProductSection, 'faq-booking');
  for (let index = buttons.length - 2; index >= 0; index--) {
    previous.onclick();
    assert.equal(buttons[index].attributes['aria-pressed'], 'true');
    assert.equal(previous.disabled, index === 0);
    assert.equal(next.disabled, false);
  }
  buttons[9].events.click();
  assert.equal(next.disabled, true);
  buttons[0].events.click();
  assert.equal(next.hidden, false);
  assert.equal(previous.disabled, true);
  buttons[8].events.pointerenter();
  next.onclick();
  assert.equal(body.dataset.adminProductSection, 'pricing', 'Next advances from selection, not a hover preview');
});

test('section arrows stay hidden outside Full mode and clears when the requester supplies no product navigation', () => {
  const css = readFileSync(new URL('../../../packages/wex/src/foundations/drawer-footer.css', import.meta.url), 'utf8');
  assert.match(css, /:not\(\[data-admin-drawer-mode="full"\]\) \[data-admin-drawer-next\],\n\.wex-admin-shell:not\(\[data-admin-drawer-mode="full"\]\) \[data-admin-drawer-previous\] \{\n  display: none;/);
  const sections = readFileSync(new URL('../src/admin-station-add-new-sections.js', import.meta.url), 'utf8');
  assert.match(sections, /control\.hidden = true; control\.disabled = true; control\.onclick = null;/);
});

test('hovering or focusing a product section previews it; only leaving the whole list returns to the selected one', () => {
  const body = { dataset: {}, ownerDocument: { createElement: element } };
  const list = createProductSections(body).children[0];
  const buttons = list.children.map((item) => item.children[0]);
  buttons[2].events.pointerenter();
  assert.equal(body.dataset.adminProductSection, 'description');
  assert.ok('adminProductPreview' in body.dataset);
  assert.equal(buttons[0].attributes['aria-pressed'], 'true');
  buttons[3].events.pointerenter();
  assert.equal(body.dataset.adminProductSection, 'media');
  assert.equal(buttons[2].events.pointerleave, undefined);
  list.events.pointerleave();
  assert.equal(body.dataset.adminProductSection, 'overview');
  assert.ok(!('adminProductPreview' in body.dataset));
  buttons[1].events.focus();
  assert.equal(body.dataset.adminProductSection, 'pricing');
  buttons[1].events.click();
  list.events.focusout({ relatedTarget: null });
  assert.equal(body.dataset.adminProductSection, 'pricing');
  assert.ok(!('adminProductPreview' in body.dataset));
  buttons[3].events.pointerenter();
  list.events.pointerleave();
  assert.equal(body.dataset.adminProductSection, 'pricing');
});

test('Full Drawer shares navigation, main content and connections 2 : 5 : 3', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /--wex-admin-shell-drawer-column-max-inline-size: calc\(var\(--wex-space-64\) \* 11 \+ var\(--wex-space-16\)\);/);
  assert.match(css, /--wex-admin-shell-drawer-full-part: min\(calc\(var\(--wex-admin-shell-drawer-column-max-inline-size\) \/ 5\), /);
  assert.match(css, /--wex-admin-shell-drawer-full-navigation-max-inline-size: calc\(var\(--wex-space-64\) \* 3 \+ var\(--wex-space-24\) \+ var\(--wex-space-4\)\);/);
  assert.match(css, /grid-template-columns: var\(--wex-space-16\) min\(calc\(var\(--wex-admin-shell-drawer-full-part\) \* 2\), var\(--wex-admin-shell-drawer-full-navigation-max-inline-size\)\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 5\) var\(--wex-space-24\) calc\(var\(--wex-admin-shell-drawer-full-part\) \* 3\) var\(--wex-space-16\) minmax\(0, 1fr\);/);
});

test('Full shells run the Drawer height and the Footer sits under main content with its borders, with no extra offsets', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /@container wex-admin-drawer \(width >= 840px\) \{[\s\S]*\.wex-admin-drawer-main,\n  \.wex-admin-shell\[data-admin-drawer-mode="full"\]:has\(\[data-admin-drawer-section="presentation"\]\) \.wex-admin-shell__drawer-footer \{\n    grid-column: 4;\n    border-inline: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.doesNotMatch(css, /::before|margin-block: calc\(-1|drawer-footer-actions|margin-inline-start/);
  assert.match(css, /@container wex-admin-drawer \(width < 840px\)/);
  assert.match(css, /grid-row: 3 \/ span 2;/);
  assert.match(css, /drawer-footer \{\n    grid-row: 4;/);
});

test('Full navigation, main content and connections scroll on their own on desktop', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /drawer-body\[data-admin-drawer-section="presentation"\] \{\n    grid-row: 3 \/ span 2;\n    grid-template-rows: minmax\(0, 1fr\);\n    padding-block: 0;\n    overflow: hidden;/);
  assert.match(css, /:is\(\.wex-admin-product-sections, \.wex-admin-drawer-main, \.wex-admin-drawer-connections\) \{\n    align-self: stretch;\n    min-block-size: 0;\n    overflow: auto;\n    overscroll-behavior: contain;/);
  const sections = readFileSync(new URL('../src/admin-station-add-new-sections.js', import.meta.url), 'utf8');
  assert.match(sections, /connectionsShell\(document, \[\s*sectionUnit\(document, 'promotions'[\s\S]*sectionUnit\(document, 'activity'/);
  const base = readFileSync(new URL('../src/admin-station-add-new-sections.css', import.meta.url), 'utf8');
  assert.match(base, /\.wex-admin-drawer-main,\n\.wex-admin-drawer-connections \{\n  display: grid;\n  align-content: start;\n  gap: var\(--wex-space-24\);\n  min-inline-size: 0;/);
  assert.doesNotMatch(base, /display: contents/);
  assert.match(sections, /mainShell\(document, \[createProductSummary\(shell, undefined, \{[\s\S]*setAdminDrawerMode\(shell, 'full'\)[\s\S]*createProductPricing\(shell\), createProductDescription\(shell\), createProductMedia\(shell\), createProductSnapshot\(shell\), createProductMeeting\(shell\)\]\)/);
});

test('Full Promotions line stretches across the connections shell on desktop only', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /@container wex-admin-drawer \(width >= 840px\) \{[\s\S]*\.wex-admin-drawer-connections \{\n    display: grid;\n    grid-column: 5 \/ 8;/);
  assert.match(css, /\.wex-admin-drawer-connections > \.wex-admin-drawer-section \{\n    margin-inline: 0;\n    padding-inline: var\(--wex-space-24\) var\(--wex-space-16\);/);
});

test('Full Header start and actions stay within the shell columns', () => {
  const css = readFileSync(new URL('../src/admin-station-drawer-full.css', import.meta.url), 'utf8');
  assert.match(css, /drawer-header \{\n    display: grid;\n    grid-template-columns: subgrid;\n    padding-inline: 0;/);
  assert.match(css, /drawer-header-actions\) \{\n    grid-column: 2 \/ 7;\n    grid-row: 1;/);
  assert.match(css, /drawer-header-actions \{\n    justify-self: end;/);
});

test('Pricing shows the reference fields as labels and values, never inputs, and only in Full when selected', () => {
  const js = readFileSync(new URL('../src/admin-station-product-pricing.js', import.meta.url), 'utf8');
  for (const label of ['Advertised price', 'Price list', 'Badges', 'Featured']) assert.ok(js.includes(`'${label}'`), label);
  assert.doesNotMatch(js, /'(input|select|textarea|button)'/);
  const css = readFileSync(new URL('../src/admin-station-product-pricing.css', import.meta.url), 'utf8');
  assert.match(css, /\.wex-admin-product-pricing \{\n  display: none;/);
  assert.match(css, /\[data-admin-drawer-mode="full"\] \.wex-admin-shell__drawer-body\[data-admin-product-section="pricing"\] \.wex-admin-product-pricing \{\n  display: grid;/);
});
