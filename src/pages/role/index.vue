<script setup lang="ts">
import RoleSearchForm from './components/RoleSearchForm.vue'
import type { Pagination } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
function fetchRoleData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data } = RoleApi.fetchRoleList()
    tabledata = data as any
    pagination.current = params.current
    pagination.total = data.length
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    useTimeoutFn(() => {
      setLoading(false)
    }, 1000)
  }
}
const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value)
    return
  const params = refSearchForm.value.formModel
  fetchRoleData({ ...params, ...basePagination, current })
}
function formartDate(date?: Date) {
  return date
    ? dayJs(date).format('YYYY-MM-DD HH:mm:ss')
    : ''
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}
</script>

<template>
  <div>
    <a-card title="查询角色">
      <RoleSearchForm ref="refSearchForm" @fetchData="fetchRoleData" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="tabledata"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            title="序号"
            data-index="number"
            :cell-style="{ 'text-align': 'center' }"
          >
            <template #cell="{ rowIndex }">
              {{ formatRowIndex(rowIndex) }}
            </template>
          </a-table-column>
          <a-table-column
            title="名称"
            data-index="name"
            :cell-style="{ 'text-align': 'center' }"
          />
          <a-table-column
            title="角色描述"
            data-index="description"
            :cell-style="{ 'text-align': 'center' }"
          />
          <a-table-column
            title="创建时间"
            data-index="createTime"
            :cell-style="{ 'text-align': 'center' }"
          >
            <template #cell="{ record }">
              {{ formartDate(record.createTime) }}
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            data-index="operations"
            :cell-style="{ 'text-align': 'center' }"
          >
            <template #cell>
              <a-button type="text" size="small">
                编辑
              </a-button>
              <a-button type="text" size="small">
                删除
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
