import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // ✅ MUST be "/" for custom domains like fragen-katalog.com
  plugins: [react()],
});
