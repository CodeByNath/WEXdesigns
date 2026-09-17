import assert from 'node:assert/strict';
import test from 'node:test';

import {
  EntityIdentifierSchema,
  ButtonDefinitionSchema,
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

test('defines Buttons as serializable WEX-tiered semantic controls', () => {
  assert.deepEqual(
    ButtonDefinitionSchema.parse({ id: 'publish', label: 'Publish' }),
    {
      id: 'publish',
      label: 'Publish',
      variant: 'primary',
      tier: 'default',
      disabled: false,
    },
  );
  assert.equal(
    ButtonDefinitionSchema.safeParse({ id: 'Publish', label: 'Publish' }).success,
    false,
  );
});
