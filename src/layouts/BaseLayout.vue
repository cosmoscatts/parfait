<script setup lang="ts">
import BaseLayoutVertical from './BaseLayoutVertical.vue'
import BaseLayoutHorizontal from './BaseLayoutHorizontal.vue'

const { layout } = storeToRefs(useAppStore())
const component = computed(() => {
  return layout.value === 'vertical'
    ? BaseLayoutVertical
    : BaseLayoutHorizontal
})
</script>

<template>
  <Component :is="component" />
</template>
