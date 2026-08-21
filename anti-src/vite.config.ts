import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // served from karma-site.com/anti/ — every asset URL must carry that prefix
  base: '/anti/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    // built straight into the folder the site actually serves
    outDir: '../anti',
    emptyOutDir: true,
  },
})
