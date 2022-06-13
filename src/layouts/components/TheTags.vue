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
const visible = ref(false)
const left = ref(0)
const top = ref(0)
</script>

<template>
  <div of="x-auto y-hidden" flex="~ gap2" px-3>
    <div
      v-for="{ title, path, fullPath, query }, idx in tags" :key="idx"
      h-26px lh-26px wa
      my-4px p="y0 x-2"
      inline-block cursor-pointer
      bg="[#4FC08D]" text="white 12px"
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
    <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px` }" class="contextmenu">
      <li>
        刷新当前
      </li>
      <li>
        关闭其他
      </li>
    </ul>
  </div>
</template>
