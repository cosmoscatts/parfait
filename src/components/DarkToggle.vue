<script setup lang="ts">
const toggle = useToggleDark
</script>

<template>
  <button
    icon-btn text-lg
    i="carbon-sun dark:carbon-asleep"
    @click="toggle()"
  />
</template>
