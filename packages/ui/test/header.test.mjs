import assert from 'node:assert/strict';
import test from 'node:test';

import { createHeaderPresentation } from '../dist/index.js';

const headerFixture = {
  brand: { capability: 'brand' },
  navigation: {
    location: {
      locationLabel: 'location-label',
      sidebarTrigger: 'sidebar-trigger',
    },
    search: { capability: 'search' },
    primaryNavigation: { capability: 'primary-navigation' },
    mainAction: { capability: 'main-action' },
  },
};

test('resolves Header direct-child capabilities into platform-neutral structure', () => {
  assert.deepEqual(createHeaderPresentation(headerFixture), {
    className: 'wex-header',
    brand: {
      capability: 'brand',
      className: 'wex-header__brand',
      label: 'Brand',
    },
    navigation: {
      className: 'wex-header__navigation',
      locationLabel: {
        capability: 'location-label',
        className: 'wex-header__location-label',
        label: 'Location',
      },
      sidebarTrigger: {
        capability: 'sidebar-trigger',
        className: 'wex-header__sidebar-trigger',
        label: 'Open sidebar',
      },
      search: {
        capability: 'search',
        className: 'wex-header__search',
        label: 'Search',
      },
      primaryNavigation: {
        capability: 'primary-navigation',
        className: 'wex-header__primary-navigation',
        label: 'Primary navigation',
      },
      mainAction: {
        capability: 'main-action',
        className: 'wex-header__main-action',
        label: 'Main action',
      },
    },
  });
});

test('keeps Header presentation free of browser and domain execution concerns', () => {
  const presentation = createHeaderPresentation(headerFixture);
  assert.equal('onClick' in presentation, false);
  assert.equal('route' in presentation.navigation, false);
  assert.equal('search' in presentation.navigation.search && 'execute' in presentation.navigation.search, false);
});
