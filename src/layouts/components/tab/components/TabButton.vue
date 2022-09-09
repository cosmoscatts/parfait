<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { addColorAlpha } from '~/utils'
import { hexThemeColorValueMap } from '~/config'

const {
  title = '',
  isActive = false,
} = defineProps<{
  title?: string
  isActive?: boolean
}>()

const refTab = ref()
// `tab` 是否 `hover`
const isTabHovered = useElementHover(refTab)

const { baseSettings } = storeToRefs(useAppStore())

const tagStyle = computed(() => {
  const style: CSSProperties = {}
  const { value: { themePrimaryColor } } = baseSettings
  const _primaryColor = hexThemeColorValueMap[themePrimaryColor]

  if (isActive)
    style.backgroundColor = addColorAlpha(_primaryColor, isDark.value ? 0.15 : 0.1)

  if (isActive || isTabHovered.value)
    style.borderColor = addColorAlpha(_primaryColor, 0.3)

  return style
})
</script>

<template>
  <span
    ref="refTab"
    flex="center nowrap"
    lt-sm="!min-w-70px"
    px-2 truncate
    border="1px #e5e7eb dark:#ffffff3d"
    text="stone-600 dark:light-600/80 13px hover:[rgb(var(--primary-6))]"
    :style="tagStyle"
    :class="{
      '!text-[rgb(var(--primary-6))]': isActive,
    }"
  >
    <span v-if="isActive" i-ri-price-tag-3-fill mr-1 />
    <span v-else i-ri-price-tag-3-line mr-1 />
    {{ title }}
    <slot name="close" />
  </span>
</template>
