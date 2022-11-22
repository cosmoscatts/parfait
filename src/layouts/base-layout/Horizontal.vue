<script setup lang="ts">
import {
  BackTop,
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheTabs,
} from '../components'
import { appLayoutParams, showAppSettings } from '~/config'

const {
  navHeight,
  tabHeight,
  contentPadding,
  footHeight,
} = appLayoutParams

const route = useRoute()
const { baseSettings } = storeToRefs(useAppStore())

const backTopTarget = computed(() => {
  const { value: { fixNav } } = baseSettings
  return fixNav
    ? '#content-wrapper'
    : '#main-wrapper'
})

// 计算内容区域需要减去的高度值
const diffHeight = computed(() => {
  let height = navHeight
  if (baseSettings.value.showTabs)
    height += tabHeight
  // `border` 边框的高度也需要考虑
  return height + 1
})

const refMainWrapper = ref()
const refContentWrapper = ref()

watch(() => route.path, (val, old) => {
  if (val === old)
    return
  const { value: { fixNav } } = baseSettings
  const refTarget = fixNav
    ? refContentWrapper
    : refMainWrapper
  if ((refTarget.value?.$el?.scrollTop ?? 0) === 0)
    return
  useScrollTop(refTarget.value!.$el)
})
</script>

<template>
  <a-layout
    id="main-wrapper"
    ref="refMainWrapper"
    hw-screen bg-body
    of="x-hidden y-auto"
  >
    <a-layout-header
      bg-nav
      :class="baseSettings.fixNav
        ? 'fixed top-0 right-0 w-full'
        : ''"
    >
      <TheNav w-full :style="{ height: `${navHeight}px` }" />
      <TheTabs v-show="baseSettings.showTabs" w-full :style="{ height: `${tabHeight}px` }" />
    </a-layout-header>
    <a-layout
      id="content-wrapper"
      ref="refContentWrapper"
      :style="{
        marginTop: `${
          !baseSettings.fixNav
            ? 0
            : baseSettings.showTabs
              ? navHeight + tabHeight + 1
              : navHeight + 1
        }px`,
        minHeight: `calc(100% - ${diffHeight}px)`,
        overflow: baseSettings.fixNav
          ? 'hidden auto'
          : undefined,
      }"
    >
      <a-layout-content>
        <TheMain ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }" />
      </a-layout-content>
      <a-layout-footer
        v-if="baseSettings.showFoot"
        :style="{ height: `${footHeight}px` }"
      >
        <TheFoot hw-full />
      </a-layout-footer>
    </a-layout>
    <TheSettings v-if="showAppSettings" />
  </a-layout>
  <BackTop :target-container="backTopTarget" />
</template>
