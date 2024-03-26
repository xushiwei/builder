/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
// https://vitejs.dev/config/
const resolve = (dir: string) => path.join(__dirname, dir)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue({
        // Ensure that at devlop mode, widget is not treated as a custom element
        customElement: false
      }),
      VueDevTools()
    ],
    base: env.VITE_PUBLISH_BASE_URL,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    optimizeDeps: {
      include: [`monaco-editor/esm/vs/editor/editor.worker`]
    },
    test: { environment: 'happy-dom' }
  }
})
