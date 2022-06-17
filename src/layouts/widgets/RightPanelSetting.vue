<script setup lang="ts">
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
                align="start" w-full
                p="x-3 y-2" rounded
                border="1 gray300 dark:gray600 hover:[rgb(var(--primary-6))]"
                :class="checked
                  ? 'bg-[var(--color-primary-light-1)] border-[rgb(var(--primary-6))]'
                  : ''"
              >
                <div
                  className="custom-radio-card-mask"
                  h-14px w-14px flex-inline justify-center items-center rounded-full
                  border="1 gray300 dark:gray600 hover:[rgb(var(--primary-6))]"
                  :class="checked ? 'border-[rgb(var(--primary-6))]' : ''"
                >
                  <div className="custom-radio-card-mask-dot" />
                </div>
                <div className="custom-radio-card-title">
                  {{ name }}
                </div>
                <div>
                  <a-typography-text type="secondary">
                    this is a text
                  </a-typography-text>
                </div>
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
    </div>
  </div>
</template>

<style scoped>
.custom-radio-card-mask {
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked  .custom-radio-card-mask{
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
