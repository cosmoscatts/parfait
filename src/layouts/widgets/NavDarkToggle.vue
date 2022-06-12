<script setup lang="ts">
const toggle = toggleDark
</script>

<template>
  <button
    icon-btn
    color="black dark:white"
    i="carbon-sun dark:carbon-moon"
    @click="toggle()"
  />
</template>
