<script setup lang="ts">
import type { StyleValue } from 'vue'
import { addColorAlpha } from '~/utils'
import { hexThemeColorValueMap } from '~/config'

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
  const color = hexThemeColorValueMap[uiStore.settings.primaryColor]
  if (active) {
    style.backgroundColor = addColorAlpha(
      color,
      isDark.value ? 0.15 : 0.1,
    )
  }
  if (active || hover.value) {
    style.borderColor = addColorAlpha(color, 0.3)
  }
  return style
})
</script>

<template>
  <span
    ref="refTab"
    flex="center nowrap"
    lt-sm="!min-w-70px" px-2 truncate
    text="13px hover:primary"
    border="1px #e5e7eb dark:#ffffff3d"
    :style="tabStyle"
    :class="{
      'text-primary': active,
    }"
  >
    <span v-if="active" i-ri-price-tag-2-fill mr-1 />
    <span v-else i-ri-price-tag-2-line mr-1 />
    {{ title }}
    <slot name="close" />
  </span>
</template>
