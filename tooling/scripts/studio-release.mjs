import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, access, mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const runtimeRoot = join(root, 'apps/web-runtime');
const buildRoot = join(runtimeRoot, 'studio-host-dist');
const releaseRoot = join(runtimeRoot, 'public/studio-releases');
const releasePrefix = 'wex-studio-v1-';
const shaPattern = /^[0-9a-f]{40}$/;

export function safeRelativePath(path) {
  return typeof path === 'string'
    && path.length > 0
    && !path.startsWith('/')
    && !path.includes('\\')
    && !path.includes('%')
    && path.split('/').every((segment) => segment !== '.' && segment !== '..');
}

export function sha384(value) {
  return `sha384-${createHash('sha384').update(value).digest('base64')}`;
}

async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesAt(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}

export async function verifyReleaseDirectory(directory, expected = {}) {
  const manifestPath = join(directory, 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  assert.equal(manifest.contract, 'wex-studio-host@1');
  assert.match(manifest.releaseId, new RegExp(`^${releasePrefix}[0-9a-f]{40}$`));
  assert.ok(shaPattern.test(manifest.sourceSha));
  assert.equal(manifest.releaseId, `${releasePrefix}${manifest.sourceSha}`);
  assert.equal(manifest.releaseId, expected.releaseId ?? manifest.releaseId);
  assert.equal(manifest.sourceSha, expected.sourceSha ?? manifest.sourceSha);
  assert.ok(safeRelativePath(manifest.entry));
  assert.ok(Array.isArray(manifest.styles) && manifest.styles.length > 0);
  assert.ok(manifest.styles.every(safeRelativePath));
  assert.ok(manifest.files && typeof manifest.files === 'object' && !Array.isArray(manifest.files));

  const files = await filesAt(directory);
  const relativeFiles = files.map((path) => relative(directory, path));
  const delivered = relativeFiles.filter((path) => path !== 'manifest.json');
  assert.deepEqual(Object.keys(manifest.files).sort(), delivered);
  assert.ok(Object.hasOwn(manifest.files, manifest.entry));
  for (const style of manifest.styles) assert.ok(Object.hasOwn(manifest.files, style));

  for (const path of delivered) {
    assert.ok(safeRelativePath(path));
    assert.equal(manifest.files[path], sha384(await readFile(join(directory, path))));
  }
  return manifest;
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', ...options });
    child.once('error', rejectRun);
    child.once('exit', (code) => code === 0 ? resolveRun() : rejectRun(new Error(`${command} exited ${code}`)));
  });
}

async function git(...args) {
  const chunks = [];
  await new Promise((resolveRun, rejectRun) => {
    const child = spawn('git', args, { cwd: root });
    child.stdout.on('data', (chunk) => chunks.push(chunk));
    child.once('error', rejectRun);
    child.once('exit', (code) => code === 0 ? resolveRun() : rejectRun(new Error(`git ${args.join(' ')} exited ${code}`)));
  });
  return Buffer.concat(chunks).toString('utf8').trim();
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function buildStudioRelease() {
  const sourceSha = await git('rev-parse', 'HEAD');
  assert.match(sourceSha, shaPattern);
  const releaseId = `${releasePrefix}${sourceSha}`;
  const destination = join(releaseRoot, releaseId);
  const status = await git('status', '--porcelain', '--untracked-files=all');
  assert.equal(status, '', 'release builds require a clean tracked worktree');

  await run('pnpm', ['--filter', '@weerax/web-runtime', 'build:studio-host'], {
    env: { ...process.env, WEX_STUDIO_ASSET_VERSION: releaseId, WEX_STUDIO_RELEASE_ID: releaseId, WEX_STUDIO_SOURCE_SHA: sourceSha },
  });
  const built = await verifyReleaseDirectory(buildRoot, { releaseId, sourceSha });

  if (await pathExists(destination)) {
    const retained = await verifyReleaseDirectory(destination, { releaseId, sourceSha });
    assert.deepEqual(retained, built, 'an existing immutable release must match the rebuilt artifact exactly');
    return { releaseId, sourceSha, destination, created: false };
  }

  await mkdir(releaseRoot, { recursive: true });
  await cp(buildRoot, destination, { recursive: true, errorOnExist: true, force: false });
  await verifyReleaseDirectory(destination, { releaseId, sourceSha });
  return { releaseId, sourceSha, destination, created: true };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildStudioRelease()
    .then(({ releaseId, created }) => console.log(`${created ? 'created' : 'verified'} ${releaseId}`))
    .catch(async (error) => {
      await rm(buildRoot, { recursive: true, force: true });
      console.error(error);
      process.exitCode = 1;
    });
}
