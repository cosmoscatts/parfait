/** 任意 `Object` */
export interface AnyObject {
  [key: string]: unknown
}
/** `通用` 请求参数 */
export interface HttpParams {
  urlParams?: AnyObject | AnyObject[]
}
/** `Get` 请求参数 */
export interface GetParams extends HttpParams {}
/** `Post` 请求参数 */
export interface PostParams extends HttpParams {
  body?: AnyObject
}
/** `Put` 请求参数 */
export interface PutParams extends HttpParams {
  body?: AnyObject
}
/** `Delete` 请求参数 */
export interface DeleteParams extends HttpParams {}
/** `Http` 返回数据结构 */
export interface Result<T> {
  code: number
  data: T | T[]
  message?: string
}
/** 分页返回数据结构 */
export interface PageResult<T> {
  [key: string]: any
  records?: T[]
  total?: number
}
/** 分页器数据结构 */
export interface Pagination {
  current: number
  pageSize: number
  total?: number
}
