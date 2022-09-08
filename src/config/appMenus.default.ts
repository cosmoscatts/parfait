import type { Menu } from '~/types'

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
  {
    id: 103,
    title: '代码风格',
    icon: 'file',
    path: '/docs',
  },
]
