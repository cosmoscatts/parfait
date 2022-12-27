<script setup lang="ts">
defineProps<{
  name?: string
  modelValue: boolean
  disabled?: boolean
}>()
defineEmits(['update:model-value'])

const SWITCH_COLOR = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
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
      @change="(value) => $emit('update:model-value', value)"
    />
  </div>
</template>
