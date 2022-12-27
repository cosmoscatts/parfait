<script setup lang="ts">
import { IconSkin } from '@arco-design/web-vue/es/icon'
import SettingsDrawer from './settings-drawer/index.vue'
import { APP_LAYOUT_PARAMS } from '~/config'

const LOADING_INTERVAL = 1000
const uiStore = useUiStore()
let showSettingsDrawer = $ref(false)
function saveCurrentSettings() {
  Message.loading('正在更新配置')
  useTimeoutFn(() => {
    uiStore.applyCopySettings()
    Message.clear()
    Message.success('应用成功')
    showSettingsDrawer = false
  }, LOADING_INTERVAL)
}
</script>

<template>
  <a-button
    icon-btn text-lg
    @click="showSettingsDrawer = true"
  >
    <IconSkin :stroke-width="6" />
  </a-button>

  <a-drawer
    v-model:visible="showSettingsDrawer"
    :width="APP_LAYOUT_PARAMS.settingsDrawerWidth"
    unmount-on-close
  >
    <template #title>
      页面风格设置
    </template>

    <SettingsDrawer v-if="showSettingsDrawer" />

    <template #footer>
      <a-space direction="vertical" fill>
        <a-button type="primary" long @click="saveCurrentSettings">
          <span text="dark dark:white" font-bold>应用当前配置</span>
        </a-button>
        <a-button type="primary" status="warning" long @click="uiStore.resetCopySettings">
          <span text="dark dark:white" font-bold>重置当前配置</span>
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
