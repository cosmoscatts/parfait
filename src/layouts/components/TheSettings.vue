<script setup lang="ts">
import { IconSkin } from '@arco-design/web-vue/es/icon'
import SettingsDrawer from './settings-drawer/index.vue'
import { APP_LAYOUT_PARAMS as PARAMS } from '~/config'

const LOADING_INTERVAL = 1000

const uiStore = useUiStore()
const refButton = ref()
const hover = useElementHover(refButton)
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
  <div fixed :style="{ right: `${PARAMS.settingsDrawerRight}px`, bottom: `${PARAMS.settingsDrawerBottom}px` }" z-1000>
    <a-button
      v-if="!showSettingsDrawer"
      ref="refButton"
      size="large"
      :shape="hover ? 'round' : 'circle'"
      :style="{
        boxShadow: '0 2px 12px #0000001a',
        background: 'var(--color-bg-5)!important',
        border: '1px solid var(--color-fill-3)!important',
      }"
      @click="showSettingsDrawer = true; hover = false"
    >
      <IconSkin />
      <span v-if="hover" ml-2>页面风格</span>
    </a-button>
  </div>

  <a-drawer
    v-model:visible="showSettingsDrawer"
    :width="PARAMS.settingsDrawerWidth"
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
