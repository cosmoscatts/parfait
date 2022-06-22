<script setup lang="ts">
import { IconToTop } from '@arco-design/web-vue/es/icon'
const {
  targetContainer = '',
} = defineProps<{
  targetContainer: string
}>()
const { fixHeader } = storeToRefs(useAppStore())
// when the fixHeader change, the backTop target not update
// immediately, so change the key to force update
let key = $ref(0)
watch(fixHeader, () => {
  key++
})
</script>

<template>
  <a-back-top :key="key" :target-container="targetContainer">
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
