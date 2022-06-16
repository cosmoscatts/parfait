<script setup lang="ts">

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
                align="start"
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

    <div>
      <span>主题颜色</span>
      <!-- <theme-picker @theme-change="themeChange" /> -->
    </div>

    <div>
      <span>标签导航</span>
      <a-switch type="round" float-right checked-color="red" unchecked-color="grey" />
    </div>

    <div>
      <span>固定页头</span>
      <a-switch type="round" float-right checked-color="red" unchecked-color="grey" />
    </div>

    <div>
      <span>页面 Logo</span>
      <a-switch type="round" float-right checked-color="red" unchecked-color="grey" />
    </div>
  </div>
</template>

<style scoped>
.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
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
