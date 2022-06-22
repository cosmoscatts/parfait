<script setup lang="ts">
import logo from '~/assets/logo.svg'

const title = 'Parfait'
const appstore = useAppStore()
const { menuCollapsed } = storeToRefs(appstore)
const { toggleMenuCollapsed } = appstore
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
const { layout, showTheLogo } = storeToRefs(useAppStore())
watchEffect(() => {
  // when the screen width less than 1200px, hide the title
  hiddenTitle = width.value < 1200
  // reset the collapse
  if (layout.value === 'horizontal')
    toggleMenuCollapsed(false)
})
</script>

<template>
  <div v-if="showTheLogo" h-50px flex justify-center items-center>
    <img :src="logo" alt="" h-34px w-34px :class="menuCollapsed || hiddenTitle ? '' : 'mr-5'">
    <h1 v-if="!menuCollapsed && !hiddenTitle" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
