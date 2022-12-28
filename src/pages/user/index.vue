<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import { columns } from './columns'
import type { Pagination, User } from '~/types'

const { loading, startLoading, endLoading } = useLoading()

let roleOptions = $ref<SelectOptionData[]>()
function fetchRoleOptions() {
  RoleApi
    .fetchRoleList()
    .then(({ data: { records = [] } }) => {
      roleOptions = records.map(i => ({ value: i.id, label: i.name }))
    })
}
fetchRoleOptions()

let tabledata = $ref<User[]>([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
interface FetchQuery extends Pagination {
  name?: string
  createTime?: [string, string]
  updateTime?: [string, string]
}

function fetchTableData(params: FetchQuery) {
  params = { ...basePagination, ...params }
  startLoading()
  UserApi.fetchUserList(params)
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata = records
      pagination.current = params.current
      pagination.total = total
    })
    .finally(() => useTimeoutFn(endLoading, 1000))
}

const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value) return
  const params = refSearchForm.value.formModel
  fetchTableData({ ...params, current })
}

function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}

let modalVisible = $ref(false)
let modalType = $ref<'add' | 'edit'>('add')
let selectedUser = $ref<User>({})
function showModal(type: 'add' | 'edit', user = {}) {
  modalType = type
  selectedUser = user
  modalVisible = true
}

function saveUser(data: User) {
  const { addUser: add, updateUser: update } = UserApi
  const fn = [add, update][Number(modalType === 'edit')]
  fn(data)
    .then(({ code, message }) => {
      if (code !== 0) {
        Message.error(message || '保存失败')
        return
      }
      Message.success('保存成功')
      useTimeoutFn(() => {
        modalVisible = false
        onPageChange(pagination.current)
      }, 200)
    })
}

function deleteUser({ id }: User) {
  if (!id) return
  Modal.info({
    title: '删除确认',
    content: '确定要删除该用户吗？',
    hideCancel: false,
    onOk: () => {
      UserApi
        .deleteUser({ id })
        .then(({ code, message }) => {
          if (code !== 0) {
            Message.error(message || '用户删除失败')
            return
          }
          Message.success('用户删除成功')
          onPageChange(pagination.current)
        })
    },
  })
}
</script>

<template>
  <div>
    <a-card title="查询用户">
      <template #extra>
        <a-button type="text" size="small" font-bold @click="showModal('add')">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
      </template>
      <UserSearchForm ref="refSearchForm" :role-options="roleOptions" @fetch-data="fetchTableData" />
      <a-table
        row-key="id"
        :loading="loading"
        :columns="columns"
        :pagination="pagination.total! > pagination.pageSize ? pagination : false"
        :data="tabledata"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #id="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
        <template #roleId="{ record }">
          <a-tag color="#7bc616">
            {{ record?.role?.name || '无' }}
          </a-tag>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime) }}
        </template>
        <template #action="{ record }">
          <a-button type="text" font-bold size="small" @click="showModal('edit', record)">
            编辑
          </a-button>
          <a-button type="text" font-bold size="small" @click="deleteUser(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <UserModal
      v-model:visible="modalVisible"
      :type="modalType"
      :role-options="roleOptions"
      :user="selectedUser"
      @save-user="saveUser"
    />
  </div>
</template>
