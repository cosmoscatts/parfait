<script setup lang="ts">
import type { Component } from 'vue'
import { APP_LAYOUT_PARAMS, APP_MENU } from '~/config'
import type { Menu } from '~/types'

interface MenuOption {
  key: string
  title: string
  path?: string
  icon?: Component
  children?: MenuOption[]
}

const { mode } = defineProps<{ mode?: 'vertical' | 'horizontal' }>()

const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const generateMenuOption = (menuItem: Menu): MenuOption => {
  const { iconMap } = APP_MENU
  const { id, title, icon, path, children } = menuItem
  return {
    key: String(id),
    title,
    path,
    icon: icon && iconMap[icon]
      ? iconMap[icon]
      : undefined,
    children: children?.map((child: Menu) => generateMenuOption(child)),
  }
}

const menuOptions = computed<MenuOption[]>(() => (
  authStore.menus.map(i => generateMenuOption(i))
))
const selectedKeys = computed(() => {
  const allOptions = menuOptions.value.flatMap((i) => {
    return i.children
      ? [i, ...i.children]
      : [i]
  })
  return allOptions.filter(i => i.path === route.path).map(j => j.key)
})
</script>

<template>
  <div
    flex-x-center hw-full bg-transparent of-hidden class="menu-demo"
    :class="uiStore.settings.layout === 'horizontal' ? 'items-center' : ''"
  >
    <a-menu
      :mode="mode ?? uiStore.settings.layout"
      :auto-open="true"
      :accordion="true"
      :selected-keys="selectedKeys"
      :collapsed="uiStore.collaspeSide.get()"
      :collapsed-width="APP_LAYOUT_PARAMS.sideMenuCollapsedWidth"
      auto-open-selected
      show-collapse-button
      breakpoint="lg"
      @collapse="uiStore.collaspeSide.toggle"
    >
      <template v-for="{ key, title, path, icon, children } of menuOptions">
        <template v-if="children?.length">
          <a-sub-menu :key="key">
            <template v-if="icon" #icon>
              <Component :is="icon" />
            </template>
            <template #title>
              {{ title }}
            </template>
            <RouterLink
              v-for="{ key: childKey, title: childTitle, path: childPath, icon: childIcon } of children"
              :key="childPath"
              :to="childPath!"
            >
              <a-menu-item :key="childKey">
                <template v-if="childIcon" #icon>
                  <Component :is="childIcon" />
                </template>
                {{ childTitle }}
              </a-menu-item>
            </RouterLink>
          </a-sub-menu>
        </template>
        <template v-else>
          <RouterLink :key="key" :to="path!">
            <a-menu-item :key="key">
              <template #icon>
                <Component :is="icon" />
              </template>
              {{ title }}
            </a-menu-item>
          </RouterLink>
        </template>
      </template>
    </a-menu>
  </div>
</template>
