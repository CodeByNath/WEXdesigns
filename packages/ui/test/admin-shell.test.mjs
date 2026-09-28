import assert from 'node:assert/strict';
import test from 'node:test';

import { createAdminShellMarkup } from '../dist/index.js';

test('resolves all four reusable Admin Shell landmark slots', () => {
  const markup = createAdminShellMarkup({
    header: '<p>Header slot</p>',
    sidebar: '<p>Sidebar slot</p>',
    main: '<h2>Body / Main slot</h2>',
    footer: '<p>Footer slot</p>',
  });

  assert.match(markup, /<header[^>]*data-admin-shell-region="header"[^>]*>.*Header slot/s);
  assert.match(markup, /<aside[^>]*aria-label="Admin Shell sidebar"[^>]*data-admin-shell-region="sidebar"[^>]*>.*Sidebar slot/s);
  assert.match(markup, /<main[^>]*tabindex="-1"[^>]*data-admin-shell-region="main"[^>]*>.*Body \/ Main slot/s);
  assert.match(markup, /<footer[^>]*data-admin-shell-region="footer"[^>]*>.*Footer slot/s);
  assert.match(markup, /class="wex-admin-shell"/);
});

test('keeps the Shared UI resolver data-agnostic and browser-neutral', async () => {
  const source = await import('node:fs/promises').then(({ readFile }) => readFile(new URL('../src/components/admin-shell.ts', import.meta.url), 'utf8'));

  assert.doesNotMatch(source, /document\.|window\.|localStorage|record|permission|persist|route/i);
  assert.doesNotMatch(source, /Drawer|Data Card|Collection/);
});
