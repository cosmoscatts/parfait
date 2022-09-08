<script setup lang="ts">
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheTabs,
} from '../components'

const { showTheTags, fixHeader } = storeToRefs(useAppStore())
const rightPanelVisible = ref(false)
const backTopTarget = computed(() => {
  return fixHeader.value
    ? '#content-wrapper'
    : '#main-wrapper'
})

// handle scroll position
const refMainWrapper = ref()
const refContentWrapper = ref()
const route = useRoute()
watch(() => route.path, (val, old) => {
  if (val === old)
    return
  const refTarget = fixHeader.value
    ? refContentWrapper
    : refMainWrapper
  if ((refTarget.value?.$el?.scrollTop ?? 0) === 0)
    return
  useScrollTop(refTarget.value!.$el)
})
</script>

<template>
  <a-layout id="main-wrapper" ref="refMainWrapper" h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header :class="fixHeader ? 'fixed top-0 right-0 w-full' : ''">
      <TheNav w-full h-50px bg-transparent />
      <TheTags v-show="showTheTags" w-full h-40px bg-transparent />
    </a-layout-header>
    <a-layout
      id="content-wrapper"
      ref="refContentWrapper"
      bg-transparent
      :class="
        fixHeader
          ? showTheTags
            ? 'of-x-hidden of-y-auto !mt-90px'
            : 'of-x-hidden of-y-auto !mt-50px'
          : '' "
    >
      <a-layout-content>
        <TheMain w-full h-full p-5 />
      </a-layout-content>
    </a-layout>
    <TheRightPanel v-model:visible="rightPanelVisible" />
  </a-layout>
  <BackTop :target-container="backTopTarget" />
</template>
