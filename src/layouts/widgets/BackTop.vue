<script setup lang="ts">
import { IconToTop } from '@arco-design/web-vue/es/icon'
const {
  targetContainer = '',
} = defineProps<{
  targetContainer: string
}>()
</script>

<template>
  <a-back-top :target-container="targetContainer">
    <a-button
      fixed shadow-md
      class="bottom-23% right-3%"
      size="large"
      shape="circle"
    >
      <icon-to-top />
    </a-button>
  </a-back-top>
</template>
