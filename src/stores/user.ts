import type { User } from '~/types'

// default avatar
const defaultAvatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User>()

    // get user on store
    const getUser = computed(() => {
      if (user.value)
        return user
      const userOnStorage = sessionStorage.getItem('savedUser')
      if (!userOnStorage)
        return null
      user.value = JSON.parse(userOnStorage)
      return user
    })

    /**
     * update the new user.
     *
     * @param _user - new user
     */
    function updateUser(_user: User) {
      if (!_user.avatar)
        _user.avatar = defaultAvatar
      user.value = _user
      useSessionStorage('savedUser', JSON.stringify(_user))
    }

    /**
     * remove the user.
     */
    function removeUser() {
      user.value = undefined
      sessionStorage.removeItem('savedUser')
    }

    return {
      getUser,
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
