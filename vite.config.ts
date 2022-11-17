import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig = {
    resolve: {
      alias: [
        {
          find: '@/demo',
          replacement: resolve(__dirname, './demo'),
        },
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
    plugins: [vue(), svgLoader()],
  }

  if (mode == 'demo') {
    return {
      root: './demo',
      ...baseConfig,
    }
  }

  return {
    ...baseConfig,
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
  }

})
