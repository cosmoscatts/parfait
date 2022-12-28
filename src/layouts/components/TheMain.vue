<script setup lang="ts">
const uiStore = useUiStore()
const tabStore = useTabStore()
const animateName = computed(() => (uiStore.settings.showAnimation
  ? uiStore.settings.animationMode
  : undefined))
</script>

<template>
  <div>
    <slot />
    <RouterView v-slot="{ Component, route }">
      <Transition :name="animateName" mode="out-in" appear>
        <KeepAlive :include="tabStore.cachedTabNames" :max="10">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
