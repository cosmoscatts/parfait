<script setup lang="ts">
const router = useRouter()
const { params: { path }, query } = useRoute()
router.replace({ path: `/${path}`, query })
</script>

<template>
  <div />
</template>
