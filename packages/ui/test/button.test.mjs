import assert from 'node:assert/strict';
import test from 'node:test';

import { createButtonPresentation } from '../dist/index.js';

test('resolves the WEX classes from a serializable Button definition', () => {
  assert.deepEqual(
    createButtonPresentation({
      id: 'save-draft',
      label: 'Save draft',
      variant: 'secondary',
      tier: 'large',
      action: {
        id: 'save-draft',
        label: 'Save draft',
        command: 'draft.save',
        recordId: 'draft-1',
      },
    }),
    {
      action: {
        id: 'save-draft',
        label: 'Save draft',
        command: 'draft.save',
        recordId: 'draft-1',
      },
      className: 'wex-button wex-button--secondary wex-button--large',
      disabled: false,
      id: 'save-draft',
      label: 'Save draft',
    },
  );
});

test('keeps disabled state on the native control boundary', () => {
  assert.equal(
    createButtonPresentation({ id: 'unavailable', label: 'Unavailable', disabled: true }).disabled,
    true,
  );
});
