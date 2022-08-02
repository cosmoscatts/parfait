<script setup lang="ts">
const {
  data = [],
  type = 'notification',
} = defineProps<{
  data?: any[]
  type?: string
}>()

const useDayJs = dayJs
const iconMap: { [key: string]: string } = {
  notification: 'i-carbon-chat',
  message: 'i-carbon-user',
  todo: 'i-carbon-checkbox-checked',
}
</script>

<template>
  <a-list :max-height="360" w-full h-360px cursor-pointer>
    <a-list-item v-for="{ title, date }, idx in data" :key="idx" hover="bg-[var(--color-bg-3)]">
      <a-list-item-meta
        :title="title"
        :description="useDayJs(date).format('YYYY-MM-DD HH:mm:ss')"
      >
        <template #avatar>
          <div :class="iconMap[type]" text="36px ![rgb(var(--primary-6))]" />
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
