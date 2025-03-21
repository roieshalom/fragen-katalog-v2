import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fragen-katalog/', // Replace with your repository name
  plugins: [react()],
});
