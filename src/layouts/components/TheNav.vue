<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from './Menu.vue'
import {
  Avatar,
  Bell,
  FullScreen,
  ResponsivePanel,
} from './navbar-items'
import { APP_META, APP_LAYOUT_PARAMS as PARAMS } from '~/config'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
const logoWidth = computed(() => (isPC.value && !isVertical.value)
  ? PARAMS.sideWidth
  : PARAMS.sideCollapsedWidth,
)
</script>

<template>
  <div flex-center pr-5 border-b="1px solid [var(--color-border)]">
    <Logo v-if="!isVertical || isMobile" :style="{ width: `${logoWidth}px` }" />
    <Menu v-if="!isVertical && isPC" mx4 />
    <PageHeader v-if="isVertical && isPC" mt3px />
    <div flex-auto />
    <div v-if="isPC" flex-y-center>
      <a
        icon-btn text-lg i-ri-github-line mr4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <Bell mr4 />
      <FullScreen mr4 />
      <DarkToggle mr4 />
      <Avatar />
    </div>
    <div v-else flex-y-center>
      <ResponsivePanel />
    </div>
  </div>
</template>
