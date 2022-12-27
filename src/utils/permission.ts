import type { RouteLocationNormalized } from 'vue-router'
import type { Menu } from '~/types'
import { WHITE_LIST } from '~/router'

/**
 * 找到登录用户的拥有的第一个路由：
 *  多页签最后一项（showTabs & cacheTabs）
 *  菜单第一项
 */
export function findFirstRouteInPermission(): string {
  const uiStore = useUiStore()
  const tabStore = useTabStore()
  if (uiStore.settings.showTabs
    && uiStore.settings.cacheTabs
    && tabStore.tabs.length > 0) {
    return tabStore.tabs.slice(-1)[0].path
  }
  const authStore = useAuthStore()
  const menus = G.clone(authStore.menu.get())

  let path = null
  while (menus.length && !path) {
    const item = menus.shift() as Menu
    if (item.path) path = item.path
    if (item?.children?.length) menus.unshift(...item.children)
  }
  return path ?? '/'
}

/**
 * 判断用户是否有目标页面的权限
 */
export function checkRoutePermission(
  menus: Menu[] = [],
  { path, name }: RouteLocationNormalized,
): boolean {
  if ([!menus.length, path === '', name === ''].some(i => !!i)) return false
  if (WHITE_LIST.includes(name as string)) return true

  let exist = false
  while (menus.length && !exist) {
    const element = menus.shift()
    if (element?.path === path) exist = true
    if (element?.children) menus.push(...element.children)
  }
  return exist
}
