<script setup lang="ts">
import BackTop from './widgets/BackTop.vue'
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const rightPanelVisible = $ref(false)
</script>

<template>
  <a-layout id="main-wrapper" h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header>
      <TheNav w-full h-50px bg-transparent />
      <TheTags w-full h-34px bg-transparent />
    </a-layout-header>
    <a-layout-content bg-transparent>
      <TheMain w-full h-full />
    </a-layout-content>
    <TheRightPanel v-model:visible="rightPanelVisible" />
  </a-layout>
  <BackTop target-container="#main-wrapper" />
</template>
