<script setup lang="ts">
import type { BellData, BellDataType } from './interfaces'

const {
  data = [],
  type = 'notification',
} = defineProps<{
  data?: BellData[]
  type?: BellDataType
}>()

const iconMap: { [key: string]: string } = {
  notification: 'i-carbon-chat',
  message: 'i-carbon-user',
  todo: 'i-carbon-checkbox-checked',
}
</script>

<template>
  <a-list :max-height="360" wfull h360px cursor-pointer>
    <a-list-item
      v-for="{ title, date }, idx in data"
      :key="idx"
      hover="bg-[var(--color-bg-3)]"
    >
      <a-list-item-meta
        :title="title"
        :description="formatDate(date)"
      >
        <template #avatar>
          <div :class="iconMap[type]" text="36px primary" />
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
