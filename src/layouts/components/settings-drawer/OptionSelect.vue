<script setup lang="ts">
defineProps<{
  name?: string
  modelValue: string
  options: {
    label: string
    value: string
  }[]
  disabled?: boolean
}>()
defineEmits(['update:model-value'])
</script>

<template>
  <div flex-y-center justify-between my-3>
    <span>
      {{ name }}
    </span>
    <a-select
      class="!w-120px"
      :placeholder="name"
      :model-value="modelValue"
      :options="options"
      :disabled="disabled"
      @change="(value) => $emit('update:model-value', value)"
    />
  </div>
</template>
