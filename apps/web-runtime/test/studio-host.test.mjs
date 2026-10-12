import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

const source = await readFile(new URL('../src/studio-host.js', import.meta.url), 'utf8');
const shell = await readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8');
const config = await readFile(new URL('../vite.studio-host.config.ts', import.meta.url), 'utf8');
const guide = await readFile(new URL('../studio-host/README.md', import.meta.url), 'utf8');
const output = new URL('../studio-host-dist/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', output), 'utf8'));

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
});

test('mounts the existing empty Admin Station shell only at the QSD host mount', () => {
  assert.match(source, /#qsd-studio-host/);
  assert.match(source, /mountAdminStation\(mount\)/);
  assert.match(source, /mount-unavailable/);
  assert.match(source, /mount-error/);
  assert.match(shell, /data-admin-station-layout/);
  ['header', 'sidebar', 'main', 'footer'].forEach((region) => assert.match(shell, new RegExp(`data-admin-station-region="${region}"`)));
  assert.match(shell, /<main[^>]*><\/main>/);
  assert.match(shell, /<footer[^>]*><\/footer>/);
  assert.doesNotMatch(shell, /<nav|<form|Data Card|Collection|record|permission|persist|adapter|schema/i);
});

test('keeps the Studio bundle relative-path based and excludes the deferred host protocol', () => {
  assert.match(config, /base: '\.\/'/);
  assert.match(config, /manifest\.json/);
  assert.match(guide, /studio-assets/);
  assert.doesNotMatch(source, /QSDStudioConfig|fetch\(|storage\/|bootstrapWexIdentity|createSpace\(/);
});
