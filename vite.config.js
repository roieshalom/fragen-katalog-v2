import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/fragen-katalog/",  // ✅ Correct GitHub Pages base path
  plugins: [react()],
});
