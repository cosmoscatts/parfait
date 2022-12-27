<script setup lang="ts">
import BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'

const {
  options = {},
} = defineProps<{
  options: Options
}>()

const instance = ref<BScroll>()

const refWrapper = ref<HTMLElement>()
const refContent = ref<HTMLElement>()

const isScrollY = computed(() => Boolean(options.scrollY))

const create = () => {
  if (!refWrapper.value) return
  instance.value = new BScroll(refWrapper.value, options)
}

const { width, height } = useElementSize(refContent)
const { width: wrapperWidth } = useElementSize(refWrapper)
watch(
  [
    width,
    height,
    wrapperWidth,
  ],
  () => instance.value?.refresh(),
)
onMounted(create)

defineExpose({ instance })
</script>

<template>
  <div ref="refWrapper" h-full text-left>
    <div
      ref="refContent"
      inline-block
      :class="{ 'h-full': !isScrollY }"
    >
      <slot />
    </div>
  </div>
</template>
