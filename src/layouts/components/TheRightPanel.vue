<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { IconSkin } from '@arco-design/web-vue/es/icon'
import RightPanelSetting from '../widgets/RightPanelSetting.vue'

const {
  visible = false,
} = defineProps<{
  visible?: boolean
}>()
const emits = defineEmits(['update:visible'])
let isHovered = $ref(false)
function onHover(state: boolean) {
  isHovered = state
}
const { updateByStage, resetStage } = useAppStore()
function handleOk() {
  isHovered = false
  updateByStage()
  emits('update:visible', false)
}
function handleCancel() {
  isHovered = false
  resetStage()
  emits('update:visible', false)
}
function onClick() {
  resetStage()
  emits('update:visible', !visible)
}
</script>

<template>
  <div>
    <a-button
      v-if="!visible"
      v-element-hover="onHover" fixed
      class="bottom-30% right-3%" shadow-md
      :shape="isHovered ? 'round' : 'circle'"
      size="large" @click="onClick()"
    >
      <icon-skin />
      <span v-if="isHovered" ml-3>页面风格</span>
    </a-button>
    <a-drawer
      :visible="visible"
      :width="300"
      unmount-on-close
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title>
        页面风格设置
      </template>
      <RightPanelSetting />
    </a-drawer>
  </div>
</template>
