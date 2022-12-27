<script setup lang="ts">
import TabChromeShape from './TabChromeShape.vue'

const {
  title = '',
  active = false,
  last = false, // 是否是最后一个
} = defineProps<{
  title?: string
  active?: boolean
  last?: boolean
}>()

const refTab = ref()
const hover = useElementHover(refTab)

const uiStore = useUiStore()
</script>

<template>
  <div
    ref="refTab"
    relative
    flex-inline items-center
    h-34px px-24px m="r-[-18px]" cursor-pointer
    text="stone-600 dark:light-600/80"
    :class="{ 'z-10': active, 'z-9': hover, 'text-primary': active }"
  >
    <div absolute left-0 bottom-0 hw-full of-hidden>
      <TabChromeShape
        v-bind="{
          hover,
          active,
          primaryColor: uiStore.settings.primaryColor,
        }"
      />
    </div>
    <span relative z-2 whitespace-nowrap flex-inline items-center>
      <div v-if="active" i-carbon-bookmark-filled mr-2 z-2 />
      <div v-else i-carbon-bookmark mr-2 z-2 />
      {{ title }}
    </span>
    <slot name="close" />
    <div
      absolute right="[-2px]" z-2 w-20px scale-x-5 h-16px bg="[#1f2225]"
      op-100 transition="opacity 0.3s ease-in-out"
      :class="{
        '!op-0': hover || active || last,
        '!bg-[#595959]': isDark,
      }"
    />
  </div>
</template>
