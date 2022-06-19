import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/docs',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Docs',
      component: () => import('~/pages/Docs.md'),
      meta: {
        title: '文档',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
