/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  removeUser()
}
