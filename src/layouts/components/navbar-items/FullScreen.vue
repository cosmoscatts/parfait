<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button
    icon-btn text-lg
    :class="isFullscreen
      ? 'i-bytesize-fullscreen-exit'
      : 'i-bytesize-fullscreen'"
    @click="toggle"
  />
</template>
