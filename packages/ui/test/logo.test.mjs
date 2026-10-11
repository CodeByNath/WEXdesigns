import assert from 'node:assert/strict';
import test from 'node:test';

import { createLogoRenderDescription } from '../dist/index.js';

test('resolves a platform-neutral Logo render description', () => {
  assert.deepEqual(createLogoRenderDescription({ label: 'Logo' }), {
    kind: 'element',
    tagName: 'span',
    classNames: ['wex-logo', 'wex-type-navigation-default-semibold'],
    attributes: { 'data-logo-capability': 'logo' },
    children: [{
      kind: 'element',
      tagName: 'span',
      classNames: ['wex-logo__label'],
      attributes: {},
      children: [{ kind: 'text', value: 'Logo' }],
    }],
  });
});

test('keeps Logo render descriptions free of browser and host concerns', () => {
  const description = createLogoRenderDescription({ label: 'Logo' });
  assert.equal('onClick' in description, false);
  assert.equal('route' in description, false);
});
