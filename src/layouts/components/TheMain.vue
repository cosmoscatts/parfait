<script setup lang="ts">
const { cachedPageNames } = storeToRefs(useTagsStore())
const { openAnimation, animationMode } = storeToRefs(useAppStore())
const animateName = computed(() => {
  return unref(openAnimation)
    ? unref(animationMode)
    : undefined
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="animateName" mode="out-in" appear>
      <KeepAlive :include="cachedPageNames">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
