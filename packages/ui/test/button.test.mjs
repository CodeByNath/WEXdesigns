import assert from 'node:assert/strict';
import test from 'node:test';

import { createButtonPresentation } from '../dist/index.js';

test('resolves a Button through its accepted semantic variant', () => {
  assert.deepEqual(
    createButtonPresentation({
      action: {
        id: 'review',
        label: 'Review',
        command: 'record.review',
        recordId: 'record-1',
      },
      variant: 'neutral',
      tier: 'large',
      disabled: false,
    }),
    {
      className: 'wex-button wex-button--neutral wex-button--large',
      disabled: false,
      id: 'review',
      label: 'Review',
      tier: 'large',
    },
  );
});

test('maps every serializable tier to its WEX geometry class', () => {
  for (const tier of ['small', 'default', 'large']) {
    const presentation = createButtonPresentation({
      action: {
        id: `tier-${tier}`,
        label: 'Continue',
        command: 'record.continue',
        recordId: 'record-1',
      },
      tier,
    });

    assert.match(presentation.className, new RegExp(`wex-button--${tier}`));
  }
});

test('keeps disabled state on the native-control boundary', () => {
  const presentation = createButtonPresentation({
    action: {
      id: 'unavailable',
      label: 'Unavailable',
      command: 'record.unavailable',
      recordId: 'record-1',
    },
    disabled: true,
  });

  assert.equal(presentation.disabled, true);
  assert.equal('ariaPressed' in presentation, false);
  assert.equal('state' in presentation, false);
});
