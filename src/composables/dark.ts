export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
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
