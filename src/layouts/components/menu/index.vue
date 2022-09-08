<script setup lang="ts">
import type { Component } from 'vue'
import { appLayoutParams } from '~/config'
import type { Menu } from '~/types'

interface MenuOption {
  key: string
  title: string
  path?: string
  icon?: Component
  children?: MenuOption[]
}

// 菜单折叠后宽度（垂直布局）
const { sideCollapsedWidth } = appLayoutParams

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)

const permissionStore = usePermissionStore()
const { appMenus, menuIconMap } = storeToRefs(permissionStore)

/**
 * 将菜单项转换成 `<NMenu>` 组件需要的格式
 */
function generateMenuOption(menuItem: Menu): MenuOption {
  const { value: iconMap } = menuIconMap
  const { id, title, icon, path, children } = menuItem
  return {
    key: String(id),
    title,
    path,
    icon: icon && iconMap[icon]
      ? iconMap[icon]
      : undefined,
    children: children?.map((child: Menu) => generateMenuOption(child)) || undefined,
  }
}

const menuOptions = computed<MenuOption[]>(() => {
  const { value: menus } = appMenus
  return menus.map(i => generateMenuOption(i)) || []
})

const route = useRoute()

// 默认选中的 `menu option`
const defaultSelectedMenuOptionKey = computed(() => {
  const allMenuOptions = menuOptions.value.flatMap((i) => {
    return i.children
      ? [i, ...i.children]
      : [i]
  })
  return allMenuOptions.find(i => i.path === route.path)?.key || undefined
})
</script>

<template>
  <div
    flex-x-center
    hw-full
    bg-transparent of-hidden
    :class="baseSettings.layout === 'horizontal' ? 'items-center' : ''"
  >
    <a-menu
      :mode="baseSettings.layout"
      :auto-open="false"
      :accordion="true"
      :selected-keys="defaultSelectedMenuOptionKey"
      :collapsed="menuCollapsed"
      :collapsed-width="sideCollapsedWidth"
      breakpoint="lg"
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
            <a-menu-item :key="path">
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

