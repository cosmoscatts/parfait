<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'

const appStore = useAppStore()
const {
  layout,
  fixHeader,
  showTheLogo,
  showTheTags,
  cacheTheTags,
  primaryColor,
  openAnimation,
  animationMode,
} = appStore.getStageVal()
const layoutRadios = [
  { prop: 'vertical', name: '垂直导航', img: '' },
  { prop: 'horizontal', name: '水平导航', img: '' },
]
const switchRect = reactive<any>({
  primaryColor,
  fixHeader,
  showTheLogo,
  showTheTags,
  cacheTheTags,
  openAnimation,
  animationMode,
})
const switchItems = [
  { name: '主要色调', prop: 'primaryColor', type: 'colorPicker', dependOn: undefined },
  { name: '页面Logo', prop: 'showTheLogo', type: 'switch', dependOn: undefined },
  { name: '固定页头', prop: 'fixHeader', type: 'switch', dependOn: undefined },
  { name: '多页签导航', prop: 'showTheTags', type: 'switch', dependOn: undefined },
  { name: '多页签缓存', prop: 'cacheTheTags', type: 'switch', dependOn: 'showTheTags' },
  { name: '页面切换动画', prop: 'openAnimation', type: 'switch', dependOn: undefined },
  { name: '页面切换动画类型', prop: 'animationMode', type: 'select', dependOn: 'openAnimation' },
]
const filterSwitchItems = computed(() => {
  return switchItems.filter(i => i.dependOn === undefined || switchRect[i.dependOn!])
})
const switchColors = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}
const selectOptions: Record<string, any> = {
  animationMode: [
    { label: '滑动', value: 'fade-slide' },
    { label: '消退', value: 'fade' },
    { label: '底部消退', value: 'fade-bottom' },
    { label: '缩放消退', value: 'fade-scale' },
    { label: '渐变', value: 'zoom-fade' },
    { label: '闪现', value: 'zoom-out' },
  ],
}
</script>

<template>
  <div ha of="x-hidden y-auto" flex="~ col" gap-4>
    <div flex="~ col">
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

    <div v-for="{ name, prop, type }, idx of filterSwitchItems" :key="idx">
      <span>{{ name }}</span>
      <ColorPicker v-if="type === 'colorPicker'" v-model:color-name="primaryColor" />
      <a-switch
        v-if="type === 'switch'"
        v-model="switchRect[prop]"
        type="round" float-right
        :checked-color="switchColors.checked"
        :unchecked-color="switchColors.unchecked"
      />
      <a-select
        v-if="type === 'select'"
        v-model="switchRect[prop]" float-right class="!w-120px"
        :options="selectOptions[prop]" size="small"
      />
    </div>
  </div>
</template>

