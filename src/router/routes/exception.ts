import { BLANK_LAYOUT } from '../constants'

export default [
  {
    path: '/500',
    component: BLANK_LAYOUT,
    children: [
      {
        path: '',
        name: 'ErrorPage',
        component: () => import('~/pages/exception/500/index.vue'),
        meta: {
          title: '500',
        },
      },
    ],
  },
  {
    path: '/403',
    component: BLANK_LAYOUT,
    children: [
      {
        path: '',
        name: 'NoPermission',
        component: () => import('~/pages/exception/403/index.vue'),
        meta: {
          title: '403',
        },
      },
    ],
  },
]
