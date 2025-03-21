import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fragen-katalog/', // ✅ must match repo name
  plugins: [react()],
})
