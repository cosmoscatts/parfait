import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  presetWind,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'hw-full': 'h-full w-full',
    'hw-screen': 'h-screen w-screen',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-col-center': 'flex-col flex-center',
    'border-base': 'border-gray/20 dark:border-gray/15',
    'icon-btn': 'op30 hover:op100 hover:bg-primary_hover',
    'bg-body': 'bg-gray:15 dark:bg-[#17171A]',
    'bg-nav': 'bg-white dark:bg-[#232324]',
    'bg-side': 'bg-white dark:bg-[#232324]',
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
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
      xxl: '1920px',
    },
    colors: {
      primary: 'rgba(var(--primary-6),1)',
      primary_hover: 'rgba(var(--primary-5),1)',
      primary_click: 'rgba(var(--primary-7),1)',
      success: 'rgba(var(--success-6),1)',
      success_hover: 'rgba(var(--success-5),1)',
      success_click: 'rgba(var(--success-7),1)',
      warning: 'rgba(var(--warning-6),1)',
      warning_hover: 'rgba(var(--warning-5),1)',
      warning_click: 'rgba(var(--warning-7),1)',
      info: 'rgba(var(--info-6),1)',
      info_hover: 'rgba(var(--info-5),1)',
      info_click: 'rgba(var(--info-7),1)',
      danger: 'rgba(var(--danger-6),1)',
      danger_hover: 'rgba(var(--danger-5),1)',
      danger_click: 'rgba(var(--danger-7),1)',
    },
  },
})
