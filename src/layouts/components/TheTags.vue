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
</script>

<template>
  <div
    flex="~ gap2" class="px-1.8" relative of="x-auto y-hidden"
    :class="[tagButtonShape === 'default' ? 'flex items-center' : 'flex items-end']"
  >
    <div
      v-for="{ title, path, query }, idx in tags" :key="idx"
      h-26px lh-26px wa flex-inline items-center cursor-pointer
      :class="{ 'ha max-h-full': tagButtonShape !== 'default' }"
    >
      <a-dropdown trigger="contextMenu" position="bl">
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
</template>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar:horizontal {
  height: 4px;
}
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
  background: var(--c-bg);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--c-scrollbar);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--c-scrollbar-hover);
}
</style>
