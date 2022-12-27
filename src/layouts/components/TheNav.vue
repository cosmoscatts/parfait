<script setup lang="ts">
import Logo from './logo'
import Menu from './menu'
import {
  NavAvatar,
  NavBell,
  NavBreadcrumb,
  NavCollapsedToggle,
  NavFullScreen,
} from './nav'
import { APP_META } from '~/config'

const uiStore = useUiStore()

// 判断是否为垂直布局
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
</script>

<template>
  <div flex-center pr-5 border-b="1px solid [var(--color-border)]">
    <Logo v-if="!isVertical" />
    <NavCollapsedToggle v-if="isVertical" ml4 />
    <NavBreadcrumb v-if="isVertical" mx4 />
    <Menu v-if="!isVertical" mx4 />
    <div flex-auto />
    <div flex-y-center>
      <a
        icon-btn text-lg i-ri-github-line mr4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <NavBell mr4 />
      <NavFullScreen mr4 />
      <DarkToggle mr4 />
      <NavAvatar />
    </div>
  </div>
</template>
