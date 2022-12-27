<script setup lang="ts">
import TabButton from './TabButton.vue'
import TabChrome from './TabChrome.vue'
import TabContextMenu from './TabContextMenu.vue'
import type { Tab } from '~/types'

const {
  index,
  title,
  path,
  tabs,
  chrome,
  active,
} = defineProps<{
  index: number
  title: string
  path: string
  tabs: Tab[]
  chrome: boolean
  active: boolean
}>()

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

function handleCloseTab() {
  if (tabs.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }
  const currentTab = tabs[index]
  if (!currentTab) return
  tabStore
    .removeOneTab(currentTab)
    .then(() => {
      if (currentTab.path === route.path) {
        const latest = tabs.slice(-1)[0] // 找到最后一个
        router.push(latest?.path ?? '/')
      }
    })
}
</script>

<template>
  <a-dropdown trigger="contextMenu" position="br">
    <RouterLink :to="{ path }">
      <TabButton v-if="!chrome" v-bind="{ title, active }">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="handleCloseTab"
          />
        </template>
      </TabButton>

      <TabChrome v-else v-bind="{ title, active, last: index === tabs.length - 1 }">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': active }"
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
