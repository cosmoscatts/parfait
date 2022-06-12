<script setup lang="ts">
const toggle = toggleDark
</script>

<template>
  <button
    icon-btn text-lg
    i="carbon-light-filled dark:carbon-asleep-filled"
    @click="toggle()"
  />
</template>
