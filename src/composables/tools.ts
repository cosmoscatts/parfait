import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
import { Notification as ANotification, Message, Modal } from '@arco-design/web-vue'

import BTween from 'b-tween'

export const isDevelopment = import.meta.env.MODE === 'development'

export { G, Conditional, R, BaseRequest } from '~/utils'

export {
  Modal,
  Message,
  ANotification,
}

/**
 * 格式化时间
 * @param date Date | number | string
 * @param partten
 */
export function formatDate(
  date: Date | number | string | undefined = new Date(),
  partten = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (['number', 'string'].includes(typeof date)) date = new Date(date)
  return dayjs(date).format(partten)
}

type TargetContext = '_self' | '_parent' | '_blank' | '_top'
export function useOpenWindow(
  url: string,
  opts?: {
    target?: TargetContext
    [key: string]: any
  },
) {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

export function useScrollTop(
  target: HTMLElement,
  easing = 'quartOut',
  duration = 500,
) {
  if (!target) return
  const { scrollTop } = target
  const tween = new BTween({
    from: { scrollTop },
    to: { scrollTop: 0 },
    easing,
    duration,
    onUpdate: (keys: any) => {
      if (target) target.scrollTop = keys.scrollTop
    },
  })
  tween.start()
}
