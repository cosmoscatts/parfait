import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import createPermissionGuard from './createPermissionGuard'
import { appMeta } from '~/config'

export default function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 开始 loadingBar
    NProgress.start()
    // 页面跳转权限处理
    createPermissionGuard(to, from, next)
  })

  router.afterEach((to) => {
    // 设置 `document title`
    const title = to.meta?.title as string ?? appMeta.name
    useTitle(title)
    // 结束 loadingBar
    NProgress.done()
  })
}
