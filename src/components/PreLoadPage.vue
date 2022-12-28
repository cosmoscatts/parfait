<script setup lang="ts">
import { APP_META } from '~/config'

const {
  beforeLeavingMs = 1000,
} = defineProps<{
  beforeLeavingMs: number
}>()

const { loading, endLoading } = useLoading(true)
useTimeoutFn(endLoading, beforeLeavingMs)
onMounted(() => useLottie({
  containerId: '#lottie-container',
  path: 'https://assets9.lottiefiles.com/packages/lf20_D2t3ozSoE5.json',
}))
</script>

<template>
  <div class="loading-mask" />
  <Transition leave-active-class="animate__animated animate__bounceOut">
    <div v-if="loading" class="loading-wrapper">
      <div mb-100px>
        <div id="lottie-container" w300px h300px />
        <div class="flex-center animate__animated animate__fadeInUpBig animate__faster">
          <div ml10px text-48px font-bold>
            {{ APP_META.name }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--color-bg-1);
  pointer-events: none;
  z-index: 10000;
}
.loading-wrapper {
  position: fixed;
  left: -300px;
  top: -300px;
  bottom: -300px;
  right: -300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-1);
  z-index: 10001;
}
</style>
