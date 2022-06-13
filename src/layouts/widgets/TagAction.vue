<script setup lang="ts">
const {
  visible = false,
  left = 0,
  top = 0,
} = defineProps<{
  visible?: boolean
  left?: number
  top?: number
}>()
/**
 * calculate the ul position
 */
function calculate() {

}
</script>

<template>
  <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px` }">
    <li>
      刷新当前
    </li>
    <li>
      关闭其他
    </li>
  </ul>
</template>
