export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  urlAdd?: AnyObject | AnyObject[]
}

export interface PostData {
  body?: AnyObject
  urlAdd?: AnyObject | AnyObject[]
}

export interface Result<T> {
  code: number
  data: T
  message?: string
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}
