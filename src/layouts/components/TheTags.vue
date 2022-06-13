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
</script>

<template>
  <div of="x-auto y-hidden" flex="~ gap2" px-3>
    <div
      v-for="{ title, path, fullPath, query }, idx in tags" :key="idx"
      h-26px lh-26px wa
      my-4px p="y0 x-3"
      inline-block cursor-pointer
      bg="emerald-300 dark:[#4FC08D]"
    >
      <RouterLink
        :to="{ path, query, fullPath }"
      >
        <span flex justify-center items-center op-80>
          {{ title }}
          <span icon-btn i-carbon-close-filled ml-1 color-white />
        </span>
      </RouterLink>
    </div>
  </div>
</template>
