<script setup lang="ts">
const router = useRouter()
function back() {
  router.back()
}
</script>

<template>
  <div w-screen h-screen flex justify-center items-center>
    <a-result status="404" class="mb-1/10">
      <template #title>
        <div text-32px>
          您要找的页面不存在
        </div>
      </template>
      <template #extra>
        <a-space>
          <a-button type="primary" @click="back">
            返回
          </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
