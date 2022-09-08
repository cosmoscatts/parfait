<script setup lang="ts">
import BackTop from './widgets/BackTop.vue'
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'
import TheTags from './components/TheTags.vue'
import TheRightPanel from './components/TheRightPanel.vue'

const { showTheTags, fixHeader } = storeToRefs(useAppStore())
const rightPanelVisible = ref(false)
const backTopTarget = computed(() => {
  return fixHeader.value
    ? '#content-wrapper'
    : '#main-wrapper'
})

// handle scroll position
const refMainWrapper = ref()
const refContentWrapper = ref()
const route = useRoute()
watch(() => route.path, (val, old) => {
  if (val === old)
    return
  const refTarget = fixHeader.value
    ? refContentWrapper
    : refMainWrapper
  if ((refTarget.value?.$el?.scrollTop ?? 0) === 0)
    return
  useScrollTop(refTarget.value!.$el)
})
</script>

<template>
  1
</template>
