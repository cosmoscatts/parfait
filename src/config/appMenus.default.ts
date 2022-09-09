import type { Component } from 'vue'
import {
  IconDesktop,
  IconFile,
  IconHome,
  IconIdcard,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import type { Menu } from '~/types'

/**
 * 储存 `icon` 字段对应的图标组件
 */
export const defaultMenuIconMap: { [key: string]: Component } = {
  home: markRaw(IconHome),
  system: markRaw(IconDesktop),
  user: markRaw(IconUser),
  role: markRaw(IconIdcard),
  file: markRaw(IconFile),
}

/**
 * 默认菜单集合
 */
export const defaultMenus: Menu[] = [
  {
    id: 101,
    title: '首页',
    icon: 'home',
    path: '/dashboard',
  },
  {
    id: 102,
    title: '系统管理',
    icon: 'system',
    children: [
      {
        id: 10201,
        title: '用户管理',
        icon: 'user',
        path: '/system/user',
      },
      {
        id: 10202,
        title: '角色管理',
        icon: 'role',
        path: '/system/role',
      },
    ],
  },
  {
    id: 103,
    title: '代码风格',
    icon: 'file',
    path: '/docs',
  },
]
