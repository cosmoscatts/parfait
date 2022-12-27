import type { Menu, User } from '~/types'
import { APP_MENU } from '~/config'
import defaultAvatar from '~/assets/user/default-avatar.jpg'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const user = ref<User>()
    const hasLogin = ref(false)
    const menus = ref<Menu[]>([])

    const fetchMenus = async () => {
      menus.value = APP_MENU.source === 'front'
        ? [...APP_MENU.defaultMenus]
        : []
    }

    return {
      hasLogin,
      user: {
        get: () => user.value,
        fetch: () => {},
        update: (_user: User) => {
          if (!_user.avatar) _user.avatar = defaultAvatar
          user.value = _user
        },
        remove: () => user.value = undefined,
      },
      menu: {
        get: () => menus.value,
        fetch: () => fetchMenus(),
        remove: () => menus.value = [],
      },
      login() {
        hasLogin.value = true
        ;[this.user, this.menu].forEach(i => i.fetch())
      },
      logout() {
        hasLogin.value = false
        const tabStore = useTabStore()
        ;[this.user.remove, this.menu.remove, tabStore.removeAllTabs].forEach(fn => fn())
      },
    }
  },
  { persist: { enabled: true } },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
