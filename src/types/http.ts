export type RequestParams = Record<string, any> | Record<string, any>[]

export interface Response<T> {
  /**
   * code
   */
  code?: number
  /**
   * response data
   */
  data?: T
  /**
   * message
   */
  message?: string
}
