import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, presetWind } from 'unocss'

// https://github.com/antfu/unocss
// see unocss.config.ts for config
export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray/20 dark:border-gray/15',
    'bg-base': 'bg-gray:15 dark:bg-[#17171A]',
    'bg-card': 'bg-white dark:bg-[#2A2A2B]',
    'bg-header': 'bg-white dark:bg-[#232324]',
    'bg-sider': 'bg-white dark:bg-[#232324]',
    'icon-btn': 'op30 hover:op100 hover:bg-[rgb(var(--primary-6))]',
  },
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1280px',
      xl: '1536px',
    },
  },
})
