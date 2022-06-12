<script setup lang="ts">
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheSide from './components/TheSide.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { collapse, siderWidth } = storeToRefs(useCollapseStore())
</script>

<template>
  <a-layout h-screen w-screen bg-canvas of="x-hidden y-auto">
    <a-layout-sider
      h-full of-hidden bg="dark:#232324"
      hide-trigger
      collapsible
      :width="siderWidth"
      :collapsed="collapse"
    >
      <TheSide h-full w-full bg-transparent />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <TheNav w-full h-50px bg="white dark:[#111]" />
        <TheTags w-full h-34px bg="white dark:[#111]" />
      </a-layout-header>
      <a-layout border="~ solid white">
        <a-layout-content>
          <TheMain w-full h-full />
        </a-layout-content>
        <TheRightPanel />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

