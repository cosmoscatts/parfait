<script setup lang="ts">
const uiStore = useUiStore()
function toggle() {
  if (uiStore.collaspeSide.get()) {
    uiStore.collaspeSide.unCollapse()
  } else {
    uiStore.collaspeSide.collapse()
  }
}
</script>

<template>
  <button
    icon-btn text-xl
    :class="uiStore.collaspeSide.get()
      ? 'i-line-md-menu-unfold-right'
      : 'i-line-md-menu-unfold-left'"
    @click="toggle"
  />
</template>
