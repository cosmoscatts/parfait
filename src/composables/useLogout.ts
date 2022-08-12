/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAll } = useTagsStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAll, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}

