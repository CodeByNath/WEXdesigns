import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function read(path) {
  return readFileSync(resolve(root, path), 'utf8');
}

function json(path) {
  return JSON.parse(read(path));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function digest(path) {
  return createHash('sha256').update(read(path)).digest('hex');
}

const manifestPaths = [
  'packages/wex/package.json',
  'packages/schemas/package.json',
  'packages/adapters/package.json',
  'packages/ui/package.json',
  'apps/studio-agent-runner/package.json',
  'apps/web-runtime/package.json',
  'tooling/typescript/package.json',
];
const manifests = manifestPaths.map(json);
const packageNames = new Set(manifests.map((manifest) => manifest.name));
const internalDependencies = new Map(
  manifests.map((manifest) => [
    manifest.name,
    Object.keys(manifest.dependencies ?? {}).filter((name) => packageNames.has(name)),
  ]),
);

assert(internalDependencies.get('@weerax/wex').length === 0, 'WEX has an internal dependency');
assert(internalDependencies.get('@weerax/schemas').length === 0, 'Schemas have an internal dependency');
assert(
  internalDependencies.get('@weerax/adapters').every((name) => name === '@weerax/schemas'),
  'Adapters exceed their dependency boundary',
);
assert(
  internalDependencies
    .get('@weerax/ui')
    .every((name) => ['@weerax/schemas', '@weerax/wex'].includes(name)),
  'UI exceeds its dependency boundary',
);

const visiting = new Set();
const visited = new Set();
function visit(name) {
  if (visiting.has(name)) throw new Error(`Circular package dependency at ${name}`);
  if (visited.has(name)) return;
  visiting.add(name);
  for (const dependency of internalDependencies.get(name) ?? []) visit(dependency);
  visiting.delete(name);
  visited.add(name);
}
for (const name of packageNames) visit(name);

const forbiddenCoreDependencies = ['react', 'react-dom', 'preact', 'vite'];
for (const manifest of manifests.filter(({ name }) => name.startsWith('@weerax/'))) {
  if (manifest.name === '@weerax/web-runtime') continue;
  const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
  for (const forbidden of forbiddenCoreDependencies) {
    assert(!dependencies[forbidden], `${manifest.name} depends on ${forbidden}`);
  }
}

const wexHash = read('packages/wex/src/source/WEX-SOURCE.sha256').split(/\s+/)[0];
const compositionHash = read('docs/architecture/composition-architecture.sha256').split(/\s+/)[0];
assert(digest('packages/wex/src/source/WEX-SOURCE.md') === wexHash, 'WEX authority hash mismatch');
assert(
  digest('docs/architecture/composition-architecture.md') === compositionHash,
  'Composition authority hash mismatch',
);

const cssPaths = [
  'packages/wex/src/index.css',
  ...readdirSync(resolve(root, 'packages/wex/src/foundations'))
    .filter((name) => name.endsWith('.css'))
    .map((name) => `packages/wex/src/foundations/${name}`),
];
for (const path of cssPaths) {
  const css = read(path);
  assert(!/^#|^```|\\--|\/\\\*/m.test(css), `${path} contains non-CSS source syntax`);
  const structuralCss = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '');
  let depth = 0;
  for (const character of structuralCss) {
    if (character === '{') depth += 1;
    if (character === '}') depth -= 1;
    assert(depth >= 0, `${path} has an unmatched closing brace`);
  }
  assert(depth === 0, `${path} has an unclosed rule block`);
}

const tierSource = read('packages/schemas/src/composition/wex-tier.schema.ts');
assert(
  tierSource.includes("z.enum(['small', 'default', 'large'])"),
  'WEX tier contract changed',
);

const uiSource = resolve(root, 'packages/ui/src');
const uiFiles = readdirSync(uiSource).filter((name) => !name.startsWith('.'));
assert(uiFiles.length === 1 && uiFiles[0] === 'index.ts', 'UI components exist before authorization');
assert(read('packages/ui/src/index.ts').trim() === 'export {};', 'UI boundary is not empty');
assert(!existsSync(resolve(root, 'test')), 'Repository placeholder still exists');

console.log('Foundation audit passed: authorities, dependencies, CSS structure, tiers, and stop gate are valid.');
