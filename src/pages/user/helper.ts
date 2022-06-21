import type { User } from '~/types'

export function saveUserHandler(
  {
    type = 'add',
    data = {},
  }: {
    type?: 'add' | 'edit'
    data?: User
  },
) {
  const userStore = useUserStore()
  const { user, updateUser } = userStore
  const map = {
    add: () => {
      updateUser(data)
    },
    edit: () => {
      const _user = {
        ...toRaw(user),
        ...data,
      }
      updateUser(_user)
    },
  }
  map[type]()
}
