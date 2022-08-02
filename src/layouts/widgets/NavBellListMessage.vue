<script setup lang="ts">
import type { Component } from 'vue'

const {
  data = [],
  type = 'notification',
  iconMap = {},
} = defineProps<{
  data?: any[]
  type?: string
  iconMap?: { [key: string]: Component }
}>()

const useDayJs = dayJs
</script>

<template>
  <a-list :max-height="360" w-full h-360px>
    <a-list-item v-for="{ title, date }, idx in data" :key="idx">
      <a-list-item-meta
        :title="title"
        :description="useDayJs(date).format('YYYY-MM-DD HH:mm:ss')"
      >
        <template #avatar>
          <Component :is="iconMap[type]" :size="50" text="![rgb(var(--primary-6))]" />
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
