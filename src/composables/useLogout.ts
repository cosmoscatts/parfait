/**
 * 当退出登录时，统一清除所有的副作用
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAllTabs } = useTabStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAllTabs, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}

