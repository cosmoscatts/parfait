<script setup lang="ts">
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheLogo from './components/TheLogo.vue'
import TheSide from './components/TheSide.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { collapse } = storeToRefs(useCollapseStore())
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      hide-trigger
      collapsible
      :width="220"
      :collapsed="collapse"
    >
      <TheLogo />
      <TheSide />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <TheNav />
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

