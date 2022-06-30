<script setup lang="ts">
// because unocss icons can not dynamic load
// https://github.com/unocss/unocss/issues/785
// here I prefer use arco icons
import { IconFile, IconHome, IconUser } from '@arco-design/web-vue/es/icon'
import type { Component } from 'vue'
import type { Menu } from '~/types'

// https://arco.design/vue/component/menu#API
const {
  mode = 'vertical',
  autoOpen = false,
  defaultCollapsed = false,
  showCollapseButton = false,
  accordion = true,
  collapsedWidth = 50,
  breakpoint = 'xl',
  metadata = [],
} = defineProps<{
  mode?: 'vertical' | 'horizontal' | 'pop' | 'popButton'
  autoOpen?: boolean
  defaultCollapsed?: boolean
  showCollapseButton?: boolean
  accordion?: boolean
  collapsedWidth?: number
  breakpoint?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  metadata?: Menu[]
}>()

const iconMap: Record<string, Component> = {
  home: IconHome,
  user: IconUser,
  file: IconFile,
}
const isVertical = computed(() => {
  return mode === 'vertical'
})
const { width } = useWindowSize()
const { layout } = storeToRefs(useAppStore())
const reactCollapseWidth = computed(() => {
  return layout.value === 'vertical'
    ? collapsedWidth
    : width.value * 0.75
})
const appStore = useAppStore()
const collapsed = computed(() => {
  return layout.value === 'vertical'
    ? appStore.menuCollapsed
    : false
})
const route = useRoute()
const selectedKeys = computed(() => {
  const matched = route.matched || []
  return matched.map(i => i?.path || '')
    .filter(i => i !== '')
})
</script>

<template>
  <div
    flex justify-center
    h-full w-full
    bg-transparent of-hidden
    :class="!isVertical ? 'items-center' : ''"
  >
    <a-menu
      :mode="mode"
      :auto-open="autoOpen"
      :collapsed="collapsed"
      :default-collapsed="defaultCollapsed"
      :show-collapse-button="showCollapseButton"
      :accordion="accordion"
      :collapsed-width="reactCollapseWidth"
      :selected-keys="selectedKeys"
      :breakpoint="breakpoint"
    >
      <template v-for="{ title, icon, path, children }, idx of metadata">
        <template v-if="children?.length">
          <a-sub-menu :key="path || title">
            <template #icon>
              <Component :is="iconMap[icon!]" />
            </template>
            <template #title>
              {{ title }}
            </template>
            <RouterLink
              v-for="{ title, path }, sonIdx of children"
              :key="`${idx}_${sonIdx}`"
              :to="path!"
            >
              <a-menu-item :key="path">
                {{ title }}
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

