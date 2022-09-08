import type { User } from '~/types'
import defaultAvatar from '~/assets/default-avatar.jpg'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User>()
    /**
     * 更新用户
     *
     * @param _user - 新用户
     */
    function updateUser(_user: User) {
      if (!_user.avatar)
        _user.avatar = defaultAvatar
      user.value = _user
    }
    /**
     * 清空用户
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
