import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/system',
  redirect: '/system/user',
  component: BASE_LAYOUT,
  meta: {
    title: '系统管理',
  },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('~/pages/user/index.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
        cached: false,
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('~/pages/role/index.vue'),
      meta: {
        title: '角色管理',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
