import type { Role } from './role'

/**
 * 定义用户的数据结构
 */
export interface User {
  id?: number
  username?: string
  name?: string
  password?: string
  avatar?: string
  phone?: string
  email?: string
  roleId?: number
  role?: Role
  createTime?: Date
  updateTime?: Date
}
