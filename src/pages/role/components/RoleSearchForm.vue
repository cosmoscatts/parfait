<script setup lang="ts">
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'

const emit = defineEmits(['fetchData'])
function generateFormModel() {
  return {
    name: '',
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

// whether hide the form label
const labelHidden = useResponsiveFormLabelHidden

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
          <a-col :xs="12" :lg="8">
            <a-form-item field="name" label="名称" :hide-label="labelHidden">
              <a-input
                v-model="formModel.name"
                placeholder="请输入名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :lg="8">
            <a-form-item field="createTime" label="创建时间" :hide-label="labelHidden">
              <a-range-picker
                v-model="formModel.createTime"
                w-full
              />
            </a-form-item>
          </a-col>
          <a-col :xs="0" :lg="8" />
        </a-row>
      </a-form>
    </a-col>
    <a-divider class="!h-34px" direction="vertical" />
    <a-col flex="172px">
      <a-space :size="18">
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
