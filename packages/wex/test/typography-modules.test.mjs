import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const typography = resolve(root, 'src/foundations/typography');
const moduleNames = ['core.css', 'heading.css', 'title.css', 'navigation-body.css'];

function read(path) {
  return readFileSync(path, 'utf8');
}

test('keeps typography modules under the authored-file limit in cascade order', () => {
  const entrypoint = read(resolve(root, 'src/foundations/typography.css'));
  assert.deepEqual(
    entrypoint.trim().split('\n'),
    moduleNames.map((name) => `@import "./typography/${name}";`),
  );

  for (const name of moduleNames) {
    const source = read(resolve(typography, name));
    assert.ok(source.trim().length > 0, `${name} is empty`);
    assert.ok(source.trimEnd().split(/\r?\n/).length <= 600, `${name} exceeds 600 lines`);
  }
});
