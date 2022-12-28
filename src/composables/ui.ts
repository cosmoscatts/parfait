import { breakpointsTailwind } from '@vueuse/core'
import { APP_SETTINGS } from '~/config'
import { createThemeMode } from '~/utils'

// ----- Theme -----

export const isDark = createThemeMode(APP_SETTINGS.defaultThemeMode)
export const toggleDark = useToggle(isDark)
export const createUi = () => {
  if (isDark.value) document.body.setAttribute('arco-theme', 'dark')
  else document.body.removeAttribute('arco-theme')
}
watch(isDark, createUi)

// ----- 响应式 -----

export const breakpoints = useBreakpoints(breakpointsTailwind)
export const isMobile = breakpoints.smaller('sm')
export const isPC = breakpoints.greaterOrEqual('sm')
export const labelHidden = breakpoints.smaller('md') // 隐藏 [form label]
