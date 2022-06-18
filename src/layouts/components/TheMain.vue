<script setup lang="ts">
const tagsStore = useTagsStore()
const cachedPageNames = computed(() => {
  return Array.from(tagsStore.cachedPageNames)
})
const route = useRoute()
watch(() => route.path, (val) => {
  console.log(tagsStore.cachedPageNames)
  console.log(cachedPageNames.value)
})
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
