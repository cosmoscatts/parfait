<template>
  <div class="wrapper" bg="white dark:[#17171A]">
    <div class="mask" />
    <div class="logo" i-carbon-campsite text=" white" />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  animation-name: scale;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-75deg, #63E2B7, #1F8F93);
  z-index: 2;
  animation-name: reOpacityChange;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 2px), calc(-50% - 2px));
  width: 198px;
  height: 282px;
  z-index: 3;
  animation-name: reOpacityChange;
  animation-duration: 1.5s;
  animation-timeline: box-move;
}
@keyframes reOpacityChange {
  0%,
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes scale {
  0%,
  40% {
    transform: scale(1);
  }
  100% {
    transform: scale(3);
  }
}
</style>
