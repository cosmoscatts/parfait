// I do not know how to dynamic generated colors,
// so I just use the default colors from arco.
// https://arco.design/react/docs/palette
export const colors: Record<string, string>[] = [
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

export function getColorMap() {
  const colorMap: Record<string, Record<string, string>> = {}
  colors.forEach(({ prop, name }: Record<string, string>) => {
    colorMap[prop] = {
      name,
      value: `rgb(var(--${prop}-6))`,
    }
  })

  return { colorMap }
}

export function replacePrimaryColor(colorName: string) {
  if (!colors.map(i => i.prop).includes(colorName))
    return

  Array.from({ length: 10 }).forEach((_, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, `var(--${colorName}-${index + 1})`)
  })
}
