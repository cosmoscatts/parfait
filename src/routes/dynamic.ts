import BaseLayout from '~/layouts/index.vue'

export const dynamicRoutes = [

  {
    path: '/dashboard',
    name: 'dashboard-layout',
    component: BaseLayout,
    meta: {
      id: 101,
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('~/pages/dashboard/index.vue'),
        meta: {
          auth: true,
          cached: true,
        },
      },
    ],
  },
  {
    path: '/system',
    redirect: '/system/user',
    component: BaseLayout,
    meta: {
      id: 102,
      title: '系统管理',
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('~/pages/user/index.vue'),
        meta: {
          id: 10201,
          auth: true,
          cached: false,
          title: '用户管理',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('~/pages/role/index.vue'),
        meta: {
          id: 10202,
          auth: true,
          cached: false,
          title: '角色管理',
        },
      },
    ],
  },
]
