<script setup lang="ts">
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'

const {
  roleOptions = [],
} = defineProps<{
  roleOptions?: SelectOptionData[]
}>()
const emit = defineEmits(['fetchData'])
const getBaseFormModel = () => ({
  username: '',
  name: '',
  roleId: undefined,
  createTime: [],
  updateTime: [],
})
const formModel = ref(getBaseFormModel())
const search = () => emit('fetchData', formModel.value)
const reset = () => formModel.value = getBaseFormModel()

search()

defineExpose({ formModel })
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
            <a-form-item field="username" label="账号" :hide-label="labelHidden">
              <a-input
                v-model="formModel.username"
                placeholder="请输入用户账号"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="name" label="名称" :hide-label="labelHidden">
              <a-input
                v-model="formModel.name"
                placeholder="请输入名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="roleId" label="角色" :hide-label="labelHidden">
              <a-select
                v-model="formModel.roleId"
                :options="roleOptions"
                placeholder="请选择角色"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="createTime" label="创建时间" :hide-label="labelHidden">
              <a-range-picker
                v-model="formModel.createTime"
                w-full
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="updateTime" label="更新时间" :hide-label="labelHidden">
              <a-range-picker
                v-model="formModel.updateTime"
                w-full
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider class="!h-84px" direction="vertical" />
    <a-col flex="86px">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" font-bold @click="search">
          <template #icon>
            <IconSearch />
          </template>
          搜索
        </a-button>
        <a-button font-bold @click="reset">
          <template #icon>
            <IconRefresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>
