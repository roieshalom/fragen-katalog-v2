import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // This is fine for GitHub Pages if project is at root of the user/organization site
  plugins: [react()],
  build: {
    outDir: 'docs' // <-- Change this from 'dist' to 'docs' for GitHub Pages compatibility
  },
});
