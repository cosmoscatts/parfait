<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { IconSkin } from '@arco-design/web-vue/es/icon'
import SettingsDrawer from './settings'
import { appLayoutParams } from '~/config'

const {
  settingsDrawerRight,
  settingsDrawerBottom,
  settingsDrawerWidth,
} = appLayoutParams

const {
  updateSettingsFromStageData,
  resetStageData,
} = useAppStore()

// 是否显示 `app` 设置抽屉
let showSettingsDrawer = $ref(false)

let isButtonHovered = $ref(false)
function onHover(state: boolean) {
  isButtonHovered = state
}

function onClick() {
  isButtonHovered = false
  showSettingsDrawer = true
}

// 应用当前配置
function saveCurrentSettings() {
  const LOADING_INTERVAL = 1000
  Message.loading('正在更新配置')
  updateSettingsFromStageData()
  useTimeoutFn(() => {
    Message.clear()
    Message.success('应用成功')
    showSettingsDrawer = false
  }, LOADING_INTERVAL)
}
</script>

<template>
  <div fixed :style="{ right: `${settingsDrawerRight}px`, bottom: `${settingsDrawerBottom}px` }" z-1000>
    <a-button
      v-if="!showSettingsDrawer"
      v-element-hover="onHover"
      size="large"
      :shape="isButtonHovered ? 'round' : 'circle'"
      @click="onClick()"
    >
      <IconSkin :stroke-width="6" />
      <span v-if="isButtonHovered" ml-3 font-bold>页面风格</span>
    </a-button>
  </div>

  <a-drawer
    v-model:visible="showSettingsDrawer"
    :width="settingsDrawerWidth"
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
        <a-button type="primary" status="warning" long @click="resetStageData">
          <span text="dark dark:white" font-bold>重置当前配置</span>
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
