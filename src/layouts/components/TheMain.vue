<script setup lang="ts">
const { cachedPageNames } = storeToRefs(usePermissionStore())
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in" appear>
      <KeepAlive :include="cachedPageNames">
        <Component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
