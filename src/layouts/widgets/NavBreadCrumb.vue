<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'

const {
  maxCount = 3,
} = defineProps<{
  maxCount?: number
}>()
let metadata = $ref<string[]>()
const route = useRoute()
function getBreadCrumbs() {
  metadata = []
  const matched = route.matched.filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length)
    return
  metadata = matched.map(i => i.meta.title as string)
}
getBreadCrumbs()
watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/redirect/'))
      return
    getBreadCrumbs()
  },
)
</script>

<template>
  <a-breadcrumb
    v-if="metadata.length"
    :max-count="maxCount" op50
  >
    <template #separator>
      <div i-carbon-plane-private bg="black dark:white" />
    </template>
    <a-breadcrumb-item v-for="title, idx of metadata" :key="idx">
      {{ title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
