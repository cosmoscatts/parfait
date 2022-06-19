<script setup lang="ts">
const formModel = ref()
function search() {

}
function reset() {

}
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
            <a-form-item
              field="number"
              :label="$t('searchTable.form.number')"
            >
              <a-input
                v-model="formModel.number"
                :placeholder="$t('searchTable.form.number.placeholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="name" :label="$t('searchTable.form.name')">
              <a-input
                v-model="formModel.name"
                :placeholder="$t('searchTable.form.name.placeholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="contentType"
              :label="$t('searchTable.form.contentType')"
            >
              <a-select
                v-model="formModel.contentType"
                :options="contentTypeOptions"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="filterType"
              :label="$t('searchTable.form.filterType')"
            >
              <a-select
                v-model="formModel.filterType"
                :options="filterTypeOptions"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="createdTime"
              :label="$t('searchTable.form.createdTime')"
            >
              <a-range-picker
                v-model="formModel.createdTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 84px" direction="vertical" />
    <a-col flex="86px" style="text-align: right">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>
