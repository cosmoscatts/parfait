<script setup lang="ts">
import { APP_LAYOUT_PARAMS } from '~/config'

const {
  modelValue = 'vertical',
  options = [],
} = defineProps<{
  modelValue: 'vertical' | 'horizontal'
  options: {
    label: string
    value: string
  }[]
}>()
const emits = defineEmits(['update:model-value'])

const isChecked = (value: string) => (value === modelValue)
const layoutIconClass: Record<string, {
  menuClass: string
  mainClass: string
}> = {
  vertical: {
    menuClass: 'w-1/3 h-full dark:border-r dark:border-[#333335]',
    mainClass: 'w-2/3 h-3/4 dark:border-t dark:border-[#333335]',
  },
  horizontal: {
    menuClass: 'w-full h-1/4 dark:border-b dark:border-[#333335]',
    mainClass: 'w-full h-3/4',
  },
}
const renderLayoutIcon = (value: string) => layoutIconClass[value]
const layoutElWidth = computed(() => {
  const { settingsDrawerWidth } = APP_LAYOUT_PARAMS
  const MAX_WIDTH = 180
  const PADDING_AND_MARGIN = 66
  return Math.min((settingsDrawerWidth - PADDING_AND_MARGIN) / 2, MAX_WIDTH)
})
</script>

<template>
  <div flex-y-center justify-between h-100px>
    <div
      v-for="{ label, value }, idx in options" :key="idx"
      class="border-2px rounded-6px cursor-pointer hover:border-primary"
      :class="[isChecked(value) ? 'border-primary' : 'border-transparent']"
      @click="emits('update:model-value', value)"
    >
      <a-tooltip :content="label" position="bottom">
        <div relative h-80px bg="white dark:[#232324]" rounded-4px of-hidden :style="{ width: `${layoutElWidth}px` }">
          <div class="absolute left-0 top-0 bg-[#273352] dark:bg-[#232324]" :class="renderLayoutIcon(value)?.menuClass" />
          <div class="absolute right-0 bottom-0 bg-[#f0f2f5] dark:bg-[#17171A]" :class="renderLayoutIcon(value)?.mainClass" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>
