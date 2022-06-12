<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
import NavBreadCrumb from '../widgets/NavBreadCrumb.vue'
import NavFullScreen from '../widgets/NavFullScreen.vue'
import NavDarkToggle from '../widgets/NavDarkToggle.vue'
import NavAvatar from '../widgets/NavAvatar.vue'
</script>

<template>
  <div flex justify-between items-center pr-5>
    <NavHamburger mx-4 />
    <NavBreadCrumb />
    <div flex-auto />
    <a
      icon-btn text-lg i-carbon-logo-github mr-3
      href="https://github.com/faitsse/parfait"
      target="_blank" title="GitHub"
    />
    <NavFullScreen mr-3 />
    <NavDarkToggle mr-3 />
    <NavAvatar />
  </div>
</template>
