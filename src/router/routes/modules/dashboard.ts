import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/dashboard',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('~/pages/dashboard/index.vue'),
      meta: {
        title: '首页',
        requiresAuth: true,
        cached: true,
      },
    },
  ],
}
