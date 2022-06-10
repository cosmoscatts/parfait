import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

function setupRouter() {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [],
    scrollBehavior() {
      return {
        top: 0,
      }
    },
  })
  router.beforeEach((to: any, _: any, next: any) => {
    // progress bar
    NProgress.start()

    // if (to.path === '/404' && to.redirectedFrom) {
    //   const permissionStore = usePermissionStore()
    //   if (permissionStore.checkRouterReload(router)) {
    //     permissionStore.reloadRoutes(router)
    //     next({ path: to.redirectedFrom.fullPath, replace: true })
    //     return
    //   }
    // }
    next()
  })
  router.afterEach(() => {
    // finish progress bar
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
