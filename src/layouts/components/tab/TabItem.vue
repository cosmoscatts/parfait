<script setup lang="ts">
import {
  TabButton,
  TabChrome,
  TabContextMenu,
} from './components'
import type { Tab } from '~/types'

const {
  index = -1,
  title = '',
  path = '/',
  tabs = [],
  isChromeTab = true,
} = defineProps<{
  /** 多页签索引 */
  index?: number
  /** 多页签标题 */
  title?: string
  /** 多页签路由 */
  path?: string
  /** 多页签 */
  tabs?: Tab[]
  /** 是否为谷歌风格 */
  isChromeTab?: boolean
}>()

const route = useRoute()
const router = useRouter()

const { removeOneTab } = useTabStore()

/**
 * 是否为当前路由
 */
function isActive(path?: string) {
  if (!path)
    return false
  if (route.path.startsWith('/redirect'))
    return `/redirect${path}` === route.path
  return path === route.path
}

/**
 * 关闭多页签
 */
function handleCloseTab() {
  if (tabs.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }

  const currentTab = tabs[index]
  if (!currentTab)
    return

  removeOneTab(currentTab).then(() => {
    if (currentTab.path === route.path) {
      // 找到最后一个多页签
      const latest = tabs.slice(-1)[0]
      const path = latest
        ? latest.path
        : '/'
      router.push(path)
    }
  })
}
</script>

<template>
  <a-dropdown trigger="contextMenu" position="br">
    <RouterLink
      :to="{ path }"
    >
      <TabButton
        v-if="!isChromeTab"
        v-bind="{
          title,
          isActive: isActive(path),
        }"
      >
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="handleCloseTab"
          />
        </template>
      </TabButton>

      <TabChrome
        v-else
        v-bind="{
          title,
          isActive: isActive(path),
          isLast: index === tabs.length - 1,
        }"
      >
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': isActive(path) }"
            @click.prevent="handleCloseTab"
          />
        </template>
      </TabChrome>
    </RouterLink>

    <template #content>
      <TabContextMenu
        v-bind="{
          index,
          tabs,
          hasLeftTabs: tabs.length > 1 && index > 0,
          hasRightTabs: tabs.length > 1 && index < tabs.length - 1,
        }"
      />
    </template>
  </a-dropdown>
</template>
