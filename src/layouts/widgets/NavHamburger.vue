<script setup lang="ts">
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
const { toggleCollapse } = collapseStore
</script>

<template>
  <button
    icon-btn
    rounded-50
    class="hover:!bg-white"
    color="black dark:white"
    :class="collapse ? 'i-carbon-chevron-right' : 'i-carbon-chevron-left'"
    @click="toggleCollapse(!collapse)"
  />
</template>
