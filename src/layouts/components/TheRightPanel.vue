<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { IconSkin } from '@arco-design/web-vue/es/icon'
import RightPanelSetting from '../widgets/RightPanelSetting.vue'

const {
  visible = false,
} = defineProps<{
  visible?: boolean
}>()
const emits = defineEmits(['update:visible', 'changeSettings'])
let isHovered = $ref(false)
function onHover(state: boolean) {
  isHovered = state
}
const handleOk = () => {
  emits('changeSettings')
  isHovered = false
}
const handleCancel = () => {
  emits('update:visible', false)
  isHovered = false
}
function onClick() {
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
    <a-drawer :visible="visible" unmount-on-close @ok="handleOk" @cancel="handleCancel">
      <template #title>
        页面风格设置
      </template>
      <RightPanelSetting />
    </a-drawer>
  </div>
</template>
