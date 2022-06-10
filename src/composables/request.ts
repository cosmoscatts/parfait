import axios from '~/utils/axios'
import type { RequestParams } from '~/types'
type ParamsType = Record<string, any> | Record<string, any>[]

/**
 * add params to url
 * parmas can be Object or Array<Object>
 */
function addUrlParams(params?: ParamsType) {
  if (!params)
    return ''
  if (Array.isArray(params) && params.length === 0)
    return ''
  if (!Array.isArray(params) && Object.keys(params).length === 0)
    return ''

  let paramStr = ''
  let _params: Record<string, any> = {}
  if (Array.isArray(params))
    params.forEach(v => _params = { ..._params, ...v })

  else
    _params = params

  for (const [k, v] of Object.entries(_params)) {
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
