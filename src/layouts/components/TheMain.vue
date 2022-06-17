<script setup lang="ts">
const { cachedPageNames } = storeToRefs(usePermissionStore())
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="cachedPageNames">
      <Component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>
