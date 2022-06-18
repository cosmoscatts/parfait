import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import createRouteGuard, { appRoutes } from '~/router'

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
      name: 'login',
      component: () => import('~/pages/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('~/pages/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
