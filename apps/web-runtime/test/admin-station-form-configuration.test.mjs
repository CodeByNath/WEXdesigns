import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  applyFormConfiguration,
  isFormConfigurationAdapter,
  persistFormConfiguration,
  readFormConfiguration,
  restoreFormConfiguration,
} from '../src/admin-station-form-configuration.js';
import { fieldChangeCount, trackFieldChange } from '../src/admin-station-field-history.js';
import { createMemoryStorage, createTestFormConfigurationAdapter } from '../studio-host/form-configuration-test-adapter.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

/** A minimal form: fields with closed data attributes and an order, as the Overview editor builds them. */
const fakeForm = (names, key = { 'data-form-id': 'overview', 'data-form-scope': 'record-1' }) => {
  const order = [];
  const makeField = (name) => {
    const attributes = new Map();
    const input = { getAttribute: (attribute) => (attribute === 'name' ? name : null) };
    return {
      querySelector: () => input,
      getAttribute: (attribute) => attributes.get(attribute) ?? null,
      setAttribute: (attribute, value) => attributes.set(attribute, String(value)),
      removeAttribute: (attribute) => attributes.delete(attribute),
      hasAttribute: (attribute) => attributes.has(attribute),
      toggleAttribute: (attribute, force) => (force ? attributes.set(attribute, '') : attributes.delete(attribute)),
      nextSibling: null,
    };
  };
  order.push(...names.map(makeField));
  const target = new EventTarget();
  return {
    getAttribute: (attribute) => key[attribute] ?? null,
    querySelectorAll: () => [...order],
    insertBefore: (field) => { order.splice(order.indexOf(field), 1); order.push(field); },
    addEventListener: target.addEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
    names: () => order.map((field) => field.querySelector().getAttribute('name')),
    field: (name) => order.find((field) => field.querySelector().getAttribute('name') === name),
  };
};

test('Form Editor reads and Form Renderer applies the same configuration, values excluded', () => {
  const editor = fakeForm(['name', 'price', 'duration']);
  editor.field('price').setAttribute('data-field-width', '37');
  editor.field('price').setAttribute('data-field-status', 'off');
  editor.field('name').setAttribute('data-field-position', 'end');
  const configuration = readFormConfiguration(editor);
  assert.equal(configuration.schema, 'wex-form-configuration@1');
  assert.deepEqual([configuration.formId, configuration.scopeId], ['overview', 'record-1']);
  assert.deepEqual(configuration.fields[1], { name: 'price', width: '37', position: 'stretch', alignment: 'left', row: 'own', reverse: false, status: 'off' });
  assert.equal(JSON.stringify(configuration).includes('value'), false);

  const renderer = fakeForm(['name', 'price', 'duration', 'unknown-to-config']);
  assert.equal(applyFormConfiguration(renderer, { ...configuration, fields: [configuration.fields[2], configuration.fields[0], configuration.fields[1], { ...configuration.fields[0], name: 'missing' }] }), true);
  assert.deepEqual(renderer.names(), ['duration', 'name', 'price', 'unknown-to-config']);
  assert.equal(renderer.field('price').getAttribute('data-field-status'), 'off');
  assert.equal(renderer.field('name').getAttribute('data-field-position'), 'end');
  assert.equal(renderer.field('unknown-to-config').getAttribute('data-field-width'), null);
  assert.equal(applyFormConfiguration(renderer, { ...configuration, fields: [{ ...configuration.fields[0], width: '101' }] }), false);
});

test('a published configuration is restored on load as the starting point, with no history steps', async () => {
  const storage = createMemoryStorage();
  const editor = fakeForm(['name', 'price']);
  const adapter = createTestFormConfigurationAdapter(storage);
  editor.field('name').setAttribute('data-field-alignment', 'right');
  editor.field('price').setAttribute('data-field-status', 'off');
  const published = await persistFormConfiguration(editor, 'publish', adapter);
  assert.equal(published.ok, true);
  assert.deepEqual(published.ok && published.receipt, { persisted: true, revision: 1 });

  const refreshed = fakeForm(['name', 'price']);
  let restoredEvent = false;
  refreshed.addEventListener('wex:admin-field-history', (event) => { restoredEvent = event.detail.restored === true && event.detail.steps === 0; });
  assert.equal(await restoreFormConfiguration(refreshed, createTestFormConfigurationAdapter(storage)), true);
  assert.equal(refreshed.field('name').getAttribute('data-field-alignment'), 'right');
  assert.equal(refreshed.field('price').getAttribute('data-field-status'), 'off');
  assert.equal(fieldChangeCount(refreshed), 0);
  assert.equal(restoredEvent, true);

  const otherRecord = fakeForm(['name', 'price'], { 'data-form-id': 'overview', 'data-form-scope': 'record-2' });
  assert.equal(await restoreFormConfiguration(otherRecord, createTestFormConfigurationAdapter(storage)), false);
  assert.equal(otherRecord.field('price').getAttribute('data-field-status'), null);
});

test('restore never overwrites edits already made, and Save does not change what is published', async () => {
  const storage = createMemoryStorage();
  const adapter = createTestFormConfigurationAdapter(storage);
  const editor = fakeForm(['name']);
  editor.field('name').setAttribute('data-field-position', 'end');
  await persistFormConfiguration(editor, 'publish', adapter);
  editor.field('name').setAttribute('data-field-position', 'center');
  assert.equal((await persistFormConfiguration(editor, 'save', adapter)).ok, true);
  assert.equal((await adapter.load({ formId: 'overview', scopeId: 'record-1' })).published.fields[0].position, 'end');

  const busy = fakeForm(['name']);
  trackFieldChange(busy, () => busy.field('name').setAttribute('data-field-width', '50'));
  assert.equal(await restoreFormConfiguration(busy, adapter), false);
  assert.equal(busy.field('name').getAttribute('data-field-width'), '50');
});

test('Save and Publish succeed only with a confirmed receipt from the host adapter', async () => {
  const editor = fakeForm(['name']);
  assert.deepEqual(await persistFormConfiguration(editor, 'publish', null), { ok: false, error: 'adapter-unavailable' });
  const failing = createTestFormConfigurationAdapter(createMemoryStorage(), { fail: true });
  assert.deepEqual(await persistFormConfiguration(editor, 'publish', failing), { ok: false, error: 'persistence-failed' });
  assert.deepEqual(await persistFormConfiguration(editor, 'save', failing), { ok: false, error: 'persistence-failed' });
  const unconfirmed = { load: async () => ({ published: null }), save: async () => ({ persisted: false, revision: 1 }), publish: async () => undefined };
  assert.deepEqual(await persistFormConfiguration(editor, 'publish', unconfirmed), { ok: false, error: 'unconfirmed' });
  assert.deepEqual(await persistFormConfiguration(editor, 'save', unconfirmed), { ok: false, error: 'unconfirmed' });
  assert.equal(isFormConfigurationAdapter(unconfirmed), true);
  assert.equal(isFormConfigurationAdapter({ load() {}, save() {} }), false);
});

test('the Editor footer commits Publish only after confirmation and reports failure without losing changes', () => {
  const js = read('../src/admin-station-editor-footer.js');
  assert.match(js, /await persistFormConfiguration\(editor, action, formConfigurationAdapterFor\(editor\)\)/);
  assert.match(js, /if \(result\.ok && action === 'publish' && sameConfiguration\(editor, result\.configuration\)\) commitFieldChanges\(editor\);/);
  assert.match(js, /if \(result\.ok\) footer\.dispatchEvent\(new CustomEvent\(eventName/);
  assert.match(js, /ADMIN_EDITOR_PERSIST_FAILED_EVENT, \{ bubbles: true, detail: \{ action, error: result\.error \} \}/);
  assert.doesNotMatch(js, /item\.dataset\.adminEditorAction === 'publish' && editor\) commitFieldChanges/);
});

test('the host supplies the adapter; WEX ships no storage and no host-specific logic', () => {
  assert.match(read('../src/studio-host.js'), /formConfigurationAdapter: options\.formConfigurationAdapter/);
  assert.match(read('../src/admin-station-runtime.js'), /setFormConfigurationAdapter\(shell, options\.formConfigurationAdapter\)/);
  assert.match(read('../src/admin-station-product-overview-editor.js'), /restoreFormConfiguration\(section, formConfigurationAdapterFor\(shell\)\)/);
  const module = read('../src/admin-station-form-configuration.js');
  assert.doesNotMatch(module, /localStorage|sessionStorage|indexedDB|fetch\(|qsd|scuba/i);
  assert.match(read('../studio-host/fixture.html'), /createTestFormConfigurationAdapter\(sessionStorage/);
});
