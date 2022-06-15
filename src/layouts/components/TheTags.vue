<script setup lang="ts">
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
      <a-trigger trigger="contextMenu" align-point :popup-translate="[50, 10]">
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
          <ul
            box-border p-4 text-sm border="3 green6 rounded-md"
            bg="white dark:[#373739]" list-none
          >
            <li @click="refresh(idx)">
              刷新当前
            </li>
            <li @click="closeOthers(idx)">
              关闭其他
            </li>
          </ul>
        </template>
      </a-trigger>
    </div>
  </div>
</template>
