<script setup lang="ts">
import Logo from '../widgets/Logo.vue'
import Menu from '../widgets/Menu.vue'
import { menus } from '~/menus'

const mode: 'vertical' | 'horizontal' | 'pop' | 'popButton' = 'vertical'
</script>

<template>
  <div flex="~ col justify-center of-hidden">
    <Logo />
    <Menu :mode="mode" :metadata="menus" />
  </div>
</template>
