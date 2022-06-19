import { axiosService as axios } from '~/utils'
import type { RequestParams } from '~/types'
type ParamsType = RequestParams | RequestParams[]
/**
 * add params to url
 * parmas can be Object or Array<Object>
 *
 * @param params - { k: v } | [{ k: v }, ...]
 * @return react url - string
 */
function addUrlParams(params?: ParamsType) {
  if (!params)
    return ''
  if (Array.isArray(params) && params.length === 0)
    return ''
  if (!Array.isArray(params) && Object.keys(params).length === 0)
    return ''
  let paramStr = ''
  if (!Array.isArray(params))
    params = [params]
  const arr = params.flatMap((i: RequestParams) => Object.entries(i))
  for (const [k, v] of arr) {
    if (v === '')
      continue
    paramStr += `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  }
  return `?${paramStr.slice(1)}`
}

export class Request {
  // HTTP GET
  static get(url: string, urlAdd?: RequestParams) {
    url += addUrlParams(urlAdd)
    return axios.get(url)
  }

  // HTTP POST
  static post(url: string, params?: RequestParams, urlAdd?: RequestParams) {
    url += addUrlParams(urlAdd)
    return axios.post(url, params)
  }

  // HTTP PUT
  static put(url: string, params?: RequestParams) {
    return axios.put(url, params)
  }

  // HTTP DELETE
  static delete(url: string, params?: RequestParams) {
    url += addUrlParams(params)
    return axios.delete(url)
  }
}
