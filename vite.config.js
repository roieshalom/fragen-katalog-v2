import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "",  // ✅ Set to empty string for custom domains
  plugins: [react()],
});
