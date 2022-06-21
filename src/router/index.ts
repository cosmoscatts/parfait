import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import appRoutes from './routes'
import createRouterGuard from './guards'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('~/pages/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
    {
      path: '/500',
      name: 'ErrorPage',
      component: () => import('~/pages/exception/500/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('~/pages/exception/404/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouterGuard(router)

export default router
