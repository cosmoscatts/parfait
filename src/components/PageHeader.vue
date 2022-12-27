<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { IconBookmark } from '@arco-design/web-vue/es/icon'

const route = useRoute()
let data = $ref<string[]>([])
const getBreadCrumbs = () => {
  const matched = route
    .matched
    .filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length) return
  data = matched.map(i => i.meta.title as string)
}
getBreadCrumbs()
watch(
  () => route.path,
  (path) => {
    if (!path.startsWith('/redirect/')) {
      getBreadCrumbs()
    }
  },
)
</script>

<template>
  <a-page-header
    :style="{ background: 'var(--color-bg-2)' }"
    :show-back="false"
  >
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="title of data" :key="title">
          <IconBookmark />
          {{ title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-page-header>
</template>
