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
const title = read(resolve(root, 'src/foundations/typography/title.css'));
const navigationBody = read(resolve(root, 'src/foundations/typography/navigation-body.css'));
const decision = read(resolve(root, '../../docs/decisions/0012-global-tokens-typography-dna.md'));

test('keeps Global Tokens bound to the complete existing Typography vocabulary', () => {
  const roleSources = { heading, title, navigation: navigationBody, body: navigationBody };
  for (const [role, source] of Object.entries(roleSources)) {
    for (const tier of ['small', 'default', 'large']) {
      assert.match(source, new RegExp(`--wex-type-${role}-${tier}-font-size:`));
      assert.match(source, new RegExp(`--wex-type-${role}-${tier}-line-height:`));
    }
  }

  for (const token of [
    '--wex-type-weight-light:',
    '--wex-type-weight-regular:',
    '--wex-type-weight-semibold:',
    '--wex-type-style-normal:',
    '--wex-type-style-italic:',
  ]) assert.match(core, new RegExp(token));
  for (const token of ['--wex-color-text-primary:', '--wex-color-white:', '--wex-color-text-accent:']) {
    assert.match(colour, new RegExp(token));
  }

  assert.match(decision, /Accepted — the former Page Heading DNA v1 is superseded/);
  assert.match(decision, /`Heading`,\n`Title`, `Navigation`, and `Body`/);
  assert.match(decision, /`Small`,\n`Default`, and `Large`/);
  assert.match(decision, /does not cross-pair tiers/);
  assert.match(decision, /`--wex-color-text-primary`/);
  assert.match(decision, /`Colour \/ Light`.*`--wex-color-white`/);
  assert.doesNotMatch(decision, /`Colour \/ Light`.*`--wex-color-light`/);
  assert.match(decision, /`Colour \/ Accent`.*`--wex-color-text-accent`/);
  assert.match(decision, /`Weight \/ Bold`.*`--wex-type-weight-semibold`/);
  assert.match(decision, /`Weight \/ Thin`.*`--wex-type-weight-light`/);
  assert.match(decision, /`Style \/ Italic`.*`--wex-type-style-italic`/);
  assert.match(decision, /`Heading Default` is the base/);
  assert.match(decision, /Heading\nSize attributes reference the existing Heading Large or Heading Small/);
  assert.match(decision, /`Size \/ Large`.*Existing Heading Large Typography class\/tokens/);
  assert.match(decision, /`Size \/ Small`.*Existing Heading Small Typography class\/tokens/);
  assert.match(decision, /must not locally assign a colour, weight,\nstyle, or size/);
  assert.doesNotMatch(decision, /Size is not a Global Token attribute/);
  assert.doesNotMatch(decision, /\bPage Heading\b(?! DNA v1)/);
  assert.doesNotMatch(decision, /#[0-9a-f]{3,8}\b/i);
});
