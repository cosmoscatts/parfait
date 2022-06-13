export interface Tag {
  /**
   * 路由名称
   *
   * @default: undefined
   */
  name?: string
  /**
   * Tag 路由
   *
   * @default: undefined
   */
  path?: string
  /**
   * Tag 全路由
   *
   * @default: undefined
   */
  fullPath?: string
  /**
   * Tag 名称
   *
   * @default: undefined
   */
  title?: string
  /**
   * 路由 query
   *
   * @default: undefined
   */
  query?: Record<string, any>
}
