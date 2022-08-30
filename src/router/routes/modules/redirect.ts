import { BLANK_LAYOUT } from '~/router/constants'

export default {
  path: '/redirect',
  component: BLANK_LAYOUT,
  children: [
    {
      path: ':path(.*)',
      name: 'Redirect',
      component: () => import('~/pages/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
