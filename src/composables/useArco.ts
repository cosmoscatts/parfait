import type { MessageConfig, ModalConfig } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'
import { Message as ArcoMessage, Modal as ArcoModal } from '@arco-design/web-vue'

/**
 * repack arco Message, make it global
 */
function useMessage() {
  return {
    success(config: string | MessageConfig) {
      ArcoMessage.success(config)
    },
    warning(config: string | MessageConfig) {
      ArcoMessage.warning(config)
    },
    error(config: string | MessageConfig) {
      ArcoMessage.error(config)
    },
    info(config: string | MessageConfig) {
      ArcoMessage.info(config)
    },
    loading(config: string | MessageConfig) {
      ArcoMessage.loading(config)
    },
    clear(position?: 'top' | 'bottom' | undefined) {
      ArcoMessage.clear(position)
    },
  }
}

/**
 * repack arco Modal, make it global
 */
function useModal() {
  return {
    open(config: ModalConfig) {
      ArcoModal.open(config)
    },
    confirm(config: ModalConfig) {
      ArcoModal.confirm(config)
    },
    success(config: ModalConfig) {
      ArcoModal.success(config)
    },
    warning(config: ModalConfig) {
      ArcoModal.warning(config)
    },
    error(config: ModalConfig) {
      ArcoModal.error(config)
    },
    info(config: ModalConfig) {
      ArcoModal.info(config)
    },
  }
}

const Message = useMessage()
const Modal = useModal()

export { Message, Modal }
