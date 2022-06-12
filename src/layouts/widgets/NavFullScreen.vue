<script setup lang="ts">
import screenfull from 'screenfull'

let isFullscreen = $ref(false)
function click() {
  if (!screenfull.isEnabled) {
    Message.error('你的浏览器不支持此操作')
    return false
  }
  screenfull.toggle()
}
function change() {
  isFullscreen = screenfull.isFullscreen
}
function init() {
  onMounted(() => {
    if (screenfull.isEnabled)
      screenfull.on('change', change)
  })
  onBeforeUnmount(() => {
    if (screenfull.isEnabled)
      screenfull.off('change', change)
  })
}
init()
</script>

<template>
  <button
    icon-btn text-lg
    :class="isFullscreen
      ? 'i-carbon-screen-off'
      : 'i-carbon-screen'"
    @click="click"
  />
</template>
