import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('editor view: the connections shell collapses to the chevron strip and opens as a small side drawer', () => {
  const js = read('admin-station-connections-toggle.js');
  assert.match(js, /button\.className = 'wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small wex-action-button-icon-only--circular wex-admin-connections-toggle';/);
    assert.match(js, /if \(editorActive\(\)\) resetFormBuilder\(drawer\);\s*else drawer\.toggleAttribute\('data-admin-connections-open'\);/);
  assert.match(js, /if \(wasActive && !active\) drawerOf\(\)\?\.removeAttribute\('data-admin-connections-open'\);/);
  assert.match(js, /if \(!drawer\?\.hasAttribute\('data-admin-connections-open'\) \|\| editorActive\(\)\) return;/);
  assert.match(js, /active \|\| open \? 'x' : 'chevron-left'/);
  assert.match(read('admin-station-add-new-sections.js'), /createEditorFooter\(document\),\s*createConnectionsToggle\(document\),/);
  const css = read('admin-station-connections-toggle.css');
  assert.match(css, /var\(--wex-space-24\) minmax\(0, 1fr\) 0 calc\(var\(--wex-action-button-icon-only-small-target-size\) \/ 2\) var\(--wex-space-16\) 0;/);
  assert.match(css, /\.wex-admin-drawer-main > \* \{\s*max-inline-size: calc\(var\(--wex-admin-shell-drawer-column-max-inline-size\)/);
  assert.match(css, /:not\(\[data-admin-connections-open\]\) \.wex-admin-drawer-connections > :not\(\.wex-admin-connections-toggle\) \{\s*display: none;/);
  assert.match(css, /\[data-admin-connections-open\] \.wex-admin-drawer-connections \{[^}]*position: absolute;[^}]*inline-size: calc\(var\(--wex-admin-shell-drawer-full-part\) \* 3 \+ var\(--wex-space-24\) \+ var\(--wex-space-16\)\);[^}]*background: var\(--wex-color-layer-02\);/);
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-connections \{\s*overflow: visible;/);
  assert.match(css, /inset-inline-start: calc\(var\(--wex-action-button-icon-only-small-target-size\) \/ -2\);/);
  assert.doesNotMatch(css, /quick-actions__header/);
  assert.match(css, /\[data-admin-connections-open\]:has\(\[data-editor-active\]\) \.wex-admin-shell__drawer-frame \{\s*grid-template-columns: [^;]*minmax\(0, 1fr\) 0 calc\(var\(--wex-admin-shell-drawer-full-part\) \* 3 \+ var\(--wex-space-24\) \+ var\(--wex-space-16\)\) 0 0;/);
  assert.match(css, /\[data-admin-connections-open\]:has\(\[data-editor-active\]\) \.wex-admin-drawer-connections \{\s*position: relative;/);
  assert.match(css, /:has\(\[data-editor-active\]\) \.wex-admin-connections-toggle \{\s*inset-block-start: calc\(var\(--wex-action-button-icon-only-small-target-size\) \/ -2\);/);
  assert.match(css, /@container wex-admin-drawer \(width >= 840px\)/);
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/width >= 840px/, ''), /#[0-9a-f]{3,8}\b|\d+px/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-connections-toggle\.css";/);
});
