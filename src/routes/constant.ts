import BaseLayout from '~/layouts/index.vue'

export const constantRoutes = [
  {
    path: '/',
    component: BaseLayout,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
  },
]
