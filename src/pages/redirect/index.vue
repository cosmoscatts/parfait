<script setup lang="ts">
const router = useRouter()
const { params: { path }, query } = useRoute()
useTimeoutFn(() => {
  router.replace({ path: `/${path}`, query })
}, 1000)
</script>

<template>
  <div hw-full flex-center>
    <a-spin dot :size="24" />
  </div>
</template>
