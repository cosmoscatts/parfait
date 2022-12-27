<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button
    icon-btn text-lg
    :class="isFullscreen
      ? 'i-carbon-screen-off'
      : 'i-carbon-screen'"
    @click="toggle"
  />
</template>
