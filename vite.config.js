import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "",  // ✅ Must be an empty string for custom domains
  plugins: [react()],
});
