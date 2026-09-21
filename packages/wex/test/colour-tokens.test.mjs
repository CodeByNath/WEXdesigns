import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  CHROMATIC_FAMILIES,
  REGISTERED_CHROMATIC_PAIRINGS,
  assertRegisteredChromaticContrast,
  deriveChromaticTone,
  renderChromaticTokensCss,
  validateRegisteredChromaticContrast,
} from '../src/foundations/chromatic-tone-derivation.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const colour = readFileSync(resolve(root, 'src/foundations/colour.css'), 'utf8');
const chromatic = readFileSync(resolve(root, 'src/foundations/chromatic-tokens.generated.css'), 'utf8');
const interaction = readFileSync(resolve(root, 'src/foundations/interaction.css'), 'utf8');
const css = `${colour}\n${chromatic}\n${interaction}`;

const requiredTokens = [
  'background-primary',
  'background-secondary',
  'background-accent',
  'background-accent-hover',
  'background-accent-selected',
  'border-primary',
  'border-subtle',
  'border-interactive',
  'border-focus',
  'text-primary',
  'text-secondary',
  'text-placeholder',
  'text-accent',
  'text-success',
  'text-warning',
  'text-error',
  'link-primary',
  'link-secondary',
  'icon-primary',
  'icon-secondary',
  'icon-accent',
  'background-warning',
  'background-warning-hover',
  'background-warning-selected',
  'background-success',
  'background-success-hover',
  'background-success-selected',
  'background-error',
  'background-error-hover',
  'background-error-selected',
];

test('defines the complete core colour-token contract', () => {
  for (const token of requiredTokens) {
    assert.match(css, new RegExp(`--wex-color-${token}:`), `missing ${token}`);
  }
  assert.match(css, /--wex-opacity-disabled:\s*0\.2;/);
});

test('keeps the approved primitive palette exact', () => {
  const expected = new Set([
    '#000000', '#161616', '#393939', '#ffffff', '#f4f4f4', '#e0e0e0',
    '#0f62fe', '#0043ce', '#78a9ff', '#f1c21b', '#b28600', '#fddc69',
    '#24a148', '#198038', '#6fdc8c', '#da1e28', '#a2191f', '#fa4d56',
  ]);
  const actual = new Set(`${colour}\n${chromatic}`.match(/#[0-9a-f]{6}/g) ?? []);

  assert.deepEqual(actual, expected);
  assert.doesNotMatch(css, /--wex-color-(?:gray|blue)-\d+:/);
});

test('resolves every custom-property reference inside the colour foundations', () => {
  const definitions = new Set(
    [...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]),
  );
  const references = new Set(
    [...css.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((match) => match[1]),
  );
  const missing = [...references].filter((reference) => !definitions.has(reference));

  assert.deepEqual(missing, []);
});

test('derives every current chromatic Dark and Light calibration exactly', () => {
  const expected = {
    accent: { dark: '#0043ce', light: '#78a9ff' },
    warning: { dark: '#b28600', light: '#fddc69' },
    success: { dark: '#198038', light: '#6fdc8c' },
    error: { dark: '#a2191f', light: '#fa4d56' },
  };

  for (const [family, tones] of Object.entries(expected)) {
    for (const [tone, value] of Object.entries(tones)) {
      assert.equal(deriveChromaticTone(family, tone), value, `${family} ${tone} calibration`);
    }
  }
});

test('ships Dark and Light as a checked generated delivery artifact', () => {
  assert.equal(chromatic, renderChromaticTokensCss());
  assert.doesNotMatch(
    colour,
    /--wex-color-(?:accent|yellow|green|red)(?:-(?:dark|light))?:\s*#[0-9a-f]{6}/,
    'colour.css must not independently author chromatic primitive values',
  );

  for (const family of Object.values(CHROMATIC_FAMILIES)) {
    assert.match(chromatic, new RegExp(`--wex-color-${family.cssName}-dark:\\s*#[0-9a-f]{6};`));
    assert.match(chromatic, new RegExp(`--wex-color-${family.cssName}-light:\\s*#[0-9a-f]{6};`));
  }
});

test('keeps every registered on-* pairing at WCAG AA normal-text contrast', () => {
  const foregroundToken = { '#000000': 'black', '#ffffff': 'white' };
  const validations = validateRegisteredChromaticContrast();

  assert.equal(validations.length, REGISTERED_CHROMATIC_PAIRINGS.length);
  for (const validation of validations) {
    assert.ok(validation.ratio >= 4.5, `${validation.token} contrast is ${validation.ratio.toFixed(2)}:1`);
    assert.match(
      colour,
      new RegExp(`--wex-color-${validation.token}:\\s*var\\(--wex-color-${foregroundToken[validation.foreground]}\\);`),
      `${validation.token} foreground mapping changed`,
    );
  }

  assert.deepEqual(assertRegisteredChromaticContrast(), validations);
  assert.throws(
    () => assertRegisteredChromaticContrast({ accent: '#ffffff' }),
    /on-accent \(1\.00:1\)/,
    'a later Base edit that breaks a registered pairing must be rejected',
  );
});
