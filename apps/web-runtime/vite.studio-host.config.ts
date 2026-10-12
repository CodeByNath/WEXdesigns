import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type Plugin } from 'vite';

const version = process.env.WEX_STUDIO_ASSET_VERSION ?? '0.0.0';

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
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: `${JSON.stringify({ entry: entry.fileName, styles, version }, null, 2)}\n`,
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
