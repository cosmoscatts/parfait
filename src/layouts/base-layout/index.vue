<script setup lang="ts">
import BaseLayoutVertical from './Vertical.vue'
import BaseLayoutHorizontal from './Horizontal.vue'

const { baseSettings } = storeToRefs(useAppStore())
const component = computed(() => {
  return baseSettings.value?.layout === 'vertical'
    ? BaseLayoutVertical
    : BaseLayoutHorizontal
})
</script>

<template>
  <Component :is="component" />
</template>

