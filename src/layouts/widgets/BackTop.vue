<script setup lang="ts">
import { IconToTop } from '@arco-design/web-vue/es/icon'
const {
  targetContainer = '',
} = defineProps<{
  targetContainer: string
}>()
const { fixHeader } = storeToRefs(useSettingsStore())
</script>

<template>
  <a-back-top v-if="fixHeader" :target-container="targetContainer">
    <a-button
      fixed shadow-md
      class="bottom-23% right-3%"
      size="large"
      shape="circle"
    >
      <icon-to-top />
    </a-button>
  </a-back-top>
  <a-back-top v-else :target-container="targetContainer">
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
