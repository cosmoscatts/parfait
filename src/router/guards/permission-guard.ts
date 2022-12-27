import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { checkRoutePermission, findFirstRouteInPermission } from '~/utils'
import { NO_PERMISSION, WHITE_LIST } from '~/router/constants'

export default function createPermissionGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore()

  const isLogin = authStore.hasLogin && !!authStore.user.get()?.id
  const needLogin = Boolean(to.meta?.requiresAuth) && !WHITE_LIST.includes(to.name as string)
  // 需要对 `menus` 拷贝，`hasPermissionOfThePage` 方法会对原对象造成影响
  const menusClone = JSON.parse(JSON.stringify(authStore.menu.get()))
  const hasPermission = checkRoutePermission(menusClone, to)

  const actions: [boolean, Function][] = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.name === 'Login', () => next(findFirstRouteInPermission()),
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin, next,
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin, () => {
        next('/login')
        if (to.path !== '/')
          Message.error('请登录')
      },
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      next,
    ],
    [
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      isLogin && needLogin && !hasPermission, () => {
        next(NO_PERMISSION)
        Message.error('没有权限哦，请联系管理员')
      },
    ],
  ]
  Conditional.some(actions)
}
