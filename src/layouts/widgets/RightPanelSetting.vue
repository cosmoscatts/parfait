<script setup lang="ts">
import type { WritableComputedRef } from 'vue'
const settingsStore = useSettingsStore()
function setter(key: string, value: boolean | string) {
  settingsStore.changeSettingsVal({
    key,
    value,
  })
}
const layout = computed({
  get() {
    return settingsStore.layout
  },
  set(value) {
    setter('layout', value)
  },
})
const showTheLogo = computed({
  get() {
    return settingsStore.showTheLogo
  },
  set(value) {
    setter('showTheLogo', value)
  },
})
const showTheTags = computed({
  get() {
    return settingsStore.showTheTags
  },
  set(value) {
    setter('showTheTags', value)
  },
})
const fixHeader = computed({
  get() {
    return settingsStore.fixHeader
  },
  set(value) {
    setter('fixHeader', value)
  },
})
watchEffect(() => {
  console.log(fixHeader.value)
})
const primaryColor = computed({
  get() {
    return settingsStore.primaryColor
  },
  set(value) {
    setter('primaryColor', value)
  },
})
const switchItems = [
  { name: '主题颜色', prop: 'primaryColor', ref: unref(primaryColor) },
  { name: '页面Logo', prop: 'showTheLogo', ref: unref(fixHeader) },
  { name: '固定页头', prop: 'fixHeader', ref: unref(showTheLogo) },
  { name: '标签导航', prop: 'showTheTags', ref: unref(showTheTags) },
]
const switchColors = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}
</script>

<template>
  <div ha of="x-hidden y-auto" flex="~ col" gap-4>
    <div mt-3>
      <span>页面排版</span>
      <a-radio-group>
        <template v-for="item in 2" :key="item">
          <a-radio :value="item">
            <template #radio="{ checked }">
              <a-space
                align="center" w-full
                class="custom-radio-card"
                :class="{ 'custom-radio-card-checked': checked }"
              >
                <div className="custom-radio-card-mask">
                  <div className="custom-radio-card-mask-dot" />
                </div>
                <div>
                  <div className="custom-radio-card-title">
                    radio Card {{ item }}
                  </div>
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

    <div v-for="{ name, prop, ref }, idx of switchItems" :key="idx">
      <span>{{ name }}</span>
      <a-switch
        v-if="prop !== 'primaryColor'"
        v-model="fixHeader"
        type="round" float-right
        :checked-color="switchColors.checked"
        :unchecked-color="switchColors.unchecked"
      />
    </div>
  </div>
</template>

<style scoped>
.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  /* width: 250px; */
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
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
