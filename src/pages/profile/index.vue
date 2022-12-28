<script setup lang="ts">
import { IconInfoCircle, IconLock } from '@arco-design/web-vue/es/icon'
import UserPanel from './components/UserPanel.vue'
import BasicInformation from './components/BasicInformation.vue'
import SecuritySettings from './components/SecuritySettings.vue'

const activeTabIdx = ref(1)
const changeTabIdx = (key: string | number) => activeTabIdx.value = Number(key)
</script>

<template>
  <div>
    <a-row mb-16px>
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>

    <a-row min-h-250px bg="[var(--color-bg-2)]" rounded-sm p="t-20px r-0 b-0 l-20px">
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" type="rounded" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 基础信息
            </template>
            <BasicInformation :tab-idx="activeTabIdx" />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconLock /> 安全设置
            </template>
            <SecuritySettings :tab-idx="activeTabIdx" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
