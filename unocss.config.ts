import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  presetWind,
} from 'unocss'

// `Unocss` 配置
// https://github.com/antfu/unocss
export default defineConfig({
  shortcuts: {
    'hw-full': 'h-full w-full',
    'hw-screen': 'h-screen w-screen',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-col-center': 'flex-col flex-center',
    'border-base': 'border-gray/20 dark:border-gray/15',
    'bg-base': 'bg-gray:15 dark:bg-[#17171A]',
    'bg-card': 'bg-white dark:bg-[#2A2A2B]',
    'bg-header': 'bg-white dark:bg-[#232324]',
    'bg-sider': 'bg-white dark:bg-[#232324]',
    'icon-btn': 'op30 hover:op100 hover:bg-primary_hover',
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
    // 整合 `arco` 内置颜色
    // 命名可参考 https://arco.design/react/docs/token
    colors: {
      primary: 'rgb(var(--primary-6))',
      primary_hover: 'rgb(var(--primary-5))',
      primary_click: 'rgb(var(--primary-7))',
      success: 'rgb(var(--success-6))',
      success_hover: 'rgb(var(--success-5))',
      success_click: 'rgb(var(--success-7))',
      warning: 'rgb(var(--warning-6))',
      warning_hover: 'rgb(var(--warning-5))',
      warning_click: 'rgb(var(--warning-7))',
      info: 'rgb(var(--info-6))',
      info_hover: 'rgb(var(--info-5))',
      info_click: 'rgb(var(--info-7))',
      danger: 'rgb(var(--danger-6))',
      danger_hover: 'rgb(var(--danger-5))',
      danger_click: 'rgb(var(--danger-7))',
    },
  },
})
