<script setup lang="ts">
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
const { toggleCollapse } = collapseStore
</script>

<template>
  <button
    icon-btn text-5
    :class="collapse ? 'i-ri-indent-increase' : 'i-ri-indent-decrease'"
    @click="toggleCollapse(!collapse)"
  />
</template>
