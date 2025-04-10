import { defineConfig } from 'vite'

export default defineConfig({
  base: '/iceland-trip/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    ssrManifest: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})