<script setup lang="ts">
import { IconLock } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '~/types'
import AvatarUpload from '~/components/AvatarUpload.vue'

const {
  visible = false,
  user = {},
  type = 'add',
  roleOptions = [],
} = defineProps<{
  visible?: boolean
  user?: Record<string, any>
  type?: 'add' | 'edit'
  roleOptions?: SelectOptionData[]
}>()
const emits = defineEmits(['update:visible', 'saveUser'])

const baseFormModel = {
  id: undefined,
  username: '',
  name: '',
  password: '',
  checkPass: '',
  avatar: undefined,
  phone: '',
  email: '',
  roleId: undefined,
}
const formModel = reactive<Record<string, any>>({
  ...baseFormModel,
})
const title = computed(() => {
  return ['添加用户', '编辑用户'][type === 'add' ? 0 : 1]
})
function assign() {
  console.log(user)
  console.log(type)
  const target = visible && type === 'edit'
    ? unref(user)
    : baseFormModel
  console.log('target', target)
  for (const [k, v] of Object.entries(target)) {
    if (!Object.prototype.hasOwnProperty.call(formModel, k))
      continue
    formModel[k] = v
  }
  console.log('formModal', formModel)
}
watch(() => visible, () => {
  assign()
})
function handleOk() {
  emits('update:visible', false)
}
function handleCancel() {
  emits('update:visible', false)
}
</script>

<template>
  <a-modal :visible="visible" :width="600" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      {{ title }}
    </template>
    <a-form :model="formModel" auto-label-width size="large">
      <a-form-item field="username" label="账号" hide-asterisk feedback>
        <a-input
          v-model="formModel.username"
          placeholder="请输入账号..."
          allow-clear
        />
      </a-form-item>
      <a-form-item field="name" label="名称" hide-asterisk feedback>
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
            <icon-lock />
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
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item field="avatar" label="头像" hide-asterisk feedback>
        <AvatarUpload :avatar="formModel.avatar" />
      </a-form-item>
      <a-form-item field="phone" label="手机号" hide-asterisk feedback>
        <a-input
          v-model="formModel.phone"
          placeholder="请输入手机号..."
          allow-clear
        />
      </a-form-item>
      <a-form-item field="email" label="邮箱" hide-asterisk feedback>
        <a-input
          v-model="formModel.email"
          placeholder="请输入邮箱..."
          allow-clear
        />
      </a-form-item>
      <a-form-item field="roleId" label="角色" hide-asterisk feedback>
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
