import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('Edit opens the editor view: Full, Publish as the main action, owner-checked', () => {
  const js = read('admin-station-add-new-sections.js');
  assert.match(js, /addEventListener\(ADMIN_DRAWER_EDIT_EVENT, \(\) => \{[\s\S]*adminDrawerOwner !== owner\) return;\s*setAdminDrawerMode\(shell, 'full'\);\s*setAdminDrawerActionState\(shell, \{ dirty: false, publishable: true \}\);/);
});

test('editor view empties the connections shell and keeps the navigation and each section heading', () => {
  const css = read('admin-station-drawer-editor.css');
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-connections > \* \{\s*display: none;/);
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-main > :not\(\.wex-admin-product-editor\) > :not\(\.wex-admin-product-section-head\) \{\s*display: none;/);
  assert.doesNotMatch(css.replace(/@container[^{]*/, ''), /wex-admin-product-sections|drawer-connections \{|#[0-9a-f]{3,8}\b|\d+px/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-drawer-editor\.css";/);
});

test('the Overview editor is one outlined field per value, label on the border, Search Input states, existing tokens only', () => {
  const js = read('admin-station-outlined-field.js');
  assert.match(js, /createElement\('div'\)[\s\S]*createElement\('label'\)[\s\S]*createElement\('textarea'\)/);
  assert.match(js, /control\.dataset\.value = input\.value/);
  assert.match(js, /wex-admin-outlined-field__control wex-type-navigation-small-semibold/);
  assert.match(js, /text\.htmlFor = `wex-admin-field-\$\{name\}`/);
  const editor = read('admin-station-product-overview-editor.js');
  for (const label of ['Name', 'Platform ID', 'Booking ID', 'Marketing Title', 'Tagline', 'Price', 'Duration', 'Language', 'Category']) assert.match(editor, new RegExp(`label: '${label}'`));
  assert.match(editor, /name: 'platform-id', label: 'Platform ID', key: 'id', readOnly: true/);
  assert.match(read('admin-station-add-new-sections.js'), /createProductFaqBooking\(shell\), createProductOverviewEditor\(shell\)\]/);
  const css = read('admin-station-outlined-field.css');
  assert.match(css, /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);\s*border-radius: var\(--wex-radius-large\);/);
  assert.doesNotMatch(css, /:hover/);
  assert.match(css, /\.wex-admin-outlined-field \{\s*position: relative;\s*isolation: isolate;/);
  assert.match(css, /__control::after \{[^}]*content: attr\(data-value\) ' ';/);
  assert.match(css, /__input \{\s*grid-area: 1 \/ 1;[^}]*overflow: hidden;[^}]*resize: none;/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__input \{\s*padding-block: calc\(var\(--wex-space-12\) \+ var\(--wex-space-8\)\);/);
  assert.match(css, /__input \{[^}]*padding: var\(--wex-space-12\);/);
  assert.match(css, /\.wex-admin-outlined-field \{[^}]*padding: 0;/);
  assert.match(css, /__label \{[^}]*color: var\(--wex-color-text-primary\);/);
  assert.match(css, /__input \{[^}]*color: var\(--wex-color-text-secondary\);/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__label \{\s*color: var\(--wex-color-text-secondary\);/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__input \{\s*color: var\(--wex-color-text-primary\);/);
  assert.match(css, /:active,\s*\.wex-admin-outlined-field:focus-within \{[^}]*border-color: var\(--wex-outer-ring-color\);/);
  assert.match(css, /:focus-within::after \{[^}]*inset: 0;[^}]*border: var\(--wex-outer-ring-inner-width\) solid var\(--wex-outer-ring-color\);/);
  assert.match(css, /:focus-within::before \{[^}]*inset: var\(--wex-outer-ring-inner-width\);[^}]*border: var\(--wex-outer-ring-gap\) solid var\(--wex-outer-ring-gap-color\);/);
  assert.match(css, /__label \{[^}]*inset-block-start: 0;[^}]*block-size: var\(--wex-space-24\);[^}]*padding-inline: var\(--wex-pill-notification-status-padding-inline\);[^}]*border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);[^}]*border-radius: var\(--wex-pill-notification-status-radius\);[^}]*background: var\(--wex-color-background-secondary\);[^}]*transform: translateY\(-50%\);/);
  assert.match(css, /\.wex-admin-outlined-field \.wex-admin-outlined-field__input:focus-visible \{\s*outline: none;/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  const editorCss = read('admin-station-drawer-editor.css');
  assert.match(editorCss, /\.wex-admin-product-editor \{\s*display: none;/);
  assert.match(editorCss, /\[data-admin-product-section="overview"\] \.wex-admin-product-editor\[data-admin-product-editor="overview"\] \{\s*display: grid;\s*gap: var\(--wex-space-24\);\s*(?:\/\*[^*]*\*\/\s*)?margin-block-start: var\(--wex-space-12\);/);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-outlined-field\.css";/);
});

test('editor proportion: main content shell takes up to the content maximum, the navigation keeps its width, connections take the rest', () => {
  const css = read('admin-station-drawer-editor.css');
  assert.match(css, /@container wex-admin-drawer \(width >= 840px\) \{[\s\S]*\[data-admin-drawer-shell\]\[data-admin-drawer-editing\]\) \.wex-admin-shell__drawer-frame \{/);
  assert.match(css, /min\(var\(--wex-admin-shell-drawer-column-max-inline-size\), calc\(100cqi - /);
  assert.match(css, /var\(--wex-admin-shell-drawer-editor-navigation\)\s*var\(--wex-space-24\)\s*min\(/);
  assert.doesNotMatch(css.slice(css.indexOf('{', css.indexOf('@container'))), /\d+px/);
});

test('the editor main content shell never passes the content maximum in any layout', () => {
  assert.match(read('admin-station-drawer-editor.css'), /\[data-admin-drawer-editing\] \.wex-admin-drawer-main \{\s*max-inline-size: var\(--wex-admin-shell-drawer-column-max-inline-size\);/);
});
