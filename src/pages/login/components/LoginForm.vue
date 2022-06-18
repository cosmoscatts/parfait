<script setup lang="ts">
import type { ValidatedError } from '~/types'
import DarkToggle from '~/components/DarkToggle.vue'

const { loading, setLoading } = useLoading()
const form = reactive({
  username: '',
  password: '',
  isRead: false,
})
const status = ref<'success' | 'warning' | 'error' | 'validating'>()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])
const { updateUser } = useUserStore()
const router = useRouter()
const formRef = ref()
async function submit({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) {
  if (errors)
    return
  setLoading(true)
  updateUser({
    id: 1,
    username: 'admin',
    name: 'admin',
  })
  setTimeout(() => setLoading(false), 2000)
  // router.push('/')
}
</script>

<template>
  <a-space direction="vertical" size="large" w-450px class="mt-1/15">
    <div text="32px center" font-bold>
      🎃 Parfiat
    </div>
    <a-form ref="formRef" :model="form" layout="vertical" size="large" @submit="submit">
      <a-form-item
        field="username" label="账号" hide-asterisk feedback :validate-status="status"
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="form.username" placeholder="请输入你的账号..." />
      </a-form-item>
      <a-form-item
        field="password" label="密码" hide-asterisk feedback
        :rules="[
          { required: true, message: '密码是必须的' },
          { minLength: 6, message: '长度必须大于6' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="form.password" placeholder="请输入你的密码..." />
      </a-form-item>
      <a-form-item
        field="isRead" feedback required :rules="[
          { required: true, message: '密码是必须的' },
        ]"
        help="注册登录即表示同意 用户协议 、 隐私政策" validate-status="success"
      >
        <a-checkbox v-model="form.isRead">
          我同意登录协议
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button long type="primary" html-type="submit" :loading="loading">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div flex justify-center items-center>
      <DarkToggle />
      <span ml-5 op-50 text-xl>🙌🙌 By Faitsse 🙌🙌</span>
    </div>
  </a-space>
</template>
