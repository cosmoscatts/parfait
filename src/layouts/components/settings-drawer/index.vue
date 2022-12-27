<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'
import LayoutModeVue from './LayoutMode.vue'
import OptionSelect from './OptionSelect.vue'
import OptionSwitch from './OptionSwitch.vue'
import {
  type Option,
  type OptionRenderType,
  funcOptions,
  layoutOptions,
  primaryColorOption,
} from './options'

const uiStore = useUiStore()

const renderComponent = (key: OptionRenderType) => ({
  layoutRadio: LayoutModeVue,
  select: OptionSelect,
  switch: OptionSwitch,
  colorPicker: ColorPicker,
}[key])
const isDisabled = ({ dependOn }: Option) => dependOn && !uiStore.settingsCopy[dependOn]
const showDisabledMsg = (data: Option[], disabledMsg?: string) => {
  if (!disabledMsg) return false
  return data.some(i => isDisabled(i))
}
</script>

<template>
  <div flex="~ col">
    <a-divider>
      页面布局
    </a-divider>
    <div
      v-for="{ name, title, data } in layoutOptions"
      :key="name" :header="title" mt3
    >
      <div flex-y-center text-primary font-bold>
        <div i-ri-code-s-slash-line mr2 />
        <span>{{ title }}</span>
      </div>
      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }"
          v-model:model-value="uiStore.settingsCopy[item.prop]"
        />
      </div>
    </div>

    <a-divider>
      系统主色调
    </a-divider>
    <Component
      :is="renderComponent('colorPicker')"
      v-model:model-value="uiStore.settingsCopy[primaryColorOption.prop]"
      my4
    />

    <a-divider>
      页面功能
    </a-divider>
    <div
      v-for="{ name, title, data, disabledMsg } in funcOptions"
      :key="name" :header="title" mt3
    >
      <div flex-y-center justify-between text-primary font-bold>
        <div flex-y-center>
          <div i-ri-code-s-slash-line mr2 />
          <span>{{ title }}</span>
        </div>
        <span v-if="showDisabledMsg(data, disabledMsg)" text-danger font-bold>
          {{ disabledMsg }}
        </span>
      </div>

      <div v-for="item, idx in data" :key="idx">
        <Component
          :is="renderComponent(item.type)"
          v-bind="{ ...item }" v-model:model-value="uiStore.settingsCopy[item.prop]"
          :disabled="isDisabled(item)"
        />
      </div>
    </div>
  </div>
</template>
