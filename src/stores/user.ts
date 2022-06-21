import type { User } from '~/types'
import defaultAvatar from '~/assets/avatar.jpg'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User>()
    /**
     * update the new user.
     *
     * @param _user - new user
     */
    function updateUser(_user: User) {
      if (!_user.avatar)
        _user.avatar = defaultAvatar
      user.value = _user
    }
    /**
     * remove the user.
     */
    function removeUser() {
      user.value = undefined
    }

    return {
      user,
      updateUser,
      removeUser,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
