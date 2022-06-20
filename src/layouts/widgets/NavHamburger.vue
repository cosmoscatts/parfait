<script setup lang="ts">
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
const { toggleCollapse } = collapseStore
const { width } = useWindowSize()
function toggle() {
  if (width.value < 1200)
    return
  toggleCollapse(!collapse.value)
}
</script>

<template>
  <button
    icon-btn text-5
    :class="collapse
      ? 'i-line-md-menu-unfold-right'
      : 'i-line-md-menu-unfold-left'"
    @click="toggle"
  />
</template>
