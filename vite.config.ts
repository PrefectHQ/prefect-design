import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Prefect Design',
      fileName: (format) => `prefect-design.${format}.js`
    },
    rollupOptions: {
      // ensures vue isn't added to the bundle
      external: ['vue'],
      output: {
        exports: 'named',
        // Provide vue as a global variable to use in the UMD build
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
