<script setup lang="ts">
import { baseSettings } from '~/settings'
import { replacePrimaryColor } from '~/utils'

// 设置 `html` 标题
useHeadMeta()

// reset primary color
const { primaryColor } = storeToRefs(useAppStore())
replacePrimaryColor(primaryColor.value)

// when the window unload, remove the
// tags if do not want cache the tags
const { removeAll } = useTagsStore()
useEventListener(window, 'beforeunload', () => {
  const { showTheTags, cacheTheTags } = baseSettings
  if (!showTheTags || !cacheTheTags)
    removeAll()
})

// 初始化 `loading`
const { loading: appLoading, endLoading } = useLoading(true)

// 定义 `loading` 整体时间和内层动画持续时间
const LOADING_INTERVAL = 2500
const LOADING_INNER_INTERVAL = 1800
useTimeoutFn(endLoading, LOADING_INTERVAL)
</script>

<template>
  <AppLoading v-if="appLoading" :inner-loading="LOADING_INNER_INTERVAL" />
  <RouterView v-else />
</template>
