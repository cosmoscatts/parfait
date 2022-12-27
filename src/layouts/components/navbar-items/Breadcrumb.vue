<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { IconBookmark } from '@arco-design/web-vue/es/icon'

let metadata = $ref<string[]>([])

const route = useRoute()

/**
 * 从路由获取面包屑数据
 */
function getBreadCrumbs() {
  metadata = []
  const matched = route.matched.filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length)
    return
  metadata = matched.map(i => i.meta.title as string)
}
getBreadCrumbs()

// 当路由发生改变时，重新生成面包屑
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
    :max-count="3"
    separator=">"
  >
    <a-breadcrumb-item v-for="title of metadata" :key="title">
      <IconBookmark />
      {{ title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
