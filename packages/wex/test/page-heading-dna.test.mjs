import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(path, 'utf8');
const core = read(resolve(root, 'src/foundations/typography/core.css'));
const heading = read(resolve(root, 'src/foundations/typography/heading.css'));
const colour = read(resolve(root, 'src/foundations/colour.css'));
const decision = read(resolve(root, '../../docs/decisions/0012-page-heading-dna.md'));

test('keeps the accepted Page Heading DNA mapped only to registered WEX concerns', () => {
  assert.match(heading, /--wex-type-heading-large-font-size:/);
  assert.match(heading, /--wex-type-heading-large-font-family:/);
  assert.match(heading, /--wex-type-heading-large-line-height:/);
  assert.match(heading, /--wex-type-heading-large-letter-spacing:/);
  assert.match(heading, /--wex-type-heading-small-font-size:/);
  assert.match(core, /--wex-type-weight-regular:/);
  assert.match(core, /--wex-type-weight-light:/);
  assert.match(core, /--wex-type-weight-semibold:/);
  assert.match(core, /--wex-type-style-italic:/);
  assert.match(colour, /--wex-color-text-primary:/);
  assert.match(colour, /--wex-color-light:/);
  assert.match(colour, /--wex-color-text-accent:/);
  assert.match(decision, /Accepted — authority definition only/);
  assert.doesNotMatch(decision, /\b[Pp]roposed\b/);

  for (const token of [
    '--wex-type-heading-large-font-family',
    '--wex-type-heading-large-font-size',
    '--wex-type-heading-large-line-height',
    '--wex-type-heading-large-letter-spacing',
    '--wex-type-heading-small-font-size',
    '--wex-type-heading-small-line-height',
    '--wex-type-weight-regular',
    '--wex-type-style-normal',
  ]) {
    assert.match(decision, new RegExp('`' + token + '`'));
  }

  for (const attribute of ['Small', 'Light', 'Accent', 'Bold', 'Thin', 'Italic']) {
    assert.match(decision, new RegExp(`\\| \`${attribute}\` \\|`));
  }
  assert.match(decision, /\| `Light` \| Colour \| `--wex-color-light`;/);
  assert.doesNotMatch(decision, /\| `Light` \| Colour \| `--wex-color-text-inverse`/);
  assert.match(decision, /text emphasis only, never decorative styling/);
  assert.match(decision, /DNA owns\nthe approved relationship between existing WEX foundation tokens/);
  assert.match(decision, /must not copy or hardcode hex\ncolours, font sizes, font weights, line heights, spacing, radius\/border,/);
  assert.match(decision, /sparse registered Attribute overrides/);
  assert.match(decision, /that concern stops at an architecture gap rather than\nbeing hardcoded/);
  assert.doesNotMatch(decision, /#[0-9a-f]{3,8}\b/i);
  assert.match(decision, /must not invent, approximate, substitute, or create a\nvalue, token, or Attribute/);
});
