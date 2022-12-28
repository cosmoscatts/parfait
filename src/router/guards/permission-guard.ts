import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { checkRoutePermission, findFirstRouteInPermission } from '~/utils'
import { NO_PERMISSION, WHITE_LIST } from '~/router/constants'

export default function createPermissionGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore()
  const hasLogin = authStore.hasLogin && !!authStore.user?.id
  const needLogin = Boolean(to.meta?.requiresAuth) && !WHITE_LIST.includes(to.name as string)
  const menusCopy = G.clone(authStore.menus)
  const hasPermission = checkRoutePermission(menusCopy, to)

  const actions: [boolean, Function][] = [
    // 已登录状态跳转登录页，跳转至首页
    [hasLogin && to.name === 'Login', () => next(findFirstRouteInPermission())],
    // 不需要登录权限的页面直接通行
    [!needLogin, next],
    // 未登录状态进入需要登录权限的页面
    [!hasLogin && needLogin, () => {
      next('/login')
      if (to.path !== '/')
        Message.error('请登录')
    }],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [hasLogin && needLogin && hasPermission, next],
    [hasLogin && needLogin && !hasPermission, () => {
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      next(NO_PERMISSION)
      Message.error('没有权限哦，请联系管理员')
    }],
  ]
  Conditional.some(actions)
}
