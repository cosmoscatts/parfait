/**
 * 定义菜单的数据结构
 */
export interface Menu {
  /** id */
  id: number
  /** 菜单名称 */
  title: string
  /** 菜单路由 */
  path?: string
  /** 菜单图标 */
  icon?: string
  /** 子菜单集合 */
  children?: Menu[]
}
