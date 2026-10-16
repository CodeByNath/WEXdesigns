import { createHash } from 'node:crypto';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type Plugin } from 'vite';

const version = process.env.WEX_STUDIO_ASSET_VERSION ?? '0.0.0';
const releaseId = process.env.WEX_STUDIO_RELEASE_ID;
const sourceSha = process.env.WEX_STUDIO_SOURCE_SHA;

if ((releaseId === undefined) !== (sourceSha === undefined)) {
  throw new Error('WEX Studio release ID and source SHA must be supplied together');
}

function sha384(value: string | Uint8Array): string {
  return `sha384-${createHash('sha384').update(value).digest('base64')}`;
}

function studioHostManifest(): Plugin {
  return {
    name: 'wex-studio-host-manifest',
    generateBundle(_options, bundle) {
      const entry = Object.values(bundle).find((item) => item.type === 'chunk' && item.isEntry && item.name === 'wex-studio-host');
      if (!entry || entry.type !== 'chunk') this.error('WEX Studio host entry was not emitted');
      const styles = Object.values(bundle)
        .filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
        .map((item) => item.fileName)
        .sort();
      const files = Object.values(bundle)
        .filter((item) => item.fileName !== 'manifest.json')
        .sort((left, right) => left.fileName.localeCompare(right.fileName))
        .reduce<Record<string, string>>((digests, item) => {
          digests[item.fileName] = sha384(item.type === 'chunk' ? item.code : item.source);
          return digests;
        }, {});
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: `${JSON.stringify({
          contract: 'wex-studio-host@1',
          entry: entry.fileName,
          styles,
          version,
          ...(releaseId === undefined ? {} : { releaseId, sourceSha }),
          files,
        }, null, 2)}\n`,
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [studioHostManifest()],
  build: {
    outDir: 'studio-host-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'wex-studio-host': fileURLToPath(new URL('./src/studio-host.js', import.meta.url)),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
