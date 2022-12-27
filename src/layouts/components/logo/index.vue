<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const { navHeight, sideWidth, sideCollapsedWidth } = APP_LAYOUT_PARAMS

const uiStore = useUiStore()
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')

const breakpoints = useBreakpoints(breakpointsTailwind)
const hiddenTitle = breakpoints.smaller('lg')
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo"
    flex-center
    :class="{ 'ml-4': isHorizontal }"
    :style="{
      height: `${navHeight}px`,
      width: isHorizontal
        ? hiddenTitle
          ? `${sideCollapsedWidth}px`
          : `${sideWidth + 40}px`
        : undefined,
    }"
  >
    <div i-ri-rocket-fill text="primary 24px" />
    <span v-if="!uiStore.collaspeSide.get() && (!hiddenTitle || !isHorizontal)" font="bold sans" ml-4 text-16px>
      {{ APP_META.name }}
    </span>
  </div>
</template>

