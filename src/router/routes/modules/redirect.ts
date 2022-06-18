import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/redirect',
  component: BASE_LAYOUT,
  meta: {
    requiresAuth: true,
    cached: false,
  },
  children: [
    {
      path: ':path(.*)',
      name: 'redirect',
      component: () => import('~/pages/redirect/index.vue'),
    },
  ],
}
