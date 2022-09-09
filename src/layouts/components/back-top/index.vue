<script setup lang="ts">
import { IconUp } from '@arco-design/web-vue/es/icon'
import { appLayoutParams } from '~/config'

const {
  targetContainer = '',
} = defineProps<{
  /** 作用的目标容器元素 `id` */
  targetContainer: string
}>()

const {
  backTopRight,
  backTopBottom,
  backTopvisibilityHeight,
} = appLayoutParams
</script>

<template>
  <a-back-top :target-container="targetContainer" :visible-height="backTopvisibilityHeight">
    <a-button
      fixed shadow-md
      :style="{
        right: `${backTopRight}px`,
        bottom: `${backTopBottom}px`,
      }"
      size="large" shape="circle"
    >
      <IconUp :stroke-width="8" />
    </a-button>
  </a-back-top>
</template>
