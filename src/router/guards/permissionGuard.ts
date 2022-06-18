import type { LocationQueryRaw, RouteRecordNormalized, Router } from 'vue-router'
import NProgress from 'nprogress'

import { appRoutes } from '~/router'
import { NOT_FOUND, WHITE_LIST } from '~/router/constants'
import findFirstPermissionRoute from '~/utils/permission'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    // maybe just from login page
    if (to.name === 'notFound')
      findFirstPermissionRoute()

    const allowAccess = !to.meta?.requiresAuth
    if (allowAccess
      || WHITE_LIST.find(i => i.name === to.name)
    )
      return next()

    const permissionStore = usePermissionStore()
    if (!permissionStore.appMenus.length)
      permissionStore.fetchAppMenus()
    if (!permissionStore.appMenus.length) {
      Message.error('请联系管理员配置角色菜单')
      return next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
    const menus = [...permissionStore.appMenus]

    NProgress.done()
  })
}
