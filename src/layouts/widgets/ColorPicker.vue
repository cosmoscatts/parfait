<script setup lang="ts">
import { getColorMap } from '~/utils'

const {
  colorName = 'arcoblue',
} = defineProps<{
  colorName?: string
}>()
const emit = defineEmits(['update:colorName'])
const { colorMap } = getColorMap()
function onChange(val: any) {
  emit('update:colorName', val)
}
</script>

<template>
  <a-radio-group
    :model-value="colorName" flex="~ wrap"
    mt-2 border="1 gray300 dark:gray600" rounded py-2
    @change="onChange"
  >
    <a-radio
      v-for="[k, { name, value }] of Object.entries(colorMap)"
      :key="k" :value="k" m="t-1 l-4"
    >
      <div w-12px h-12px rounded-sm flex-inline mr-1 :style="{ background: value }" />
      <span class="!text-sm">{{ name }}</span>
    </a-radio>
  </a-radio-group>
</template>

<style>

</style>
