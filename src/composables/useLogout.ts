/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { showTheTags, cacheTheTags } = useAppStore()
  const { removeUser } = useUserStore()
  const { removeAll } = useTagsStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAppMenus]
  if (!showTheTags || !cacheTheTags)
    actions.push(removeAll)

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}

