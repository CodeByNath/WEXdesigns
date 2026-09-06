import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      name: 'WeeraXWebRuntimeFoundation',
    },
  },
});
