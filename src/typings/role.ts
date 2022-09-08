/**
 * 定义角色的数据结构
 */
export interface Role {
  /** id */
  id?: number
  /** 角色名称 */
  name?: string
  /** 角色描述 */
  description?: string
  /** 创建时间 */
  createTime?: Date
  /** 更新时间 */
  updateTime?: Date
}
