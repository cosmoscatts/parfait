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

// export const primaryColorMap: Record<string, string> = {
//   red: '#F53F3F',
//   orangered: '#F77234',
//   orange: '#FF7D00',
//   gold: '#F7BA1E',
//   yellow: '#FADC19',
//   lime: '#9FDB1D',
//   green: '#00B42A',
//   cyan: '#14C9C9',
//   blue: '#3491FA',
//   arcoblue: '#165DFF',
//   purple: '#722ED1',
//   pinkpurple: '#D91AD9',
//   gray: '#F5319D',
//   magenta: '#86909C',
// }
