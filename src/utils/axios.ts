import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ERROR_PAGE } from '~/router/constants'
import router from '~/router'

function createAxios() {
  const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL as string,
    timeout: 5000,
  })

  service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config
    },
    (e: any) => {
      router.push(ERROR_PAGE)
      Message.error('请求异常')
      Promise.reject(e).then(() => console.error(e))
    },
  )

  service.interceptors.response.use(
    async (response: AxiosResponse) => {
      const {
        data: { code, data, message },
      } = response
      return Promise.resolve({ code, data, message })
    },
    (error: any) => {
      router.push(ERROR_PAGE)
      Message.error('服务器异常')
      return Promise.reject(error)
    },
  )

  return service
}

const axiosService = createAxios()
export { axiosService }
