<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { appLayoutParams, appMeta } from '~/config'

const { title } = appMeta
const { navHeight, sideWidth, sideCollapsedWidth } = appLayoutParams

const appstore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appstore)
const { setMenuUnCollapsed } = appstore

watchEffect(() => {
  // 当页面布局为水平时，重置菜单折叠标志
  if (baseSettings.value.layout === 'horizontal')
    setMenuUnCollapsed()
})

const isHorizontalLayout = computed(() => baseSettings.value.layout === 'horizontal')

const breakpoints = useBreakpoints(breakpointsTailwind)
const hiddenTitle = breakpoints.smaller('lg')
</script>

<template>
  <div
    v-if="baseSettings.showLogo"
    flex-center
    :class="{ 'ml-4': isHorizontalLayout }"
    :style="{
      height: `${navHeight}px`,
      width: isHorizontalLayout
        ? hiddenTitle
          ? `${sideCollapsedWidth}px`
          : `${sideWidth + 40}px`
        : undefined,
    }"
  >
    <!-- <img
        src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
        alt="Logo" :style="{ width: `${navHeight * 0.65}px !important`, height: `${navHeight * 0.65}px !important` }"
      > -->
    <div i-ri-rocket-fill text="primary 24px" />
    <span v-if="!menuCollapsed && (!hiddenTitle || !isHorizontalLayout)" font="bold sans" ml-4 text-16px>
      {{ title }}
    </span>
  </div>
</template>

