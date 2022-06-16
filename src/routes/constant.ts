import BaseLayout from '~/layouts/index.vue'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: BaseLayout,
  },
  {
    path: '/redirect',
    component: BaseLayout,
    meta: {
      hidden: true,
      auth: true,
    },
    children: [
      {
        path: ':path(.*)',
        component: () => import('~/pages/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/index.vue'),
  },
  {
    path: '/404',
    component: () => import('~/pages/error/index.vue'),
    meta: {
      hidden: true,
      auth: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    name: 'matchAll',
    redirect: '/404',
  },
]
