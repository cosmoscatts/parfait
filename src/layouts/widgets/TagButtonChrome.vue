<script setup lang="ts">
import TagButtonChromeShape from './TagButtonChromeShape.vue'
import { primaryColorMap } from '~/utils'
import type { FillColor, MixRatio } from '~/types'

interface Props {
  title?: string
  isActive?: boolean
  isLast?: boolean
  bgColor?: FillColor
  hoverBgColor?: FillColor
  mixColor?: FillColor
  mixRatio?: MixRatio
}

const {
  title = '',
  isActive = false,
  isLast = false,
  bgColor = ['#ffffff', '#232324'],
  hoverBgColor = ['#dee1e6', '#2D2D2D'],
  mixColor = ['#ffffff', '#000000'],
  mixRatio = [0.2, 0.3],
} = defineProps<Props>()

const refTag = ref()
const isHovered = useElementHover(refTag)
const { primaryColor: primary } = storeToRefs(useAppStore())
const primaryColor = computed(() => {
  return primaryColorMap[primary.value] || '#165DFF'
})
</script>

<template>
  <div
    ref="refTag" text="stone-600 dark:light-600/80"
    relative flex-inline items-center h-34px px-24px m="r-[-18px]" cursor-pointer
    :class="{ 'z-10': isActive, 'z-9': isHovered, '!text-[rgb(var(--primary-6))]': isActive }"
  >
    <div absolute left-0 bottom-0 h-full w-full of-hidden>
      <TagButtonChromeShape
        :is-active="isActive"
        :is-hover="isHovered"
        :primary-color="primaryColor"
        :bg-color="bgColor"
        :hover-bg-color="hoverBgColor"
        :mix-color="mixColor"
        :mix-ratio="mixRatio"
      />
    </div>
    <span relative z-2 whitespace-nowrap flex-inline items-center>
      <div v-if="isActive" i-carbon-bookmark-filled mr-2 z-2 />
      <div v-else i-carbon-bookmark mr-2 z-2 />
      {{ title }}
    </span>
    <slot name="close" />
    <div
      absolute right="[-2px]" z-2 w-20px scale-x-5 h-16px bg="[#1f2225]" op-100 transition="opacity 0.3s ease-in-out"
      :class="{
        '!op-0': isHovered || isActive || isLast,
        '!bg-[#595959]': isDark,
      }"
    />
  </div>
</template>
