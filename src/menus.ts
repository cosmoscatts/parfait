import type { Menu } from './types'

export const menus: Menu[] = [
  {
    id: 101,
    title: '首页',
    icon: 'home',
    path: '/dashboard',
  },
  {
    id: 102,
    title: '系统管理',
    icon: 'user',
    children: [
      {
        id: 10201,
        title: '用户管理',
        path: '/system/user',
      },
      {
        id: 10202,
        title: '角色管理',
        path: '/system/role',
      },
    ],
  },
]

// fix: unocss icons can not dynamic load
// https://github.com/unocss/unocss/issues/785
export const iconMap: Record<string, string> = {
  home: 'i-carbon-home',
  user: 'i-carbon-user',
}
