<script setup lang="ts">
import type { Component } from 'vue'
import {
  DrawerColorPicker,
  DrawerLayoutMode,
  DrawerSelect,
  DrawerSwitch,
} from './components'
import {
  type SettingItem,
  type SettingItemRenderType,
  funcSettings,
  layoutSettings,
  primaryColorSetting,
} from './helper'

const appStore = useAppStore()
const { stageSettings } = storeToRefs(appStore)

function renderComponent(key: SettingItemRenderType) {
  const componentMap: Record<SettingItemRenderType, Component> = {
    layoutRadio: DrawerLayoutMode,
    select: DrawerSelect,
    switch: DrawerSwitch,
    colorPicker: DrawerColorPicker,
  }
  return componentMap[key]
}

// 判断关联的设置项是否需要禁止点击
const isDisabled = ({ dependOn }: SettingItem) => {
  if (!dependOn)
    return false
    // 侧边栏折叠触发器样式需要单独判断
    // 只有垂直布局时，才有侧边栏
  const { value: stage } = stageSettings
  return dependOn === 'layout'
    ? stage[dependOn] !== 'vertical'
    : !stage[dependOn]
}

// 判断 `collapse-item` 是否显示禁止点击信息
const showDisabledMsg = (data: SettingItem[], disabledMsg?: string) => {
  if (!disabledMsg)
    return false
  return data.some(i => isDisabled(i))
}
</script>

<template>
  <div flex="~ col">
    <a-divider>
      页面布局
    </a-divider>
    <div
      v-for="{ name, title, data } in layoutSettings"
      :key="name" :header="title" mt-3
    >
      <div flex-y-center text-primary font-bold>
        <div i-ri-code-s-slash-line mr-2 />
        <span>{{ title }}</span>
      </div>
      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="stageSettings[item.prop]"
        />
      </div>
    </div>

    <a-divider>
      系统主色调
    </a-divider>
    <Component
      :is="renderComponent('colorPicker')"
      v-model:model-value="stageSettings[primaryColorSetting.prop]"
      my-4
    />

    <a-divider>
      页面功能
    </a-divider>
    <div
      v-for="{ name, title, data, disabledMsg } in funcSettings"
      :key="name" :header="title" mt-3
    >
      <div flex-y-center justify-between text-primary font-bold>
        <div flex-y-center>
          <div i-ri-code-s-slash-line mr-2 />
          <span>{{ title }}</span>
        </div>
        <span v-if="showDisabledMsg(data, disabledMsg)" text-danger font-bold>
          {{ disabledMsg }}
        </span>
      </div>

      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="stageSettings[item.prop]"
          :disabled="isDisabled(item)"
        />
      </div>
    </div>
  </div>
</template>
