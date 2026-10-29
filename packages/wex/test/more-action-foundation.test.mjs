import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const moreAction = readFileSync(resolve(root, 'src/foundations/more-action.css'), 'utf8');

test('registers WEX More Action Default and Small with existing icon foundations', () => {
  assert.match(index, /@import "\.\/foundations\/more-action\.css";/);
  assert.match(moreAction, /--wex-more-action-default-icon-size: var\(--wex-icon-size-20\);/);
  assert.match(moreAction, /--wex-more-action-small-icon-size: var\(--wex-icon-size-16\);/);
  assert.match(moreAction, /\.wex-more-action-icon\s*\{[\s\S]*inline-size: var\(--wex-more-action-default-icon-size\);[\s\S]*block-size: var\(--wex-more-action-default-icon-size\);/);
  assert.match(moreAction, /\.wex-more-action-icon--small\s*\{[\s\S]*inline-size: var\(--wex-more-action-small-icon-size\);[\s\S]*block-size: var\(--wex-more-action-small-icon-size\);/);
  assert.doesNotMatch(moreAction, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
