<script setup lang="ts">
import TagButtonDefault from '../widgets/TagButtonDefault.vue'
import TagButtonChrome from '../widgets/TagButtonChrome.vue'
import TagContextMenu from '../widgets/TagContextMenu.vue'

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
function isActive(path?: string) {
  if (!path)
    return false
  if (route.path.startsWith('/redirect'))
    return `/redirect${path}` === route.path
  return path === route.path
}
const router = useRouter()
function closeTag(idx: number) {
  if (tags.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }
  const tag = tags[idx]
  if (!tag)
    return
  tagsStore.removeTag(tag).then(() => {
    // close the current tag that is show
    if (tag.path === route.path) {
      // find the latest
      const latest = tags.slice(-1)[0]
      const path = latest
        ? latest.fullPath!
        : '/'
      router.push(path)
    }
  })
}

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
        >
          <a-dropdown trigger="contextMenu" position="br">
            <RouterLink
              :to="{ path, query }"
            >
              <TagButtonDefault v-if="tagButtonShape === 'default'" :title="title" :is-active="isActive(path)">
                <template #close>
                  <span
                    i-ri-close-fill hover="i-carbon-close-filled" ml-1
                    @click.prevent="closeTag(idx)"
                  />
                </template>
              </TagButtonDefault>
              <TagButtonChrome v-else :title="title" :is-active="isActive(path)" :is-last="idx === tags.length - 1">
                <template #close>
                  <span
                    i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
                    :class="{ '!text-[rgb(var(--primary-6))]': isActive(path) }"
                    @click.prevent="closeTag(idx)"
                  />
                </template>
              </TagButtonChrome>
            </RouterLink>
            <template #content>
              <TagContextMenu
                :index="idx"
                :tags="tags"
                :has-left-tags="tags.length > 1 && idx > 0"
                :has-right-tags="tags.length > 1 && idx < tags.length - 1"
              />
            </template>
          </a-dropdown>
        </div>
      </div>
    </ScrollWrapper>
  </div>
</template>
