<script setup lang="ts">
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { debug } from '~/config'
import { findFirstPermissionRoute, loginCallback } from '~/utils'

const { loading, startLoading, endLoading } = useLoading()

/**
 * 定义表单数据结构
 */
interface ModelType {
  username?: string
  password?: string
}

// 表单基础数据
const baseFormModel = debug
  ? {
      username: 'admin',
      password: '123456',
    }
  : {
      username: '',
      password: '',
    }

// 表单数据
const formModel = reactive<ModelType>({
  ...baseFormModel,
})

const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

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
  await loginCallback({
    id: 1,
    username: 'admin',
    name: 'admin',
    roleId: 1,
    phone: '6666666666',
    email: 'dasb@qq.com',
    createTime: new Date(),
  })
  const path = findFirstPermissionRoute() ?? '/'
  useTimeoutFn(() => {
    endLoading()
    router.push(path)
    Message.success('登录成功')
  }, 1000)
}
</script>

<template>
  <a-space direction="vertical" size="large" w-450px class="mt-1/15">
    <div text="32px center" font-bold>
      Parfait
    </div>
    <a-form :model="formModel" layout="vertical" size="large" @submit="submit">
      <a-form-item
        field="username" label="账号" hide-asterisk feedback
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input v-model="formModel.username" placeholder="请输入你的账号..." allow-clear>
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
        <a-input-password v-model="formModel.password" placeholder="请输入你的密码..." allow-clear>
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button long type="primary" html-type="submit" :loading="loading" font-bold>
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div flex-center>
      <DarkToggle />
      <span ml-5 op-50 text-xl> Duende </span>
    </div>
  </a-space>
</template>
