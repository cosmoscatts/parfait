<script setup lang="ts">
import type { StyleValue } from 'vue'
import { addColorAlpha } from '~/utils'

const {
  title = '',
  active = false,
} = defineProps<{
  title?: string
  active?: boolean
}>()

const refTab = ref()
const hover = useElementHover(refTab)

const uiStore = useUiStore()

const tabStyle = computed(() => {
  const style: StyleValue = {}
  if (active) {
    style.backgroundColor = addColorAlpha(
      uiStore.settings.primaryColor,
      isDark.value ? 0.15 : 0.1,
    )
  }
  if (active || hover.value) {
    style.borderColor = addColorAlpha(uiStore.settings.primaryColor, 0.3)
  }
  return style
})
</script>

<template>
  <span
    ref="refTab"
    flex="c nowrap"
    lt-sm="!min-w-70px" px-2 truncate
    text="stone-600 dark:light-600/80 13px hover:primary"
    border="1px #e5e7eb dark:#ffffff3d"
    :style="tabStyle"
    :class="{
      'text-primary': active,
    }"
  >
    <span v-if="active" i-ri-price-tag-3-fill mr-1 />
    <span v-else i-ri-price-tag-3-line mr-1 />
    {{ title }}
    <slot name="close" />
  </span>
</template>
