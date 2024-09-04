import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Project_no5_WORKERS/',
  build: {
    chunkSizeWarningLimit: 1000
  },
})
