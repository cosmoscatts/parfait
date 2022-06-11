<script setup lang="ts">
const logo = ''
const title = 'Parfait'
const { collapse, siderWidth } = storeToRefs(useCollapseStore())
</script>

<template>
  <div h-50px :width="`${siderWidth}px`" flex justify-center items-center>
    <img :src="logo" alt="">
    <h1 v-if="!collapse" text-lg>
      {{ title }}
    </h1>
  </div>
</template>
