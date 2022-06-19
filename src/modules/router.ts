import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import appRoutes, { createRouteGuard } from '~/router'

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

createRouteGuard(router)

export default router
