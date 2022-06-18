import { BASE_LAYOUT } from '~/router/constants'

export default [
  {
    path: '/dashboard',
    component: BASE_LAYOUT,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('~/pages/dashboard/index.vue'),
        meta: {
          title: '首页',
          requiresAuth: true,
          cached: true,
        },
      },
    ],
  },
  {
    path: '/foo',
    name: 'foo',
    component: BASE_LAYOUT,
    meta: {
      requiresAuth: true,
      cached: false,
    },
  },
]
