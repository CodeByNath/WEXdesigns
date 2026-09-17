import assert from 'node:assert/strict';
import test from 'node:test';

import { createButtonPresentation } from '../dist/index.js';

test('resolves a Button through its accepted semantic variant', () => {
  assert.deepEqual(
    createButtonPresentation({
      id: 'review',
      label: 'Review',
      variant: 'neutral',
      tier: 'large',
      state: 'focus',
    }),
    {
      className: 'wex-button wex-button--neutral',
      disabled: false,
      id: 'review',
      label: 'Review',
      state: 'focus',
      tier: 'large',
    },
  );
});

test('keeps disabled state on the native-control boundary', () => {
  const presentation = createButtonPresentation({
    id: 'unavailable',
    label: 'Unavailable',
    state: 'disabled',
  });

  assert.equal(presentation.disabled, true);
  assert.equal('ariaPressed' in presentation, false);
});
