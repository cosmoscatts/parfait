<script setup lang="ts">
import {
  BackTop,
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
import { appLayoutParams, showAppSettings } from '~/config'

const {
  navHeight,
  tabHeight,
  sideWidth,
  sideCollapsedWidth,
  contentPadding,
  footHeight,
} = appLayoutParams

const route = useRoute()
const { isMobile, menuCollapsed, baseSettings } = storeToRefs(useAppStore())
const { setMenuCollapsed } = useAppStore()

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

// 计算 `MainWrapper` 宽度
const mainWrapperWidth = computed(() => {
  return isMobile.value
    ? '100%'
    : `calc(100% - ${menuCollapsed.value ? sideCollapsedWidth : sideWidth}px)`
})

// 计算 `MainWrapper` `left` 偏移
const mainWrapperLeft = computed(() => {
  return isMobile.value
    ? '0px'
    : `${menuCollapsed.value ? sideCollapsedWidth : sideWidth}px`
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
    relative
    hw-screen
    bg-body of-hidden
  >
    <a-layout-sider
      v-if="!isMobile"
      absolute top-0 left-0
      h-full of="x-hidden y-auto"
      bg-side
      border-r="1px solid [var(--color-border)]"
      hide-trigger
      collapsible
      :width="sideWidth"
      :collapsed-width="64"
      :collapsed="menuCollapsed"
    >
      <TheSide hw-full />
    </a-layout-sider>
    <a-drawer
      v-else
      class="menu-drawer"
      placement="left"
      :width="sideWidth"
      :auto-focus="false"
      :visible="!menuCollapsed"
      :header="false"
      :footer="false"
      @cancel="setMenuCollapsed"
    >
      <TheSide hw-full bg-side />
    </a-drawer>

    <a-layout
      id="main-wrapper"
      ref="refMainWrapper"
      absolute
      h-full of="x-hidden y-auto"
      :style="{
        width: mainWrapperWidth,
        left: mainWrapperLeft,
      }"
    >
      <a-layout-header
        bg-nav
        :class="
          baseSettings.fixNav
            ? 'absolute top-0 right-0 w-full'
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
          bg-foot border-t="1px solid [var(--color-border)]"
        >
          <TheFoot hw-full />
        </a-layout-footer>
      </a-layout>
      <TheSettings v-if="showAppSettings" />
    </a-layout>
    <BackTop :target-container="backTopTarget" />
  </a-layout>
</template>

<style>
.menu-drawer .arco-drawer-body {
  padding: 0 !important;
  border-right: 1px solid var(--color-border);
}
</style>
