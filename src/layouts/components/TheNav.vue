<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
const { siderWidth } = storeToRefs(useCollapseStore())
</script>

<template>
  <div h-50px flex justify-between items-center>
    <div flex justify-self-start>
      <NavHamburger mx-3 />
    </div>
    <div />
  </div>
</template>
