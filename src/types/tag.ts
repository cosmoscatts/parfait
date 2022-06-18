export interface Tag {
  /**
   * route name
   *
   * @default: undefined
   */
  name?: string
  /**
   * route path
   *
   * @default: undefined
   */
  path?: string
  /**
   * route fulPath
   *
   * @default: undefined
   */
  fullPath?: string
  /**
   * route meta title
   *
   * @default: undefined
   */
  title?: string
  /**
   * route query
   *
   * @default: undefined
   */
  query?: Record<string, any>
  /**
   * whether cached
   *
   * @default: false
   */
  cached?: boolean
}
