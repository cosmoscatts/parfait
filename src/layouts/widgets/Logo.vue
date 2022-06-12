<script setup lang="ts">
const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
const title = 'Parfait'
const { collapse } = storeToRefs(useCollapseStore())
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
watchEffect(() => {
  // when the screen width less than 1200px, hide the title
  hiddenTitle = width.value < 1200
})
</script>

<template>
  <div h-50px flex justify-center items-center>
    <img :src="logo" alt="" h-32px w-32px :class="collapse || hiddenTitle ? '' : 'mr-5'">
    <h1 v-if="!collapse && !hiddenTitle" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
