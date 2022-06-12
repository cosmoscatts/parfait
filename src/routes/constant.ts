import BaseLayout from '~/layouts/index.vue'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: BaseLayout,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
  },
]
