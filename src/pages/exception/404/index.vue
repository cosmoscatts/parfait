<script setup lang="ts">
const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.back()
}
</script>

<template>
  <div w-screen h-screen flex="~ col" justify-center items-center>
    <a-result status="404" subtitle="页面不存在" />
    <a-button key="back" type="primary" @click="back">
      返回
    </a-button>
  </div>
</template>
