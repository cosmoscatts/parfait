<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'

const settingsStore = useSettingsStore()
const {
  layout,
  fixHeader,
  showTheLogo,
  showTheTags,
  primaryColor,
} = settingsStore.getStageVal()
const layoutRadios = [
  { prop: 'vertical', name: '垂直导航', img: '' },
  { prop: 'horizontal', name: '水平导航', img: '' },
]
const switchRect = reactive<any>({
  primaryColor,
  fixHeader,
  showTheLogo,
  showTheTags,
})
const switchItems = [
  { name: '主要色调', prop: 'primaryColor' },
  { name: '页面Logo', prop: 'showTheLogo' },
  { name: '固定页头', prop: 'fixHeader' },
  { name: '标签导航', prop: 'showTheTags' },
]
const switchColors = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}
</script>

<template>
  <div ha of="x-hidden y-auto" flex="~ col" gap-4>
    <div mt-3 flex="~ col">
      <span>页面排版</span>
      <a-radio-group v-model="layout" direction="vertical">
        <template v-for="{ prop, name } of layoutRadios" :key="prop">
          <a-radio :value="prop" mt-3>
            <template #radio="{ checked }">
              <a-space
                class="group" w-full p="x-3 y-2" rounded flex justify-between
                border="1 gray300 dark:gray600 hover:![rgb(var(--primary-6))]"
                text="gray600 dark:white hover:![rgb(var(--primary-6))]"
                :class="checked
                  ? `bg-[var(--color-primary-light-1)] !border-[rgb(var(--primary-6))] !text-[rgb(var(--primary-6))]`
                  : ''"
              >
                <div
                  h-14px w-14px flex-inline justify-center items-center rounded-full
                  border="1 gray300 dark:gray600 group-hover:![rgb(var(--primary-6))]"
                  :class="checked ? '!border-[rgb(var(--primary-6))]' : ''"
                >
                  <div w-8px h-8px rounded-full :class="checked ? '!bg-[rgb(var(--primary-6))]' : ''" />
                </div>
                <div flex-inline justify-center items-center mx-4 font-bold>
                  {{ name }}
                </div>
                <div v-if="prop === 'vertical'" i-ri-layout-3-line text-40px />
                <div v-else i-ri-layout-top-line text-40px />
              </a-space>
            </template>
          </a-radio>
        </template>
      </a-radio-group>
    </div>

    <div v-for="{ name, prop }, idx of switchItems" :key="idx">
      <span>{{ name }}</span>
      <a-switch
        v-if="prop !== 'primaryColor'"
        v-model="switchRect[prop]"
        type="round" float-right
        :checked-color="switchColors.checked"
        :unchecked-color="switchColors.unchecked"
      />
      <ColorPicker v-else v-model:color-name="primaryColor" />
    </div>
  </div>
</template>

