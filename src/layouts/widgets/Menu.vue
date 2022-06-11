<script setup lang="ts">
import type { Menu } from '~/types'

// https://arco.design/vue/component/menu#API
const {
  mode = 'vertical',
  autoOpen = false,
  defaultCollapsed = false,
  showCollapseButton = false,
  accordion = true,
  collapsedWidth = undefined,
  defaultSelectedKeys = [],
  breakpoint = 'xl',
  metadata = [],
} = defineProps<{
  mode?: 'vertical' | 'horizontal' | 'pop' | 'popButton'
  autoOpen?: boolean
  defaultCollapsed?: boolean
  showCollapseButton?: boolean
  accordion?: boolean
  collapsedWidth?: number
  defaultSelectedKeys: number[] | string[]
  breakpoint?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  metadata?: Menu[]
}>()
</script>

<template>
  <div
    flex justify-center
    h-full w-full
    bg-transparent
    overflow-hidden
  >
    <a-menu
      theme="dark"
      :mode="mode"
      :auto-open="autoOpen"
      :default-collapsed="defaultCollapsed"
      :show-collapse-button="showCollapseButton"
      :accordion="accordion"
      :collapsed-width="collapsedWidth"
      :default-selected-keys="defaultSelectedKeys"
      :breakpoint="breakpoint"
    >
      <template v-for="{ id, title, icon, path, children }, idx of metadata">
        <template v-if="children?.length">
          <a-sub-menu :key="String(id)">
            <template #icon>
              <icon :class="icon" />
            </template>
            <template #title>
              {{ title }}
            </template>
            <RouterLink
              v-for="{ id, title, path }, sonIdx of children"
              :key="`${idx}_${sonIdx}`"
              :to="path"
            >
              <a-menu-item :key="String(id)">
                {{ title }}
              </a-menu-item>
            </RouterLink>
          </a-sub-menu>
        </template>
        <template v-else>
          <RouterLink :key="idx" :to="path">
            <a-menu-item :key="String(id)">
              <template #icon>
                <span :class="icon" color="black dark:white" />
              </template>
              {{ title }}
            </a-menu-item>
          </RouterLink>
        </template>
      </template>
    </a-menu>
  </div>
</template>

