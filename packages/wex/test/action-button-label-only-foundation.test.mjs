import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const css = readFileSync(new URL('../src/foundations/action-button-label-only.css', import.meta.url), 'utf8');
const buttons = readFileSync(new URL('../src/foundations/buttons.css', import.meta.url), 'utf8');
const index = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

test('Label Only Small Menu references verified Button tokens without introducing visual values', () => {
  assert.match(index, /@import "\.\/foundations\/action-button-label-only\.css";/);
  const references = [...css.matchAll(/var\((--wex-[\w-]+)\)/g)].map((match) => match[1]);
  for (const reference of references) assert.ok((css + buttons).includes(`${reference}:`), `unregistered reference ${reference}`);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)|font-size:\s*0/i);
  assert.match(css, /\.wex-action-button-label-only--small-menu > svg/);
});
