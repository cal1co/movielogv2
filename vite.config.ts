/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals:true,
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    css: true,
    setupFiles: './src/test/setup.ts'
  },
})
