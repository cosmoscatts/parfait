<script setup lang="ts">
const router = useRouter()
function back() {
  router.push('/')
}
function reTry() {
  router.back()
}
</script>

<template>
  <div hw-screen flex-center>
    <a-result status="500" subtitle="您可以选择重试或者返回" class="mb-1/10">
      <template #title>
        <div text-32px>
          服务器开小差了...
        </div>
      </template>
      <template #extra>
        <a-space>
          <a-button type="secondary" @click="reTry">
            重试
          </a-button>
          <a-button type="primary" @click="back">
            返回
          </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
