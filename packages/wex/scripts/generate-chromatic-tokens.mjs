import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderChromaticTokensCss } from '../src/foundations/chromatic-tone-derivation.mjs';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(packageRoot, 'src/foundations/chromatic-tokens.generated.css');
const output = renderChromaticTokensCss();

if (process.argv.includes('--check')) {
  const existing = readFileSync(outputPath, 'utf8');
  if (existing !== output) {
    throw new Error('Chromatic CSS tokens are stale. Run pnpm --filter @weerax/wex generate:chromatic.');
  }
} else {
  writeFileSync(outputPath, output);
}
