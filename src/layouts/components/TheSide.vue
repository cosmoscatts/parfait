<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from './Menu.vue'
import { APP_LAYOUT_PARAMS } from '~/config'
</script>

<template>
  <div flex="x-center col" of-hidden>
    <Logo />
    <Menu
      :style="{ height: `calc(100% - ${APP_LAYOUT_PARAMS.navHeight}px)` }"
    />
  </div>
</template>
