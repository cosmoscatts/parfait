import type { Settings } from '~/config'

export type OptionRenderType = 'layoutRadio' | 'select' | 'switch' | 'colorPicker'

type SettingProp = keyof Settings

export interface Option {
  prop: SettingProp
  name?: string
  type: OptionRenderType
  options?: { label: string; value: string | number }[]
  dependOn?: SettingProp
}

/**
 * 配置项按功能分类，折叠面板数据结构
 */
export interface CollapseOption {
  name: string
  title: string
  data: Option[]
  disabledMsg?: string
}

// 设置项分类 (10)
// 页面布局 - `layout` | `fixNav` | `showLogo` | `showTabs` | `showFoot` (5)
// 主色调 - `themePrimaryColor` (1)
// 页面功能 - `showTransitionAnimation` | `transitionAnimation` | `tabShapeStyle` |
//           | `cacheTabs` (4)

export const layoutOptions: CollapseOption[] = [
  {
    name: '布局模式',
    title: '布局模式',
    data: [
      {
        prop: 'layout',
        name: '布局模式',
        type: 'layoutRadio',
        options: [
          { label: '垂直模式', value: 'vertical' },
          { label: '水平模式', value: 'horizontal' },
        ],
        dependOn: undefined,
      },
    ],
    disabledMsg: undefined,
  },
  {
    name: '页面模块显示',
    title: '页面模块显示',
    data: [
      {
        prop: 'fixNav',
        name: '是否固定导航栏',
        type: 'switch',
        options: undefined,
        dependOn: undefined,
      },
      {
        prop: 'showLogo',
        name: '是否显示 Logo',
        type: 'switch',
        options: undefined,
        dependOn: undefined,
      },
      {
        prop: 'showTabs',
        name: '是否显示多页签',
        type: 'switch',
        options: undefined,
        dependOn: undefined,
      },
      {
        prop: 'showFoot',
        name: '是否显示底部栏',
        type: 'switch',
        options: undefined,
        dependOn: undefined,
      },
    ],
    disabledMsg: undefined,
  },
]

export const primaryColorOption: Option = {
  prop: 'primaryColor',
  name: '页面主色调',
  type: 'colorPicker',
  options: undefined,
  dependOn: undefined,
}

export const funcOptions: CollapseOption[] = [
  {
    name: '多页签',
    title: '多页签',
    data: [
      {
        prop: 'tabShapeStyle',
        name: '多页签风格',
        type: 'select',
        options: [
          { label: '谷歌风格', value: 'chrome' },
          { label: '按钮风格', value: 'button' },
        ],
        dependOn: 'showTabs',
      },
      {
        prop: 'cacheTabs',
        name: '是否缓存多页签',
        type: 'switch',
        options: undefined,
        dependOn: 'showTabs',
      },
    ],
    disabledMsg: '多页签已隐藏',
  },
  {
    name: '页面动画',
    title: '页面动画',
    data: [
      {
        prop: 'showAnimation',
        name: '是否显示页面切换动画',
        type: 'switch',
        options: undefined,
        dependOn: undefined,
      },
      {
        prop: 'animationMode',
        name: '页面切换动画类型',
        type: 'select',
        options: [
          { label: '滑动', value: 'fade-slide' },
          { label: '消退', value: 'fade' },
          { label: '底部消退', value: 'fade-bottom' },
          { label: '缩放消退', value: 'fade-scale' },
          { label: '渐变', value: 'zoom-fade' },
          { label: '闪现', value: 'zoom-out' },
        ],
        dependOn: 'showAnimation',
      },
    ],
    disabledMsg: '页面动画已关闭',
  },
]
