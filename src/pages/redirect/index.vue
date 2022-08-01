<script setup lang="ts">
const router = useRouter()
const { params: { path }, query } = useRoute()
useTimeoutFn(() => {
  router.replace({ path: `/${path}`, query })
}, 1000)
</script>

<template>
  <div w-full h-full flex justify-center items-center>
    <a-spin dot :size="24" />
  </div>
</template>
