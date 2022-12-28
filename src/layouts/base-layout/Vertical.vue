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
import { APP_LAYOUT_PARAMS } from '~/config'

const {
  navHeight,
  tabHeight,
  sideWidth,
  sideCollapsedWidth,
  contentPadding,
  footHeight,
} = APP_LAYOUT_PARAMS

const route = useRoute()
const uiStore = useUiStore()

const backTopTarget = computed(() => {
  return uiStore.settings.fixNav
    ? '#content-wrapper'
    : '#main-wrapper'
})

const diffHeight = computed(() => {
  let height = navHeight
  if (uiStore.settings.showTabs) height += tabHeight
  return height + 1
})

const mainWrapperWidth = computed(() => {
  return isMobile.value
    ? '100%'
    : `calc(100% - ${uiStore.collaspeSide.get() ? sideCollapsedWidth : sideWidth}px)`
})

const mainWrapperLeft = computed(() => {
  return isMobile.value
    ? '0px'
    : `${uiStore.collaspeSide.get() ? sideCollapsedWidth : sideWidth}px`
})

const refMainWrapper = ref()
const refContentWrapper = ref()

watch(() => route.path, (val, old) => {
  if (val === old) return
  const refTarget = uiStore.settings.fixNav
    ? refContentWrapper
    : refMainWrapper
  if ((refTarget.value?.$el?.scrollTop ?? 0) === 0) return
  useScrollTop(refTarget.value!.$el)
})
</script>

<template>
  <a-layout relative hw-screen bg-body of-hidden>
    <a-layout-sider
      v-if="!isMobile"
      absolute top-0 left-0
      h-full of="x-hidden y-auto"
      bg-side border-r="1px solid [var(--color-border)]"
      collapsible
      hide-trigger
      :width="sideWidth"
      :collapsed-width="64"
      :collapsed="uiStore.collaspeSide.get()"
    >
      <TheSide hw-full />
    </a-layout-sider>

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
          uiStore.settings.fixNav
            ? 'absolute top-0 right-0 w-full'
            : ''"
      >
        <TheNav w-full :style="{ height: `${navHeight}px` }" />
        <TheTabs v-show="uiStore.settings.showTabs" wfull :style="{ height: `${tabHeight}px` }" />
      </a-layout-header>
      <a-layout
        id="content-wrapper"
        ref="refContentWrapper"
        :style="{
          marginTop: `${
            !uiStore.settings.fixNav
              ? 0
              : uiStore.settings.showTabs
                ? navHeight + tabHeight + 1
                : navHeight + 1
          }px`,
          minHeight: `calc(100% - ${diffHeight}px)`,
          overflow: uiStore.settings.fixNav
            ? 'hidden auto'
            : undefined,
        }"
      >
        <a-layout-content>
          <TheMain ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }" />
        </a-layout-content>
        <a-layout-footer
          v-if="uiStore.settings.showFoot"
          :style="{ height: `${footHeight}px` }"
        >
          <TheFoot hw-full />
        </a-layout-footer>
      </a-layout>
      <TheSettings v-if="uiStore.settings.showAppSettings" />
    </a-layout>
    <BackTop :target-container="backTopTarget" />
  </a-layout>
</template>
