<script setup lang="ts">
import {
  IconArrowLeft,
  IconArrowRight,
  IconCloseCircle,
  IconRefresh,
} from '@arco-design/web-vue/es/icon'
import type { Tab } from '~/types'

const {
  index,
  tabs,
  hasLeftTabs,
  hasRightTabs,
} = defineProps<{
  index: number
  tabs: Tab[]
  hasLeftTabs: boolean
  hasRightTabs: boolean
}>()

const router = useRouter()
const tabStore = useTabStore()

function handleRefresh() {
  const currentTab = tabs[index]
  if (!currentTab) return
  nextTick(() => router.replace({
    path: `/redirect${currentTab.path}`,
  }))
}

function handleCloseLeft() {
  const currentTab = tabs[index]
  if (!currentTab || !hasLeftTabs) return
  tabStore
    .removeListTabs(tabs.slice(0, index))
    .then(() => router.push(currentTab.path))
}

function handleCloseRight() {
  const currentTab = tabs[index]
  if (!currentTab || !hasRightTabs) return
  tabStore
    .removeListTabs(tabs.slice(index + 1))
    .then(() => router.push(currentTab.path))
}

function handleCloseOthers() {
  const currentTab = tabs[index]
  if (!currentTab) return
  tabStore
    .removeOtherTabs(currentTab)
    .then(() => router.push(currentTab.path))
}
</script>

<template>
  <a-doption @click="handleRefresh">
    <template #icon>
      <IconRefresh />
    </template>
    刷新当前
  </a-doption>
  <a-doption :disabled="!hasLeftTabs" @click="handleCloseLeft">
    <template #icon>
      <IconArrowLeft />
    </template>
    关闭左边
  </a-doption>
  <a-doption :disabled="!hasRightTabs" @click="handleCloseRight">
    <template #icon>
      <IconArrowRight />
    </template>
    关闭右边
  </a-doption>
  <a-doption :disabled="tabs.length <= 1" @click="handleCloseOthers">
    <template #icon>
      <IconCloseCircle />
    </template>
    关闭其他
  </a-doption>
</template>
