<script setup lang="ts">
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheTabs,
} from '../components'
</script>

<template>
  <a-layout id="main-wrapper" ref="refMainWrapper" h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header :class="fixHeader ? 'fixed top-0 right-0 w-full' : ''">
      <TheNav w-full h-50px bg-transparent />
      <TheTags v-show="showTheTags" w-full h-40px bg-transparent />
    </a-layout-header>
    <a-layout
      id="content-wrapper"
      ref="refContentWrapper"
      bg-transparent
      :class="
        fixHeader
          ? showTheTags
            ? 'of-x-hidden of-y-auto !mt-90px'
            : 'of-x-hidden of-y-auto !mt-50px'
          : '' "
    >
      <a-layout-content>
        <TheMain w-full h-full p-5 />
      </a-layout-content>
    </a-layout>
    <TheRightPanel v-model:visible="rightPanelVisible" />
  </a-layout>
  <BackTop :target-container="backTopTarget" />
</template>
