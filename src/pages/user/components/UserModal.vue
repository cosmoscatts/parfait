<script setup lang="ts">
import { IconLock } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import AvatarUpload from './AvatarUpload.vue'
import type { User } from '~/types'

const {
  visible = false,
  user = {},
  type = 'add',
  roleOptions = [],
} = defineProps<{
  visible?: boolean
  user?: User
  type?: 'add' | 'edit'
  roleOptions?: SelectOptionData[]
}>()

const emits = defineEmits(['update:visible', 'saveUser'])

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

const baseFormModel = {
  id: undefined,
  username: '',
  name: '',
  password: '',
  checkPass: '',
  avatar: undefined,
  roleId: undefined,
}

type FormModel = Omit<User, 'role' | 'createTime' | 'updateTime'> & {
  checkPass?: string
}

const formModel = reactive<FormModel>({
  ...baseFormModel,
})

const { loading, startLoading, endLoading } = useLoading()
function assign() {
  const target = (visible && type === 'edit')
    ? unref(user)
    : baseFormModel
  for (const [k, v] of Object.entries(target)) {
    if (!Object.prototype.hasOwnProperty.call(formModel, k)) continue
    formModel[k as keyof FormModel] = v
  }
}

watch(() => visible, (val) => {
  if (val) assign()
  endLoading()
  refForm.value?.clearValidate()
})

function handleOk() {
  refForm.value.validate((errors: any) => {
    if (errors) return
    startLoading()
    if (type === 'edit') formModel.password = undefined
    emits('saveUser', formModel)
  })
}

function handleCancel() {
  emits('update:visible', false)
}
</script>

<template>
  <a-modal
    :visible="visible"
    :width="600"
    :mask-closable="false"
    :ok-loading="loading"
    :ok-text="type === 'add' ? '添加' : '更新'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      {{ ['添加用户', '编辑用户'][type === 'add' ? 0 : 1] }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <a-form-item field="avatar" label="头像" hide-asterisk feedback>
        <AvatarUpload v-model:avatar="formModel.avatar" />
      </a-form-item>
      <a-form-item
        field="username" label="账号" hide-asterisk feedback
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.username"
          placeholder="请输入账号..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="name" label="名称" hide-asterisk feedback
        :rules="[
          { required: true, message: '名称是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.name"
          placeholder="请输入名称..."
          allow-clear
        />
      </a-form-item>
      <a-form-item v-if="type === 'add'" field="password" label="密码" hide-asterisk feedback>
        <a-input-password
          v-model="formModel.password"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-if="type === 'add'" field="checkPass" label="确认密码" hide-asterisk feedback>
        <a-input-password
          v-model="formModel.checkPass"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="roleId" label="角色" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-select
          v-model="formModel.roleId"
          :options="roleOptions"
          placeholder="请选择角色..."
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
