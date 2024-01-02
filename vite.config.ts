import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueMacros({
      defineModels: true,
      defineOptions: true,
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'pinia',
      ],
      resolvers: [ArcoResolver()],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/server/api',
        'src/composables',
        'src/store',
      ],
      vueTemplate: true,
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
})
