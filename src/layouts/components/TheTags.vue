<script setup lang="ts">
import { IconCloseCircle, IconRefresh } from '@arco-design/web-vue/es/icon'

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
function refresh(idx: number) {

}
function closeOthers(idx: number) {

}
</script>

<template>
  <div flex="~ gap2" px-3 relative of="x-auto y-hidden">
    <div
      v-for="{ title, path, fullPath, query }, idx in tags" :key="idx"
      h-26px lh-26px wa
      my-4px p="y0 x-2"
      inline-block cursor-pointer
      bg="[#4FC08D]" text="white 12px"
    >
      <a-dropdown trigger="contextMenu" position="bl">
        <RouterLink
          :to="{ path, query, fullPath }"
        >
          <span flex justify-center items-center>
            <span v-if="isActive(path)" i-carbon-dot-mark />
            {{ title }}
            <span icon-btn i-carbon-close-filled ml-1 />
          </span>
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
