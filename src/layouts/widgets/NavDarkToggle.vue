<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    icon-btn
    color="black dark:white"
    i="carbon-sun dark:carbon-moon"
    @click="toggleDark()"
  />
</template>
