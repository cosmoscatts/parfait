<script setup lang="ts">
const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
const title = 'Parfait'
const { collapse } = storeToRefs(useCollapseStore())
</script>

<template>
  <div h-50px flex justify-center items-center>
    <img :src="logo" alt="" h-32px w-32px :class="collapse ? '' : 'mr-5'">
    <h1 v-if="!collapse" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
