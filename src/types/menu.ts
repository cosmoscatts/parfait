export interface Menu {
  /**
   * id
   */
  id: number
  /**
   * title
   */
  title: string
  /**
   * route path
   */
  path?: string
  /**
   * icon
   */
  icon?: string
  /**
   * menu children
   */
  children?: Menu[]
}
