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
  collapsedWidth: 32,
  defaultSelectedKeys: [],
  breakpoint: 'xl',
  metadata: menus,
}
</script>

<template>
  <div flex="~ col justify-center overflow-hidden">
    <Logo />
    <Menu v-bind="menuProps" />
  </div>
</template>
