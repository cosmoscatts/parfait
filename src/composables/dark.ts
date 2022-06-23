import { themeMode } from '~/settings'
import { EnumStorageKey } from '~/enum'

const THEME_MODE_KEY = EnumStorageKey.themeMode
const themeModeOnStorage = useStorage(THEME_MODE_KEY, '', localStorage)

function init() {
  console.log('themeMode', themeMode)
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  console.log('prefer', prefersDark)
  if (themeMode === 'auto') {
    themeModeOnStorage.value = prefersDark
      ? 'dark'
      : 'light'
  }
  else {
    themeModeOnStorage.value = themeMode
  }
  const dark = useDark({
    storageKey: THEME_MODE_KEY,
  })
  console.log('themeStorage', themeModeOnStorage.value)
  console.log('themeStorage2', localStorage.getItem(THEME_MODE_KEY))
  console.log('isDark', dark)
  return dark
}

export const isDark = init()

export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

/**
 * when the dark changed, we should
 * change the app theme immediately.
 */
watchEffect(() => {
  if (isDark.value) {
    // set dark theme
    document.body.setAttribute('arco-theme', 'dark')
  }
  else {
    // back to light theme
    document.body.removeAttribute('arco-theme')
  }
})
