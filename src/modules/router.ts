import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { constantRoutes, dynamicRoutes } from '~/routes'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

function setupRouter() {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoutes, ...dynamicRoutes],
    scrollBehavior() {
      return {
        top: 0,
      }
    },
  })
  router.beforeEach((to: any, _: any, next: any) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    setTimeout(() => {
      NProgress.done()
    }, 200)
  })
  return router
}

const router = setupRouter()
export default {
  install(app: any) {
    app.use(router)
  },
}
