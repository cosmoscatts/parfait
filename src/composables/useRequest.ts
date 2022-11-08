import type { AxiosResponse } from 'axios'
import { createAxios } from '~/utils'
import type {
  AnyObject,
  DeleteParams,
  GetParams,
  PostParams,
  PutParams,
} from '~/types'
import { ERROR_PAGE } from '~/router/constants'

type Fn = () => Promise<AxiosResponse<any, any>>

/**
 * 拼接 `url` 参数
 */
function handleUrlParams(params?: AnyObject | AnyObject[]) {
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

/**
 * 处理请求错误
 */
function handleRequestError(fn: Fn) {
  const router = useRouter()

  return fn?.().then(
    data => data,
    (error) => {
      console.error(error)
      router.push(ERROR_PAGE)
      return undefined
    },
  )
}

/**
 * 统一封装 `axios` 请求
 */
function createRequest() {
  const axios = createAxios()

  const httpMap = {
    doGet: (url: string) => axios.get(url),
    doPost: (url: string, body: AnyObject | AnyObject[]) => axios.post(url, body),
    doPut: (url: string, body: AnyObject | AnyObject[]) => axios.put(url, body),
    doDelete: (url: string) => axios.delete(url),
  }

  const {
    doGet,
    doPost,
    doPut,
    doDelete,
  } = httpMap

  const _get = (url: string, { urlParams }: GetParams) => {
    url += handleUrlParams(urlParams)
    return handleRequestError(() => doGet(url))
  }

  const _post = (url: string, { urlParams, body = {} }: PostParams) => {
    url += handleUrlParams(urlParams)
    return handleRequestError(() => doPost(url, body))
  }

  const _put = (url: string, { urlParams, body = {} }: PutParams) => {
    url += handleUrlParams(urlParams)
    return handleRequestError(() => doPut(url, body))
  }

  const _delete = (url: string, { urlParams }: DeleteParams) => {
    url += handleUrlParams(urlParams)
    return handleRequestError(() => doDelete(url))
  }

  return {
    get: _get,
    post: _post,
    put: _put,
    delete: _delete,
  }
}

export const useRequest = createRequest()
