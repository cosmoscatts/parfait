<script setup lang="ts">
import { appMeta } from '~/config'

const {
  beforeLeavingMs = 1500,
} = defineProps<{
  beforeLeavingMs: number
}>()

// 控制内层动画
const { loading, endLoading } = useLoading(true)
useTimeoutFn(endLoading, beforeLeavingMs)
</script>

<template>
  <div class="loading-mask" />
  <Transition leave-active-class="animate__animated animate__bounceOut">
    <div v-if="loading" class="loading-wrapper">
      <div mb-100px>
        <div class="cube-grid">
          <div class="cube cube1" />
          <div class="cube cube2" />
          <div class="cube cube3" />
          <div class="cube cube4" />
          <div class="cube cube5" />
          <div class="cube cube6" />
          <div class="cube cube7" />
          <div class="cube cube8" />
          <div class="cube cube9" />
        </div>
        <div class="flex-y-center animate__animated animate__fadeInUpBig animate__faster">
          <div i-ri-rocket-fill text="primary 40px" />
          <div ml-20px text-32px font-bold>
            {{ appMeta.title }}
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
  .cube-grid {
    width: 50px;
    height: 50px;
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2px;
  }
  .cube-grid .cube {
    width: 100%;
    height: 100%;
    background-color: var(--primary-6);
    -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
    border-radius: 10%;
    box-sizing: border-box;
  }
  .cube-grid .cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    background-color: #E15140;
  }
  .cube-grid .cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    background-color: #D73D64;
  }
  .cube-grid .cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
    background-color: #9036AA;
  }
  .cube-grid .cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
    background-color: #6040B0;
  }
  .cube-grid .cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    background-color: #4253AF;
  }
  .cube-grid .cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    background-color: #4696EC;
  }
  .cube-grid .cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background-color: #48A8ED;
  }
  .cube-grid .cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
    background-color: #52BAD1;
  }
  .cube-grid .cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    background-color: #419488;
  }
  @-webkit-keyframes cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }
  @keyframes cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }
  </style>
