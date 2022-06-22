<script setup lang="ts">
import BackTop from './widgets/BackTop.vue'
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheSide from './components/TheSide.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { width } = useWindowSize()
const { menuCollapsed } = storeToRefs(useAppStore())
watchEffect(() => {
  // when the screen width less than 1200px, collapse the sider
  if (width.value < 1200)
    menuCollapsed.value = true
})
const sideWidth = computed(() => {
  return width.value < 1200
    ? 64
    : 200
})
const { showTheTags, fixHeader } = storeToRefs(useAppStore())
const rightPanelVisible = ref(false)
const backTopTarget = computed(() => {
  return fixHeader.value
    ? '#content-wrapper'
    : '#main-wrapper'
})
</script>

<template>
  <a-layout h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-sider
      h-full of-hidden bg-sider
      hide-trigger
      collapsible
      :width="sideWidth"
      :collapsed-width="64"
      :collapsed="menuCollapsed"
    >
      <TheSide h-full w-full bg-transparent />
    </a-layout-sider>
    <a-layout id="main-wrapper">
      <a-layout-header
        bg-header
        :class="
          fixHeader
            ? menuCollapsed
              ? 'fixed top-0 right-0 w-[calc(100%-64px)]'
              : 'fixed top-0 right-0 w-[calc(100%-200px)]'
            : ''"
      >
        <TheNav w-full h-50px bg-transparent />
        <TheTags v-show="showTheTags" w-full h-34px bg-transparent />
      </a-layout-header>
      <a-layout
        id="content-wrapper"
        bg-transparent
        :class="
          fixHeader
            ? showTheTags
              ? 'of-x-hidden of-y-auto !mt-84px'
              : 'of-x-hidden of-y-auto !mt-50px'
            : '' "
      >
        <a-layout-content>
          <TheMain w-full h-full p-5 />
        </a-layout-content>
        <TheRightPanel v-model:visible="rightPanelVisible" />
      </a-layout>
    </a-layout>
    <BackTop :target-container="backTopTarget" />
  </a-layout>
</template>

