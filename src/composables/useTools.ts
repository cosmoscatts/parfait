/// ///// 常用工具方法 ////////
// 添加新方法时，请在这里标注，方便查看
// - Arco Design > Modal / Message / ANotification
// - useHeadMeta
// - useLogout
// - useOpenWindow
// - useScrollTop
/// ///// END ////////

import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
import { Notification as ANotification, Message, Modal } from '@arco-design/web-vue'

import BTween from 'b-tween'
import { appMeta } from '~/config'

/**
 * 统一导出 `Arco Design` 消息组件
 * 配合自动导入插件，使用时可无须导入
 * 直接使用 `Message.success('Hello, world!')`
 */
export {
  Modal,
  Message,
  ANotification,
}

export function useHeadMeta() {
  const { name } = appMeta
  useHead({
    title: name,
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: computed(() => isDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      },
    ],
  })
}

/**
 * 当退出登录时，统一清除所有的副作用
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAllTabs } = useTabStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAllTabs, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
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

// https://github.com/PengJiyuan/b-tween
export function useScrollTop(target: HTMLElement, easing = 'quartOut', duration = 500) {
  if (!target)
    return

  const { scrollTop } = target
  const tween = new BTween({
    from: { scrollTop },
    to: { scrollTop: 0 },
    easing,
    duration,
    onUpdate: (keys: any) => {
      if (target)
        target.scrollTop = keys.scrollTop
    },
  })
  tween.start()
}
