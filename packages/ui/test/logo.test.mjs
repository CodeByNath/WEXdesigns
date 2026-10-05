import assert from 'node:assert/strict';
import test from 'node:test';

import { createLogoPresentation } from '../dist/index.js';

test('resolves a platform-neutral Logo presentation', () => {
  assert.deepEqual(createLogoPresentation({ label: 'Logo' }), {
    className: 'wex-logo',
    label: 'Logo',
  });
});

test('keeps Logo presentation free of browser and host concerns', () => {
  const presentation = createLogoPresentation({ label: 'Logo' });
  assert.equal('onClick' in presentation, false);
  assert.equal('route' in presentation, false);
});
