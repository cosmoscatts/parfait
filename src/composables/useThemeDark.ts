import { themeMode } from '~/settings'
import { EnumStorageKey } from '~/enum'

const THEME_MODE_KEY = EnumStorageKey.themeMode

function initDark() {
  if (themeMode === 'auto') {
    const prefersDark = window.matchMedia
                     && window.matchMedia('(prefers-color-scheme: dark)')
                       .matches
    localStorage.setItem(
      THEME_MODE_KEY,
      prefersDark
        ? 'dark'
        : 'light',
    )
  }
  else {
    localStorage.setItem(THEME_MODE_KEY, themeMode)
  }

  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}

export const isDark = initDark()
export const toggleDark = useToggle(isDark)

// 监控亮暗模式的变化，设置亮暗主题
watch(isDark, (_isDark) => {
  if (_isDark)
    document.body.setAttribute('arco-theme', 'dark')
  else document.body.removeAttribute('arco-theme')
})
