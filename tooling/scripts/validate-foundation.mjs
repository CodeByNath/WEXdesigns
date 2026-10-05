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
  'packages/catalogue/package.json',
  'packages/schemas/package.json',
  'packages/adapters/package.json',
  'packages/identity/package.json',
  'packages/ui/package.json',
  'apps/identity-station/package.json',
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
assert(
  internalDependencies.get('@weerax/catalogue').length === 0,
  'Catalogue has an internal dependency',
);
assert(internalDependencies.get('@weerax/schemas').length === 0, 'Schemas have an internal dependency');
assert(
  internalDependencies.get('@weerax/adapters').every((name) => name === '@weerax/schemas'),
  'Adapters exceed their dependency boundary',
);
assert(
  internalDependencies.get('@weerax/identity').every((name) => name === '@weerax/schemas'),
  'Identity exceeds its dependency boundary',
);
assert(
  internalDependencies
    .get('@weerax/ui')
    .every((name) => ['@weerax/schemas', '@weerax/wex'].includes(name)),
  'UI exceeds its dependency boundary',
);
assert(
  internalDependencies
    .get('@weerax/identity-station')
    .every((name) => name === '@weerax/schemas'),
  'Identity Station exceeds its dependency boundary',
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

const buttonSchema = read('packages/schemas/src/components/button.schema.ts');
assert(
  buttonSchema.includes("z.enum(['primary', 'neutral', 'subtle', 'warning', 'danger'])"),
  'Button variants changed',
);
assert(buttonSchema.includes('action: SemanticActionSchema'), 'Button action contract is missing');
assert(!buttonSchema.includes('id: z.string().regex'), 'Button retains a top-level identity');
assert(!buttonSchema.includes('label: z.string().min(1)'), 'Button retains a top-level label');
assert(!buttonSchema.includes('ButtonStateSchema'), 'Button serializes transient presentation state');
assert(buttonSchema.includes('disabled: z.boolean().default(false)'), 'Button disabled contract is missing');
const uiSource = resolve(root, 'packages/ui/src');
const uiFiles = readdirSync(uiSource).filter((name) => !name.startsWith('.')).sort();
assert(
  JSON.stringify(uiFiles) === JSON.stringify(['components', 'index.ts']),
  'UI exceeds the authorized shared-component boundary',
);
const uiComponents = readdirSync(resolve(uiSource, 'components')).filter((name) => !name.startsWith('.'));
assert(
  JSON.stringify(uiComponents.sort()) === JSON.stringify(['button.ts', 'logo.ts']),
  'UI exceeds the authorized Button and Logo boundary',
);
const buttonPresentation = read('packages/ui/src/components/button.ts');
assert(buttonPresentation.includes('createButtonPresentation'), 'Button presentation boundary is missing');
assert(!buttonPresentation.includes('document.'), 'Shared UI Button depends on the browser runtime');
assert(!buttonPresentation.includes('ButtonState'), 'Shared UI serializes presentation state');
const logoSchema = read('packages/schemas/src/components/logo.schema.ts');
assert(logoSchema.includes('LogoDefinitionSchema'), 'Logo schema contract is missing');
assert(!logoSchema.includes('callback'), 'Logo schema serializes callbacks');
const logoPresentation = read('packages/ui/src/components/logo.ts');
assert(logoPresentation.includes('createLogoPresentation'), 'Logo presentation boundary is missing');
assert(!logoPresentation.includes('document.'), 'Shared UI Logo depends on the browser runtime');
assert(!logoPresentation.includes('callback'), 'Shared UI Logo serializes callbacks');
assert(!existsSync(resolve(root, 'packages/schemas/src/components/header.schema.ts')), 'Header remains a reusable schema');
assert(!existsSync(resolve(root, 'packages/ui/src/components/header.ts')), 'Header remains a reusable UI component');
const buttonFoundation = read('packages/wex/src/foundations/buttons.css');
const headerFoundation = read('packages/wex/src/foundations/header.css');
const geometryFoundation = read('packages/wex/src/foundations/geometry.css');
assert(headerFoundation.includes('.wex-admin-shell__header {'), 'WEX Admin Header shell foundation is missing');
assert(headerFoundation.includes('block-size: var(--wex-space-64)'), 'Header does not consume the approved height');
assert(headerFoundation.includes('.wex-admin-shell__brand {'), 'Header Brand compartment is missing');
assert(headerFoundation.includes('inline-size: var(--wex-space-64)'), 'Header Brand does not consume the approved allocation');
assert(headerFoundation.includes('@media (max-width: 767px)'), 'Header compact boundary is missing');
assert(!/(?:#[0-9a-f]{3,8}|rgb\(|hsl\()/i.test(headerFoundation), 'Header foundation contains raw colour values');
assert(!headerFoundation.includes('wex-admin-header'), 'Header retains a parallel application shell');
assert(!headerFoundation.includes('wex-header__'), 'Header retains reusable component selectors');
assert(buttonFoundation.includes('.wex-button--warning'), 'WEX Button foundation is missing');
assert(!buttonFoundation.includes('data-wex-button-state'), 'WEX Button accepts authored presentation state');
for (const tier of ['small', 'default', 'large']) {
  assert(buttonFoundation.includes(`.wex-button--${tier}`), `Button ${tier} geometry is missing`);
}
assert(!buttonFoundation.includes('--wex-button-boundary-width'), 'Button defines a component-local boundary token');
assert(
  buttonFoundation.includes('border: var(--wex-border-width-default) solid'),
  'Button does not consume the default structural border',
);
const buttonBaseRule = buttonFoundation.match(/\.wex-button\s*\{([\s\S]*?)\}/);
assert(buttonBaseRule, 'Button base rule is missing');
assert(
  !buttonBaseRule[1].includes('border: var(--wex-outer-ring-width) solid'),
  'Button boundary couples to outer-ring geometry',
);
assert(!buttonFoundation.includes('--wex-button-focus-outline'), 'Button defines a component-local outer-ring colour');
assert(
  buttonFoundation.includes('border-color: var(--wex-outer-ring-color)'),
  'Button state boundary does not replace the default outer edge',
);
assert(
  buttonFoundation.includes('.wex-button:not(:disabled):active'),
  'Button transient pressed state is missing',
);
assert(buttonFoundation.includes('border-radius: var(--wex-radius-default)'), 'Button radius contract is missing');
assert(!buttonFoundation.includes('border-radius: var(--wex-radius-small)'), 'Button size tier selects radius');
assert(!buttonFoundation.includes('border-radius: var(--wex-radius-large)'), 'Button size tier selects radius');
assert(!buttonFoundation.includes('outline-offset:'), 'Button state treatment extends outside its bounds');
assert(!buttonFoundation.includes('box-shadow:'), 'Button state treatment may not use an outside shadow');
assert(
  buttonFoundation.includes('border: var(--wex-outer-ring-inner-width) solid var(--wex-outer-ring-color)'),
  'Button state treatment does not complete the shared perimeter boundary',
);
assert(
  buttonFoundation.includes('border: var(--wex-outer-ring-gap) solid var(--wex-outer-ring-gap-color)'),
  'Button state treatment does not preserve the shared internal gap',
);
assert(
  buttonFoundation.includes('border-radius: calc(var(--wex-radius-default) - var(--wex-outer-ring-width))'),
  'Button state treatment does not preserve the registered radius inside the existing box',
);
assert(!/--wex-button-(?:outer-ring|state-inset)/.test(buttonFoundation), 'Button duplicates shared state geometry');
assert(!/\b2px\b/.test(buttonFoundation), 'Button duplicates shared ring values');
assert(geometryFoundation.includes('--wex-border-width-default: 1px'), 'Default border geometry is missing');
assert(geometryFoundation.includes('--wex-outer-ring-width: 2px'), 'Outer-ring geometry is missing');
assert(
  geometryFoundation.includes('--wex-outer-ring-inner-width: calc(var(--wex-outer-ring-width) - var(--wex-border-width-default))'),
  'Shared perimeter state geometry is missing',
);
assert(!buttonFoundation.includes('--wex-outer-ring-inset'), 'Button retains a nested state rectangle');
assert(
  geometryFoundation.includes('--wex-outer-ring-gap-color: var(--wex-color-background)'),
  'Shared internal state gap colour is missing',
);
assert(
  geometryFoundation.includes('--wex-outer-ring-color: var(--wex-color-border-focus)'),
  'Shared outer-ring colour is missing',
);
assert(!existsSync(resolve(root, 'test')), 'Repository placeholder still exists');

console.log('Foundation audit passed: authorities, dependencies, CSS structure, tiers, and authorized Shared UI boundary are valid.');
