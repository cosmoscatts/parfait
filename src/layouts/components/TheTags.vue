<script setup lang="ts">
import { IconCloseCircle, IconRefresh } from '@arco-design/web-vue/es/icon'
import TagButtonDefault from '../widgets/TagButtonDefault.vue'

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
function refresh(idx: number) {
  const tag = tags[idx]
  if (!tag)
    return
  const { fullPath } = tag
  nextTick(() => {
    router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}
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
function closeOthers(idx: number) {
  if (tags.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }
  const tag = tags[idx]
  if (!tag)
    return
  const { fullPath } = tag
  router.push(fullPath!)
  // FIXME: add move to current tag
  tagsStore.removerOthers(tag)
}
</script>

<template>
  <div flex="~ gap2" class="px-1.8" relative of="x-auto y-hidden">
    <div
      v-for="{ title, path, query }, idx in tags" :key="idx"
      h-26px lh-26px wa my-7px p-0 inline-block cursor-pointer
    >
      <a-dropdown trigger="contextMenu" position="bl">
        <RouterLink
          :to="{ path, query }"
        >
          <TagButtonDefault :title="title" :is-active="isActive(path)">
            <template #close>
              <span
                icon-btn ml-1
                i-ri-close-fill hover="i-carbon-close-filled !text-[rgb(var(--primary-6))]"
                @click.prevent="closeTag(idx)"
              />
            </template>
          </TagButtonDefault>
        </RouterLink>
        <template #content>
          <a-doption @click="refresh(idx)">
            <template #icon>
              <icon-refresh />
            </template>
            刷新当前
          </a-doption>
          <a-doption @click="closeOthers(idx)">
            <template #icon>
              <icon-close-circle />
            </template>
            关闭其他
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar:horizontal {
  height: 6px;
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
