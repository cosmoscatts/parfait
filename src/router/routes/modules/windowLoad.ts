import { BLANK_LAYOUT } from '~/router/constants'

export default {
  path: '/windowLoad',
  component: BLANK_LAYOUT,
  children: [
    {
      path: '',
      name: 'WindowLoad',
      component: () => import('~/pages/window-load/index.vue'),
    },
  ],
}
