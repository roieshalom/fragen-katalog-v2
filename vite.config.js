import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // ✅ Good for custom domains like fragen-katalog.com
  plugins: [react()],
  build: {
    outDir: 'dist' // ✅ Default is 'dist'; this builds to root for manual copy
  },
});
