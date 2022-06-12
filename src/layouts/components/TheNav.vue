<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
import NavFullScreen from '../widgets/NavFullScreen.vue'
import NavDarkToggle from '../widgets/NavDarkToggle.vue'
</script>

<template>
  <div flex justify-between items-center border="1px solid red">
    <NavHamburger mx-4 />
    <div flex-auto />
    <a
      icon-btn text-lg i-carbon-logo-github mr-3
      href="https://github.com/antfu/what-time"
      target="_blank" title="GitHub"
    />
    <NavFullScreen mr-3 />
    <NavDarkToggle mr-3 />
  </div>
</template>
