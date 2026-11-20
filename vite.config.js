import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoPlugin } from './scripts/seoPlugin.js';

export default defineConfig({
  // Set VITE_BASE=/repo-name/ when hosting under a sub-path (for example GitHub Pages).
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: { chunkSizeWarningLimit: 1200 },
  test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.js'] },
});
