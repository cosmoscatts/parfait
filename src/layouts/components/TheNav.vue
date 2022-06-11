<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
import NavDarkToggle from '../widgets/NavDarkToggle.vue'
</script>

<template>
  <div flex justify-between items-center border="1px solid red">
    <div flex justify-self-start>
      <NavHamburger mx-4 />
    </div>
    <div>
      <NavDarkToggle mx-4 />
    </div>
  </div>
</template>
