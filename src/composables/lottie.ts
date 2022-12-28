import lottie from 'lottie-web'
import type { RendererType } from 'lottie-web'

export interface LottieParams {
  containerId: string
  path: string
  loop?: boolean
  renderer?: RendererType
}

const getElement = (id: string) => document.querySelector(id)!

export const useLottie = ({
  containerId,
  path,
  loop = true,
  renderer = 'svg',
}: LottieParams) => lottie.loadAnimation({
  path,
  loop,
  renderer,
  container: getElement(containerId),
})

export const useListLottie = (list: LottieParams[]) => list.forEach(item => useLottie(item))
