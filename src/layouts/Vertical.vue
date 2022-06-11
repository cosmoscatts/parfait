<script setup lang="ts">
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheSide from './components/TheSide.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { collapse, siderWidth } = storeToRefs(useCollapseStore())
</script>

<template>
  <a-layout hw-screen>
    <a-layout-sider
      h-full
      overflow-hidden
      hide-trigger
      collapsible
      :width="siderWidth"
      :collapsed="collapse"
    >
      <TheSide />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <TheNav w-full h-50px bg-red />
        <TheTags />
      </a-layout-header>
      <a-layout>
        <a-layout-content>
          <TheMain />
        </a-layout-content>
        <TheRightPanel />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

