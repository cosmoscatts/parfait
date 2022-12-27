import type { Component } from 'vue'
import {
  IconDesktop,
  IconFile,
  IconHome,
  IconIdcard,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import type { Menu } from '~/types'

const iconMap: { [key: string]: Component } = {
  home: IconHome,
  system: IconDesktop,
  user: IconUser,
  role: IconIdcard,
  file: IconFile,
}

const defaultMenus: Menu[] = [
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

type Source = 'front' | 'end'

interface MenuConfig {
  source: Source
  iconMap: { [key: string]: Component }
  defaultMenus: Menu[]
}

export const APP_MENU: MenuConfig = {
  source: 'front',
  iconMap,
  defaultMenus,
}
