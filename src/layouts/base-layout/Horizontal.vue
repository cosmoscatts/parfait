<script setup lang="ts">
import {
  BackTop,
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheTabs,
} from '../components'
import { APP_LAYOUT_PARAMS } from '~/config'

const {
  navHeight,
  tabHeight,
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
  <a-layout
    id="main-wrapper"
    ref="refMainWrapper"
    hw-screen bg-body
    of="x-hidden y-auto"
  >
    <a-layout-header
      bg-nav
      :class="uiStore.settings.fixNav
        ? 'fixed top-0 right-0 w-full'
        : ''"
    >
      <TheNav w-full :style="{ height: `${navHeight}px` }" />
      <TheTabs v-show="uiStore.settings.showTabs" w-full :style="{ height: `${tabHeight}px` }" />
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
        <TheMain ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }">
          <PageHeader mb10px />
        </TheMain>
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
</template>
