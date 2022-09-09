<script setup lang="ts">
// 设置 `html` 标题
useHeadMeta()

// 初始化 `loading`
const { loading: appLoading, endLoading } = useLoading(true)

// 初始话 `appStore`
const { initAppSettings } = useAppStore()
initAppSettings()

// 定义 `loading` 整体时间和内层动画持续时间
const LOADING_INTERVAL = 2500
const LOADING_INNER_INTERVAL = 1800
useTimeoutFn(endLoading, LOADING_INTERVAL)
</script>

<template>
  <AppLoading v-if="appLoading" :inner-loading="LOADING_INNER_INTERVAL" />
  <RouterView v-else />
</template>
