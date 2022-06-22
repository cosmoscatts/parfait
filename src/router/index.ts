import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { BLANK_LAYOUT } from './constants'
import appRoutes from './routes'
import createRouterGuard from './guards'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      redirect: 'login',
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
          component: () => import('~/pages/exception/500/index.vue'),
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
          component: () => import('~/pages/exception/404/index.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouterGuard(router)

export default router
