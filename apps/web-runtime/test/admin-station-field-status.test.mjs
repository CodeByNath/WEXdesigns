import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('the selected-field label row leads with the edit icon and ends with the status switch', () => {
  assert.match(read('admin-station-form-builder.js'), /heading\.append\(icon, name\);[\s\S]*heading\.after\(createFieldStatus\(heading\.ownerDocument, selected\)\)/);
  assert.match(read('admin-station-form-builder.css'), /\.wex-admin-quick-actions__heading \{[^}]*justify-content: flex-start;[^}]*gap: var\(--wex-space-8\);/);
});

test('the status switch is one pill with On or Off inside it and a knob, and a press is a history step', () => {
  const js = read('admin-station-field-status.js');
  assert.match(js, /setAttribute\('role', 'switch'\)/);
  assert.match(js, /setAttribute\('aria-label', 'Field status'\)/);
  assert.match(js, /word\.textContent = on \? 'On' : 'Off'/);
  assert.match(js, /button\.append\(word, knob\)/);
  assert.match(js, /trackFieldChange\(selected\.parentElement/);
  assert.match(read('admin-station-field-history.js'), /'data-field-status'\];[\s\S]*null, null, 'on'\];/);
});

test('On takes the blue accent, Off is grey with the knob first, existing tokens only', () => {
  const css = read('admin-station-field-status.css');
  assert.match(css, /\.wex-admin-field-status \{[^}]*background: var\(--wex-color-background-accent\);\s*color: var\(--wex-color-on-accent\);/);
  assert.match(css, /\[aria-checked="false"\] \{\s*flex-direction: row-reverse;\s*background: var\(--wex-color-surface-selected\);/);
  assert.match(css, /__word \{[^}]*text-transform: uppercase;/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-field-status\.css";/);
});

const fakeForm = (names) => {
  const fields = names.map((name) => {
    const attributes = new Map();
    return {
      name,
      querySelector: () => ({ getAttribute: () => name }),
      getAttribute: (key) => attributes.get(key) ?? null,
      setAttribute: (key, value) => attributes.set(key, value),
    };
  });
  const listeners = [];
  return {
    fields,
    querySelectorAll: () => fields,
    addEventListener: (_, listener) => listeners.push(listener),
    report: () => listeners.forEach((listener) => listener()),
  };
};

test('an off field is kept for its own service only: another service on the same form still has it', async () => {
  const { keepFieldStatus } = await import('../src/admin-station-field-status.js');
  const status = (form) => form.fields.map((field) => field.getAttribute('data-field-status'));
  const first = fakeForm(['name', 'price']);
  keepFieldStatus(first, 'service-a');
  first.fields[1].setAttribute('data-field-status', 'off');
  first.report();
  const reopened = fakeForm(['name', 'price']);
  keepFieldStatus(reopened, 'service-a');
  assert.deepEqual(status(reopened), [null, 'off']);
  const other = fakeForm(['name', 'price']);
  keepFieldStatus(other, 'service-b');
  assert.deepEqual(status(other), [null, null]);
  reopened.fields[1].setAttribute('data-field-status', 'on');
  reopened.report();
  const back = fakeForm(['name', 'price']);
  keepFieldStatus(back, 'service-a');
  assert.deepEqual(status(back), [null, null]);
});

test('off disables the Editor and stays visible and faint in content and Form Editor', () => {
  assert.match(read('admin-station-form-builder.js'), /unit\.toggleAttribute\('data-field-off', off\);[\s\S]*part\.inert = off;/);
  assert.match(read('admin-station-product-overview-editor.js'), /keepFieldStatus\(section, product\.id\);/);
  const css = read('admin-station-field-status.css');
  assert.match(css, /\[data-field-off\] > :is\(\.wex-admin-form-tabs, \.wex-admin-form-tab-panels\) \{\s*opacity: var\(--wex-opacity-disabled\);/);
  assert.doesNotMatch(css, /product-editor[^}]*display: none/);
  assert.match(css, /data-presentation-field/);
});

test('Off locks only its content value and mutes only its matching presentation, undo restores both', async () => {
  const { keepFieldStatus, syncContentFieldStatus, syncPresentationFieldStatus } = await import('../src/admin-station-field-status.js');
  const form = fakeForm(['name', 'price']);
  const inputs = form.fields.map(() => ({ disabled: false }));
  form.fields.forEach((field, index) => {
    inputs[index].getAttribute = () => field.name;
    field.querySelector = () => inputs[index];
  });
  let builderActive = false;
  form.closest = () => ({ querySelector: () => builderActive ? {} : null });
  keepFieldStatus(form, 'status-content-test');
  const presentationFields = ['name', 'price'].map((name) => {
    const attributes = new Map([['data-presentation-field', name]]);
    const label = { textContent: name === 'price' ? 'Price' : 'Name' };
    const value = { textContent: name === 'price' ? '$425.00' : 'Course', setAttribute: () => {} };
    return { label, value, querySelector: (selector) => selector === 'dt' ? label : value,
      getAttribute: (key) => attributes.get(key), setAttribute: (key, value) => attributes.set(key, value) };
  });
  const summary = { querySelectorAll: () => presentationFields };
  form.fields[1].setAttribute('data-field-status', 'off');
  form.report();
  syncPresentationFieldStatus(summary, 'status-content-test');
  assert.deepEqual(inputs.map((input) => input.disabled), [false, true]);
  assert.equal(presentationFields[1].value.textContent, '(inactive)');
  assert.equal(presentationFields[1].label.textContent, 'Price');
  assert.equal(presentationFields[1].value.textContent, '(inactive)');
  syncPresentationFieldStatus(summary, 'status-content-test');
  assert.equal(presentationFields[1].label.textContent, 'Price');
  assert.equal(presentationFields[1].value.textContent, '(inactive)');
  assert.equal(presentationFields[1].getAttribute('aria-disabled'), 'true');
  builderActive = true;
  syncContentFieldStatus(form);
  assert.deepEqual(inputs.map((input) => input.disabled), [true, true]);
  builderActive = false;
  syncContentFieldStatus(form);
  assert.deepEqual(inputs.map((input) => input.disabled), [false, true]);
  form.fields[1].setAttribute('data-field-status', 'on');
  form.report();
  syncPresentationFieldStatus(summary, 'status-content-test');
  assert.deepEqual(inputs.map((input) => input.disabled), [false, false]);
  assert.equal(presentationFields[1].value.textContent, '$425.00');
  assert.equal(presentationFields[1].label.textContent, 'Price');
});
