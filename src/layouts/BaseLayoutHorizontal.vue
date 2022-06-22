<script setup lang="ts">
import BackTop from './widgets/BackTop.vue'
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { showTheTags, fixHeader } = storeToRefs(useAppStore())
const rightPanelVisible = ref(false)
const backTopTarget = computed(() => {
  return fixHeader.value
    ? '#content-wrapper'
    : '#main-wrapper'
})
</script>

<template>
  <a-layout id="main-wrapper" h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header :class="fixHeader ? 'fixed top-0 right-0 w-full' : ''">
      <TheNav w-full h-50px bg-transparent />
      <TheTags v-show="showTheTags" w-full h-34px bg-transparent />
    </a-layout-header>
    <a-layout-content
      id="content-wrapper"
      bg-transparent
      :class="
        fixHeader
          ? showTheTags
            ? 'of-x-hidden of-y-auto !mt-84px'
            : 'of-x-hidden of-y-auto !mt-50px'
          : '' "
    >
      <TheMain w-full h-full p-5 />
    </a-layout-content>
    <TheRightPanel v-model:visible="rightPanelVisible" />
  </a-layout>
  <BackTop :target-container="backTopTarget" />
</template>
