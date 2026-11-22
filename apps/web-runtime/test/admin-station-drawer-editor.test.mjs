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
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-main > \* > :not\(\.wex-admin-product-section-head\) \{\s*display: none;/);
  assert.doesNotMatch(css, /wex-admin-product-sections|drawer-connections \{|#[0-9a-f]{3,8}\b|\d+px/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-drawer-editor\.css";/);
});
