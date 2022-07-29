<script setup lang="ts">
import { addColorAlpha, primaryColorMap } from '~/utils'

const {
  title = '',
  isActive = false,
} = defineProps<{
  title?: string
  isActive?: boolean
}>()

const refTag = ref()
const isHovered = useElementHover(refTag)
const { primaryColor } = storeToRefs(useAppStore())
const tagStyle = computed(() => {
  const style: Record<string, string> = {}
  const _primaryColor = primaryColorMap[primaryColor.value]
  if (isActive)
    style.backgroundColor = addColorAlpha(_primaryColor, isDark.value ? 0.15 : 0.1)

  if (isActive || isHovered.value)
    style.borderColor = addColorAlpha(_primaryColor, 0.3)

  return style
})
</script>

<template>
  <span
    ref="refTag" :style="tagStyle"
    flex="~ nowrap" justify-center items-center lt-sm="!min-w-70px" px-2
    text="stone-600 dark:white 12px hover:[rgb(var(--primary-6))]"
    border="1px #e5e7eb dark:#ffffff3d"
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
