<script setup lang="ts">
import { themeColorValueMap } from '~/config'

const {
  modelValue = 'arcoblue',
} = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:model-value'])
const onChange = <T extends string | number | boolean>(value: T) => {
  if (typeof value !== 'string') return
  emit('update:model-value', value)
}
</script>

<template>
  <a-radio-group
    :model-value="modelValue"
    flex="~ wrap"
    mt-2 p="l-5 y-2" rounded
    border="2 [var(--color-border)]"
    @change="onChange"
  >
    <a-radio
      v-for="[key, { name, value }] of Object.entries(themeColorValueMap)"
      :key="key" :value="key" m="t-1 l-4"
    >
      <div w-12px h-12px rounded-sm flex-inline mr-1 :style="{ background: value }" />
      <span class="!text-sm">{{ name }}</span>
    </a-radio>
  </a-radio-group>
</template>
