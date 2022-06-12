<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
import NavDarkToggle from '../widgets/NavDarkToggle.vue'
</script>

<template>
  <div flex justify-between items-center border="1px solid red">
    <div flex justify-self-start>
      <NavHamburger mx-4 />
    </div>
    <div flex-auto />
    <a icon-btn i-carbon-logo-github href="https://github.com/antfu/what-time" target="_blank" title="GitHub" />
    <NavDarkToggle mx-4 />
  </div>
</template>
