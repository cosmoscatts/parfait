export interface ThemeColor {
  prop: string
  name: string
}

// `Arco Design` 默认颜色
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

/**
 * 生成颜色映射
 */
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

// 包含各颜色名称、值的映射
export const themeColorValueMap = createThemeColorMap()
