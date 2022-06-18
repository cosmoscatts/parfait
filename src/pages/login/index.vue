<script setup lang="ts">
const { updateUser } = useUserStore()
const router = useRouter()
function submit() {
  updateUser({
    id: 1,
    username: 'admin',
    name: 'admin',
  })
  router.push('/')
}
</script>

<template>
  <h1>Login</h1>
  <button @click="submit">
    Login
  </button>
  <Plum />
</template>
