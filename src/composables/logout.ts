/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAll } = useTagsStore()
  for (const remove of [removeUser, removeAll])
    remove()
}
