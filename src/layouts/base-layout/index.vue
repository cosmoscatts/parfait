<script setup lang="ts">
import BaseLayoutVertical from './Vertical.vue'
import BaseLayoutHorizontal from './Horizontal.vue'

const uiStore = useUiStore()
const component = computed(() => {
  return uiStore.settings.layout === 'vertical'
    ? BaseLayoutVertical
    : BaseLayoutHorizontal
})
</script>

<template>
  <Component :is="component" />
</template>
