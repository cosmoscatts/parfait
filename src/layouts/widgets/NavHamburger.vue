<script setup lang="ts">
const appStore = useAppStore()
const { menuCollapsed } = storeToRefs(appStore)
const { toggleMenuCollapsed } = appStore
const { width } = useWindowSize()
function toggle() {
  if (width.value < 1200)
    return
  toggleMenuCollapsed(!unref(menuCollapsed))
}
</script>

<template>
  <button
    icon-btn text-5
    :class="menuCollapsed
      ? 'i-line-md-menu-unfold-right'
      : 'i-line-md-menu-unfold-left'"
    @click="toggle"
  />
</template>
