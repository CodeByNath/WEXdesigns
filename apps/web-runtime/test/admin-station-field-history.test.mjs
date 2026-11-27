import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { commitFieldChanges, fieldChangeCount, trackFieldChange, undoFieldChange } from '../src/admin-station-field-history.js';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('every layout control records its change as a history step; a width drag is one step per field', () => {
  const options = read('admin-station-field-options.js');
  assert.equal((options.match(/trackFieldChange\(/g) ?? []).length, 4);
  assert.match(options, /trackFieldChange\(editor, \(\) => \{ layout\.width = range\.value; apply\(\); \}, selected\)/);
  assert.match(options, /addEventListener\('change', \(\) => endChangeGroup\(editor\)\)/);
  assert.match(read('admin-station-field-row-control.js'), /trackFieldChange\(editor, \(\) => writeItems\(editor, next, resetWidth\)\)/);
});

test('a step is a snapshot of the closed layout attributes and the field order; defaults are not changes', () => {
  const history = read('admin-station-field-history.js');
  assert.match(history, /'data-field-width', 'data-field-position', 'data-field-alignment', 'data-field-row', 'data-field-row-reverse'/);
  assert.match(history, /DEFAULTS = \['default', 'stretch', 'left', null, null, 'on'\]/);
  assert.match(history, /if \(same\(before, snapshot\(editor\)\)\) return;/);
  assert.match(history, /editor\.insertBefore\(field, anchor\)/);
  assert.doesNotMatch(history, /\.style\b|style=|cssText/);
});

test('the Editor footer follows the steps: one left chevron goes back a step, Discard goes back to the start, no steps disables the button', () => {
  const footer = read('admin-station-editor-footer.js');
  assert.match(footer, /wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small/);
  assert.match(footer, /createSystemIcon\(document, 'chevron-left'\)/);
  assert.match(footer, /undo\.disabled = true;/);
  assert.match(footer, /undoFieldChange\(editor\)/);
  assert.match(footer, /setEditorFooterState\(footer, \{ dirty: steps > 0, publishable: steps > 0 \}\);\s*undo\.disabled = steps === 0;\s*if \(steps === 0\) close\(\);/);
  assert.match(footer, /if \(found\[0\] === 'discard'\) \{[\s\S]*?undoAllFieldChanges\(editor\);/);
  assert.match(footer, /result\.ok && action === 'publish' && sameConfiguration\(editor, result\.configuration\)\) commitFieldChanges\(editor\)/);
  assert.match(read('admin-station-form-builder.js'), /ADMIN_FIELD_HISTORY_EVENT[\s\S]*event\.detail\?\.restored\) syncEditor\(drawer\)/);
});

test('Publish keeps the layout as the new starting point and leaves no steps', () => {
  const attributes = new Map();
  const field = {
    nextSibling: null,
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
  };
  const seen = [];
  const editor = {
    querySelectorAll: () => [field],
    insertBefore: () => {},
    dispatchEvent: (event) => seen.push(event.detail),
  };
  trackFieldChange(editor, () => field.setAttribute('data-field-alignment', 'center'));
  assert.equal(fieldChangeCount(editor), 1);
  commitFieldChanges(editor);
  assert.equal(fieldChangeCount(editor), 0);
  assert.deepEqual(seen.at(-1), { steps: 0, restored: false });
  assert.equal(field.getAttribute('data-field-alignment'), 'center');
  assert.equal(undoFieldChange(editor), false);
});
