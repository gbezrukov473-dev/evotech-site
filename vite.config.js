import { defineConfig } from 'vite';

export default defineConfig({
  base: '/evotech-site/',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
