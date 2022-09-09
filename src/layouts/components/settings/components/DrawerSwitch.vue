<script setup lang="ts">
const {
  name = '',
  modelValue = true,
  disabled = false,
} = defineProps<{
  name?: string
  modelValue: boolean
  disabled?: boolean
}>()

const emits = defineEmits(['update:model-value'])

const SWITCH_COLOR = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}

function onChange(value: boolean) {
  emits('update:model-value', value)
}
</script>

<template>
  <div flex-y-center justify-between my-3>
    <span>
      {{ name }}
    </span>
    <a-switch
      type="round"
      :model-value="modelValue"
      :disabled="disabled"
      :checked-color="SWITCH_COLOR.checked"
      :unchecked-color="SWITCH_COLOR.unchecked"
      @change="onChange"
    />
  </div>
</template>

