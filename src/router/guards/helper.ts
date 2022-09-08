import type { Menu } from '~/types'
import { specialRoutePathList } from '~/router/constants'

/**
 * 判断是否有页面的权限, 特殊的路由需要单独判断，例如：'/' 和 '/profile'
 */
export function hasPermissionOfThePage(menus: Menu[], toPath: string) {
  if (specialRoutePathList.includes(toPath))
    return true
  let exist = false
  while (menus.length && !exist) {
    const element = menus.shift()
    if (element?.path === toPath)
      exist = true

    if (element?.children) {
      menus.push(
        ...(element.children as unknown as Menu[]),
      )
    }
  }
  return exist
}

/**
 * 路由执行策略
 */
export function executeActions(actions: [boolean, Function][]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag)
      action()

    return flag
  })
}
