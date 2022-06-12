<script setup lang="ts">
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheRightPanel from './components/TheRightPanel.vue'
</script>

<template>
  <a-layout h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header>
      <TheNav w-full h-50px bg-transparent />
      <TheTags w-full h-34px bg-transparent />
    </a-layout-header>
    <a-layout-content bg-transparent>
      <TheMain w-full h-full />
    </a-layout-content>
    <TheRightPanel />
  </a-layout>
</template>
