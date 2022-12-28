<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
import one from '~/assets/one.png'
import two from '~/assets/two.png'
import three from '~/assets/three.png'

const carouselImgList = [one, two, three]
// const getImageUrl = (name: string) => new URL(`../../../assets/${name}.png`, import.meta.url).href
</script>

<template>
  <div hw-screen border="1 green" p0 m0>
    <div class="login-container m0" border="1 red">
      <a-carousel
        lt-md="hidden"
        indicator-type="line"
        indicator-position="bottom"
        :style="{
          width: '30%',
          minWidth: '500px',
          height: '60vh',
        }"
      >
        <a-carousel-item v-for="image in carouselImgList" :key="image">
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
          >
        </a-carousel-item>
      </a-carousel>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: url('~/assets/login-bg.png') no-repeat 0 -120px;
  overflow: hidden;
}

:deep(.arco-carousel-indicator-wrapper-bottom) {
  background: none;
}
</style>
