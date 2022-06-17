import type { MessageConfig, ModalConfig } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import { Message as aMessage, Modal as aModal } from '@arco-design/web-vue'

/**
 * repack arco Message, make it global
 */
function packMessage() {
  const message = {
    success(config: string | MessageConfig) {
      aMessage.success(config)
    },
    warning(config: string | MessageConfig) {
      aMessage.warning(config)
    },
    error(config: string | MessageConfig) {
      aMessage.error(config)
    },
    info(config: string | MessageConfig) {
      aMessage.info(config)
    },
    loading(config: string | MessageConfig) {
      aMessage.loading(config)
    },
    clear(position?: 'top' | 'bottom' | undefined) {
      aMessage.clear(position)
    },
  }
  return {
    Message: message,
  }
}
/**
 * repack arco Modal, make it global
 */
function packModal() {
  const modal = {
    open(config: ModalConfig) {
      aModal.open(config)
    },
    confirm(config: ModalConfig) {
      aModal.confirm(config)
    },
    success(config: ModalConfig) {
      aModal.success(config)
    },
    warning(config: ModalConfig) {
      aModal.warning(config)
    },
    error(config: ModalConfig) {
      aModal.error(config)
    },
    info(config: ModalConfig) {
      aModal.info(config)
    },
  }
  return {
    Modal: modal,
  }
}
const { Message } = packMessage()
const { Modal } = packModal()
export { Message, Modal }
