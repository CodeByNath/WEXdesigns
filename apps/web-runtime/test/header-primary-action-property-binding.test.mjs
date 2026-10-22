import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveHeaderPrimaryActionProperties } from '../src/header-primary-action-property-binding.js';

const binding = { source: 'external.primary-action-image', target: 'imageUrl' };

test('resolves the approved Header primary-action icon and image properties', () => {
  assert.deepEqual(
    resolveHeaderPrimaryActionProperties(
      'primary',
      binding,
      { 'external.primary-action-image': 'https://cdn.example.test/action.svg' },
    ),
    { icon: 'primary', imageUrl: 'https://cdn.example.test/action.svg' },
  );
});

test('retains the primary icon fallback for disconnected, invalid, or unsafe image values', () => {
  [undefined, null, 'not a URL', 'http://cdn.example.test/action.svg', 'javascript:alert(1)'].forEach((value) => {
    assert.deepEqual(resolveHeaderPrimaryActionProperties('primary', binding, { 'external.primary-action-image': value }), { icon: 'primary' });
  });
  assert.deepEqual(resolveHeaderPrimaryActionProperties('notification', binding, {}), {});
  assert.deepEqual(resolveHeaderPrimaryActionProperties('primary', { source: 'external.primary-action-image', target: 'icon' }, {}), { icon: 'primary' });
  assert.deepEqual(resolveHeaderPrimaryActionProperties('primary', binding, []), { icon: 'primary' });
});
