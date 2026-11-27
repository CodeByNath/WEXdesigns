import assert from 'node:assert/strict';
import test from 'node:test';

import {
  WEX_FORM_CONFIGURATION_SCHEMA,
  WexFormConfigurationLoadResultSchema,
  WexFormConfigurationReceiptSchema,
  WexFormConfigurationSchema,
} from '../dist/index.js';

const field = (name, extra = {}) => ({ name, width: 'default', position: 'stretch', alignment: 'left', row: 'own', reverse: false, status: 'on', ...extra });
const configuration = (fields) => ({ schema: WEX_FORM_CONFIGURATION_SCHEMA, formId: 'overview', scopeId: 'record-1', fields });

test('a Form configuration holds only field layout and status, in order', () => {
  const parsed = WexFormConfigurationSchema.parse(configuration([field('name'), field('price', { width: '37', position: 'end', alignment: 'right', status: 'off' })]));
  assert.deepEqual(parsed.fields.map((item) => item.name), ['name', 'price']);
  assert.equal(WexFormConfigurationSchema.safeParse(configuration([field('name', { value: 'x' })])).success, false);
  assert.equal(WexFormConfigurationSchema.safeParse({ ...configuration([]), rules: [] }).success, false);
});

test('closed values only: width 0 to 100 or default, known positions, unique names', () => {
  for (const width of ['0', '100', '50', 'default']) assert.equal(WexFormConfigurationSchema.safeParse(configuration([field('a', { width })])).success, true);
  for (const width of ['101', '-1', '05', '50%', '']) assert.equal(WexFormConfigurationSchema.safeParse(configuration([field('a', { width })])).success, false);
  assert.equal(WexFormConfigurationSchema.safeParse(configuration([field('a', { position: 'left' })])).success, false);
  assert.equal(WexFormConfigurationSchema.safeParse(configuration([field('a'), field('a')])).success, false);
  assert.equal(WexFormConfigurationSchema.safeParse({ ...configuration([]), schema: 'wex-form-configuration@2' }).success, false);
});

test('persistence is confirmed only by a valid receipt; load returns the published configuration or null', () => {
  assert.equal(WexFormConfigurationReceiptSchema.safeParse({ persisted: true, revision: 3 }).success, true);
  assert.equal(WexFormConfigurationReceiptSchema.safeParse({ persisted: false, revision: 3 }).success, false);
  assert.equal(WexFormConfigurationReceiptSchema.safeParse({ persisted: true }).success, false);
  assert.equal(WexFormConfigurationLoadResultSchema.safeParse({ published: null }).success, true);
  assert.equal(WexFormConfigurationLoadResultSchema.safeParse({ published: configuration([field('a')]) }).success, true);
});
