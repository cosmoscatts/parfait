import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import { BASE_LAYOUT, BLANK_LAYOUT } from './constants'
import routes from './format-routes'
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
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('~/pages/exception/404/index.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
export { createRouterGuard }
export * from './constants'
