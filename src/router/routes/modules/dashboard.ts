import { BASE_LAYOUT } from '~/router/constants'

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: BASE_LAYOUT,
    meta: {
      title: '首页',
      requiresAuth: true,
      cached: true,
    },
    children: [
      {
        path: '',
        component: () => import('~/pages/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/tourist',
    name: 'tourist',
    component: BASE_LAYOUT,
    meta: {
      requiresAuth: true,
      cached: false,
    },
  },
]
