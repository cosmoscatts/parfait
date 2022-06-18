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
    if (!to.meta.auth)
      return next()

    const { getUser } = storeToRefs(useUserStore())
    if (getUser.value === null)
      return next('/login')

    else
      return next()
  })
  router.afterEach(() => {
    useTimeoutFn(() => {
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
