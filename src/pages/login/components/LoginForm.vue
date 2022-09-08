<script setup lang="ts">
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import type { ValidatedError } from '~/types'

const { loading, startLoading, endLoading } = useLoading()
const form = reactive({
  username: 'admin',
  password: '123456',
  isRead: false,
})
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])
const { updateUser } = useUserStore()
const router = useRouter()
async function submit({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) {
  if (errors)
    return
  startLoading()
  Message.success('欢迎使用')
  updateUser({
    id: 1,
    username: 'admin',
    name: 'admin',
    roleId: 1,
    createTime: new Date(),
  })
  useTimeoutFn(() => {
    router.push('/foo')
    endLoading()
  }, 1000)
}
</script>

<template>
  <a-space direction="vertical" size="large" w-450px class="mt-1/15">
    <div text="32px center" font-bold>
      Parfait
    </div>
    <a-form :model="form" layout="vertical" size="large" @submit="submit">
      <a-form-item
        field="username" label="账号" hide-asterisk feedback
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="form.username" placeholder="请输入你的账号..." allow-clear>
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password" label="密码" hide-asterisk feedback
        :rules="[
          { required: true, message: '密码是必须的' },
          { minLength: 6, message: '长度必须大于6' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input-password v-model="form.password" placeholder="请输入你的密码..." allow-clear>
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <div flex justify-start items-center border-red mt-3>
        <div i-carbon-touch-2-filled icon-btn />
        <span text-10px ml-3>注册登录即表示同意 用户协议 、 隐私政策</span>
      </div>
      <a-form-item
        field="isRead" hide-asterisk
        :rules="[{ type: 'boolean', true: true, message: '请勾选' }]"
      >
        <a-checkbox v-model="form.isRead">
          我同意登录协议
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button long type="primary" html-type="submit" :loading="loading" font-bold>
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div flex justify-center items-center>
      <DarkToggle />
      <span ml-5 op-50 text-xl> Duende </span>
    </div>
  </a-space>
</template>
