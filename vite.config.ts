import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import DefineOptions from 'unplugin-vue-define-options/vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    UnoCSS(),
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
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
    DefineOptions(),
  ],
})
