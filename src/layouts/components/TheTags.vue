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
      inline-block bg-green
      cursor-pointer
    >
      <RouterLink
        :to="{ path, query, fullPath }"
      >
        <span flex justify-center items-center text-white>
          {{ title }}
          <span icon-btn text-sm ml-1 i-carbon-close-filled hover="bg-gray:80" />
        </span>
      </RouterLink>
    </div>
  </div>
</template>
-100px
