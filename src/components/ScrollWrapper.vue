<script setup lang="ts">
import BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'

// better-scroll
// https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html
interface Props {
  options: Options
}
const props = defineProps<Props>()

const refScrollWrapper = ref<HTMLElement>()
const instance = ref<BScroll>()
const refScrollContent = ref<HTMLElement>()
const isScrollY = computed(() => Boolean(props.options.scrollY))
function initBetterScroll() {
  if (!refScrollWrapper.value)
    return
  instance.value = new BScroll(refScrollWrapper.value, props.options)
}
// when scroll change, refresh browser
const { width: wrapWidth } = useElementSize(refScrollWrapper)
const { width, height } = useElementSize(refScrollContent)
watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
  if (instance.value)
    instance.value.refresh()
})
onMounted(() => {
  initBetterScroll()
})
defineExpose({ instance })
</script>

<template>
  <div ref="refScrollWrapper" h-full text-left>
    <div ref="refScrollContent" inline-block :class="{ 'h-full': !isScrollY }">
      <slot />
    </div>
  </div>
</template>
