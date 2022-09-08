<script setup lang="ts">
import { appLayoutParams } from '~/config'
import type { Menu } from '~/types'

// 菜单折叠后宽度（垂直布局）
const { sideCollapsedWidth } = appLayoutParams

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)

const permissionStore = usePermissionStore()
const { appMenus, menuIconMap } = storeToRefs(permissionStore)

const route = useRoute()
const selectedKeys = computed(() => {
  const matched = route.matched || []
  return matched.map(i => i?.path || '')
    .filter(i => i !== '')
})

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
    flex justify-center
    h-full w-full
    bg-transparent of-hidden
    :class="baseSettings.layout === 'horizontal' ? 'items-center' : ''"
  >
    <a-menu
      :mode="baseSettings.layout"
      :auto-open="false"
      :accordion="true"
      :selected-keys="selectedKeys"
      :collapsed="menuCollapsed"
      :collapsed-width="sideCollapsedWidth"
      breakpoint="lg"
    >
      <template v-for="{ title, icon, path, children }, idx of appMenus">
        <template v-if="children?.length">
          <a-sub-menu :key="path || title">
            <template #icon>
              <Component :is="iconMap[icon!]" />
            </template>
            <template #title>
              {{ title }}
            </template>
            <RouterLink
              v-for="{ title: childTitle, path: childPath }, childIdx of children"
              :key="`${idx}_${childIdx}`"
              :to="childPath!"
            >
              <a-menu-item :key="childPath">
                {{ childTitle }}
              </a-menu-item>
            </RouterLink>
          </a-sub-menu>
        </template>
        <template v-else>
          <RouterLink :key="idx" :to="path!">
            <a-menu-item :key="path">
              <template #icon>
                <Component :is="iconMap[icon!]" />
              </template>
              {{ title }}
            </a-menu-item>
          </RouterLink>
        </template>
      </template>
    </a-menu>
  </div>
</template>

