import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
import { Message, Modal, Notification } from '@arco-design/web-vue'

/**
 * 统一导出 `Arco Design` 消息组件
 * 配合自动导入插件，使用时可无须导入
 * 直接使用 `Message.success('Hello, world!')`
 */
export {
  Modal,
  Message,
  Notification,
}
