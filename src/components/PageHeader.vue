<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { IconStamp } from '@arco-design/web-vue/es/icon'

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
    :show-back="false"
    :style="{ padding: '0px' }"
  >
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="title of data" :key="title">
          <IconStamp mr1 />
          {{ title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-page-header>
</template>

<style scoped>
:deep(.arco-page-header-header) {
  height: 0px;
}
</style>
