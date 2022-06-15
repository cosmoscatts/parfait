<script setup lang="ts">
import TagAction from '../widgets/TagAction.vue'
import type { Tag } from '~/types'

const tagsStore = useTagsStore()
const tags = $computed(() => {
  return tagsStore.visitedPages
})
const route = useRoute()
function addTag() {
  const { name, meta: { title }, path, fullPath, query } = route
  if ([title, path, fullPath].some(i => !i))
    return
  tagsStore.addTag({
    name: name?.toString() || '',
    title: title as string,
    path,
    query,
    fullPath,
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

let visible = $ref(false)
let rClickEvent = $ref<MouseEvent>()
let selectedTag = $ref<Tag>()
/**
 * right click to open the menu
 */
function openActionMenu(idx: number, e: MouseEvent) {
  selectedTag = tags[idx]
  rClickEvent = e
  visible = true
}
</script>

<template>
  <div flex="~ gap2" px-3 relative>
    <div of="x-auto y-hidden">
      <div
        v-for="{ title, path, fullPath, query }, idx in tags" :key="idx"
        h-26px lh-26px wa
        my-4px p="y0 x-2"
        inline-block cursor-pointer
        bg="[#4FC08D]" text="white 12px"
        @contextmenu.prevent="openActionMenu(idx, $event)"
      >
        <RouterLink
          :to="{ path, query, fullPath }"
        >
          <span flex justify-center items-center>
            <span v-if="isActive(path)" i-carbon-dot-mark />
            {{ title }}
            <span icon-btn i-carbon-close-filled ml-1 />
          </span>
        </RouterLink>
      </div>
    </div>
    <TagAction v-bind="{ visible, event: rClickEvent }" />
  </div>
</template>
