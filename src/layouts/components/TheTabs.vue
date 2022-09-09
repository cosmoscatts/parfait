<script setup lang="ts">
import TabItem from './tab'

const { tagButtonShape } = storeToRefs(useAppStore())

const tagsStore = useTagsStore()
const tags = $computed(() => {
  return tagsStore.visitedPages || []
})

const route = useRoute()
function addTag() {
  const { name, meta: { title, cached }, path, fullPath, query } = route
  if ([title, path, fullPath].some(i => !i))
    return
  tagsStore.addTag({
    path,
    query,
    fullPath,
    name: name?.toString() || '',
    title: title as string,
    cached: cached as boolean || false,
  })
}
addTag()
watch(() => route.path, () => {
  addTag()
})

const refWrapper = ref()
const refScroll = ref()
const refTag = ref()
const { width: refWrapperWidth, left: refWrapperLeft } = useElementBounding(refWrapper)
const activeTagIndex = computed(() => {
  const redirectPrefix = '/redirect'
  const activePath = route.path.startsWith(redirectPrefix)
    ? route.path.substring(redirectPrefix.length)
    : route.path
  return tags.findIndex(i => i.path === activePath) || -1
})

async function getActiveTabClientX() {
  await nextTick()
  if (refTag.value && refTag.value?.children?.length && refTag.value.children[activeTagIndex.value]) {
    const activeTagEl = refTag.value.children[activeTagIndex.value]
    const { x, width } = activeTagEl.getBoundingClientRect()
    const clientX = x + width / 2
    useTimeoutFn(() => {
      handleScroll(clientX)
    }, 50)
  }
}

function handleScroll(clientX: number) {
  const currentX = clientX - refWrapperLeft.value
  const deltaX = currentX - refWrapperWidth.value / 2
  if (refScroll.value) {
    const { maxScrollX, x: leftX } = refScroll.value.instance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    refScroll.value?.instance.scrollBy(update, 0, 300)
  }
}

watch(
  activeTagIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div ref="refWrapper" of-hidden mx-1rem style="width: calc(100% - 2rem);">
    <ScrollWrapper ref="refScroll" :options="{ scrollX: true, scrollY: false, click: true }">
      <div ref="refTag" h-full :class="[tagButtonShape === 'default' ? 'flex !items-center gap-x-2 mt-1px' : 'flex items-end pr-7']">
        <div
          v-for="{ title, path, query }, idx in tags" :key="idx"
          h-26px lh-26px wa flex-inline items-center cursor-pointer
          :class="{ 'ha max-h-full': tagButtonShape !== 'default' }"
        />
      </div>
    </ScrollWrapper>
  </div>
</template>
