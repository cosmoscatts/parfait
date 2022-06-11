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

const menuHeight = computed(() => {
  return 'calc(100% - 50px)'
})
</script>

<template>
  <div h-full overflow-hidden bg-gray>
    <Logo />
    <div :style="{ height: `${menuHeight}` }">
      <Menu v-bind="menuProps" />
    </div>
  </div>
</template>
