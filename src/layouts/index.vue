<script setup lang="ts" name="BaseLayout">
import Vertical from './Vertical.vue'
import Horizontal from './Horizontal.vue'

const { layout } = storeToRefs(useSettingsStore())
const component = computed(() => {
  return layout.value === 'Vertical'
    ? Vertical
    : Horizontal
})
</script>

<template>
  <Component :is="component" />
</template>
