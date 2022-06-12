<script setup lang="ts">
import Logo from '../widgets/Logo.vue'
import Menu from '../widgets/Menu.vue'
import { menus } from '~/menus'

const menuProps = {
  mode: 'vertical',
  autoOpen: false,
  defaultCollapsed: false,
  showCollapseButton: false,
  accordion: true,
  collapsedWidth: 50,
  defaultSelectedKeys: [],
  breakpoint: 'xl',
  metadata: menus,
}
const iconMap: Record<string, string> = {
  home: 'i-carbon-home',
  user: 'i-carbon-user',
}
</script>

<template>
  <div flex="~ col justify-center of-hidden">
    <Logo />
    <Menu v-bind="menuProps" :icon-map="iconMap" />
  </div>
</template>
