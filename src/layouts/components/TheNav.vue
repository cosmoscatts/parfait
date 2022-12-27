<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from './Menu.vue'
import {
  Avatar,
  Bell,
  CollapsedToggle,
  FullScreen,
} from './navbar-items'
import { APP_META, APP_SETTINGS } from '~/config'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
</script>

<template>
  <div flex-center pr-5 border-b="1px solid [var(--color-border)]">
    <Logo v-if="!isVertical || isMobile" />
    <CollapsedToggle v-if="isVertical" ml4 />
    <Menu v-if="!isVertical" mx4 />
    <div flex-auto />
    <div flex-y-center>
      <a
        icon-btn text-lg i-ri-github-line mr4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <Bell mr4 />
      <FullScreen mr4 />
      <DarkToggle mr4 />
      <TheSettings v-if="APP_SETTINGS.showAppSettings" mr4 />
      <Avatar />
    </div>
  </div>
</template>
