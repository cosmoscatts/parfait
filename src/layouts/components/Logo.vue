<script setup lang="ts">
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const uiStore = useUiStore()
const collapsed = computed(() => uiStore.collaspeSide.get())
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo"
    flex-center
    :class="{ 'ml-4': isHorizontal }"
    :style="{
      height: `${APP_LAYOUT_PARAMS.navHeight}px`,
    }"
  >
    <div i-ri-rocket-fill text="primary 24px" />
    <span v-if="isPC && (isHorizontal || !collapsed)" font="bold sans" ml-4 text-16px>
      {{ APP_META.name }}
    </span>
  </div>
</template>
