<script setup lang="ts">
const {
  name = '',
  modelValue,
  options = [],
  disabled = false,
} = defineProps<{
  name?: string
  modelValue: string
  options: {
    label: string
    value: string
  }[]
  disabled?: boolean
}>()

const emits = defineEmits(['update:model-value'])

function onChange(value: any) {
  emits('update:model-value', value)
}
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
      @change="onChange"
    />
  </div>
</template>
