/**
 * 定义多页签的数据类型
 */
export interface Tab {
  /** id */
  id: number
  /** 多页签名称 */
  title: string
  /** 路由名称 */
  name: string
  /** 图标 */
  icon?: string
  /** 路由 */
  path: string
  /** 是否需要缓存页面 */
  cached?: boolean
}
