import assert from 'node:assert/strict';
import test from 'node:test';

import {
  EntityIdentifierSchema,
  SemanticActionSchema,
  WexTierSchema,
} from '../dist/index.js';

test('accepts UUID and slug identifiers', () => {
  assert.equal(
    EntityIdentifierSchema.parse({
      type: 'id',
      value: '550e8400-e29b-41d4-a716-446655440000',
    }).type,
    'id',
  );
  assert.equal(
    EntityIdentifierSchema.parse({ type: 'slug', value: 'managed-services' }).type,
    'slug',
  );
});

test('rejects uncontrolled identifiers', () => {
  assert.equal(
    EntityIdentifierSchema.safeParse({ type: 'slug', value: 'Managed Services' }).success,
    false,
  );
});

test('accepts semantic actions without executable callbacks', () => {
  assert.deepEqual(
    SemanticActionSchema.parse({
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: 'service-1',
    }),
    {
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: 'service-1',
    },
  );
});

test('keeps the global WEX tier language closed', () => {
  assert.deepEqual(WexTierSchema.options, ['small', 'default', 'large']);
  assert.equal(WexTierSchema.safeParse('compact').success, false);
});
