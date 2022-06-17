<script setup lang="ts">
const cachedPageNames = computed(() => {
  return usePermissionStore().cachedPageNames
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <keep-alive :include="cachedPageNames">
      <Component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
