import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveLogoImagePropertyBinding } from '../src/logo-property-binding.js';

const binding = { source: 'external.logo', target: 'imageUrl' };

test('resolves only the approved Logo image property from application values', () => {
  assert.deepEqual(
    resolveLogoImagePropertyBinding(binding, { 'external.logo': 'https://cdn.example.test/logo.svg' }),
    { imageUrl: 'https://cdn.example.test/logo.svg' },
  );
});

test('leaves Logo on its label fallback for disconnected, invalid, or unsafe values', () => {
  [undefined, null, 'not a URL', 'http://cdn.example.test/logo.svg', 'javascript:alert(1)'].forEach((value) => {
    assert.deepEqual(resolveLogoImagePropertyBinding(binding, { 'external.logo': value }), {});
  });
  assert.deepEqual(resolveLogoImagePropertyBinding({ source: 'external.logo', target: 'label' }, {}), {});
  assert.deepEqual(resolveLogoImagePropertyBinding(binding, []), {});
});
