import assert from 'node:assert/strict';
import test from 'node:test';

import { createAdminShellMarkup } from '../dist/index.js';

test('resolves exactly four empty reusable Admin Shell mount regions', () => {
  const markup = createAdminShellMarkup();

  assert.match(markup, /<header[^>]*data-admin-shell-region="header"[^>]*><\/header>/);
  assert.match(markup, /<aside[^>]*aria-label="Admin Shell sidebar"[^>]*data-admin-shell-region="sidebar"[^>]*><\/aside>/);
  assert.match(markup, /<main[^>]*tabindex="-1"[^>]*data-admin-shell-region="main"[^>]*><\/main>/);
  assert.match(markup, /<footer[^>]*data-admin-shell-region="footer"[^>]*><\/footer>/);
  assert.match(markup, /class="wex-admin-shell"/);
  assert.equal(createAdminShellMarkup.length, 0);
});

test('keeps the Shared UI resolver data-agnostic, browser-neutral, and markup-payload-free', async () => {
  const source = await import('node:fs/promises').then(({ readFile }) => readFile(new URL('../src/components/admin-shell.ts', import.meta.url), 'utf8'));

  assert.doesNotMatch(source, /document\.|window\.|localStorage|record|permission|persist|route/i);
  assert.doesNotMatch(source, /Drawer|Data Card|Collection/);
  assert.doesNotMatch(source, /Slots|slots|header: string|sidebar: string|main: string|footer: string/);
});
