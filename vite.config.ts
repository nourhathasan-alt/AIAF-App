import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the built dist/ work from any path (GitHub Pages, subfolders, file://).
export default defineConfig({
  plugins: [react()],
  base: './',
});
