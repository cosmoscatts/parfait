<script setup lang="ts">
import Menu from '../Menu.vue'
import { Avatar, Bell, FullScreen } from '.'
import { APP_META, APP_LAYOUT_PARAMS as PARAMS } from '~/config'

const show = ref(false)
</script>

<template>
  <button
    icon-btn text-lg i-carbon-menu
    @click="show = !show"
  />

  <a-drawer
    v-model:visible="show"
    :width="PARAMS.sideWidth"
    :header="false"
    :footer="false"
    unmount-on-close
  >
    <div flex="~ col">
      <div flex-y-center h50px>
        <Avatar />
        <div flex-auto />
        <a
          icon-btn text-lg i-ri-github-line mx4
          :href="APP_META.github"
          target="_blank" title="GitHub"
        />
        <Bell mr4 />
        <FullScreen mr4 />
        <DarkToggle />
      </div>
    </div>
    <Menu
      mode="vertical"
      :show-collapse-button="false"
      wfull hfull of-y-auto
      :style="{ height: 'calc(100vh - 80px)' }"
    />
  </a-drawer>
</template>
