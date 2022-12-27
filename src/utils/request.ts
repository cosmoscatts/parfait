import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createAxios } from './axios'
import { Token } from './token'
import type {
  AnyObject,
  DeleteParams,
  GetParams,
  PostParams,
  PutParams,
  Result,
} from '~/types'

const createHeaders = () => {
  const token = Token.get()
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}
}

const handleUrlParams = (params?: AnyObject | AnyObject[]) => {
  if (!params) return ''
  if (!G.isArray(params)) params = [params]
  let paramStr = ''
  for (const [k, v] of params.flatMap((i: AnyObject) => Object.entries(i))) {
    if (!v || (G.isArray(v) && G.emptyArray(v))) continue
    const values = G.isArray(v) ? [...v] : [v]
    values.forEach(i => paramStr += `&${encodeURIComponent(k)}=${encodeURIComponent(i as string)}`)
  }
  return `?${paramStr.slice(1)}`
}

export class BaseRequest {
  axios: AxiosInstance
  constructor(config: () => AxiosRequestConfig) {
    this.axios = createAxios(config)
  }

  static instance(config: () => AxiosRequestConfig = createHeaders): BaseRequest {
    return new BaseRequest(config)
  }

  get<T>(url: string, { params }: GetParams) {
    url += handleUrlParams(params)
    return this.axios.get<T, Result<T>>(url)
  }

  post<T>(url: string, { params, body = {} }: PostParams) {
    url += handleUrlParams(params)
    return this.axios.post<T, Result<T>>(url, body)
  }

  put<T>(url: string, { params, body = {} }: PutParams) {
    url += handleUrlParams(params)
    return this.axios.put<T, Result<T>>(url, body)
  }

  delete<T>(url: string, { params }: DeleteParams) {
    url += handleUrlParams(params)
    return this.axios.delete<T, Result<T>>(url)
  }
}

export const R = BaseRequest.instance()
