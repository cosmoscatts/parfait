import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

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
      Promise.reject(e)
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
      return Promise.reject(error)
    },
  )

  return service
}

export { createAxios }
