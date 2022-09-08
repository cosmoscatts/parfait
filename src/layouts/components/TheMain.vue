<script setup lang="ts">
// 获取缓存页面
const { cachedTabNames } = storeToRefs(useTabStore())
// 获取页面动画
const { baseSettings } = storeToRefs(useAppStore())
const animateName = computed(() => {
  return baseSettings.value?.showTransitionAnimation
    ? baseSettings.value.transitionAnimation
    : undefined
})
</script>

<template>
  <div>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="animateName" mode="out-in" appear>
        <KeepAlive :include="cachedTabNames" :max="10">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

