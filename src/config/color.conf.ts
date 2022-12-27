export interface ThemeColor {
  prop: string
  name: string
}

export const defaultThemeColors: ThemeColor[] = [
  { prop: 'red', name: '浪漫红' },
  { prop: 'orangered', name: '晚秋红' },
  { prop: 'orange', name: '活力橙' },
  { prop: 'gold', name: '黄昏' },
  { prop: 'yellow', name: '柠檬黄' },
  { prop: 'lime', name: '新生绿' },
  { prop: 'green', name: '仙野绿' },
  { prop: 'cyan', name: '碧涛青' },
  { prop: 'blue', name: '海蔚蓝' },
  { prop: 'arcoblue', name: '极致蓝' },
  { prop: 'purple', name: '暗夜紫' },
  { prop: 'pinkpurple', name: '青春紫' },
  { prop: 'gray', name: '中性灰' },
  { prop: 'magenta', name: '品红' },
]

export interface ThemeColorValue {
  name: string
  value: string
}

function createThemeColorMap(): Record<string, ThemeColorValue> {
  const colorMap: Record<string, ThemeColorValue> = {}
  defaultThemeColors.forEach(({ prop, name }) => {
    colorMap[prop] = {
      name,
      value: `rgb(var(--${prop}-6))`,
    }
  })

  return colorMap
}

export const themeColorValueMap = createThemeColorMap()

export const hexThemeColorValueMap: Record<string, string> = {
  red: '#F53F3F',
  orangered: '#F77234',
  orange: '#FF7D00',
  gold: '#F7BA1E',
  yellow: '#FADC19',
  lime: '#9FDB1D',
  green: '#00B42A',
  cyan: '#14C9C9',
  blue: '#3491FA',
  arcoblue: '#165DFF',
  purple: '#722ED1',
  pinkpurple: '#D91AD9',
  gray: '#F5319D',
  magenta: '#86909C',
}
