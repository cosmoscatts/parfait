<script setup lang="ts">
import { IconUp } from '@arco-design/web-vue/es/icon'
import { APP_LAYOUT_PARAMS as PARAMS } from '~/config'

defineProps<{ targetContainer: string }>()
</script>

<template>
  <a-back-top
    :target-container="targetContainer"
    :visible-height="PARAMS.backTopvisibilityHeight"
  >
    <a-button
      fixed
      shadow-md
      :style="{
        boxShadow: '0 2px 12px #0000001a',
        background: 'var(--color-bg-5)',
        border: '1px solid var(--color-fill-3)',
        right: `${PARAMS.backTopRight}px`,
        bottom: `${PARAMS.backTopBottom}px`,
      }"
      size="large"
      shape="circle"
    >
      <IconUp :stroke-width="8" />
    </a-button>
  </a-back-top>
</template>
