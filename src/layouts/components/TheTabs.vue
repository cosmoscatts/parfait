<script setup lang="ts">
import TabItem from './tab'
import type { Tab } from '~/types'

const route = useRoute()

const tabStore = useTabStore()
const { addOneTab } = tabStore
const { baseSettings } = storeToRefs(useAppStore())

// 多页签风格是否为谷歌风格
const isChromeTabShapeStyle = computed(() => {
  return baseSettings.value.tabShapeStyle === 'chrome'
})

// 所有的多页签
const tabs = $computed(() => {
  return tabStore.visitedTabs || []
})

/**
 * 添加多页签
 */
function addTab() {
  const { name, path, meta: { title, cached } } = route
  if ([title, path].some(i => !i))
    return
  addOneTab({
    path,
    name,
    title,
    cached,
  } as Tab)
}
addTab()
watch(
  () => route.path,
  addTab,
)

const refTab = ref()
const refContainer = ref()
const refScrollWrapper = ref()

const { width: refContainerWidth, left: refContainerLeft } = useElementBounding(refContainer)

// 当前显示的 `tab` 索引
const activeTabIndex = computed(() => {
  const redirectPrefix = '/redirect'
  const activePath = route.path.startsWith(redirectPrefix)
    ? route.path.substring(redirectPrefix.length)
    : route.path
  return tabs.findIndex(i => i.path === activePath) || -1
})

async function getActiveTabClientX() {
  await nextTick()
  if (refTab.value && refTab.value?.children?.length && refTab.value.children[activeTabIndex.value]) {
    const activeTagEl = refTab.value.children[activeTabIndex.value]
    const { x, width } = activeTagEl.getBoundingClientRect()
    const clientX = x + width / 2
    useTimeoutFn(() => {
      handleScroll(clientX)
    }, 50)
  }
}

function handleScroll(clientX: number) {
  const currentX = clientX - refContainerLeft.value
  const deltaX = currentX - refContainerWidth.value / 2
  if (refScrollWrapper.value) {
    const { maxScrollX, x: leftX } = refScrollWrapper.value.instance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    refScrollWrapper.value?.instance.scrollBy(update, 0, 300)
  }
}

watch(
  activeTabIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    ref="refContainer"
    of-hidden mx="[0.5rem]"
    :style="{ width: 'calc(100% - 1rem)' }"
  >
    <ScrollWrapper ref="refScrollWrapper" :options="{ scrollX: true, scrollY: false, click: true }">
      <div
        ref="refTab" h-full
        :class="[
          isChromeTabShapeStyle
            ? 'flex items-end pr-7'
            : 'flex !items-center gap-x-2 mt-1px',
        ]"
      >
        <div
          v-for="{ title, path }, index in tabs" :key="path"
          flex-inline items-center
          h-26px lh-26px wa cursor-pointer
          :class="{ 'ha max-h-full': isChromeTabShapeStyle }"
        >
          <TabItem
            v-bind="{
              index,
              title,
              path,
              tabs,
              isChromeTab: isChromeTabShapeStyle,
            }"
          />
        </div>
      </div>
    </ScrollWrapper>
  </div>
</template>
