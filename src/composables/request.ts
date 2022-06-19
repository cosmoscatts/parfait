import { axiosService as axios } from '~/utils'
import type { AnyObject, GetParams, PostData } from '~/types'

/**
 * add params to url
 * parmas can be Object or Array<Object>
 *
 * @param params - { k: v } | [{ k: v }, ...]
 * @return react url - string
 */
function addUrlParams(params?: AnyObject | AnyObject[]) {
  if (!params)
    return ''
  let paramStr = ''
  if (!Array.isArray(params))
    params = [params]
  const arr = params.flatMap((i: AnyObject) => Object.entries(i))
  for (const [k, v] of arr) {
    if (v === '')
      continue
    paramStr += `&${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`
  }
  return `?${paramStr.slice(1)}`
}

export class Request {
  // HTTP GET
  static get(url: string, { urlAdd }: GetParams) {
    url += addUrlParams(urlAdd)
    return axios.get(url)
  }

  // HTTP POST
  static post(url: string, { body = {}, urlAdd }: PostData) {
    url += addUrlParams(urlAdd)
    return axios.post(url, body)
  }

  // HTTP PUT
  static put(url: string, { body = {} }: PostData) {
    return axios.put(url, body)
  }

  // HTTP DELETE
  static delete(url: string, { urlAdd }: GetParams) {
    url += addUrlParams(urlAdd)
    return axios.delete(url)
  }
}
