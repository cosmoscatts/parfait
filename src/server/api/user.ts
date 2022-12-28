import type { PageData, Pagination, Result, User } from '~/types'

export const UserApi = {
  fetchUserList: (_query?: {
    username?: string
    name?: string
    roelId?: number
    createTime?: [string, string]
    updateTime?: [string, string]
  } & Partial<Pagination>) => {
    return new Promise<Result<PageData<User>>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from<User>({ length: 15 }).map((_, idx) => ({
            id: idx + 1,
            username: `test${idx + 1}`,
            name: `测试${idx + 1}`,
            roleId: Math.random() < 0.5 ? 0 : 1,
            createTime: new Date(),
            updateTime: new Date(),
          })),
          total: 15,
        },
      })
    })
  },

  addUser(_body: User) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },

  updateUser(_body: User) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },

  deleteUser(_body: User) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },

  updateAvatar(_body: { id: number; avatar: string }) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },
}
