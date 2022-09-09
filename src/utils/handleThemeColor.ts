import { defaultThemeColors } from '~/config'

/**
 * 替换主色调
 */
export function replacePrimaryColor(colorName: string) {
  if (!defaultThemeColors.map(i => i.prop).includes(colorName))
    return

  Array.from({ length: 10 }).forEach((_, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, `var(--${colorName}-${index + 1})`)
  })
}

