<script setup lang="ts">
import {
  IconArrowLeft,
  IconArrowRight,
  IconCloseCircle,
  IconRefresh,
} from '@arco-design/web-vue/es/icon'
import type { Tab } from '~/types'

const {
  index = -1,
  tabs = [],
  hasLeftTabs = true,
  hasRightTabs = true,
} = defineProps<{
  /** 多页签索引 */
  index?: number
  /** 多页签 */
  tabs?: Tab[]
  /** 是否存在左侧多页签 */
  hasLeftTabs?: boolean
  /** 是否存在右侧多页签 */
  hasRightTabs?: boolean
}>()

const router = useRouter()
const { removerOtherTabs, removeTabsByList } = useTabStore()

/**
 * 刷新当前
 */
function handleRefresh() {
  const currentTab = tabs[index]
  if (!currentTab)
    return
  const { path } = currentTab
  nextTick(() => {
    router.replace({
      path: `/redirect${path}`,
    })
  })
}

/**
 * 关闭当前标签左侧的多页签
 */
function handleCloseLeft() {
  if (!hasLeftTabs)
    return
  const currentTab = tabs[index]
  if (!currentTab)
    return
  const { path } = currentTab
  router.push(path)
  removeTabsByList(tabs.slice(0, index) || [])
}

/**
 * 关闭当前标签右侧的多页签
 */
function handleCloseRight() {
  if (!hasRightTabs)
    return
  const currentTab = tabs[index]
  if (!currentTab)
    return
  const { path } = currentTab
  router.push(path)
  removeTabsByList(tabs.slice(index + 1) || [])
}

/**
 * 关闭当前标签之外的所有多页签
 */
function handleCloseOthers() {
  // 至少有一个多页签
  if (tabs.length === 1)
    return
  const currentTab = tabs[index]
  if (!currentTab)
    return
  const { path } = currentTab
  router.push(path)
  removerOtherTabs(currentTab)
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
