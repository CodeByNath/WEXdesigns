import assert from 'node:assert/strict';
import test from 'node:test';
// Load the runtime entry graph in the same order as the application.
import '../src/admin-station-shell.js';
import { hasProductSummaryContent } from '../src/admin-station-product-summary.js';
import { setAdminDrawerMode } from '../src/admin-station-drawer.js';

const empty = {
  id: '', productCode: '', name: '', imageUrl: '', category: '', labels: [],
  ratings: '', reviews: 0, price: '', duration: '', language: '',
};

test('See all content guard rejects empty content and accepts meaningful product values', () => {
  assert.equal(hasProductSummaryContent(empty), false);
  assert.equal(hasProductSummaryContent({ ...empty, name: '   ', labels: [' '] }), false);
  assert.equal(hasProductSummaryContent({ ...empty, name: 'Course' }), true);
  assert.equal(hasProductSummaryContent({ ...empty, labels: ['Top rated'] }), true);
});

test('explicit Full navigation works when Default and Full have the same narrow width, preserving state', () => {
  class Element {}
  const previous = globalThis.HTMLElement;
  globalThis.HTMLElement = Element;
  try {
    const drawer = new Element();
    drawer.dataset = { adminDrawerColumns: '2', adminDrawerOwner: 'add-new' };
    drawer.hidden = false;
    drawer.querySelector = () => null;
    const shell = { dataset: { adminDrawerMode: 'default' }, querySelector: (selector) => selector === '[data-admin-drawer-shell]' ? drawer : null };
    drawer.getBoundingClientRect = () => ({ width: shell.dataset.adminDrawerMode === 'half' ? 267 : 535 });
    assert.equal(setAdminDrawerMode(shell, 'full'), true);
    assert.equal(shell.dataset.adminDrawerMode, 'full');
    assert.equal(drawer.dataset.adminDrawerOwner, 'add-new');
    drawer.dataset.adminDrawerColumns = '1';
    shell.dataset.adminDrawerMode = 'default';
    assert.equal(setAdminDrawerMode(shell, 'full'), false);
    assert.equal(shell.dataset.adminDrawerMode, 'default');
    drawer.hidden = true;
    assert.equal(setAdminDrawerMode(shell, 'default'), false);
  } finally {
    if (previous === undefined) delete globalThis.HTMLElement;
    else globalThis.HTMLElement = previous;
  }
});
