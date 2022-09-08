import type { Menu, User } from '~/types'

/**
 * 查询用户的菜单，初始化 `tab`
 */
export async function loginCallback(user: User) {
  const tabStore = useTabStore()
  const { updateUser } = useUserStore()
  const { fetchAppMenus } = usePermissionStore()

  updateUser(user)
  await fetchAppMenus()
  tabStore.initTabs(user.id)
}

/**
 * 如果开启多页签缓存，则找缓存的最后一个多页签
 * 否则找到登录用户的所拥有菜单第一项
 */
export function findFirstPermissionRoute() {
  const { baseSettings: { showTabs, cacheTabs } } = useAppStore()
  const { visitedTabs } = useTabStore()
  if (showTabs && cacheTabs && visitedTabs?.length > 0)
    return visitedTabs[visitedTabs.length - 1].path

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
