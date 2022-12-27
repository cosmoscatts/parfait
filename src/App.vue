<script setup lang="ts">
const { loading, endLoading } = useLoading(true)
const LOADING_INTERVAL = 2500
const BEFORE_LEAVING_MS = 1800
useTimeoutFn(endLoading, LOADING_INTERVAL)
</script>

<template>
  <PreLoadPage v-if="loading" :before-leaving-ms="BEFORE_LEAVING_MS" />
  <RouterView v-else />
</template>
