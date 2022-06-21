<script setup lang="ts">
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '~/types'

const {
  roleOptions = [],
} = defineProps<{
  roleOptions: SelectOptionData[]
}>()
const emit = defineEmits(['fetchData'])
function generateFormModel() {
  return {
    username: '',
    name: '',
    phone: '',
    roleId: '',
    email: '',
    createTime: [],
  }
}
const formModel = ref(generateFormModel())
function search() {
  emit('fetchData', formModel.value)
}
search()
function reset() {
  formModel.value = ref(generateFormModel()) as any
}

defineExpose({
  formModel,
})
</script>

<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="username" label="账号">
              <a-input
                v-model="formModel.username"
                placeholder="请输入用户账号"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="name" label="名称">
              <a-input
                v-model="formModel.name"
                placeholder="请输入名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="phone" label="手机号">
              <a-input
                v-model="formModel.phone"
                placeholder="请输入手机号"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="roleId" label="角色">
              <a-select
                v-model="formModel.roleId"
                :options="roleOptions"
                placeholder="请选择角色"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="email" label="电子邮箱">
              <a-input
                v-model="formModel.email"
                placeholder="请输入电子邮箱"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="createTime" label="创建时间">
              <a-range-picker
                v-model="formModel.createTime"
                w-full allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider class="!h-84px" direction="vertical" />
    <a-col flex="86px">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>
