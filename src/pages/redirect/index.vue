<script setup lang="ts">
const { params: { path }, query } = useRoute()
useRouter().replace({ path: `/${path}`, query })
</script>

<template>
  <div />
</template>
