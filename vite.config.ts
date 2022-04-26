import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PrefectDesign',
    },
    rollupOptions: {
      // ensures vue isn't added to the bundle
      external: ['vue'],
      output: {
        exports: 'named',
        // Provide vue as a global variable to use in the UMD build
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
