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
import { appMeta } from '~/config'

const { baseSettings } = storeToRefs(useAppStore())

// 判断是否为垂直布局
const isVerticalLayout = computed(() => {
  return baseSettings.value?.layout === 'vertical'
})
</script>

<template>
  <div flex-center pr-5 border-b="1px solid [var(--color-border)]">
    <Logo v-if="!isVerticalLayout" />
    <NavCollapsedToggle v-if="isVerticalLayout" />
    <NavBreadcrumb v-if="isVerticalLayout" mx-4 />
    <Menu v-if="!isVerticalLayout" mx-4 />
    <div flex-auto />
    <div flex-y-center>
      <a
        icon-btn text-lg i-carbon-logo-github mr-4
        :href="appMeta.github"
        target="_blank" title="GitHub"
      />
      <NavBell mr-4 />
      <NavFullScreen mr-4 />
      <DarkToggle mr-4 />
      <NavAvatar />
    </div>
  </div>
</template>
