import type { Role } from './role'
export interface User {
  /**
   * id
   */
  id?: number
  /**
   * username
   */
  username?: string
  /**
   * name
   */
  name?: string
  /**
   * password
   */
  password?: string
  /**
   * avatar
   */
  avatar?: string
  /**
   * phone
   */
  phone?: string
  /**
   * email
   */
  email?: string
  /**
   * roleId
   */
  roleId?: number
  /**
   * role
   */
  role?: Role
  /**
   * createTime
   */
  createTime?: Date
  /**
   * updateTime
   */
  updateTime?: Date
}
