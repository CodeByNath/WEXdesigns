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
const tabNavigation = read(resolve(root, 'src/foundations/tab-navigation.css'));
const decision = read(resolve(root, '../../docs/decisions/0012-global-tokens-typography-dna.md'));
const tabNavigationDecision = read(resolve(root, '../../docs/decisions/0027-tab-navigation-global-tokens.md'));

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
  for (const token of ['--wex-color-text-primary:', '--wex-color-white:', '--wex-color-text-accent:', '--wex-color-surface-selected:']) {
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
  assert.match(decision, /Each\nrole's existing Default selection is its Design Token base/);
  for (const role of ['Heading', 'Title', 'Navigation', 'Body']) {
    assert.match(decision, new RegExp(`\\| \`${role} Default\` \\|`));
  }
  assert.match(decision, /Size attributes reference the existing Large or Small selection of\nthe same role/);
  assert.match(decision, /`Size \/ Large`.*Existing same-role Large Typography class\/tokens/);
  assert.match(decision, /`Size \/ Small`.*Existing same-role Small Typography class\/tokens/);
  assert.match(decision, /Navigation Weight\n+attribute/);
  assert.match(decision, /must not locally assign a colour, weight, style, or\nsize/);
  assert.doesNotMatch(decision, /Size is not a Global Token attribute/);
  assert.doesNotMatch(decision, /\bPage Heading\b(?! DNA v1)/);
  assert.doesNotMatch(decision, /#[0-9a-f]{3,8}\b/i);
});

test('registers WEX Tab Navigation Default with Small and Large tiers', () => {
  for (const tier of ['small', 'default', 'large']) {
    for (const property of ['font-family', 'font-size', 'line-height', 'letter-spacing', 'font-weight', 'icon-size', 'chevron-size']) {
      assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-${tier}-${property}: var\\(--wex-`));
    }
  }

  for (const tier of ['small', 'default', 'large']) {
    for (const property of ['target-size', 'icon-allocation-size', 'gap', 'padding-block', 'padding-inline', 'child-indent', 'radius', 'border-width']) {
      const value = tier === 'small' && property === 'padding-block' ? '0' : '(?:var|calc)\\(';
      assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-${tier}-${property}: ${value}`));
    }
    for (const state of ['hover', 'selected']) {
      for (const property of ['background', 'foreground', 'border-color']) {
        assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-${tier}-${state}-${property}: (?:var|transparent)`));
      }
    }
    for (const property of ['focus-color', 'focus-width', 'focus-outer-width', 'focus-inner-width', 'focus-gap', 'focus-gap-color']) {
      assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-${tier}-${property}: var\\(--wex-`));
    }
  }

  for (const property of ['gap', 'padding-inline', 'child-indent', 'border-width']) {
    assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-small-${property}: var\\(--wex-tab-navigation-default-`));
  }
  assert.match(tabNavigation, /--wex-tab-navigation-small-radius: var\(--wex-radius-small\);/);
  assert.match(tabNavigation, /--wex-tab-navigation-small-target-size: var\(--wex-space-40\);/);
  assert.match(tabNavigation, /--wex-tab-navigation-small-padding-block: 0;/);
  assert.match(tabNavigation, /--wex-tab-navigation-default-root-padding-inline-start: 0;/);
  assert.match(tabNavigation, /--wex-tab-navigation-small-root-padding-inline-start: var\(--wex-tab-navigation-default-root-padding-inline-start\);/);
  assert.match(tabNavigation, /--wex-tab-navigation-small-icon-allocation-size: calc\(var\(--wex-space-32\) \+ var\(--wex-space-4\) \+ var\(--wex-space-2\)\);/);

  for (const mode of ['horizontal', 'dropdown']) {
    for (const property of ['font-family', 'font-size', 'line-height', 'letter-spacing', 'font-weight', 'target-size', 'gap', 'padding-block', 'padding-inline', 'radius', 'border-width', 'background', 'foreground', 'border-color']) {
      assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-small-${mode}-${property}: var\\(--wex-`));
    }
    for (const state of ['hover', 'selected']) {
      for (const property of ['background', 'foreground', 'border-color']) {
        assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-small-${mode}-${state}-${property}: var\\(--wex-`));
      }
    }
    for (const property of ['focus-color', 'focus-width', 'focus-outer-width', 'focus-inner-width', 'focus-gap', 'focus-gap-color']) {
      assert.match(tabNavigation, new RegExp(`--wex-tab-navigation-small-${mode}-${property}: var\\(--wex-`));
    }
  }
  assert.match(tabNavigation, /--wex-tab-navigation-small-horizontal-radius: var\(--wex-tab-navigation-small-radius\);/);
  assert.match(tabNavigation, /--wex-tab-navigation-small-dropdown-radius: var\(--wex-radius-default\);/);

  assert.match(tabNavigationDecision, /WEX Tab Navigation Default/);
  assert.match(tabNavigationDecision, /WEX Tab\s+Navigation Small/);
  assert.match(tabNavigationDecision, /WEX Tab\s+Navigation Large/);
  assert.match(tabNavigationDecision, /Default, Hover, Selected, and Focus state/);
  assert.match(tabNavigationDecision, /WEX Button Neutral pressed/);
  assert.match(tabNavigationDecision, /square icon\s+allocation/);
  assert.match(tabNavigationDecision, /padding\s+on every side/);
  assert.match(tabNavigationDecision, /Owner-authorised 38px square\s+icon allocation/);
  assert.match(tabNavigationDecision, /root-tab start rule/);
  assert.match(tabNavigationDecision, /Small Horizontal/);
  assert.match(tabNavigationDecision, /Small Dropdown/);
  assert.doesNotMatch(tabNavigation, /pressed-border-color/);
  assert.doesNotMatch(tabNavigation, /#[0-9a-f]{3,8}\b/i);
});
