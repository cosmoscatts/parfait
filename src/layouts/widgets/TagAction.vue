<script setup lang="ts">
const {
  visible = false,
  event = undefined,
} = defineProps<{
  visible?: boolean
  event?: MouseEvent
}>()
const left = computed(() => {
  return 100
})
const top = computed(() => {
  return 0
})
</script>

<template>
  <ul
    v-show="visible"
    :style="{ left: `${left}px`, top: `${top}px` }"
    absolute z-3000 box-border p-4 text-sm border="3 green6 rounded-md"
    bg="white dark:[#373739]" list-none
  >
    <li>
      刷新当前
    </li>
    <li>
      关闭其他
    </li>
  </ul>
</template>
