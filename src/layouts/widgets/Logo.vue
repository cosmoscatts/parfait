<script setup lang="ts">
const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
const title = 'Parfait'
const collapseStore = useCollapseStore()
const { collapse } = storeToRefs(collapseStore)
const { toggleCollapse } = collapseStore
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
const { layout, showTheLogo } = storeToRefs(useSettingsStore())
watchEffect(() => {
  // when the screen width less than 1200px, hide the title
  hiddenTitle = width.value < 1200
  // reset the collapse
  if (layout.value === 'horizontal')
    toggleCollapse(false)
})
</script>

<template>
  <div v-if="showTheLogo" h-50px flex justify-center items-center>
    <img :src="logo" alt="" h-32px w-32px :class="collapse || hiddenTitle ? '' : 'mr-5'">
    <h1 v-if="!collapse && !hiddenTitle" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
