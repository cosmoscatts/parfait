<script setup lang="ts">
import DarkToggle from '~/components/DarkToggle.vue'
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
const status = ref<'success' | 'warning' | 'error' | 'validating'>()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input', 'focus'])
</script>

<template>
  <a-space direction="vertical" size="large" w-450px class="mt-1/12">
    <a-form :model="form" layout="vertical" @submit="submit">
      <a-form-item
        field="name" label="账号" hide-asterisk feedback :validate-status="status"
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="form.name" placeholder="请输入你的账号..." />
      </a-form-item>
      <a-form-item
        field="post" label="密码" hide-asterisk feedback
        :rules="[
          { required: true, message: '密码是必须的' },
          { minLength: 6, message: '长度必须大于6' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="form.post" placeholder="请输入你的密码..." />
      </a-form-item>
      <a-form-item
        field="isRead" hide-asterisk feedback
        :rules="[
          { required: true, message: '请勾选' },
        ]"
      >
        <a-checkbox v-model="form.isRead">
          我同意登录协议
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button long type="primary" html-type="submit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div flex justify-center items-center>
      <DarkToggle />
      <span ml-3 op-30 text-xl>🙌🙌 By Faitsse</span>
    </div>
  </a-space>
</template>
