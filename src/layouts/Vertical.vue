<script setup lang="ts">
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheSide from './components/TheSide.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { collapse } = storeToRefs(useCollapseStore())
const { width } = useWindowSize()
watchEffect(() => {
  // when the screen width less than 1200px, collapse the sider
  if (width.value < 1200)
    collapse.value = true
})

const sideWidth = computed(() => {
  return width.value < 1200
    ? 64
    : 200
})
</script>

<template>
  <a-layout h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-sider
      h-full of-hidden bg-sider
      hide-trigger
      collapsible
      :width="sideWidth"
      :collapsed="collapse"
    >
      <TheSide h-full w-full bg-transparent />
    </a-layout-sider>
    <a-layout>
      <a-layout-header bg-header>
        <TheNav w-full h-50px bg-transparent />
        <TheTags w-full h-34px bg-transparent />
      </a-layout-header>
      <a-layout bg-transparent>
        <a-layout-content>
          <TheMain w-full h-full />
        </a-layout-content>
        <TheRightPanel />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

