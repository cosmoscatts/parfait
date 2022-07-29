<script setup lang="ts">
const {
  title = '',
  isActive = false,
} = defineProps<{
  title?: string
  isActive?: boolean
}>()
</script>

<template>
  <span flex="~ nowrap" justify-center items-center lt-sm="!min-w-70px">
    <span v-if="isActive" i-ri-price-tag-3-fill mr-1 />
    <span v-else i-ri-price-tag-3-line mr-1 />
    {{ title }}
    <slot name="close" />
  </span>
</template>
