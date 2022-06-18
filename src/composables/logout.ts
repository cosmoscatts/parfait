/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAll } = useTagsStore()
  const { removeAppMenus } = usePermissionStore()
  for (const remove of [removeUser, removeAll, removeAppMenus])
    remove()
}
