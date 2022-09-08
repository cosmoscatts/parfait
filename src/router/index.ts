import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import { BASE_LAYOUT, BLANK_LAYOUT } from './constants'
import appRoutes from './routes'
import createRouterGuard from './guards'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      component: BASE_LAYOUT,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('~/pages/login/index.vue'),
          meta: {
            title: '登录',
            requiresAuth: false,
          },
        },
      ],
    },
    ...appRoutes,
    {
      path: '/500',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'ErrorPage',
          component: () => import('~/pages/exception/error/index.vue'),
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
          component: () => import('~/pages/exception/no-permission/index.vue'),
          meta: {
            title: '403',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('~/pages/exception/not-found/index.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

export {
  createRouterGuard,
}
