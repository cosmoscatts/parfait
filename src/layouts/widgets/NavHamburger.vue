<script setup lang="ts">
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
const { toggleCollapse } = collapseStore
</script>

<template>
  <button
    icon-btn
    class="collapse ? 'i-carbon-chevron-right' : 'i-carbon-chevron-left'"
    @click="toggleCollapse(!collapse)"
  />
</template>
