import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/WEXdesigns/',
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        colour: fileURLToPath(new URL('./colour/index.html', import.meta.url)),
        typography: fileURLToPath(new URL('./typography/index.html', import.meta.url)),
        actions: fileURLToPath(new URL('./actions/index.html', import.meta.url)),
        layout: fileURLToPath(new URL('./layout/index.html', import.meta.url)),
        designTokens: fileURLToPath(new URL('./design-tokens/index.html', import.meta.url)),
      },
    },
  },
});
