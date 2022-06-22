import type { Menu } from '~/types'

export function findFirstPermissionRoute() {
  const { appMenus } = usePermissionStore()
  const menus = [...appMenus]
  let path = null
  while (menus.length && !path) {
    const item = menus.shift() as Menu
    if (item.path)
      path = item.path

    if (item?.children?.length)
      menus.unshift(...item.children)
  }

  return path
}
