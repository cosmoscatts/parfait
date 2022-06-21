import type { User } from '~/types'

export function saveUserHandler(
  {
    type = 'add',
    // data = {},
  }: {
    type?: 'add' | 'edit'
    data?: User
  },
) {
  const map = {
    add: () => {
      Message.success('添加成功')
    },
    edit: () => {
      Message.success('更新成功')
    },
  }
  map[type]()
}
