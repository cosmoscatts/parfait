<script setup lang="ts">
// import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import type { Pagination, SelectOptionData } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
let roleOptions = $ref<SelectOptionData[]>()
function fetchRoleOptions() {
  const { code, data } = RoleApi.fetchRoleList()
  if (code === 0)
    roleOptions = data.map(i => ({ value: i.id, label: i.name }))
}
fetchRoleOptions()
function fetchTableData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data } = UserApi.fetchUserList()
    tabledata = data as any
    pagination.current = params.current
    pagination.total = data.length
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    setLoading(false)
  }
}
const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value)
    return
  const params = refSearchForm.value.formModel
  fetchTableData({ ...params, ...basePagination, current })
}
</script>

<template>
  <div>
    <a-card title="查询用户">
      <UserSearchForm ref="refSearchForm" :role-options="roleOptions" @fetchData="fetchTableData" />
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
          />
          <a-table-column
            title="账号"
            data-index="username"
          />
          <a-table-column
            title="名称"
            data-index="name"
          />
          <a-table-column
            title="角色"
            data-index="roleId"
          />
          <a-table-column
            title="手机号"
            data-index="phone"
          />
          <a-table-column
            title="邮箱"
            data-index="email"
          />
          <a-table-column
            title="创建时间"
            data-index="createTime"
          />
          <a-table-column
            title="操作"
            data-index="operations"
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
