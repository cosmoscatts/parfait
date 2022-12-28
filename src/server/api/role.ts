import type { PageData, Pagination, Result, Role } from '~/types'

export const RoleApi = {
  fetchRoleList(_query?: {
    name?: string
    createTime?: [string, string]
    updateTime?: [string, string]
  } & Partial<Pagination>) {
    return new Promise<Result<PageData<Role>>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from<Role>({ length: 15 }).map((_, idx) => ({
            id: idx + 1,
            name: `测试${idx + 1}`,
            description: 'hhhh',
            createTime: new Date(),
            updateTime: new Date(),
          })),
          total: 15,
        },
      })
    })
  },

  addRole(_body: Role) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },

  updateRole(_body: Role) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },

  deleteRole(_body: Role) {
    return new Promise<Result>((resolve) => {
      resolve({
        code: 0,
        data: null,
        message: '',
      })
    })
  },
}
