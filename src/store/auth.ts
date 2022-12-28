import type { Menu, User } from '~/types'
import { APP_MENU } from '~/config'
import defaultAvatar from '~/assets/default-avatar.jpg'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const user = ref<User>()
    const hasLogin = ref(false)
    const menus = ref<Menu[]>([])

    const fetchUser = () => {}
    const updateUser = (data: User) => {
      if (!data.avatar) data.avatar = defaultAvatar
      user.value = data
    }
    const removeUser = () => user.value = undefined

    const fetchMenus = () => {
      menus.value = APP_MENU.source === 'front'
        ? [...APP_MENU.defaultMenus]
        : []
    }
    const removeMenus = () => menus.value = []

    return {
      user,
      fetchUser,
      updateUser,
      removeUser,
      hasLogin,
      menus,
      fetchMenus,
      removeMenus,
      login(data: User) {
        return new Promise((resolve) => {
          hasLogin.value = true
          updateUser(data)
          ;[fetchUser, fetchMenus].forEach(fn => fn())
          resolve(user)
        })
      },
      logout() {
        return new Promise((resolve) => {
          hasLogin.value = false
          const tabStore = useTabStore()
          ;[removeUser, removeMenus, tabStore.removeAllTabs].forEach(fn => fn())
          resolve(menus)
        })
      },
    }
  },
  { persist: { enabled: true } },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
