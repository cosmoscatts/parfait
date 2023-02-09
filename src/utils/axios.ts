import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const AXIOS_TIMEOUT = 5000
function createAxios(configFn: () => AxiosRequestConfig) {
  const _axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL as string,
    timeout: AXIOS_TIMEOUT,
  })
  _axios.interceptors.request.use(
    (config: AxiosRequestConfig) => ({
      ...config,
      ...configFn(),
    } as InternalAxiosRequestConfig<any>),
    (e: any) => Promise.reject(e),
  )
  _axios.interceptors.response.use(
    async (response: AxiosResponse) => {
      const {
        data: { code, data, message },
      } = response
      return Promise.resolve({ code, data, message }) as any
    },
    (error: any) => Promise.reject(error),
  )
  return _axios
}

export { createAxios }
