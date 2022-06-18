<script setup lang="ts">
const form = reactive({
  name: '',
  post: '',
  isRead: false,
})
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
  <a-space direction="vertical" size="large" w-450px>
    <a-form :model="form" layout="vertical">
      <a-form-item field="name" label="Username">
        <a-input v-model="form.name" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-input v-model="form.post" placeholder="please enter your post..." />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead">
          I have read the manual
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button @click="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    <div>
      {{ form }}
    </div>
  </a-space>
</template>
