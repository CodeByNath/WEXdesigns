import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

const source = await readFile(new URL('../src/studio-host.js', import.meta.url), 'utf8');
const shell = await readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8');
const config = await readFile(new URL('../vite.studio-host.config.ts', import.meta.url), 'utf8');
const guide = await readFile(new URL('../studio-host/README.md', import.meta.url), 'utf8');
const fixture = await readFile(new URL('../studio-host/fixture.html', import.meta.url), 'utf8');
const runtimePackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const output = new URL('../studio-host-dist/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', output), 'utf8'));
const entrySource = await readFile(join(output.pathname, manifest.entry), 'utf8');

function safeRelativePath(path) {
  return typeof path === 'string'
    && path.length > 0
    && !path.startsWith('/')
    && !path.includes('\\')
    && !path.includes('%')
    && path.split('/').every((segment) => segment !== '.' && segment !== '..');
}

test('emits the QSD-compatible, relative Studio asset manifest and files', async () => {
  assert.ok(safeRelativePath(manifest.entry));
  assert.ok(Array.isArray(manifest.styles));
  assert.ok(manifest.styles.length > 0);
  assert.equal(typeof manifest.version, 'string');
  await access(join(output.pathname, manifest.entry));
  await Promise.all(manifest.styles.map((style) => {
    assert.ok(safeRelativePath(style));
    return access(join(output.pathname, style));
  }));
  assert.match(entrySource, /wex-logo__image/);
  assert.match(entrySource, /wexStudioHostOptions/);
});

test('builds the Logo renderer dependencies before packaging Studio assets', () => {
  const command = runtimePackage.scripts['build:studio-host'];
  assert.match(command, /^pnpm --filter @weerax\/schemas build && pnpm --filter @weerax\/ui build && vite build --config vite\.studio-host\.config\.ts$/);
});

test('mounts the Admin Station shell with local Sidebar navigation presentation and the approved host Logo input', () => {
  assert.match(source, /#qsd-studio-host/);
  assert.match(source, /wexStudioHostOptions/);
  assert.match(source, /mountStudioHost\(readStudioHostOptions\(\)\)/);
  assert.match(source, /resolveLogoImagePropertyBinding/);
  assert.match(source, /mountAdminStation\(mount, \{ logoProperties \}\)/);
  assert.match(source, /mount-unavailable/);
  assert.match(source, /mount-error/);
  assert.match(shell, /data-admin-station-layout/);
  ['header', 'sidebar', 'main', 'footer'].forEach((region) => assert.match(shell, new RegExp(`data-admin-station-region="${region}"`)));
  assert.match(shell, /<main[^>]*><div class="wex-admin-shell__page"><\/div><\/main>/);
  assert.match(shell, /<div class="wex-admin-shell__navigation">[\s\S]*<div class="wex-admin-shell__location"><\/div>[\s\S]*<div class="wex-admin-shell__nav-actions">[\s\S]*data-theme-toggle[\s\S]*Dark mode/);
  assert.match(shell, /<footer[^>]*><\/footer>/);
  assert.match(shell, /<nav class="wex-admin-shell__sidebar-navigation" aria-label="Admin navigation" data-sidebar-navigation><\/nav>/);
  assert.doesNotMatch(shell, /<form|Data Card|Collection|record|permission|persist|adapter|schema/i);
  assert.match(fixture, /globalThis\.wexStudioHostOptions/);
  assert.match(fixture, /new URLSearchParams\(window\.location\.search\)\.get\('logoUrl'\)/);
  assert.match(fixture, /https:\/\/example\.test\/qsd-profile-logo\.svg/);
});

test('keeps the Studio bundle relative-path based and excludes the deferred host protocol', () => {
  assert.match(config, /base: '\.\/'/);
  assert.match(config, /manifest\.json/);
  assert.match(guide, /studio-assets/);
  assert.doesNotMatch(source, /QSDStudioConfig|fetch\(|storage\/|bootstrapWexIdentity|createSpace\(|addEventListener|dispatchEvent/);
});
