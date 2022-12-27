<script setup lang="ts">
import Logo from './logo'
import Menu from './menu'
import { APP_LAYOUT_PARAMS } from '~/config'
</script>

<template>
  <div flex="x-center col" of-hidden>
    <Logo border-b="1px solid [var(--color-border)]" />
    <Menu border-r="1px solid [var(--color-border)]" :style="{ height: `calc(100% - ${APP_LAYOUT_PARAMS.navHeight}px)` }" />
  </div>
</template>
