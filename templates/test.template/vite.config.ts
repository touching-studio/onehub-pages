import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/home.tsx',
      fileName: (_format, entryName) => `${entryName}.template.js`,
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^react/,
    },
  },
});